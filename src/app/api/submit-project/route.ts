import { NextRequest, NextResponse } from "next/server";

interface ProjectForm {
  company: string;
  contact: string;
  email: string;
  phone?: string;
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
  references?: string;
  foundVia?: string;
  estimateTotal?: number;
  estimateHours?: number;
  _hp?: string; // honeypot
}

// Budget range → builder fee (20%) based on midpoint
function calcFees(budget: string): { builderFee: string; margin: string; clientBudget: string } {
  const map: Record<string, { fee: number; mid: number }> = {
    "< €500":      { fee: 75,    mid: 375 },
    "€500-€1K":    { fee: 150,   mid: 750 },
    "€1K-€2.5K":   { fee: 350,   mid: 1750 },
    "€2.5K-€5K":   { fee: 750,   mid: 3750 },
    "€5K-€10K":    { fee: 1500,  mid: 7500 },
    "€10K+":       { fee: 2000,  mid: 12500 },
  };

  const entry = map[budget];
  if (!entry) {
    return { builderFee: "TBD", margin: "TBD", clientBudget: budget };
  }

  const margin = entry.mid - entry.fee;
  return {
    builderFee: `€${entry.fee.toLocaleString("nl-NL")}`,
    margin: `€${margin.toLocaleString("nl-NL")}`,
    clientBudget: budget,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: ProjectForm = await req.json();

    // Honeypot check
    if (body._hp) {
      return NextResponse.json({ success: true }); // silent fail
    }

    // Validation
    const errors: string[] = [];
    if (!body.company?.trim()) errors.push("Company name is required");
    if (!body.contact?.trim()) errors.push("Contact name is required");
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.push("Valid email is required");
    if (!body.projectType?.trim()) errors.push("Project type is required");
    if (!body.description?.trim() || body.description.trim().length < 3)
      errors.push("Description is required");
    if (!body.timeline?.trim()) errors.push("Timeline is required");
    if (!body.budget?.trim()) errors.push("Budget range is required");

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const adminWebhook = process.env.DISCORD_WEBHOOK_ADMIN;
    const projectsWebhook = process.env.DISCORD_WEBHOOK_PROJECTS;

    if (!adminWebhook || !projectsWebhook) {
      console.error("Discord webhook env vars not configured");
      return NextResponse.json(
        { success: false, errors: ["Server configuration error"] },
        { status: 500 }
      );
    }

    const { builderFee, margin, clientBudget } = calcFees(body.budget.trim());
    const now = new Date().toISOString();

    // WEBHOOK 1 — ADMIN (full client details)
    const adminPayload = {
      username: "Ainomiq Admin",
      embeds: [
        {
          title: "🆕 New Project Request (ADMIN)",
          color: 15158332,
          fields: [
            { name: "🏢 Company", value: body.company.trim(), inline: true },
            { name: "👤 Contact", value: body.contact.trim(), inline: true },
            { name: "📧 Email", value: body.email.trim(), inline: true },
            { name: "📱 Phone", value: body.phone?.trim() || "N/A", inline: true },
            { name: "📋 Type", value: body.projectType.trim(), inline: true },
            { name: "⏰ Timeline", value: body.timeline.trim(), inline: true },
            { name: "💰 Client Budget", value: clientBudget, inline: true },
            { name: "💵 Builder Fee (20%)", value: builderFee, inline: true },
            { name: "📊 Margin (80%)", value: margin, inline: true },
            { name: "🔍 Found via", value: body.foundVia?.trim() || "N/A", inline: true },
            { name: "📝 Description", value: body.description.trim().slice(0, 1024), inline: false },
            { name: "🔗 References", value: body.references?.trim() || "N/A", inline: false },
          ],
          footer: { text: "ADMIN — Ainomiq" },
          timestamp: now,
        },
      ],
    };

    // WEBHOOK 2 — BUILDERS (project details only, NO client info)
    const buildersPayload = {
      username: "Ainomiq Projects",
      embeds: [
        {
          title: "🚀 New Project Available",
          color: 4886773,
          fields: [
            { name: "📋 Type", value: body.projectType.trim(), inline: true },
            { name: "⏰ Timeline", value: body.timeline.trim(), inline: true },
            { name: "💰 Your Fee", value: builderFee, inline: true },
            { name: "📝 What to build", value: body.description.trim().slice(0, 1024), inline: false },
            { name: "🔗 References", value: body.references?.trim() || "N/A", inline: false },
          ],
          footer: { text: "Reply if interested — Ainomiq HQ" },
          timestamp: now,
        },
      ],
    };

    // Fire both webhooks in parallel
    const [adminRes, buildersRes] = await Promise.all([
      fetch(adminWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminPayload),
      }),
      fetch(projectsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildersPayload),
      }),
    ]);

    if (!adminRes.ok) {
      console.error("Admin webhook failed:", adminRes.status, await adminRes.text());
    }
    if (!buildersRes.ok) {
      console.error("Builders webhook failed:", buildersRes.status, await buildersRes.text());
    }

    // As long as at least admin webhook succeeded, we're good
    if (!adminRes.ok && !buildersRes.ok) {
      return NextResponse.json(
        { success: false, errors: ["Failed to submit. Please try again."] },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit project error:", err);
    return NextResponse.json(
      { success: false, errors: ["Unexpected error"] },
      { status: 500 }
    );
  }
}
