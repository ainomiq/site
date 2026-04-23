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

// Prijzen gecalibreerd op real-world Pim offertes (april 2026)
// Zie: brain/ainomiq/pricing-examples.md
const BASE_PRICES: Record<string, { price: number; label: string }> = {
  // Chatbots
  "chatbot-embedded":         { price: 995,   label: "Embedded Chatbot (public data)" },
  "chatbot-basic":            { price: 995,   label: "AI Chatbot - Basic" },      // alias
  "chatbot-standard":         { price: 3500,  label: "AI Chatbot - Standard" },
  "chatbot-advanced":         { price: 7500,  label: "AI Chatbot - Advanced" },
  "chatbot-ops-replacement":  { price: 12500, label: "Store Manager Chatbot (ops-replacement)" },
  "chatbot-enterprise":       { price: 12500, label: "AI Chatbot - Enterprise" }, // alias
  "chatbot-2d-animated":      { price: 3950,  label: "2D Animated Chatbot" },
  "chatbot-3d-animated":      { price: 12500, label: "3D Animated Mascot + Voice" },
  "chatbot-voice-only":       { price: 950,   label: "Voice-only Assistant" },
  "chatbot":                  { price: 995,   label: "AI Chatbot" }, // legacy
  // Dashboards
  "dashboard-public":         { price: 2500,  label: "Dashboard (public data)" },
  "dashboard":                { price: 2500,  label: "Dashboard" }, // alias
  "dashboard-private-api":    { price: 15000, label: "Dashboard (private API + data)" },
  // Websites
  "landing-page":             { price: 95,    label: "Landing Page" },
  "website":                  { price: 495,   label: "Website (5-10 pagina's)" },
  "website-cms":              { price: 1950,  label: "Website + CMS" },
  "website-multilang":        { price: 950,   label: "Website Multilanguage" },
  "website-multilang-cms":    { price: 2950,  label: "Website Multilanguage + CMS" },
  // Flows / Automations
  "flow-simple":              { price: 195,   label: "Simple Flow (1 trigger)" },
  "flow-complex":             { price: 895,   label: "Complex Flow (multi-integration)" },
  "flow-ai-workflow":         { price: 1995,  label: "AI Workflow (full custom)" },
  "simple-automation":        { price: 195,   label: "Simple Automation" }, // alias
  // Mobile apps
  "mobile-app-simple":        { price: 2950,  label: "Mobile App (simple, 1 platform)" },
  "mobile-app-full":          { price: 9950,  label: "Full Native App (iOS + Android)" },
  "mobile-app":               { price: 2950,  label: "Mobile App" }, // alias
  // AI tools
  "ai-content-generator":     { price: 1950,  label: "AI Content Generator" },
  // Industry-specific
  "facility-services-tool":   { price: 25000, label: "Facility Services Tool" },
  // Webshop (via app.ainomiq.com redirect meestal, maar custom kan)
  "webshop":                  { price: 15000, label: "Custom Webshop" },
  // Enterprise / full custom
  "enterprise":               { price: 25000, label: "Enterprise / Full Custom" },
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
  // api-external: verhoogd €1000 → €2000 (docs, auth, rate limiting, versioning)
  "api-external":         { price: 2000, keywords: ["api voor derden", "public api", "api docs", "rest api external", "third party api"] },
  "realtime":             { price: 1500, keywords: ["real-time", "realtime", "websocket", "live data", "streaming", "socket"] },
  // saas: verhoogd €5000 → €7500
  "saas":                 { price: 7500, keywords: ["saas", "multi-tenant", "white-label", "whitelabel", "multi tenant"] },
};

const INTEGRATION_PRICES: Record<string, { price: number; keywords: string[] }> = {
  // shopify: verhoogd €500 → €1000 (orders, products, inventory sync)
  "shopify":      { price: 1000, keywords: ["shopify"] },
  // magento: WooCommerce verwijderd uit label maar keywords behouden voor matching
  "magento":      { price: 1500, keywords: ["magento", "woocommerce", "woo"] },
  "klaviyo":      { price: 300,  keywords: ["klaviyo", "mailchimp", "sendgrid", "email marketing"] },
  "meta":         { price: 500,  keywords: ["meta", "facebook", "instagram api", "tiktok"] },
  "google":       { price: 400,  keywords: ["google ads", "ga4", "google analytics", "gtm"] },
  "hubspot":      { price: 750,  keywords: ["hubspot"] },
  // salesforce: verhoogd €1500 → €2500
  "salesforce":   { price: 2500, keywords: ["salesforce"] },
  // erp: verhoogd €1500 → €2500 (boekhoudintegraties complex)
  "erp":          { price: 2500, keywords: ["erp", "exact", "twinfield", "sap", "accounting"] },
  "marketplace":  { price: 1000, keywords: ["bol.com", "amazon", "etsy", "marketplace"] },
  "whatsapp":     { price: 500,  keywords: ["whatsapp", "slack", "teams", "discord integration"] },
  // custom-api: verhoogd €1000 → €1500
  "custom-api":   { price: 1500, keywords: ["custom api", "api koppeling", "webhook", "zapier", "make.com"] },
};

const TIMELINE_SURCHARGE: Record<string, number> = {
  "asap":       0.25,
  "1-2-weeks":  0.15,
  "2-4-weeks":  0.0,
  // geen kortingen meer op langere timelines (Pim: niet aanmoedigen)
  "1-2-months": 0.0,
  "flexible":   0.0,
};

// Pim's prijzen zijn al client-facing; geen extra buffer meer.
// Marge zit verwerkt in BASE_PRICES + FEATURE_PRICES.
const MARGIN_BUFFER = 0;
const MIN_PRICE = 95;             // landing page = laagste tier
const HOURLY_RATE_EXTERN = 125;   // extern uurtarief (verhoogd van €100)
const HOURLY_RATE_INTERN = 20;    // intern builder uurtarief
const DEV_PAYOUT_PCT = 0.20;      // dev payout 20%

// Delivery weeks by project type (base, before feature count adjustment)
const BASE_DELIVERY: Record<string, string> = {
  "chatbot-embedded":        "0-1",
  "chatbot-basic":           "0-1",
  "chatbot-standard":        "1-2",
  "chatbot-advanced":        "2-4",
  "chatbot-ops-replacement": "4-8",
  "chatbot-enterprise":      "4-8",
  "chatbot-2d-animated":     "2-3",
  "chatbot-3d-animated":     "4-6",
  "chatbot-voice-only":      "1-2",
  "chatbot":                 "0-1",
  "dashboard-public":        "1-2",
  "dashboard":               "1-2",
  "dashboard-private-api":   "3-5",
  "landing-page":            "0-1",
  "website":                 "1-2",
  "website-cms":             "2-3",
  "website-multilang":       "1-2",
  "website-multilang-cms":   "2-4",
  "flow-simple":             "0-1",
  "flow-complex":            "1-2",
  "flow-ai-workflow":        "2-3",
  "simple-automation":       "0-1",
  "mobile-app-simple":       "3-5",
  "mobile-app-full":         "6-10",
  "mobile-app":              "3-5",
  "ai-content-generator":    "2-3",
  "facility-services-tool":  "8-16",
  "webshop":                 "4-6",
  "enterprise":              "8-16",
};

interface EstimateRequest {
  projectType: string;
  description: string;
  timeline: string;
  features?: string[];        // structured feature keys from ai-prefill
  integrations?: string[];    // structured integration keys from ai-prefill
  recommendations?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: EstimateRequest = await req.json();
    const descLower = (body.description || "").toLowerCase();

    // Basisprijs
    const typeInfo = BASE_PRICES[body.projectType] || BASE_PRICES["dashboard"];

    // Features - gebruik gestructureerde keys van ai-prefill als beschikbaar,
    // anders keyword scan als fallback
    let featureTotal = 0;
    const detectedFeatures: string[] = [];
    const structuredFeatures = body.features ?? [];
    const structuredIntegrations = body.integrations ?? [];
    // If the caller sent features/integrations fields at all (even empty arrays),
    // trust that classification and skip keyword fallback to avoid false positives
    // like "chatbot" → "chat" feature (+€1500).
    const useStructured = body.features !== undefined || body.integrations !== undefined;

    if (useStructured) {
      // Gestructureerde input: exact de opgegeven features
      for (const key of structuredFeatures) {
        const feature = FEATURE_PRICES[key];
        if (feature) {
          featureTotal += feature.price;
          detectedFeatures.push(`+€${feature.price.toLocaleString()}`);
        }
      }
    } else {
      // Fallback: keyword scan op description (alleen als geen structured input)
      for (const [, feature] of Object.entries(FEATURE_PRICES)) {
        if (feature.keywords.some((kw) => descLower.includes(kw))) {
          featureTotal += feature.price;
          detectedFeatures.push(`+€${feature.price.toLocaleString()}`);
        }
      }
    }

    // Integraties
    let integrationTotal = 0;
    const detectedIntegrations: string[] = [];

    if (useStructured) {
      for (const key of structuredIntegrations) {
        const integ = INTEGRATION_PRICES[key];
        if (integ) {
          integrationTotal += integ.price;
          detectedIntegrations.push(`+€${integ.price.toLocaleString()}`);
        }
      }
    } else {
      for (const [, integ] of Object.entries(INTEGRATION_PRICES)) {
        if (integ.keywords.some((kw) => descLower.includes(kw))) {
          integrationTotal += integ.price;
          detectedIntegrations.push(`+€${integ.price.toLocaleString()}`);
        }
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

    // Delivery estimate - op basis van projecttype + feature count, niet prijs
    const totalFeatureCount = structuredFeatures.length + structuredIntegrations.length;
    let deliveryWeeks = BASE_DELIVERY[body.projectType] ?? "2-4";
    // Veel features/integraties → een stap hoger
    if (totalFeatureCount >= 5 && body.projectType === "simple-automation") {
      deliveryWeeks = "2-3";
    } else if (totalFeatureCount >= 8) {
      // Parse de range en verhoog
      const parts = deliveryWeeks.split("-").map(Number);
      if (parts.length === 2) {
        deliveryWeeks = `${parts[0] + 1}-${parts[1] + 2}`;
      }
    }

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
