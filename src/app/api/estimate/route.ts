import { NextRequest, NextResponse } from "next/server";

/**
 * Ainomiq Pricing Calculator - waterdicht systeem
 * 
 * Basisprijzen per type (bevestigd door Pim 2026-04-16):
 * - Simple automation: EUR 1.750
 * - Website: EUR 5.000
 * - Chatbot: EUR 10.000
 * - Dashboard / portal: EUR 7.500
 * - Webshop: EUR 15.000
 * - iOS / Android app: EUR 12.500
 * - Enterprise / full custom: EUR 25.000
 * 
 * Regels:
 * - Spoed (ASAP): +25%
 * - Liever meer berekenen dan te weinig
 * - AI analyseert complexity en past prijs aan
 * - Minimum: EUR 1.750
 */

const BASE_PRICES: Record<string, { base: number; label: string }> = {
  "simple-automation":  { base: 1750,  label: "Simple Automation" },
  "website":            { base: 5000,  label: "Website" },
  "chatbot":            { base: 10000, label: "AI Chatbot" },
  "dashboard":          { base: 7500,  label: "Dashboard / Portal" },
  "webshop":            { base: 15000, label: "Webshop" },
  "mobile-app":         { base: 12500, label: "iOS / Android App" },
  "enterprise":         { base: 25000, label: "Enterprise / Full Custom" },
};

// Complexity keywords that increase price (scored by weight)
const COMPLEXITY_SIGNALS: { keywords: string[]; weight: number; label: string }[] = [
  // Heavy complexity (+40-60%)
  { keywords: ["machine learning", "ml model", "training data", "neural network", "computer vision"], weight: 0.6, label: "ML/AI training" },
  { keywords: ["real-time", "realtime", "websocket", "live data", "streaming"], weight: 0.4, label: "Real-time features" },
  { keywords: ["multi-tenant", "saas", "white-label", "whitelabel"], weight: 0.5, label: "Multi-tenant/SaaS" },
  { keywords: ["payment", "payments", "stripe", "ideal", "checkout", "billing", "subscription"], weight: 0.35, label: "Payment processing" },
  
  // Medium complexity (+20-35%)
  { keywords: ["user management", "roles", "permissions", "admin panel", "rbac"], weight: 0.3, label: "User management & roles" },
  { keywords: ["notifications", "push notifications", "email notifications", "sms", "alerts"], weight: 0.2, label: "Notification system" },
  { keywords: ["reporting", "reports", "analytics", "charts", "graphs", "dashboard"], weight: 0.25, label: "Reporting & analytics" },
  { keywords: ["search", "filtering", "filters", "faceted search", "elasticsearch"], weight: 0.2, label: "Advanced search" },
  { keywords: ["multi-language", "multilingual", "i18n", "translations", "localization"], weight: 0.25, label: "Multi-language" },
  { keywords: ["file upload", "image upload", "media management", "cdn", "storage"], weight: 0.2, label: "Media management" },
  
  // Integration complexity (+15-25%)
  { keywords: ["shopify", "woocommerce", "magento"], weight: 0.2, label: "E-commerce integration" },
  { keywords: ["klaviyo", "mailchimp", "sendgrid", "email marketing"], weight: 0.15, label: "Email platform integration" },
  { keywords: ["meta", "facebook", "instagram", "social media api"], weight: 0.2, label: "Social media integration" },
  { keywords: ["google ads", "google analytics", "ga4", "gtm"], weight: 0.15, label: "Google integration" },
  { keywords: ["crm", "hubspot", "salesforce", "pipedrive"], weight: 0.2, label: "CRM integration" },
  { keywords: ["erp", "sap", "exact", "twinfield", "accounting"], weight: 0.25, label: "ERP/Accounting" },
  { keywords: ["scraping", "scrape", "crawler", "web scraping"], weight: 0.25, label: "Web scraping" },
  { keywords: ["google sheets", "airtable", "spreadsheet", "notion"], weight: 0.15, label: "Spreadsheet sync" },
  { keywords: ["bol.com", "amazon", "marketplace", "etsy"], weight: 0.25, label: "Marketplace integration" },
  
  // Scale complexity (+15-30%)
  { keywords: ["10000 users", "high traffic", "scalable", "load balancing", "caching"], weight: 0.3, label: "High-scale architecture" },
  { keywords: ["automated pricing", "pricing formula", "dynamic pricing"], weight: 0.2, label: "Dynamic pricing" },
  { keywords: ["inventory", "stock", "warehouse", "fulfillment"], weight: 0.2, label: "Inventory management" },
  { keywords: ["booking", "reservation", "calendar", "scheduling", "appointments"], weight: 0.25, label: "Booking system" },
  { keywords: ["custom design", "figma", "branded", "design system"], weight: 0.15, label: "Custom design" },
];

// Rush multipliers
const TIMELINE_MULTIPLIERS: Record<string, number> = {
  "asap":       1.25,  // +25% spoed
  "1-2-weeks":  1.15,  // +15%
  "2-4-weeks":  1.0,   // standaard
  "1-2-months": 1.0,   // geen korting
  "flexible":   1.0,   // geen korting
};

// Minimum price
const MIN_PRICE = 1750;

interface EstimateRequest {
  projectType: string;
  description: string;
  timeline: string;
  features?: string[];
  recommendations?: string[];
  integrations?: string[];
  featureFlags?: string[];
  numPages?: string;
  numUsers?: string;
  designLevel?: string;
  hasExistingDesign?: string;
  languages?: string;
  hostingPref?: string;
  ongoingSupport?: string;
  contentReady?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EstimateRequest = await req.json();

    const typeInfo = BASE_PRICES[body.projectType];
    if (!typeInfo) {
      // Fallback: find closest match or use dashboard as default
      const fallback = BASE_PRICES["dashboard"];
      return calculateEstimate(body, fallback, "Dashboard / Portal");
    }

    return calculateEstimate(body, typeInfo, typeInfo.label);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

function calculateEstimate(
  body: EstimateRequest,
  typeInfo: { base: number; label: string },
  label: string
) {
  const descLower = (body.description || "").toLowerCase();
  
  // Calculate complexity multiplier from keyword analysis
  let complexityMultiplier = 1.0;
  const detectedComplexity: string[] = [];
  
  for (const signal of COMPLEXITY_SIGNALS) {
    if (signal.keywords.some((kw) => descLower.includes(kw))) {
      complexityMultiplier += signal.weight;
      detectedComplexity.push(signal.label);
    }
  }

  // Description length signals more work needed
  const descLen = (body.description || "").trim().length;
  if (descLen > 500) complexityMultiplier += 0.15;
  if (descLen > 800) complexityMultiplier += 0.15;

  // Integration count - each integration adds work
  const intCount = (body.integrations || []).length;
  if (intCount >= 1) complexityMultiplier += intCount * 0.08;
  if (intCount >= 5) complexityMultiplier += 0.15; // complexity of managing many integrations

  // Feature flags - each feature adds scope
  const featCount = (body.featureFlags || []).length;
  if (featCount >= 1) complexityMultiplier += featCount * 0.06;
  if (featCount >= 8) complexityMultiplier += 0.2;
  // Heavy features get extra weight
  const heavyFeatures = ["AI / machine learning", "Payment processing", "Subscription billing", "Booking / scheduling", "Multi-language", "Chat / messaging"];
  for (const hf of heavyFeatures) {
    if ((body.featureFlags || []).includes(hf)) complexityMultiplier += 0.1;
  }

  // Pages / screens
  const pagesMult: Record<string, number> = { "1-5": 0, "6-15": 0.15, "16-30": 0.3, "30+": 0.5 };
  if (body.numPages && pagesMult[body.numPages] !== undefined) complexityMultiplier += pagesMult[body.numPages];

  // Expected users (scale)
  const usersMult: Record<string, number> = { internal: 0, small: 0.05, medium: 0.15, large: 0.3, enterprise: 0.5 };
  if (body.numUsers && usersMult[body.numUsers] !== undefined) complexityMultiplier += usersMult[body.numUsers];

  // Design level
  const designMult: Record<string, number> = { basic: 0, polished: 0.15, premium: 0.35 };
  if (body.designLevel && designMult[body.designLevel] !== undefined) complexityMultiplier += designMult[body.designLevel];

  // No existing design = more work
  const designReadyMult: Record<string, number> = { figma: -0.1, wireframes: 0, examples: 0.1, none: 0.25 };
  if (body.hasExistingDesign && designReadyMult[body.hasExistingDesign] !== undefined) complexityMultiplier += designReadyMult[body.hasExistingDesign];

  // Multi-language
  const langMult: Record<string, number> = { "1": 0, "2-3": 0.2, "4+": 0.4 };
  if (body.languages && langMult[body.languages] !== undefined) complexityMultiplier += langMult[body.languages];

  // Content not ready = more project management
  const contentMult: Record<string, number> = { yes: 0, partial: 0.1, no: 0.2 };
  if (body.contentReady && contentMult[body.contentReady] !== undefined) complexityMultiplier += contentMult[body.contentReady];

  // Selected recommendations add work
  const recCount = (body.recommendations || []).length;
  if (recCount > 0) complexityMultiplier += recCount * 0.08;

  // Spec-based complexity labels
  if (body.numPages === "16-30") detectedComplexity.push("Large scope (16-30 pages)");
  if (body.numPages === "30+") detectedComplexity.push("Complex scope (30+ pages)");
  if (body.numUsers === "large") detectedComplexity.push("Scale: 1K-10K users");
  if (body.numUsers === "enterprise") detectedComplexity.push("Enterprise scale (10K+)");
  if (body.designLevel === "premium") detectedComplexity.push("Premium custom design");
  if (body.hasExistingDesign === "none") detectedComplexity.push("Design from scratch");
  if (body.languages === "2-3") detectedComplexity.push("Multi-language (2-3)");
  if (body.languages === "4+") detectedComplexity.push("Multi-language (4+)");
  if (body.contentReady === "no") detectedComplexity.push("Content creation");
  if (body.ongoingSupport === "standard") detectedComplexity.push("Standard support plan");
  if (body.ongoingSupport === "premium") detectedComplexity.push("Premium support plan");
  const intCount2 = (body.integrations || []).length;
  if (intCount2 >= 3) detectedComplexity.push(`${intCount2} integrations`);
  const featCount2 = (body.featureFlags || []).length;
  if (featCount2 >= 5) detectedComplexity.push(`${featCount2} feature modules`);

  // Cap complexity multiplier at 3.5x for spec-driven estimates
  complexityMultiplier = Math.min(complexityMultiplier, 3.5);

  // Timeline multiplier
  const timelineMult = TIMELINE_MULTIPLIERS[body.timeline] || 1.0;

  // Calculate total
  let total = Math.ceil(typeInfo.base * complexityMultiplier * timelineMult);

  // Round to nearest EUR 250 (professional quoting)
  total = Math.ceil(total / 250) * 250;

  // Enforce minimum
  total = Math.max(total, MIN_PRICE);

  // Estimated delivery weeks
  const deliveryWeeks = total <= 5000 ? "1-2" : total <= 10000 ? "2-3" : total <= 15000 ? "3-5" : total <= 25000 ? "4-8" : "6-12";

  // Estimate monthly costs from specs
  let monthlyCost = 0;
  const feats = body.featureFlags || [];
  const ints = body.integrations || [];
  if (feats.includes("AI / machine learning") || descLower.includes("ai") || descLower.includes("chatbot") || descLower.includes("gpt")) {
    monthlyCost += 49;
  }
  if (body.hostingPref === "ainomiq" || body.projectType === "webshop" || body.projectType === "dashboard" || body.projectType === "mobile-app") {
    monthlyCost += 29;
  }
  if (body.ongoingSupport === "basic") monthlyCost += 49;
  if (body.ongoingSupport === "standard") monthlyCost += 149;
  if (body.ongoingSupport === "premium") monthlyCost += 349;
  if (ints.length >= 3) monthlyCost += 19; // integration monitoring

  // Complexity label
  const complexityLabel = complexityMultiplier <= 1.1 
    ? "Standard" 
    : complexityMultiplier <= 1.4 
      ? "Moderate" 
      : complexityMultiplier <= 1.8 
        ? "Complex" 
        : "Highly Complex";

  return NextResponse.json({
    estimate: {
      total,
      basePrice: typeInfo.base,
      complexityMultiplier: Math.round(complexityMultiplier * 100) / 100,
      complexity: complexityLabel,
      detectedComplexity,
      timelineMultiplier: timelineMult,
      timeline: body.timeline,
      deliveryWeeks,
      projectType: label,
      monthlyCost: monthlyCost > 0 ? monthlyCost : null,
      // Legacy compat
      hours: Math.ceil(total / 50),
      hourlyRate: 50,
      baseCost: total,
      margin: 0,
    },
  });
}
