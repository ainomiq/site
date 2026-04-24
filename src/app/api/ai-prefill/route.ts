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
- Chatbot widget on a website / product page / landing page
- AI assistant embedded on a webshop product page
- Chatbot for FAQ, lead gen, or customer onboarding on a website

If the request is clearly one of these → output \`{ "redirect": "app.ainomiq.com", "reason": "<short EN reason>" }\` and nothing else.

## CRITICAL: Needs-Review escape hatch

For projects that are too big, too vague, or outside Ainomiq's expertise, DON'T auto-price. Instead set \`needsReview: true\`.

Trigger needs-review ONLY when:
- Custom CRM from scratch
- Custom ERP, full HR system, accounting system replacement
- Native games, hardware design, blockchain protocol development
- Multi-year multi-system projects (>€50k feel)
- Request has NO identifiable product type at all (e.g. just "help", "something cool", "I need something for my business")

NEVER trigger needs-review when:
- Input mentions "chatbot" → always pick the right chatbot tier based on data complexity (see below)
- Input mentions "website", "dashboard", "automation", "flow", "landing page" → always estimate
- A domain is provided → use it to infer business type, don't ask for more info
- Input is short but has a clear product type → estimate with sensible defaults

Output for needs-review: \`{ "needsReview": true, "reason": "<short EN reason>" }\`.

## Pricing taxonomy (if NOT redirect / NOT needs-review)

### Chatbots — PICK THE RIGHT TIER BASED ON DATA COMPLEXITY

The most important factor is **where the data comes from**:

- **chatbot-embedded (€995)**: ONLY when data is 100% public/scrapable — FAQ pages, product pages, publicly visible site content. No login required to access the data. Delivered as a lightweight embed script. 0-1 week.
  - Example: "Chatbot for my webshop that answers product questions" (product info is public)
  - Example: "FAQ chatbot on my restaurant site" (menu/hours are public)

- **chatbot-standard (€3,500)**: chatbot with 1-2 integrations, or data that requires an API key / basic integration (e.g. Shopify product catalog via API, Klaviyo customer data, order history lookup). Single channel.
  - Example: "Chatbot that can look up a customer's order status" (needs Shopify API)
  - Example: "Chatbot that knows our product catalog and can recommend items" (needs product feed integration)

- **chatbot-advanced (€7,500)**: RAG (retrieval-augmented generation), private knowledge base, multi-channel, complex integrations, or data that requires document ingestion (PDFs, internal wikis, databases).
  - Example: "Chatbot trained on our internal manuals and policy documents"
  - Example: "Multi-channel support bot across website + WhatsApp"

- **chatbot-ops-replacement (€12,500)**: replaces a human role. Private data, custom interface, acts autonomously on behalf of the business. Accesses internal systems (POS, ERP, inventory).
  - Example: "Bot that handles all customer service and can process refunds automatically"
  - Example: "Store manager bot that knows all recipes, procedures, staff schedules"

- **chatbot-2d-animated (€3,950)**: custom 2D animated character chatbot (visual mascot).
- **chatbot-3d-animated (€12,500)**: 3D animated mascot with mouth-sync + voice.
- **chatbot-voice-only (€950)**: voice assistant (phone/embed), no avatar.

**IMPORTANT**: When input is vague (e.g. just "chatbot" or "chatbot for my webshop") — default to chatbot-embedded (€995) unless the site analysis suggests they need integrations or private data. Never output needs-review for a chatbot request.

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
- ai-content-generator (€1,950): generates product descriptions + AI images for catalog.

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

## Integration add-ons (only if explicitly mentioned or clearly implied by site analysis):
- shopify (€1,000), magento (€1,500), klaviyo (€300), meta (€500), google (€400)
- hubspot (€750), salesforce (€2,500), erp (€2,500), marketplace (€1,000)
- whatsapp (€500), custom-api (€1,500)

## Timeline surcharges:
- asap: +25%, 1-2-weeks: +15%, 2-4-weeks / 1-2-months / flexible: 0%

## Pricing drivers — reason through these before outputting:
1. Data access: public/scrapable = chatbot-embedded; API/key required = chatbot-standard; private documents/DB = chatbot-advanced; ops-replacement = chatbot-ops-replacement
2. Integration complexity: no integrations = cheap; easy APIs (Shopify, Klaviyo) = mid; POS/ERP/legacy = expensive
3. Interface: embed widget = cheap; custom dashboard = mid; custom app = expensive
4. Scope: FAQ lookup = cheap; replaces a human role = expensive
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

**Input:** "Chatbot" (+ billiejeansclo.com — a fashion webshop)
→ \`{ "projectType": "chatbot-embedded", ... }\` (webshop product info is public, simple FAQ bot)

**Input:** "Chatbot on my product page that can answer FAQs"
→ \`{ "projectType": "chatbot-embedded", ... }\` (public data, embedded)

**Input:** "Chatbot that can check my customer's order status"
→ \`{ "projectType": "chatbot-standard", ... }\` (needs Shopify/order API → integration required)

**Input:** "Chatbot trained on our internal policy documents and manuals"
→ \`{ "projectType": "chatbot-advanced", ... }\` (private documents, RAG required)

**Input:** "Chatbot for store managers that knows all recipes and procedures"
→ \`{ "projectType": "chatbot-ops-replacement", ... }\` (private data, ops-replacement)

**Input:** "I want to automatically send abandoned cart emails via Klaviyo"
→ \`{ "redirect": "app.ainomiq.com", "reason": "Abandoned cart flows are part of our Email module." }\`

**Input:** "Dashboard with TikTok trends and content ideas"
→ \`{ "projectType": "dashboard-public", ... }\`

**Input:** "Custom CRM for my real estate agency"
→ \`{ "needsReview": true, "reason": "We do not build full custom CRMs. We can build a dashboard that connects to your existing CRM - contact us for scoping." }\`

**Input:** "Something for my business"
→ \`{ "needsReview": true, "reason": "Request too vague - please share what kind of tool or automation you need." }\``;

export async function POST(request: NextRequest) {
  try {
    const { input, siteData } = (await request.json()) as {
      input: string;
      siteData?: SiteData;
    };

    if (!input || input.trim().length < 3) {
      return NextResponse.json({ error: "Too short" }, { status: 400 });
    }

    // Hardcoded: short chatbot requests always get chatbot-embedded estimate (never needs-review)
    const normalized = input.trim().toLowerCase();
    const isChatbotRequest = /^chatbots?(\s+(for|on|widget|embed|my|a|the|website|site|webshop|store|page|pages)?)?$/i.test(normalized);
    if (isChatbotRequest && !siteData) {
      // No site data to infer complexity from - safe default is chatbot-embedded
      return NextResponse.json({
        projectType: "chatbot-embedded",
        description: "Embedded chatbot widget for the website. Handles FAQs, brand voice, and basic visitor questions using publicly available site content. Delivered as a lightweight embed script.",
        timeline: "flexible",
        targetAudience: "Website visitors looking for quick answers",
        needsCredentials: false,
        features: [],
        integrations: [],
        recommendations: [
          "Share your most common customer questions so we can train the bot",
          "Consider adding a fallback to email for complex questions",
        ],
      });
    }
    // If siteData is available even for short chatbot input, let AI analyze it for correct tier

    let siteContext = "";
    if (siteData) {
      siteContext = `\n\nClient website analysis:
- URL: ${siteData.url}
- Title: ${siteData.title}
- Tech stack: ${siteData.tech.join(", ") || "unknown"}
- Content: ${siteData.bodyPreview.slice(0, 500)}

Use this to:
1. Tailor the description to their actual business
2. Infer data complexity for chatbot tier selection:
   - Ecom/webshop with public product pages → chatbot-embedded is fine
   - Site with order tracking, account area, or private data needs → chatbot-standard or higher
   - Complex internal operations or private knowledge → chatbot-advanced or chatbot-ops-replacement`;
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
