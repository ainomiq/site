import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

const SYSTEM_PROMPT = `You are Ainomiq's advisor. You analyze a business website and recommend the RIGHT Ainomiq product line.

STEP 1 — CLASSIFY THE BUSINESS:
Read the site title, description, body text, technologies, and products carefully. Determine what type of business this is:
- "ecommerce" — Online store selling physical/digital products (webshop, DTC brand, marketplace seller). Must have products, a cart, or an e-commerce platform.
- "service" — Service company (cleaning, catering, facility management, consulting, hospitality, healthcare, education, logistics, construction, real estate, etc.)
- "hybrid" — Both products AND services

STEP 2 — RECOMMEND THE RIGHT PRODUCT LINE:

IF businessType is "ecommerce" → recommend plan "App" with these 4 services:
1. id: "support", name: "24/7 Support" — Automated customer service handling returns, tracking, FAQs.
2. id: "performance", name: "Precise Performance" — Automated ad management across channels.
3. id: "email", name: "Mail Engine" — Automated email marketing flows and campaigns.
4. id: "inventory", name: "Smart Inventory" — Stock predictions and reorder alerts.

IF businessType is "service" or "hybrid" → recommend plan "Custom Solutions" with these 4 services:
1. id: "automation", name: "All-in-one" — Complete automation suite tailored to operations.
2. id: "chatbot", name: "Chatbot" — Website and WhatsApp chatbot for customer communication.
3. id: "app", name: "Custom App" — Branded iOS and Android app.
4. id: "process", name: "Process Automation" — Automate scheduling, invoicing, reporting, workflows.

REALISTIC DATA — THIS IS CRITICAL:
For E-COMMERCE savingsPercent:
- Base your estimates on what you ACTUALLY know about the business from the scan.
- A small webshop with 10 products and no ad pixels → lower savings (20-35%).
- A large webshop with 100+ products, Klaviyo, Meta Pixel → higher savings (50-70%).
- If they don't use a tool yet (e.g. no email marketing), savings are POTENTIAL not current → set relevance to "medium" and estimate conservatively.
- If they already use a tool well (e.g. Klaviyo detected), the savings come from OPTIMIZING it → relevance "high".

For CUSTOM SOLUTIONS hoursPerWeek:
- Think about the actual business: a 5-person cleaning company saves different hours than a 200-employee franchise.
- A chatbot for a catering company handling 20 inquiries/day → maybe 8-12h/week.
- Process automation for a small consultancy → maybe 3-5h/week.
- An app for a franchise with 50 locations → high impact, 15-25h/week.
- Be specific to their industry and likely scale. Don't give every business the same numbers.

CRITICAL RULES:
- ONLY mention technologies that appear in the scan data. Never fabricate.
- If no products were found, don't name specific products.
- Descriptions must be 1 sentence, SPECIFIC to their business type and industry — not generic.
- businessSummary: 1 sentence about what the business does based on what you read.
- summary: 2-3 sentences explaining WHY you recommend this plan for them specifically.
- Respond with ONLY valid JSON, no markdown, no code fences.

JSON format for E-COMMERCE:
{"businessType":"ecommerce","businessSummary":"STRING","services":[{"id":"support","name":"24/7 Support","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"performance","name":"Precise Performance","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"email","name":"Mail Engine","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"inventory","name":"Smart Inventory","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"}],"summary":"STRING","plan":"App"}

JSON format for SERVICE/HYBRID:
{"businessType":"service","businessSummary":"STRING","services":[{"id":"automation","name":"All-in-one","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"chatbot","name":"Chatbot","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"app","name":"Custom App","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"process","name":"Process Automation","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"}],"summary":"STRING","plan":"Custom Solutions"}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const analysis: SiteAnalysis | undefined = body.analysis;
    const manual: ManualAnswers | undefined = body.manual;

    let userPrompt: string;

    if (analysis) {
      const techList = analysis.technologies
        .map((t) => `${t.name} (${t.category}, ${t.confidence} confidence)`)
        .join(", ");

      const productList = analysis.products
        .slice(0, 15)
        .map((p) => `${p.name}${p.price ? ` — ${p.price}` : ""}`)
        .join(", ");

      const hasAds = analysis.technologies.some((t) => t.category === "ads");
      const hasEmail = analysis.technologies.some((t) => t.category === "email");
      const adTechs = analysis.technologies.filter((t) => t.category === "ads").map((t) => t.name).join(", ");
      const emailTechs = analysis.technologies.filter((t) => t.category === "email").map((t) => t.name).join(", ");

      userPrompt = `SCAN RESULTS — only reference data listed here, nothing else:

Site: ${analysis.url}
Title: ${analysis.title}
Description: ${analysis.description}

DETECTED TECHNOLOGIES (only these exist — do not mention others):
${techList || "NONE — no technologies were detected on this site"}

AD PLATFORMS DETECTED: ${hasAds ? adTechs : "NONE — no ad pixels or ad platforms were found"}
EMAIL TOOLS DETECTED: ${hasEmail ? emailTechs : "NONE — no email marketing tools were found"}
E-COMMERCE PLATFORM: ${analysis.hasEcommerce ? "Yes" : "No e-commerce platform detected"}
Scale estimate: ${analysis.estimatedScale}

PRODUCTS FOUND (${analysis.products.length}): ${productList || "NONE — no products were found on the scanned page"}
Price range: ${analysis.priceRange ? `${analysis.currency} ${analysis.priceRange.min} - ${analysis.priceRange.max}` : "Unknown"}

FAQ items (${analysis.faqItems.length}): ${analysis.faqItems.slice(0, 5).join(" | ") || "None"}
Pages: ${analysis.pageCount}
Social channels: ${analysis.socialPresence.join(", ") || "None detected"}
Contact: ${analysis.contactEmail || "none"}, ${analysis.contactPhone || "none"}

BODY TEXT (use this to understand what kind of business this is):
${analysis.bodyTextSummary || "No body text available"}

IMPORTANT: If a technology is listed as "NONE", do NOT claim they use it. Only reference what is listed above.
First determine if this is an e-commerce store or a service business based on the body text, title, products, and technologies. Then recommend the matching product line.`;
    } else if (manual) {
      userPrompt = `Recommend services based on manual input:
Business type: ${manual.businessType || "unknown"}
${manual.businessType === "service" ? `Industry: ${manual.industry || "Not specified"}
Team size: ${manual.teamSize || "Not specified"}` : `Platform: ${manual.platform || "Not specified"}
Monthly orders: ${manual.orderVolume || "Not specified"}`}
Tools: ${manual.tools?.join(", ") || "None"}
Description: ${manual.description || "Not provided"}`;
    } else {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
    });

    // Parse the JSON response
    const jsonMatch = result.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
    }

    const recommendation = JSON.parse(jsonMatch[0]);
    return NextResponse.json(recommendation);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate recommendation";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
