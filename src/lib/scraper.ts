import * as cheerio from "cheerio";

export interface ScrapedProduct {
  name: string;
  price: string | null;
  image: string | null;
  url: string | null;
}

export interface ScrapedCookie {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite?: string;
}

export interface ScrapedStructuredData {
  organization?: { name?: string; url?: string; logo?: string; email?: string; telephone?: string };
  website?: { name?: string; url?: string };
  business?: { name?: string; email?: string; telephone?: string; address?: string };
  aggregateRating?: { ratingValue?: number; reviewCount?: number; bestRating?: number };
}

export interface EcommerceSignals {
  productCount: number;
  hasAddToCartButtons: boolean;
  hasCartOrCheckoutLinks: boolean;
  sitemapProductUrls: number;
  sitemapCartOrCheckoutUrls: number;
}

export interface ScrapedData {
  title: string;
  description: string;
  favicon: string | null;
  html: string;
  scripts: string[];
  links: string[];
  metas: Record<string, string>;
  products: ScrapedProduct[];
  priceRange: { min: number; max: number } | null;
  currency: string;
  faqItems: string[];
  pageLinks: string[];
  socialLinks: Record<string, string>;
  contactInfo: { email: string | null; phone: string | null };
  bodyText: string;
  responseHeaders: Record<string, string>;
  cookies: ScrapedCookie[];
  robotsTxt: string | null;
  sitemapXml: string | null;
  sitemapUrls: string[];
  pageCount: number;
  metaGenerator: string | null;
  structuredData: ScrapedStructuredData;
  reviews: { ratingValue: number | null; reviewCount: number | null; bestRating: number | null } | null;
  ecommerceSignals: EcommerceSignals;
}

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function resolveUrl(base: string, path: string): string {
  try {
    return new URL(path, base).toString();
  } catch {
    return path;
  }
}

function absoluteInternalPath(base: URL, href: string): string | null {
  try {
    const url = new URL(href, base);
    if (url.origin !== base.origin) return null;
    return `${url.pathname}${url.search}` || "/";
  } catch {
    return null;
  }
}

function headersToRecord(headers: Headers): Record<string, string> {
  const record: Record<string, string> = {};
  headers.forEach((value, key) => {
    record[key.toLowerCase()] = value;
  });
  return record;
}

function getSetCookieHeaders(headers: Headers): string[] {
  const withGetSetCookie = headers as Headers & { getSetCookie?: () => string[] };
  const direct = withGetSetCookie.getSetCookie?.();
  if (direct?.length) return direct;
  const combined = headers.get("set-cookie");
  if (!combined) return [];
  return combined.split(/,(?=\s*[^;,=\s]+=[^;,]+)/).map((cookie) => cookie.trim()).filter(Boolean);
}

function parseCookies(setCookieHeaders: string[]): ScrapedCookie[] {
  return setCookieHeaders
    .map((raw) => {
      const parts = raw.split(";").map((part) => part.trim()).filter(Boolean);
      const [nameValue, ...attributes] = parts;
      const eq = nameValue.indexOf("=");
      if (eq <= 0) return null;

      const cookie: ScrapedCookie = {
        name: nameValue.slice(0, eq),
        value: nameValue.slice(eq + 1),
        secure: false,
        httpOnly: false,
      };

      for (const attr of attributes) {
        const [rawKey, ...rawValue] = attr.split("=");
        const key = rawKey.toLowerCase();
        const value = rawValue.join("=");
        if (key === "domain") cookie.domain = value;
        if (key === "path") cookie.path = value;
        if (key === "expires") cookie.expires = value;
        if (key === "samesite") cookie.sameSite = value;
        if (key === "secure") cookie.secure = true;
        if (key === "httponly") cookie.httpOnly = true;
      }
      return cookie;
    })
    .filter((cookie): cookie is ScrapedCookie => Boolean(cookie));
}

async function fetchText(url: string, timeoutMs: number, accept = "text/plain,*/*;q=0.8"): Promise<string | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { "User-Agent": USER_AGENT, Accept: accept },
      redirect: "follow",
    });
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "";
    if (!/text|xml|json|html/i.test(contentType)) return null;
    return await response.text();
  } catch {
    return null;
  }
}

async function fetchJson(url: string, timeoutMs: number): Promise<unknown | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
      redirect: "follow",
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function parseRobotsSitemaps(robotsTxt: string | null, origin: string): string[] {
  if (!robotsTxt) return [`${origin}/sitemap.xml`];
  const sitemaps = robotsTxt
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*Sitemap:\s*(\S+)/i)?.[1])
    .filter((value): value is string => Boolean(value))
    .map((value) => resolveUrl(origin, value));
  return Array.from(new Set([...sitemaps, `${origin}/sitemap.xml`])).slice(0, 4);
}

function parseSitemapUrls(xml: string | null, base: string): string[] {
  if (!xml) return [];
  const urls = new Set<string>();
  const locRegex = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let match: RegExpExecArray | null;
  while ((match = locRegex.exec(xml)) !== null && urls.size < 5000) {
    urls.add(resolveUrl(base, match[1].trim().replace(/&amp;/g, "&")));
  }
  return Array.from(urls);
}

function flattenJsonLd(value: unknown): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const visit = (item: unknown) => {
    if (!item) return;
    if (Array.isArray(item)) {
      item.forEach(visit);
      return;
    }
    if (typeof item !== "object") return;
    const record = item as Record<string, unknown>;
    out.push(record);
    visit(record["@graph"]);
    visit(record.itemListElement);
    visit(record.item);
  };
  visit(value);
  return out;
}

function readJsonLd($: cheerio.CheerioAPI): Record<string, unknown>[] {
  const entries: Record<string, unknown>[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).text().trim();
    if (!raw) return;
    try {
      entries.push(...flattenJsonLd(JSON.parse(raw)));
    } catch {
      const cleaned = raw.replace(/^\s*<!--/, "").replace(/-->\s*$/, "");
      try {
        entries.push(...flattenJsonLd(JSON.parse(cleaned)));
      } catch {
        // Invalid JSON-LD is common enough that it should not fail scraping.
      }
    }
  });
  return entries;
}

function typeList(entry: Record<string, unknown>): string[] {
  const type = entry["@type"];
  if (Array.isArray(type)) return type.map(String);
  return type ? [String(type)] : [];
}

function stringValue(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return String(value);
  return undefined;
}

function firstString(value: unknown): string | undefined {
  if (Array.isArray(value)) return firstString(value[0]);
  if (typeof value === "object" && value) return stringValue((value as Record<string, unknown>).url);
  return stringValue(value);
}

function extractStructuredData(entries: Record<string, unknown>[]): ScrapedStructuredData {
  const structured: ScrapedStructuredData = {};
  for (const entry of entries) {
    const types = typeList(entry).map((type) => type.toLowerCase());
    if (types.includes("organization")) {
      structured.organization ??= {
        name: stringValue(entry.name),
        url: stringValue(entry.url),
        logo: firstString(entry.logo),
        email: stringValue(entry.email),
        telephone: stringValue(entry.telephone),
      };
    }
    if (types.includes("website")) {
      structured.website ??= { name: stringValue(entry.name), url: stringValue(entry.url) };
    }
    if (types.some((type) => ["localbusiness", "store", "restaurant", "professionalservice"].includes(type))) {
      structured.business ??= {
        name: stringValue(entry.name),
        email: stringValue(entry.email),
        telephone: stringValue(entry.telephone),
        address: typeof entry.address === "string" ? entry.address : undefined,
      };
    }
    const aggregateRating = entry.aggregateRating as Record<string, unknown> | undefined;
    if (aggregateRating && typeof aggregateRating === "object") {
      structured.aggregateRating ??= {
        ratingValue: Number(stringValue(aggregateRating.ratingValue)),
        reviewCount: Number(stringValue(aggregateRating.reviewCount) ?? stringValue(aggregateRating.ratingCount)),
        bestRating: Number(stringValue(aggregateRating.bestRating)),
      };
    }
  }
  return structured;
}

function normalizeEmail(value: string): string | null {
  const email = value
    .replace(/^mailto:/i, "")
    .split("?")[0]
    .trim()
    .toLowerCase();
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(email)) return null;
  if (/\.(?:png|jpe?g|gif|svg|webp|css|js)$/i.test(email)) return null;
  if (/^(?:example|test|noreply|no-reply|donotreply|privacy)@/i.test(email)) return null;
  return email;
}

function extractEmails(text: string): string[] {
  const emails = new Set<string>();
  const regex = /[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const email = normalizeEmail(match[0]);
    if (email) emails.add(email);
  }
  return Array.from(emails);
}

function pickDomainEmail(emails: string[], hostname: string): string | null {
  if (emails.length === 0) return null;
  const hostParts = hostname.replace(/^www\./, "").split(".");
  const root = hostParts.length >= 2 ? hostParts.slice(-2).join(".") : hostname;
  const sameDomain = emails.find((email) => email.endsWith(`@${root}`) || email.endsWith(`.${root}`));
  return sameDomain ?? emails[0] ?? null;
}

function normalizePhone(value: string): string | null {
  const phone = value.replace(/\s+/g, " ").trim();
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) return null;
  return phone;
}

function extractPhones(text: string): string[] {
  const phones = new Set<string>();
  const regex = /(?:\+\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?){2,5}\d{2,4}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const phone = normalizePhone(match[0]);
    if (phone) phones.add(phone);
  }
  return Array.from(phones);
}

function parsePrice(value: string): number | null {
  let raw = value.replace(/[^\d,.-]/g, "");
  if (!raw) return null;
  const comma = raw.lastIndexOf(",");
  const dot = raw.lastIndexOf(".");
  if (comma > dot) raw = raw.replace(/\./g, "").replace(",", ".");
  else raw = raw.replace(/,/g, "");
  const price = Number.parseFloat(raw);
  if (!Number.isFinite(price) || price <= 0 || price > 100000) return null;
  return price;
}

function extractPrices(text: string): number[] {
  const prices: number[] = [];
  const patterns = [
    /(?:€|EUR)\s*(\d{1,3}(?:[.\s]\d{3})*(?:,\d{2})|\d+(?:[.,]\d{2})?)/gi,
    /(\d{1,3}(?:[.\s]\d{3})*(?:,\d{2})|\d+(?:[.,]\d{2})?)\s*(?:€|EUR)\b/gi,
    /(?:\$|USD)\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})|\d+(?:\.\d{2})?)/gi,
    /(?:£|GBP)\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})|\d+(?:\.\d{2})?)/gi,
  ];
  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null && prices.length < 200) {
      const price = parsePrice(match[1]);
      if (price) prices.push(price);
    }
  }
  return prices;
}

function addProduct(products: ScrapedProduct[], seen: Set<string>, product: ScrapedProduct, baseUrl: string) {
  const name = product.name?.replace(/\s+/g, " ").trim();
  if (!name || name.length < 2 || name.length > 180 || products.length >= 50) return;
  const key = name.toLowerCase();
  if (seen.has(key)) return;
  seen.add(key);
  products.push({
    name,
    price: product.price?.replace(/\s+/g, " ").trim() || null,
    image: product.image ? resolveUrl(baseUrl, product.image) : null,
    url: product.url ? resolveUrl(baseUrl, product.url) : null,
  });
}

async function addApiProducts(products: ScrapedProduct[], seen: Set<string>, origin: string) {
  const [shopify, woo] = await Promise.all([
    fetchJson(`${origin}/products.json?limit=50`, 2500),
    fetchJson(`${origin}/wp-json/wc/store/products?per_page=50`, 2500),
  ]);

  if (shopify && typeof shopify === "object" && Array.isArray((shopify as { products?: unknown[] }).products)) {
    for (const p of (shopify as { products: Record<string, unknown>[] }).products) {
      const variant = Array.isArray(p.variants) ? (p.variants[0] as Record<string, unknown> | undefined) : undefined;
      const images = Array.isArray(p.images) ? p.images as Record<string, unknown>[] : [];
      addProduct(products, seen, {
        name: stringValue(p.title) ?? "",
        price: stringValue(variant?.price) ?? null,
        image: stringValue(images[0]?.src) ?? firstString((p.image as Record<string, unknown> | undefined)?.src) ?? null,
        url: stringValue(p.handle) ? `${origin}/products/${stringValue(p.handle)}` : null,
      }, origin);
    }
  }

  if (Array.isArray(woo)) {
    for (const p of woo as Record<string, unknown>[]) {
      const prices = p.prices as Record<string, unknown> | undefined;
      const rawPrice = stringValue(prices?.price);
      const images = Array.isArray(p.images) ? p.images as Record<string, unknown>[] : [];
      addProduct(products, seen, {
        name: stringValue(p.name) ?? "",
        price: rawPrice ? `${(Number.parseInt(rawPrice, 10) / 100).toFixed(2)}` : null,
        image: stringValue(images[0]?.src) ?? null,
        url: stringValue(p.permalink) ?? null,
      }, origin);
    }
  }
}

export async function scrapeUrl(url: string): Promise<ScrapedData> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000),
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    redirect: "follow",
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const finalUrl = response.url || url;
  const base = new URL(finalUrl);
  const origin = base.origin;
  const responseHeaders = headersToRecord(response.headers);
  const cookies = parseCookies(getSetCookieHeaders(response.headers));
  const html = await response.text();
  const $ = cheerio.load(html);
  const bodyTextFull = $("body").text();

  const robotsPromise = fetchText(`${origin}/robots.txt`, 2500);
  const contactHref =
    $("a[href]")
      .map((_, el) => $(el).attr("href") || "")
      .get()
      .find((href) => /(?:^|\/)(?:contact|contacts|kontakt|over-ons|about)(?:\/|$|\?)/i.test(href)) || "";
  const contactPromise = contactHref ? fetchText(resolveUrl(finalUrl, contactHref), 2500, "text/html,*/*;q=0.8") : Promise.resolve(null);

  const title = $("title").first().text().replace(/\s+/g, " ").trim();
  const description = $('meta[name="description"]').attr("content")?.trim() ?? "";
  const metaGenerator = $('meta[name="generator"]').attr("content")?.trim() || null;

  const faviconHref =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href") ||
    null;
  const favicon = faviconHref ? resolveUrl(finalUrl, faviconHref) : `${origin}/favicon.ico`;

  const scripts: string[] = [];
  $("script[src]").each((_, el) => {
    const src = $(el).attr("src");
    if (src) scripts.push(resolveUrl(finalUrl, src));
  });
  $("script:not([src])").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 0 && text.length < 20000) scripts.push(text);
  });

  const links: string[] = [];
  $("link[href], script[src], img[src], source[srcset], a[href]").each((_, el) => {
    const href = $(el).attr("href") || $(el).attr("src") || $(el).attr("srcset");
    if (href) links.push(resolveUrl(finalUrl, href.split(/\s+/)[0]));
  });

  const metas: Record<string, string> = {};
  $("meta").each((_, el) => {
    const name = ($(el).attr("name") || $(el).attr("property") || $(el).attr("http-equiv") || "").toLowerCase();
    const content = $(el).attr("content") || "";
    if (name && content) metas[name] = content;
  });

  const jsonLdEntries = readJsonLd($);
  const structuredData = extractStructuredData(jsonLdEntries);
  const products: ScrapedProduct[] = [];
  const seenProducts = new Set<string>();

  for (const entry of jsonLdEntries) {
    const types = typeList(entry).map((type) => type.toLowerCase());
    if (types.includes("product")) {
      const offer = Array.isArray(entry.offers) ? entry.offers[0] as Record<string, unknown> : entry.offers as Record<string, unknown> | undefined;
      addProduct(products, seenProducts, {
        name: stringValue(entry.name) ?? "",
        price: offer ? [stringValue(offer.priceCurrency), stringValue(offer.price)].filter(Boolean).join(" ") || null : null,
        image: firstString(entry.image) ?? null,
        url: stringValue(entry.url) ?? null,
      }, finalUrl);
    }
  }

  const productSelectors = [
    '[itemtype*="schema.org/Product"]',
    '[data-product-id]',
    '[data-product]',
    'form[action*="/cart/add"]',
    'form[action*="add-to-cart"]',
    '.product-card',
    '.product-item',
    '[class*="product-card"]',
    '[class*="product-item"]',
    '[class*="ProductCard"]',
    '[class*="collection-product"]',
    '[class*="woocommerce-LoopProduct-link"]',
  ].join(",");

  $(productSelectors).each((_, el) => {
    const $el = $(el);
    const name =
      $el.attr("data-product-title") ||
      $el.find('[itemprop="name"], h2, h3, h4, [class*="title"], [class*="name"]').first().text() ||
      $el.find("a").first().attr("title") ||
      $el.find("img").first().attr("alt") ||
      "";
    const price =
      $el.find('[itemprop="price"], [class*="price"], [class*="Price"], [data-price]').first().attr("content") ||
      $el.find('[itemprop="price"], [class*="price"], [class*="Price"], [data-price]').first().text() ||
      null;
    const image = $el.find("img").first().attr("src") || $el.find("img").first().attr("data-src") || null;
    const href = $el.find("a[href]").first().attr("href") || $el.attr("href") || null;
    addProduct(products, seenProducts, { name, price, image, url: href }, finalUrl);
  });

  await addApiProducts(products, seenProducts, origin);

  const robotsTxt = await robotsPromise;
  const sitemapCandidates = parseRobotsSitemaps(robotsTxt, origin);
  const sitemapResults = await Promise.all(sitemapCandidates.map((sitemapUrl) => fetchText(sitemapUrl, 2500, "application/xml,text/xml,*/*;q=0.8")));
  const sitemapXml = sitemapResults.find(Boolean) ?? null;
  const sitemapUrls = sitemapResults.flatMap((xml, index) => parseSitemapUrls(xml, sitemapCandidates[index]));

  const contactHtml = await contactPromise;
  const contactText = contactHtml ? cheerio.load(contactHtml)("body").text() : "";

  const footerText = $("footer").text();
  const mailtoEmails = $("a[href^='mailto:']")
    .map((_, el) => normalizeEmail($(el).attr("href") || ""))
    .get()
    .filter((email): email is string => Boolean(email));
  const structuredEmails = [structuredData.organization?.email, structuredData.business?.email]
    .map((email) => (email ? normalizeEmail(email) : null))
    .filter((email): email is string => Boolean(email));
  const footerEmails = extractEmails(footerText);
  const contactPageEmails = extractEmails(contactText);
  const bodyEmails = extractEmails(bodyTextFull);
  const contactEmail =
    pickDomainEmail([...structuredEmails, ...mailtoEmails], base.hostname) ??
    pickDomainEmail(footerEmails, base.hostname) ??
    pickDomainEmail(contactPageEmails, base.hostname) ??
    pickDomainEmail(bodyEmails.filter((email) => email.endsWith(`@${base.hostname.replace(/^www\./, "")}`)), base.hostname);

  const structuredPhones = [structuredData.organization?.telephone, structuredData.business?.telephone]
    .map((phone) => (phone ? normalizePhone(phone) : null))
    .filter((phone): phone is string => Boolean(phone));
  const contactPhone = structuredPhones[0] ?? extractPhones(footerText)[0] ?? extractPhones(contactText)[0] ?? extractPhones(bodyTextFull)[0] ?? null;

  const allPrices = [
    ...products.map((product) => (product.price ? parsePrice(product.price) : null)).filter((price): price is number => Boolean(price)),
    ...extractPrices(bodyTextFull),
  ].slice(0, 300);
  let currency = "EUR";
  if (/(?:\$|USD)\s*\d/i.test(bodyTextFull)) currency = "USD";
  if (/(?:£|GBP)\s*\d/i.test(bodyTextFull)) currency = "GBP";
  if (/(?:€|EUR)\s*\d|\d\s*(?:€|EUR)\b/i.test(bodyTextFull)) currency = "EUR";

  const faqItems: string[] = [];
  $('[class*="faq"] h3, [class*="faq"] h4, [class*="faq"] summary, [class*="accordion"] h3, [class*="accordion"] button, [class*="accordion"] summary, details summary, [itemtype*="FAQPage"] [itemprop="name"], [class*="question"]').each((_, el) => {
    const q = $(el).text().replace(/\s+/g, " ").trim();
    if (q && q.length > 10 && q.length < 200 && !faqItems.includes(q) && faqItems.length < 20) faqItems.push(q);
  });

  const pageLinks: string[] = [];
  const seenLinks = new Set<string>();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    const internal = absoluteInternalPath(base, href);
    if (internal && !seenLinks.has(internal)) {
      seenLinks.add(internal);
      pageLinks.push(internal);
    }
  });
  for (const sitemapUrl of sitemapUrls.slice(0, 500)) {
    const internal = absoluteInternalPath(base, sitemapUrl);
    if (internal && !seenLinks.has(internal)) {
      seenLinks.add(internal);
      pageLinks.push(internal);
    }
  }

  const socialLinks: Record<string, string> = {};
  const socialPatterns: Record<string, RegExp> = {
    instagram: /\/\/(?:www\.)?instagram\.com\//i,
    facebook: /\/\/(?:www\.)?facebook\.com\//i,
    tiktok: /\/\/(?:www\.)?tiktok\.com\//i,
    twitter: /\/\/(?:www\.)?(?:twitter\.com|x\.com)\//i,
    linkedin: /\/\/(?:www\.)?linkedin\.com\//i,
    youtube: /\/\/(?:www\.)?youtube\.com\//i,
    pinterest: /\/\/(?:www\.)?pinterest\./i,
  };
  $("a[href]").each((_, el) => {
    const href = resolveUrl(finalUrl, $(el).attr("href") || "");
    for (const [platform, pattern] of Object.entries(socialPatterns)) {
      if (pattern.test(href) && !socialLinks[platform]) socialLinks[platform] = href;
    }
  });

  const addToCartRegex = /\b(?:add-to-cart|add_to_cart|addToCart|AddToCart|ajax_add_to_cart)\b|\/cart\/add\b/i;
  const cartCheckoutRegex = /\/(?:cart|checkout|winkelwagen|afrekenen)(?:\/|$|\?)/i;
  const sitemapProductUrls = sitemapUrls.filter((candidate) => /\/(?:product|products|shop|winkel|p|artikel|collections)\/[^/]+/i.test(candidate)).length;
  const sitemapCartOrCheckoutUrls = sitemapUrls.filter((candidate) => cartCheckoutRegex.test(candidate)).length;
  const ecommerceSignals: EcommerceSignals = {
    productCount: products.length,
    hasAddToCartButtons: addToCartRegex.test(html) || $("button, a, input").filter((_, el) => /add to cart|add-to-cart|in winkelwagen|toevoegen aan winkelwagen|bestel/i.test($(el).text() || $(el).attr("value") || "")).length > 0,
    hasCartOrCheckoutLinks: links.some((candidate) => cartCheckoutRegex.test(candidate)),
    sitemapProductUrls,
    sitemapCartOrCheckoutUrls,
  };

  const rating = structuredData.aggregateRating;
  const reviews = rating
    ? {
        ratingValue: Number.isFinite(rating.ratingValue) ? rating.ratingValue ?? null : null,
        reviewCount: Number.isFinite(rating.reviewCount) ? rating.reviewCount ?? null : null,
        bestRating: Number.isFinite(rating.bestRating) ? rating.bestRating ?? null : null,
      }
    : null;

  const cleanText = bodyTextFull.replace(/\s+/g, " ").trim().slice(0, 4000);

  return {
    title,
    description,
    favicon,
    html,
    scripts,
    links,
    metas,
    products,
    priceRange: allPrices.length >= 2 ? { min: Math.min(...allPrices), max: Math.max(...allPrices) } : null,
    currency,
    faqItems,
    pageLinks,
    socialLinks,
    contactInfo: { email: contactEmail, phone: contactPhone },
    bodyText: cleanText,
    responseHeaders,
    cookies,
    robotsTxt,
    sitemapXml,
    sitemapUrls,
    pageCount: Math.max(pageLinks.length, sitemapUrls.length),
    metaGenerator,
    structuredData,
    reviews,
    ecommerceSignals,
  };
}

export function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  try {
    return new URL(url).toString();
  } catch {
    throw new Error("Invalid URL");
  }
}
