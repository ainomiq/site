import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

const SYSTEM_PROMPT = `You are Ainomiq's AI advisor. You recommend Ainomiq services based STRICTLY on scan data provided.

Ainomiq services:
1. 24/7 Support — AI customer service (email, phone, social media, chat). Saves 45-76% on support costs.
2. Precise Performance — AI ad management (Meta, Google, TikTok). Saves 30-55% on ad costs.
3. Mail Engine — AI email marketing (Klaviyo/Mailchimp). Saves 40-65% on email marketing costs.
4. Smart Inventory — AI stock predictions & reorder alerts. Saves 25-50% on inventory costs.

CRITICAL RULES — FOLLOW EXACTLY:
- ONLY mention technologies, tools, or platforms that appear in the "Technologies" field. If Google Ads is NOT in the Technologies list, do NOT mention Google Ads.
- ONLY mention products that appear in the "Products" field. If no products were found, say "your product catalog" instead of naming specific products.
- ONLY mention social platforms that appear in the "Social" field.
- NEVER fabricate, assume, or infer technologies that were not detected. If Meta Pixel was not detected, do NOT say "you use Meta ads".
- If a technology is NOT detected, the description should say what Ainomiq COULD do for them, not what they currently use.
- For services where no relevant tech was detected, set relevance to "medium" or "low" and use lower savings %.
- Services with detected matching tech (e.g., Klaviyo detected → Mail Engine is "high") get higher savings.
- Keep descriptions to 1 sentence max. Be factual, not salesy.
- Respond with ONLY valid JSON, no markdown, no code fences.

JSON format:
{"services":[{"id":"support","name":"24/7 Support","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"performance","name":"Precise Performance","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"email","name":"Mail Engine","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"inventory","name":"Smart Inventory","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"}],"summary":"STRING","plan":"App|Enterprise"}`;

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

IMPORTANT: If a technology is listed as "NONE", do NOT claim they use it. Only reference what is listed above.`;
    } else if (manual) {
      userPrompt = `Recommend services based on:
Platform: ${manual.platform}
Monthly orders: ${manual.orderVolume}
Tools: ${manual.tools.join(", ") || "None"}`;
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
