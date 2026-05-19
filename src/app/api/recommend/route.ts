import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

type BusinessType = "ecommerce" | "service" | "hybrid";
type Vertical =
  | "ecommerce"
  | "restaurant"
  | "hotel"
  | "physical_retail"
  | "beauty_wellness"
  | "healthcare"
  | "education"
  | "real_estate"
  | "logistics"
  | "local_service"
  | "b2b_service"
  | "franchise"
  | "general_service";

type ServiceRecommendation =
  | {
      id: string;
      name: string;
      savingsPercent: number;
      description: string;
      relevance: "high" | "medium" | "low";
    }
  | {
      id: string;
      name: string;
      hoursPerWeek: number;
      description: string;
      relevance: "high" | "medium" | "low";
    };

interface Recommendation {
  businessType: BusinessType;
  vertical: Vertical;
  businessSummary: string;
  services: ServiceRecommendation[];
  summary: string;
  plan: "App" | "Custom Solutions";
  primaryCta: "app" | "consultation";
}

function textForClassification(analysis?: SiteAnalysis, manual?: ManualAnswers): string {
  return [
    analysis?.title,
    analysis?.description,
    analysis?.bodyTextSummary,
    analysis?.products.map((product) => product.name).join(" "),
    manual?.industry,
    manual?.description,
    manual?.businessType,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function classifyBusiness(analysis?: SiteAnalysis, manual?: ManualAnswers): { businessType: BusinessType; vertical: Vertical } {
  const text = textForClassification(analysis, manual);
  const isEcommerce =
    Boolean(analysis?.hasEcommerce) ||
    Boolean(analysis && analysis.products.length > 0) ||
    manual?.businessType === "ecommerce";

  if (isEcommerce) return { businessType: "ecommerce", vertical: "ecommerce" };
  if (includesAny(text, ["hotel", "rooms", "kamers", "overnight", "stay", "booking", "check-in", "check in", "guest", "accommodation", "boutique hotel", "bed and breakfast", "b&b"])) {
    return { businessType: "service", vertical: "hotel" };
  }
  if (includesAny(text, ["restaurant", "cafe", "café", "bistro", "bar ", "brasserie", "menu", "dining", "tafel reserveren", "reserve a table", "takeaway", "bezorgen"])) {
    return { businessType: "service", vertical: "restaurant" };
  }
  if (includesAny(text, ["salon", "barber", "kapper", "spa", "wellness", "beauty", "nails", "massage", "treatment", "appointment"])) {
    return { businessType: "service", vertical: "beauty_wellness" };
  }
  if (includesAny(text, ["clinic", "dental", "dentist", "doctor", "healthcare", "care", "patient", "praktijk", "fysiotherapie", "physio", "therapie"])) {
    return { businessType: "service", vertical: "healthcare" };
  }
  if (includesAny(text, ["school", "education", "academy", "course", "training", "students", "learning", "opleiding", "cursus"])) {
    return { businessType: "service", vertical: "education" };
  }
  if (includesAny(text, ["real estate", "makelaar", "property", "properties", "housing", "homes", "apartments", "rental", "vastgoed"])) {
    return { businessType: "service", vertical: "real_estate" };
  }
  if (includesAny(text, ["logistics", "transport", "shipping", "warehouse", "fulfilment", "fulfillment", "delivery", "fleet", "koerier"])) {
    return { businessType: "service", vertical: "logistics" };
  }
  if (includesAny(text, ["franchise", "locations", "vestigingen", "multi-location", "multiple locations"])) {
    return { businessType: "service", vertical: "franchise" };
  }
  if (includesAny(text, ["store", "winkel", "showroom", "opening hours", "openingstijden", "visit us", "in-store", "physical store"])) {
    return { businessType: "service", vertical: "physical_retail" };
  }
  if (includesAny(text, ["consulting", "agency", "software", "b2b", "businesses", "enterprise", "dashboard", "automation", "marketing agency", "accounting", "law firm"])) {
    return { businessType: "service", vertical: "b2b_service" };
  }
  if (includesAny(text, ["cleaning", "maintenance", "repair", "installation", "catering", "facility", "landscaping", "plumber", "electrician", "service area"])) {
    return { businessType: "service", vertical: "local_service" };
  }
  return { businessType: "service", vertical: "general_service" };
}

function serviceSet(vertical: Vertical): ServiceRecommendation[] {
  const sets: Record<Vertical, ServiceRecommendation[]> = {
    ecommerce: [
      { id: "support", name: "24/7 Support", savingsPercent: 45, description: "Automate customer questions about orders, returns, product fit, and delivery while keeping human escalation available.", relevance: "high" },
      { id: "performance", name: "Precise Performance", savingsPercent: 38, description: "Improve ad testing and campaign decisions using the store, product, and tracking data already available.", relevance: "high" },
      { id: "email", name: "Mail Engine", savingsPercent: 35, description: "Create and optimize flows for welcome, cart recovery, post-purchase, and retention campaigns.", relevance: "high" },
      { id: "inventory", name: "Smart Inventory", savingsPercent: 30, description: "Predict stock pressure and reorder moments from product catalog and sales patterns.", relevance: "medium" },
    ],
    restaurant: [
      { id: "reservations", name: "Reservation Assistant", hoursPerWeek: 10, description: "Answer table requests, opening-hour questions, menu questions, and booking changes automatically through web or WhatsApp.", relevance: "high" },
      { id: "operations", name: "Daily Operations Dashboard", hoursPerWeek: 6, description: "Bring reservations, reviews, peak moments, and guest questions into one simple operating view.", relevance: "high" },
      { id: "marketing", name: "Local Marketing Engine", hoursPerWeek: 4, description: "Turn menus, events, and seasonal specials into posts, emails, and campaigns without manual content work.", relevance: "medium" },
      { id: "process", name: "Staff Workflow Automation", hoursPerWeek: 5, description: "Automate repeated admin such as shift reminders, supplier notes, and internal checklists.", relevance: "medium" },
    ],
    hotel: [
      { id: "concierge", name: "Guest Concierge", hoursPerWeek: 14, description: "Handle guest questions, check-in information, local tips, upgrades, and booking changes before the front desk gets involved.", relevance: "high" },
      { id: "booking", name: "Booking Assistant", hoursPerWeek: 9, description: "Qualify reservation inquiries and route guests to the right room, package, or direct booking flow.", relevance: "high" },
      { id: "operations", name: "Housekeeping Dashboard", hoursPerWeek: 8, description: "Coordinate room status, guest requests, and maintenance signals in one operational view.", relevance: "medium" },
      { id: "reviews", name: "Review & Upsell Automation", hoursPerWeek: 5, description: "Automatically follow up with guests for reviews, upgrades, repeat stays, and local offers.", relevance: "medium" },
    ],
    physical_retail: [
      { id: "assistant", name: "Store Assistant", hoursPerWeek: 8, description: "Answer product availability, opening hours, location, and service questions before customers call or visit.", relevance: "high" },
      { id: "inventory", name: "Stock Dashboard", hoursPerWeek: 7, description: "Create a clearer view of stock, popular items, reorder moments, and store performance.", relevance: "high" },
      { id: "loyalty", name: "Loyalty Automation", hoursPerWeek: 4, description: "Turn repeat customers into segmented campaigns and simple loyalty flows.", relevance: "medium" },
      { id: "marketing", name: "Local Campaign Engine", hoursPerWeek: 4, description: "Generate local offers and social content from store updates and seasonal products.", relevance: "medium" },
    ],
    beauty_wellness: [
      { id: "booking", name: "Appointment Assistant", hoursPerWeek: 10, description: "Handle appointment questions, treatment matching, reminders, and rescheduling automatically.", relevance: "high" },
      { id: "followup", name: "Client Follow-up Engine", hoursPerWeek: 5, description: "Send aftercare, repeat-booking nudges, and personalized offers based on treatment history.", relevance: "high" },
      { id: "marketing", name: "Content & Offers", hoursPerWeek: 4, description: "Turn treatments, results, and promotions into consistent posts and campaigns.", relevance: "medium" },
      { id: "operations", name: "Salon Dashboard", hoursPerWeek: 5, description: "Track demand, no-shows, popular treatments, and staff planning from one overview.", relevance: "medium" },
    ],
    healthcare: [
      { id: "intake", name: "Patient Intake Assistant", hoursPerWeek: 10, description: "Collect patient questions, appointment requests, and intake details before the team responds.", relevance: "high" },
      { id: "scheduling", name: "Scheduling Automation", hoursPerWeek: 8, description: "Reduce repeated planning work around appointments, reminders, cancellations, and follow-ups.", relevance: "high" },
      { id: "knowledge", name: "Care Knowledge Base", hoursPerWeek: 5, description: "Answer common practical questions from the website content without exposing sensitive medical advice.", relevance: "medium" },
      { id: "process", name: "Admin Workflow Automation", hoursPerWeek: 6, description: "Automate recurring internal tasks such as forms, routing, and status updates.", relevance: "medium" },
    ],
    education: [
      { id: "student_assistant", name: "Student Assistant", hoursPerWeek: 9, description: "Answer course, enrollment, schedule, and practical questions automatically.", relevance: "high" },
      { id: "enrollment", name: "Enrollment Automation", hoursPerWeek: 7, description: "Guide prospective students from interest to the right course or intake flow.", relevance: "high" },
      { id: "content", name: "Learning Content Engine", hoursPerWeek: 5, description: "Turn course material and FAQs into helpful content, email flows, and student updates.", relevance: "medium" },
      { id: "dashboard", name: "Operations Dashboard", hoursPerWeek: 5, description: "Track leads, applications, course demand, and support questions from one dashboard.", relevance: "medium" },
    ],
    real_estate: [
      { id: "lead_qualifier", name: "Lead Qualification Assistant", hoursPerWeek: 9, description: "Qualify buyer, seller, and rental leads before the team spends time on follow-up.", relevance: "high" },
      { id: "viewings", name: "Viewing Scheduler", hoursPerWeek: 7, description: "Automate viewing requests, reminders, property questions, and handoffs to agents.", relevance: "high" },
      { id: "property_dashboard", name: "Property Dashboard", hoursPerWeek: 5, description: "Centralize listings, inquiries, lead status, and campaign performance.", relevance: "medium" },
      { id: "marketing", name: "Listing Content Engine", hoursPerWeek: 4, description: "Generate listing descriptions, social posts, and follow-up emails from property data.", relevance: "medium" },
    ],
    logistics: [
      { id: "tracking", name: "Tracking Assistant", hoursPerWeek: 12, description: "Answer shipment, delivery, and status questions automatically across customer channels.", relevance: "high" },
      { id: "planning", name: "Planning Dashboard", hoursPerWeek: 10, description: "Combine orders, routes, capacity, and exceptions into a clear operational view.", relevance: "high" },
      { id: "exceptions", name: "Exception Automation", hoursPerWeek: 7, description: "Route delays, missing data, and failed deliveries to the right person automatically.", relevance: "medium" },
      { id: "reporting", name: "Client Reporting", hoursPerWeek: 5, description: "Generate status updates and client reports without manual spreadsheet work.", relevance: "medium" },
    ],
    local_service: [
      { id: "lead_intake", name: "Lead Intake Assistant", hoursPerWeek: 9, description: "Collect requests, qualify jobs, answer service questions, and prepare follow-up automatically.", relevance: "high" },
      { id: "scheduling", name: "Scheduling Automation", hoursPerWeek: 8, description: "Automate appointment planning, reminders, cancellations, and technician handoffs.", relevance: "high" },
      { id: "quotes", name: "Quote & Invoice Flow", hoursPerWeek: 6, description: "Turn website requests into structured quote or invoice workflows.", relevance: "medium" },
      { id: "dashboard", name: "Operations Dashboard", hoursPerWeek: 5, description: "Track requests, open jobs, team workload, and customer follow-up in one place.", relevance: "medium" },
    ],
    b2b_service: [
      { id: "lead_qualifier", name: "Lead Qualification Assistant", hoursPerWeek: 8, description: "Qualify inbound leads, answer first questions, and route serious opportunities to sales.", relevance: "high" },
      { id: "crm", name: "CRM Automation", hoursPerWeek: 7, description: "Sync website requests, notes, follow-ups, and proposal stages into a reliable workflow.", relevance: "high" },
      { id: "proposal", name: "Proposal Generator", hoursPerWeek: 6, description: "Generate first-draft proposals or scopes from intake answers and service pages.", relevance: "medium" },
      { id: "dashboard", name: "Business Dashboard", hoursPerWeek: 5, description: "Bring leads, clients, tasks, and delivery status into one operating layer.", relevance: "medium" },
    ],
    franchise: [
      { id: "multi_location", name: "Multi-location Dashboard", hoursPerWeek: 14, description: "Compare performance, support load, and operational signals across every location.", relevance: "high" },
      { id: "support", name: "Central Support Assistant", hoursPerWeek: 10, description: "Answer customer and franchisee questions consistently across locations.", relevance: "high" },
      { id: "quality", name: "Quality Control Automation", hoursPerWeek: 8, description: "Standardize checklists, incident reporting, and follow-up across branches.", relevance: "medium" },
      { id: "marketing", name: "Local Campaign Automation", hoursPerWeek: 6, description: "Create location-specific campaigns while keeping brand control centralized.", relevance: "medium" },
    ],
    general_service: [
      { id: "assistant", name: "Business Assistant", hoursPerWeek: 8, description: "Answer customer questions, collect requests, and route leads to the right person.", relevance: "high" },
      { id: "automation", name: "Workflow Automation", hoursPerWeek: 7, description: "Automate repeated admin across intake, follow-up, planning, and reporting.", relevance: "high" },
      { id: "dashboard", name: "Business Dashboard", hoursPerWeek: 5, description: "Create one overview for customer requests, operations, and growth metrics.", relevance: "medium" },
      { id: "content", name: "Content Engine", hoursPerWeek: 4, description: "Turn website content and service updates into useful posts, emails, and follow-ups.", relevance: "medium" },
    ],
  };
  return sets[vertical];
}

function fallbackRecommendation(analysis?: SiteAnalysis, manual?: ManualAnswers): Recommendation {
  const { businessType, vertical } = classifyBusiness(analysis, manual);
  const title = analysis?.title || manual?.company || "This business";
  const businessSummary =
    businessType === "ecommerce"
      ? `${title} appears to be an e-commerce business with products, customer questions, and operational workflows that can be automated through the Ainomiq App.`
      : `${title} appears to be a ${vertical.replace(/_/g, " ")} business where Ainomiq can automate customer communication, planning, and recurring operations.`;

  return {
    businessType,
    vertical,
    businessSummary,
    services: serviceSet(vertical),
    summary:
      businessType === "ecommerce"
        ? "Because this looks like an e-commerce business, the best first step is the Ainomiq App. It can improve support, marketing, performance, and stock workflows without needing a fully custom build first."
        : "Because this business depends on customer requests, planning, and repeated operational work, a custom Ainomiq system is the best fit. The strongest starting point is an assistant plus workflows that remove manual follow-up from the team.",
    plan: businessType === "ecommerce" ? "App" : "Custom Solutions",
    primaryCta: businessType === "ecommerce" ? "app" : "consultation",
  };
}

const SYSTEM_PROMPT = `You are Ainomiq's advisor. You analyze a business website and recommend the RIGHT Ainomiq product line.

STEP 1 - CLASSIFY THE BUSINESS:
Read the site title, description, body text, technologies, and products carefully. Determine what type of business this is:
- "ecommerce" - Online store selling physical/digital products (webshop, DTC brand, marketplace seller). Must have products, a cart, or an e-commerce platform.
- "service" - Service company or local business (restaurant, hotel, physical store, cleaning, catering, facility management, consulting, hospitality, healthcare, education, logistics, construction, real estate, etc.)
- "hybrid" - Both products AND services

Also determine vertical. Use one of:
ecommerce, restaurant, hotel, physical_retail, beauty_wellness, healthcare, education, real_estate, logistics, local_service, b2b_service, franchise, general_service.

STEP 2 - RECOMMEND THE RIGHT PRODUCT LINE:

IF businessType is "ecommerce" → recommend plan "App" with these 4 services:
1. id: "support", name: "24/7 Support" - Automated customer service handling returns, tracking, FAQs.
2. id: "performance", name: "Precise Performance" - Automated ad management across channels.
3. id: "email", name: "Mail Engine" - Automated email marketing flows and campaigns.
4. id: "inventory", name: "Smart Inventory" - Stock predictions and reorder alerts.

IF businessType is "service" or "hybrid" → recommend plan "Custom Solutions" with these 4 services:
Choose 4 services that match the detected vertical. Examples:
- restaurant: Reservation Assistant, Daily Operations Dashboard, Local Marketing Engine, Staff Workflow Automation.
- hotel: Guest Concierge, Booking Assistant, Housekeeping Dashboard, Review & Upsell Automation.
- physical_retail: Store Assistant, Stock Dashboard, Loyalty Automation, Local Campaign Engine.
- local_service: Lead Intake Assistant, Scheduling Automation, Quote & Invoice Flow, Operations Dashboard.
- b2b_service: Lead Qualification Assistant, CRM Automation, Proposal Generator, Business Dashboard.
Use specific names that make sense for the sector, not generic placeholders.

REALISTIC DATA - THIS IS CRITICAL:
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
- Descriptions must be 1 sentence, SPECIFIC to their business type and industry - not generic.
- businessSummary: 1 sentence about what the business does based on what you read.
- summary: 2-3 sentences explaining WHY you recommend this plan for them specifically.
- E-commerce should send people to the Ainomiq App. All other verticals should recommend a custom consultation/build.
- Respond with ONLY valid JSON, no markdown, no code fences.

JSON format for E-COMMERCE:
{"businessType":"ecommerce","vertical":"ecommerce","businessSummary":"STRING","services":[{"id":"support","name":"24/7 Support","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"performance","name":"Precise Performance","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"email","name":"Mail Engine","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"inventory","name":"Smart Inventory","savingsPercent":NUMBER,"description":"STRING","relevance":"high|medium|low"}],"summary":"STRING","plan":"App","primaryCta":"app"}

JSON format for SERVICE/HYBRID:
{"businessType":"service","vertical":"restaurant|hotel|physical_retail|beauty_wellness|healthcare|education|real_estate|logistics|local_service|b2b_service|franchise|general_service","businessSummary":"STRING","services":[{"id":"STRING","name":"STRING","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"STRING","name":"STRING","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"STRING","name":"STRING","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"},{"id":"STRING","name":"STRING","hoursPerWeek":NUMBER,"description":"STRING","relevance":"high|medium|low"}],"summary":"STRING","plan":"Custom Solutions","primaryCta":"consultation"}`;

export async function POST(request: NextRequest) {
  let fallback: Recommendation | null = null;
  try {
    const body = await request.json();
    const analysis: SiteAnalysis | undefined = body.analysis;
    const manual: ManualAnswers | undefined = body.manual;
    fallback = fallbackRecommendation(analysis, manual);

    let userPrompt: string;

    if (analysis) {
      const techList = analysis.technologies
        .map((t) => `${t.name} (${t.category}, ${t.confidence} confidence)`)
        .join(", ");

      const productList = analysis.products
        .slice(0, 15)
        .map((p) => `${p.name}${p.price ? ` - ${p.price}` : ""}`)
        .join(", ");

      const hasAds = analysis.technologies.some((t) => t.category === "ads");
      const hasEmail = analysis.technologies.some((t) => t.category === "email");
      const adTechs = analysis.technologies.filter((t) => t.category === "ads").map((t) => t.name).join(", ");
      const emailTechs = analysis.technologies.filter((t) => t.category === "email").map((t) => t.name).join(", ");

      userPrompt = `SCAN RESULTS - only reference data listed here, nothing else:

Site: ${analysis.url}
Title: ${analysis.title}
Description: ${analysis.description}

DETECTED TECHNOLOGIES (only these exist - do not mention others):
${techList || "NONE - no technologies were detected on this site"}

AD PLATFORMS DETECTED: ${hasAds ? adTechs : "NONE - no ad pixels or ad platforms were found"}
EMAIL TOOLS DETECTED: ${hasEmail ? emailTechs : "NONE - no email marketing tools were found"}
E-COMMERCE PLATFORM: ${analysis.hasEcommerce ? "Yes" : "No e-commerce platform detected"}
Scale estimate: ${analysis.estimatedScale}

PRODUCTS FOUND (${analysis.products.length}): ${productList || "NONE - no products were found on the scanned page"}
Price range: ${analysis.priceRange ? `${analysis.currency} ${analysis.priceRange.min} - ${analysis.priceRange.max}` : "Unknown"}

FAQ items (${analysis.faqItems.length}): ${analysis.faqItems.slice(0, 5).join(" | ") || "None"}
Pages: ${analysis.pageCount}
Social channels: ${analysis.socialPresence.join(", ") || "None detected"}
Contact: ${analysis.contactEmail || "none"}, ${analysis.contactPhone || "none"}
Heuristic classification: businessType=${fallback.businessType}, vertical=${fallback.vertical}

BODY TEXT (use this to understand what kind of business this is):
${analysis.bodyTextSummary || "No body text available"}

IMPORTANT: If a technology is listed as "NONE", do NOT claim they use it. Only reference what is listed above.
First determine the exact vertical, then recommend either the Ainomiq App for e-commerce or a custom build for every other vertical.`;
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
      return NextResponse.json(fallback);
    }

    const recommendation = { ...fallback, ...JSON.parse(jsonMatch[0]) };
    return NextResponse.json(recommendation);
  } catch (error) {
    return NextResponse.json(fallback ?? fallbackRecommendation(undefined, undefined));
  }
}
