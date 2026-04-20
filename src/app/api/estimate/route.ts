import { NextRequest, NextResponse } from "next/server";

/**
 * Ainomiq Pricing Calculator
 * Gebaseerd op Pim's pricing config (April 2026)
 *
 * Structuur:
 * - Basisprijs per projecttype
 * - Feature toeslagen (vast bedrag per feature)
 * - Integratie toeslagen (vast bedrag per integratie)
 * - Design toeslag
 * - Schaal toeslag (aantal pagina's)
 * - Content toeslag
 * - Timeline toeslag (%)
 * - Enterprise users toeslag (%)
 * - Marge buffer: 15%
 * - Minimum: €2.500
 */

const BASE_PRICES: Record<string, { price: number; label: string }> = {
  "simple-automation": { price: 2500,  label: "Simple Automation" },
  "website":           { price: 5000,  label: "Website" },
  "chatbot":           { price: 12500, label: "AI Chatbot" },
  "dashboard":         { price: 7500,  label: "Dashboard / Portal" },
  "webshop":           { price: 15000, label: "Webshop (Shopify)" },
  "mobile-app":        { price: 20000, label: "iOS / Android App" },
  "enterprise":        { price: 25000, label: "Enterprise / Full Custom" },
};

const FEATURE_PRICES: Record<string, { price: number; keywords: string[] }> = {
  "payment":              { price: 750,  keywords: ["payment", "stripe", "mollie", "ideal", "checkout", "billing", "subscription"] },
  "login":                { price: 750,  keywords: ["login", "user account", "authentication", "auth", "sign in", "register"] },
  "admin":                { price: 1500, keywords: ["admin panel", "admin dashboard", "beheer", "backoffice"] },
  "rbac":                 { price: 1000, keywords: ["rbac", "roles", "permissions", "access control", "role-based"] },
  "email-notifs":         { price: 500,  keywords: ["email notification", "email notif", "transactional email", "email alert"] },
  "sms-push":             { price: 500,  keywords: ["sms", "push notification", "push notif"] },
  "search":               { price: 500,  keywords: ["search", "filtering", "faceted search", "elasticsearch", "algolia"] },
  "file-uploads-basic":   { price: 400,  keywords: ["file upload", "image upload", "document upload"] },
  "file-uploads-large":   { price: 1400, keywords: ["video upload", "large file", "s3", "media management", "cdn"] },
  "analytics":            { price: 1500, keywords: ["analytics dashboard", "reporting", "reports", "charts", "graphs", "statistics"] },
  "booking":              { price: 2000, keywords: ["booking", "reservation", "calendar", "scheduling", "appointments"] },
  "multilang-small":      { price: 750,  keywords: ["multi-language", "multilingual", "i18n", "translations", "2 talen", "3 talen"] },
  "multilang-large":      { price: 1500, keywords: ["4 talen", "5 talen", "meerdere talen", "localization"] },
  "chat":                 { price: 1500, keywords: ["chat", "messaging", "chatroom", "live chat", "support chat"] },
  "ai-chatbot-basic":     { price: 2500, keywords: ["ai chatbot", "gpt chatbot", "ai agent", "virtual assistant", "faq bot"] },
  "rag":                  { price: 5000, keywords: ["rag", "knowledge base", "retrieval", "document search", "vector", "embeddings"] },
  "custom-ai-agent":      { price: 7500, keywords: ["custom ai agent", "autonomous agent", "langgraph", "openai assistant", "custom gpt"] },
  "api-external":         { price: 2000, keywords: ["api voor derden", "public api", "api docs", "rest api external", "third party api"] },
  "realtime":             { price: 1500, keywords: ["real-time", "realtime", "websocket", "live data", "streaming", "socket"] },
  "saas":                 { price: 7500, keywords: ["saas", "multi-tenant", "white-label", "whitelabel", "multi tenant"] },
};

const INTEGRATION_PRICES: Record<string, { price: number; keywords: string[] }> = {
  "shopify":      { price: 1000, keywords: ["shopify"] },
  "magento":      { price: 1500, keywords: ["magento", "woocommerce", "woo"] },
  "klaviyo":      { price: 300,  keywords: ["klaviyo", "mailchimp", "sendgrid", "email marketing"] },
  "meta":         { price: 500,  keywords: ["meta", "facebook", "instagram api", "tiktok"] },
  "google":       { price: 400,  keywords: ["google ads", "ga4", "google analytics", "gtm"] },
  "hubspot":      { price: 750,  keywords: ["hubspot"] },
  "salesforce":   { price: 2500, keywords: ["salesforce"] },
  "erp":          { price: 2500, keywords: ["erp", "exact", "twinfield", "sap", "accounting"] },
  "marketplace":  { price: 1000, keywords: ["bol.com", "amazon", "etsy", "marketplace"] },
  "whatsapp":     { price: 500,  keywords: ["whatsapp", "slack", "teams", "discord integration"] },
  "custom-api":   { price: 1500, keywords: ["custom api", "api koppeling", "webhook", "zapier", "make.com"] },
};

const TIMELINE_SURCHARGE: Record<string, number> = {
  "asap":       0.25,
  "1-2-weeks":  0.15,
  "2-4-weeks":  0.0,
  "1-2-months": 0.0,
  "flexible":   0.0,
};

const MARGIN_BUFFER = 0.15;
const MIN_PRICE = 2500;
const HOURLY_RATE_EXTERN = 125;
const HOURLY_RATE_INTERN = 20;
const DEV_PAYOUT_PCT = 0.20;

interface EstimateRequest {
  projectType: string;
  description: string;
  timeline: string;
  features?: string[];
  recommendations?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: EstimateRequest = await req.json();
    const descLower = (body.description || "").toLowerCase();

    // Basisprijs
    const typeInfo = BASE_PRICES[body.projectType] || BASE_PRICES["dashboard"];

    // Features — keyword scan op description
    let featureTotal = 0;
    const detectedFeatures: string[] = [];
    for (const [, feature] of Object.entries(FEATURE_PRICES)) {
      if (feature.keywords.some((kw) => descLower.includes(kw))) {
        featureTotal += feature.price;
        // Find label from key
        detectedFeatures.push(`+€${feature.price.toLocaleString()}`);
      }
    }

    // Integraties — keyword scan
    let integrationTotal = 0;
    const detectedIntegrations: string[] = [];
    for (const [, integ] of Object.entries(INTEGRATION_PRICES)) {
      if (integ.keywords.some((kw) => descLower.includes(kw))) {
        integrationTotal += integ.price;
        detectedIntegrations.push(`+€${integ.price.toLocaleString()}`);
      }
    }

    // Design toeslag (standaard: klant levert design)
    const designSurcharge = 0;

    // Schaal (standaard: 1-5 pagina's)
    const scaleSurcharge = 0;

    // Content (standaard: klant levert content)
    const contentSurcharge = 0;

    // Subtotaal
    const subtotal = typeInfo.price + featureTotal + integrationTotal + designSurcharge + scaleSurcharge + contentSurcharge;

    // Enterprise users toeslag
    const enterpriseSurcharge = 0;

    // Timeline toeslag
    const timelinePct = TIMELINE_SURCHARGE[body.timeline] ?? 0;
    const timelineSurcharge = Math.round(subtotal * timelinePct);

    // Marge buffer
    const marginBase = subtotal + enterpriseSurcharge + timelineSurcharge;
    const marginAmount = Math.round(marginBase * MARGIN_BUFFER);

    // Totaal
    let total = marginBase + marginAmount;

    // Rond af op €250
    total = Math.ceil(total / 250) * 250;

    // Minimum
    total = Math.max(total, MIN_PRICE);

    // Complexity label (voor UX display)
    const complexityRatio = total / typeInfo.price;
    const complexity =
      complexityRatio <= 1.2 ? "Standard"
      : complexityRatio <= 1.6 ? "Moderate"
      : complexityRatio <= 2.0 ? "Complex"
      : "Highly Complex";

    // Delivery estimate
    const deliveryWeeks =
      total <= 5000  ? "1-2"
      : total <= 10000 ? "2-3"
      : total <= 20000 ? "3-5"
      : total <= 35000 ? "4-8"
      : "6-12";

    // Recurring kosten
    // AI chatbot type → AI credits
    const hasAI = body.projectType === "chatbot" || descLower.includes("ai") || descLower.includes("chatbot") || descLower.includes("automation");
    const hasHosting = ["dashboard", "webshop", "mobile-app", "enterprise"].includes(body.projectType);
    const monthlyCost = (hasAI ? 49 : 0) + (hasHosting ? 150 : 0);

    // Intern (niet voor klant)
    const estimatedHours = Math.ceil(total / HOURLY_RATE_EXTERN);
    const devPayout = Math.round(total * DEV_PAYOUT_PCT);
    const buildCost = estimatedHours * HOURLY_RATE_INTERN;
    const grossMargin = total - devPayout - buildCost;

    return NextResponse.json({
      estimate: {
        total,
        basePrice: typeInfo.price,
        featureTotal,
        integrationTotal,
        subtotal,
        timelineSurcharge,
        marginAmount,
        complexity,
        complexityMultiplier: Math.round((total / typeInfo.price) * 100) / 100,
        detectedComplexity: [...detectedFeatures, ...detectedIntegrations],
        timelineMultiplier: 1 + timelinePct,
        timeline: body.timeline,
        deliveryWeeks,
        projectType: typeInfo.label,
        monthlyCost: monthlyCost > 0 ? monthlyCost : null,
        // Legacy compat (voor bestaande UI)
        hours: estimatedHours,
        hourlyRate: HOURLY_RATE_EXTERN,
        baseCost: total,
        margin: MARGIN_BUFFER,
        // Intern
        _intern: {
          hours: estimatedHours,
          devPayout,
          buildCost,
          grossMargin,
          grossMarginPct: Math.round((grossMargin / total) * 100),
        },
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
