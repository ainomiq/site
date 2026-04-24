import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

const PROJECT_TYPE_IDS = [
  // Chatbots
  "chatbot-embedded",
  "chatbot-basic",
  "chatbot-standard",
  "chatbot-advanced",
  "chatbot-ops-replacement",
  "chatbot-enterprise",
  "chatbot-2d-animated",
  "chatbot-3d-animated",
  "chatbot-voice-only",
  "chatbot",
  // Dashboards
  "dashboard-public",
  "dashboard",
  "dashboard-private-api",
  // Websites
  "landing-page",
  "website",
  "website-cms",
  "website-multilang",
  "website-multilang-cms",
  // Flows
  "flow-simple",
  "flow-complex",
  "flow-ai-workflow",
  "simple-automation",
  // Mobile
  "mobile-app-simple",
  "mobile-app-full",
  "mobile-app",
  // AI tools
  "ai-content-generator",
  // Industry
  "facility-services-tool",
  // Generic
  "webshop",
  "enterprise",
];

const TIMELINE_IDS = ["asap", "1-2-weeks", "2-4-weeks", "1-2-months", "flexible"];

const FEATURE_KEYS = [
  "payment", "login", "admin", "rbac", "email-notifs", "sms-push", "search",
  "file-uploads-basic", "file-uploads-large", "analytics", "booking",
  "multilang-small", "multilang-large", "chat", "ai-chatbot-basic",
  "rag", "custom-ai-agent", "api-external", "realtime", "saas",
];

const INTEGRATION_KEYS = [
  "shopify", "magento", "klaviyo", "meta", "google", "hubspot",
  "salesforce", "erp", "marketplace", "whatsapp", "custom-api",
];

interface SiteData {
  url: string;
  title: string;
  metaDescription: string;
  tech: string[];
  colors: string[];
  language: string;
  bodyPreview: string;
}

const SYSTEM_PROMPT = `You classify custom-solution requests for Ainomiq, an AI automation agency.

## CRITICAL: Redirect to app.ainomiq.com

Ainomiq has a ready-made ecom app (app.ainomiq.com) that already handles these things. If the user asks for any of these, DO NOT generate an estimate — set \`redirect: "app.ainomiq.com"\` instead.

App modules (ALL of these → REDIRECT, not custom):
- AI customer service for ecom: automated email replies, inbox triage, ticket handling for support@domain (NOT website chatbots/widgets)
- Email marketing (Klaviyo flows, welcome series, abandoned cart, win-back)
- Smart inventory (stock tracking, auto-reorder, low-stock alerts)
- Ads automation (Meta / Google / TikTok ad management, creative testing)
- Performance / profit dashboard (revenue, ROAS, spend tracking like Triple Whale)
- Reviews automation (sending review requests, replying to reviews)
- Returns automation
- Social media post scheduling / management

NOT redirect (these are custom builds → generate estimate):
- Chatbot widget on a website / product page / landing page (→ chatbot-embedded or chatbot-standard)
- AI assistant embedded on a webshop product page
- Chatbot for FAQ, lead gen, or customer onboarding on a website

If the request is clearly one of these → output \`{ "redirect": "app.ainomiq.com", "reason": "<short EN reason>" }\` and nothing else.

## CRITICAL: Needs-Review escape hatch

For projects that are too big, too vague, or outside Ainomiq's expertise, DON'T auto-price. Instead set \`needsReview: true\`.

Trigger needs-review when:
- Custom CRM from scratch (they offer dashboards linked to existing CRMs, not replacements)
- Custom ERP, full HR system, accounting system replacement
- Native games, hardware design, blockchain protocol development
- Multi-year multi-system projects (>€50k feel)
- Request is truly too vague to scope (no product type or deliverable mentioned at all, e.g. just "help" or "something cool")

Output for needs-review: \`{ "needsReview": true, "reason": "<short EN reason>" }\`.

## Pricing taxonomy (if NOT redirect / NOT needs-review)

### Chatbots
- chatbot-embedded (€995): embedded widget on product pages / site, public/scrapable data only, FAQ + brand voice. 0-1 week delivery.
- chatbot-standard (€3,500): chatbot with 1-2 integrations, basic knowledge base, single channel.
- chatbot-advanced (€7,500): RAG, multi-channel, complex integrations.
- chatbot-ops-replacement (€12,500): store manager / ops-replacement chatbot with private data, custom interface, custom app. Toni-for-Domino's style.
- chatbot-2d-animated (€3,950): custom 2D animated character chatbot.
- chatbot-3d-animated (€12,500): 3D animated mascot with mouth-sync + voice. Heavy asset production.
- chatbot-voice-only (€950): voice assistant (phone/embed), no avatar.

### Dashboards
- dashboard-public (€2,500): scrapes public data (TikTok trends, competitor data), gives insights.
- dashboard-private-api (€15,000): private data from customer's POS/ERP/inventory systems. Complex APIs.

### Websites
- landing-page (€95): single page.
- website (€495): 5-10 pages, custom design, static (no CMS).
- website-cms (€1,950): with CMS so client can edit content themselves.
- website-multilang (€950): 2-3 languages, no CMS.
- website-multilang-cms (€2,950): multilanguage + CMS.

### Flows / Automations
- flow-simple (€195): one trigger, simple automation (e.g. Shopify → Klaviyo list sync).
- flow-complex (€895): multiple integrations, conditional logic.
- flow-ai-workflow (€1,995): AI-driven workflow (e.g. reviews → AI sentiment → auto-reply / escalate).

### Mobile apps
- mobile-app-simple (€2,950): one purpose, standard UI, one platform.
- mobile-app-full (€9,950): native iOS + Android + backend + auth + push.

### AI tools
- ai-content-generator (€1,950): generates product descriptions + AI images for catalog; monthly = AI credits × 1.5 markup.

### Industry-specific
- facility-services-tool (€25,000): field-worker planning + cleaning reports + photo verification + personnel management.

## Optional feature add-ons (stack on top of base, only if genuinely needed):
- payment (€750), login (€750), admin (€1,500), rbac (€1,000)
- email-notifs (€500), sms-push (€500), search (€500)
- file-uploads-basic (€400), file-uploads-large (€1,400)
- analytics (€1,500), booking (€2,000)
- multilang-small (€750), multilang-large (€1,500)
- chat (€1,500), ai-chatbot-basic (€2,500)
- rag (€5,000), custom-ai-agent (€7,500)
- api-external (€2,000), realtime (€1,500), saas (€7,500)

## Integration add-ons (only if explicitly mentioned):
- shopify (€1,000), magento (€1,500), klaviyo (€300), meta (€500), google (€400)
- hubspot (€750), salesforce (€2,500), erp (€2,500), marketplace (€1,000)
- whatsapp (€500), custom-api (€1,500)

## Timeline surcharges:
- asap: +25%, 1-2-weeks: +15%, 2-4-weeks / 1-2-months / flexible: 0%

## Pricing drivers (reason carefully):
1. Data access: public/scrapable = cheap; private/behind-login = 10-15x more
2. Integration complexity: easy APIs (Shopify, Klaviyo) = cheap; POS / ERP / legacy = expensive
3. Interface: embed widget = cheap; custom dashboard = mid; custom app = expensive
4. Scope: FAQ lookup = cheap; ops-replacement (replaces a human role) = expensive
5. Modality: text-only = cheap; voice = mid; 3D+voice = expensive

## Output format (JSON only, no markdown):

If redirect:
\`{ "redirect": "app.ainomiq.com", "reason": "<EN reason in 1 sentence>" }\`

If needs-review:
\`{ "needsReview": true, "reason": "<EN reason in 1 sentence>" }\`

Otherwise (normal estimate):
\`{
  "projectType": "<id from taxonomy>",
  "description": "<English brief, 80-150 words, bullet-style, specific>",
  "timeline": "<id>",
  "targetAudience": "<5-15 words in English or empty>",
  "needsCredentials": <boolean>,
  "features": ["<feature-key>", ...],
  "integrations": ["<integration-key>", ...],
  "recommendations": ["<2-3 short actionable tips>"]
}\`

## Classification examples:

**Input:** "Chatbot on my product page that can answer FAQs"
→ \`{ "projectType": "chatbot-embedded", ... }\` (public data, embedded)

**Input:** "Chatbot for store managers that knows all recipes and procedures"
→ \`{ "projectType": "chatbot-ops-replacement", ... }\` (private data, ops-replacement)

**Input:** "I want to automatically send abandoned cart emails via Klaviyo"
→ \`{ "redirect": "app.ainomiq.com", "reason": "Abandoned cart flows are part of our Email module." }\`

**Input:** "Dashboard with TikTok trends and content ideas"
→ \`{ "projectType": "dashboard-public", ... }\`

**Input:** "Dashboard that combines data from my POS and inventory system"
→ \`{ "projectType": "dashboard-private-api", ... }\` (private APIs, complex)

**Input:** "Custom CRM for my real estate agency"
→ \`{ "needsReview": true, "reason": "We do not build full custom CRMs. We can build a dashboard that connects to your existing CRM - contact us for scoping." }\`

**Input:** "Something for my business"
→ \`{ "needsReview": true, "reason": "Request too vague - please share more details and we will get back to you within 48 hours." }\``;

export async function POST(request: NextRequest) {
  try {
    const { input, siteData } = (await request.json()) as {
      input: string;
      siteData?: SiteData;
    };

    if (!input || input.trim().length < 3) {
      return NextResponse.json({ error: "Too short" }, { status: 400 });
    }

    let siteContext = "";
    if (siteData) {
      siteContext = `\n\nClient website analysis:
- URL: ${siteData.url}
- Title: ${siteData.title}
- Tech stack: ${siteData.tech.join(", ") || "unknown"}
- Content: ${siteData.bodyPreview.slice(0, 500)}

Use this to tailor the description to their actual business.`;
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + siteContext,
      prompt: input,
      maxOutputTokens: 900,
    });

    try {
      const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
      const parsed = JSON.parse(cleaned);

      // Redirect response — pass through
      if (parsed.redirect) {
        return NextResponse.json({
          redirect: parsed.redirect,
          reason: parsed.reason || "",
        });
      }

      // Needs-review response — pass through
      if (parsed.needsReview) {
        return NextResponse.json({
          needsReview: true,
          reason: parsed.reason || "",
        });
      }

      // Normal estimate path — validate fields
      if (!PROJECT_TYPE_IDS.includes(parsed.projectType)) {
        parsed.projectType = "chatbot-embedded";
      }
      if (!TIMELINE_IDS.includes(parsed.timeline)) {
        parsed.timeline = "2-4-weeks";
      }
      if (!Array.isArray(parsed.recommendations)) {
        parsed.recommendations = [];
      }
      if (Array.isArray(parsed.features)) {
        parsed.features = parsed.features.filter((f: string) => FEATURE_KEYS.includes(f));
      } else {
        parsed.features = [];
      }
      if (Array.isArray(parsed.integrations)) {
        parsed.integrations = parsed.integrations.filter((i: string) => INTEGRATION_KEYS.includes(i));
      } else {
        parsed.integrations = [];
      }

      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ error: "Invalid AI response" }, { status: 502 });
    }
  } catch (error) {
    console.error("AI prefill error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
