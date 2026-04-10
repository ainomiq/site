import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl, normalizeUrl } from "@/lib/scraper";
import { detectTechnologies } from "@/lib/tech-detector";
import type { SiteAnalysis } from "@/lib/analysis-types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawUrl = body.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let url: string;
    try {
      url = normalizeUrl(rawUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const data = await scrapeUrl(url);
    const technologies = detectTechnologies(data);

    const ecommercePlatforms = new Set([
      "Shopify",
      "WooCommerce",
      "Magento",
      "BigCommerce",
      "PrestaShop",
      "Lightspeed",
      "CCV Shop",
      "Mijnwebwinkel",
      "Etsy",
    ]);
    const detectedEcommercePlatform = technologies.some(
      (t) => t.category === "platform" && ecommercePlatforms.has(t.name)
    );
    const hasEcommerce =
      data.ecommerceSignals.productCount > 0 ||
      data.ecommerceSignals.sitemapCartOrCheckoutUrls > 0 ||
      data.ecommerceSignals.hasAddToCartButtons ||
      (detectedEcommercePlatform &&
        data.ecommerceSignals.hasCartOrCheckoutLinks);

    const adCount = technologies.filter((t) => t.category === "ads").length;
    const emailCount = technologies.filter((t) => t.category === "email").length;
    const analyticsCount = technologies.filter((t) => t.category === "analytics").length;
    const otherTechCount = technologies.filter((t) => t.category === "other").length;
    const pageCount = Math.max(data.pageCount, data.pageLinks.length);
    const productCount = data.ecommerceSignals.productCount;
    const estimatedScale: SiteAnalysis["estimatedScale"] =
      pageCount >= 1000 ||
      productCount >= 100 ||
      adCount >= 3 ||
      (emailCount >= 2 && analyticsCount >= 2) ||
      otherTechCount >= 8
        ? "large"
        : pageCount >= 50 || productCount >= 10 || hasEcommerce || adCount >= 1 || emailCount >= 1
          ? "medium"
          : "small";

    const analysis: SiteAnalysis = {
      url,
      title: data.title,
      description: data.description,
      favicon: data.favicon,
      technologies,
      hasEcommerce,
      estimatedScale,
      products: data.products,
      priceRange: data.priceRange,
      currency: data.currency,
      faqItems: data.faqItems,
      pageCount,
      pageLinks: data.pageLinks.slice(0, 50),
      socialPresence: Object.keys(data.socialLinks),
      socialLinks: data.socialLinks,
      contactEmail: data.contactInfo.email,
      contactPhone: data.contactInfo.phone,
      bodyTextSummary: data.bodyText,
    };

    return NextResponse.json({ analysis });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to analyze site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
