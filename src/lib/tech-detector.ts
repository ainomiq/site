import type { ScrapedData } from "./scraper";
import type { TechDetection } from "./analysis-types";

interface DetectionRule {
  name: string;
  category: TechDetection["category"];
  patterns: {
    scripts?: RegExp[];
    links?: RegExp[];
    html?: RegExp[];
    metas?: { key: string; pattern: RegExp }[];
    headers?: { key: string; pattern: RegExp }[];
    cookies?: RegExp[];
    robots?: RegExp[];
  };
}

const path = String.raw`(?:^|[/"'.?&_=:-])`;
const end = String.raw`(?:$|[/"'.?&#;:_=-])`;

const rules: DetectionRule[] = [
  // Platforms
  { name: "Shopify", category: "platform", patterns: { scripts: [/\/\/cdn\.shopify\.com\//i, /\/shopifycloud\//i], links: [/\/\/cdn\.shopify\.com\//i, /\/s\/files\/1\//i], html: [/\bShopify\.theme\b/i, /\bShopifyAnalytics\b/i, /class=["'][^"']*\bshopify-section\b/i], metas: [{ key: "generator", pattern: /^shopify\b/i }], headers: [{ key: "x-shopify-stage", pattern: /.+/i }, { key: "x-shopid", pattern: /^\d+$/i }], cookies: [/^_shopify_/i, /^_shopify_y$/i, /^cart$/i, /^secure_customer_sig$/i] } },
  { name: "WooCommerce", category: "platform", patterns: { scripts: [/\/wp-content\/plugins\/woocommerce\//i, /\/woocommerce\/assets\//i, /\bwc-(?:cart|checkout|add-to-cart|fragments)\b/i], links: [/\/wp-content\/plugins\/woocommerce\//i], html: [/\bwoocommerce-(?:cart|checkout|product|Price-amount)\b/i, /\bwc-block-(?:grid|cart|checkout)\b/i], metas: [{ key: "generator", pattern: /^woocommerce\b/i }] } },
  { name: "Magento", category: "platform", patterns: { scripts: [new RegExp(`${path}mage(?:/|\\.)`, "i"), /\/Magento_[A-Za-z0-9_]+\//i, /\/requirejs\/require(?:\.min)?\.js/i, /\/static\/version\d+\/frontend\//i], links: [/\/Magento_[A-Za-z0-9_]+\//i, /\/static\/version\d+\/frontend\//i], html: [/\bdata-mage-init=/i, /\bx-magento-init\b/i, /\bMage\.Cookies\b/i, /\bMagento_Ui\/js\//i], metas: [{ key: "generator", pattern: /^magento\b/i }], cookies: [/^mage-(?:cache|messages|translation|private)/i, /^form_key$/i] } },
  { name: "WordPress", category: "platform", patterns: { scripts: [/\/wp-content\//i, /\/wp-includes\//i], links: [/\/wp-content\//i, /\/wp-includes\//i], html: [/\/wp-json\//i, /\bwp-embed\.min\.js\b/i], metas: [{ key: "generator", pattern: /^wordpress\b/i }] } },
  { name: "BigCommerce", category: "platform", patterns: { scripts: [/\/\/cdn\d*\.bigcommerce\.com\//i, /\/stencil\/[a-z0-9_-]+/i], links: [/\/\/cdn\d*\.bigcommerce\.com\//i], html: [/\bBigCommerce\.context\b/i, /\bstencilUtils\b/i], headers: [{ key: "x-bc-", pattern: /.+/i }] } },
  { name: "PrestaShop", category: "platform", patterns: { scripts: [/\/modules\/[a-z0-9_-]+\/views\/js\//i, /\bprestashop(?:\.js)?\b/i], html: [/\bprestashop\b/i, /\bdata-token=[^>]+prestashop/i], metas: [{ key: "generator", pattern: /^prestashop\b/i }], cookies: [/^PrestaShop-[a-f0-9]+$/i] } },
  { name: "Squarespace", category: "platform", patterns: { scripts: [/\/\/static1\.squarespace\.com\//i, /\/\/assets\.squarespace\.com\//i], links: [/\/\/static1\.squarespace\.com\//i], html: [/\bsquarespace(?:-cdn|-commerce)?\b/i], metas: [{ key: "generator", pattern: /^squarespace\b/i }] } },
  { name: "Wix", category: "platform", patterns: { scripts: [/\/\/static\.wixstatic\.com\//i, /\/\/static\.parastorage\.com\//i, /\/\/.*\.wix\.com\//i], links: [/\/\/static\.wixstatic\.com\//i], html: [/\bwix-bi-session\b/i, /\bWix\.Embeds\b/i], metas: [{ key: "generator", pattern: /^wix\b/i }] } },
  { name: "Webflow", category: "platform", patterns: { scripts: [/\/\/uploads-ssl\.webflow\.com\//i, /\/js\/webflow\.[a-f0-9]+\.js/i], links: [/\/\/uploads-ssl\.webflow\.com\//i, /\/\/assets-global\.website-files\.com\//i], html: [/\bdata-wf-page=/i, /\bdata-wf-site=/i], metas: [{ key: "generator", pattern: /^webflow\b/i }] } },
  { name: "Lightspeed", category: "platform", patterns: { scripts: [/lightspeedhq\.(?:com|nl)/i, /lightspeedapp\.(?:com|nl)/i], links: [/lightspeedhq\.(?:com|nl)/i, /lightspeedapp\.(?:com|nl)/i], html: [/\blightspeed ecom\b/i] } },
  { name: "CCV Shop", category: "platform", patterns: { scripts: [/ccvshop\.(?:nl|com)/i], links: [/ccvshop\.(?:nl|com)/i], html: [/\bccvshop\b/i], cookies: [/^CCVSHOP/i] } },
  { name: "Mijnwebwinkel", category: "platform", patterns: { scripts: [/mijnwebwinkel\.(?:nl|com)/i, /myonline-store\.(?:com|eu)/i], links: [/mijnwebwinkel\.(?:nl|com)/i], html: [/\bmijnwebwinkel\b/i] } },
  { name: "Etsy", category: "platform", patterns: { links: [/\/\/(?:www\.)?etsy\.com\/(?:shop|listing)\//i], html: [/\/\/(?:www\.)?etsy\.com\/(?:shop|listing)\//i] } },

  // Frameworks
  { name: "Next.js", category: "platform", patterns: { scripts: [/\/_next\/static\//i], links: [/\/_next\/static\//i], html: [/\bid=["']__NEXT_DATA__["']/i], headers: [{ key: "x-nextjs-cache", pattern: /.+/i }, { key: "x-powered-by", pattern: /\bnext\.?js\b/i }] } },
  { name: "Nuxt.js", category: "platform", patterns: { scripts: [/\/_nuxt\//i], links: [/\/_nuxt\//i], html: [/\bid=["']__NUXT_DATA__["']/i, /\bwindow\.__NUXT__\b/i] } },
  { name: "Gatsby", category: "platform", patterns: { scripts: [/\/webpack-runtime-[a-f0-9]+\.js/i, /\/app-[a-f0-9]+\.js/i, /\/page-data\/.+\/page-data\.json/i], links: [/\/page-data\/.+\/page-data\.json/i], html: [/\bid=["']___gatsby["']/i, /\bwindow\.___loader\b/i], metas: [{ key: "generator", pattern: /^gatsby\b/i }] } },
  { name: "React", category: "platform", patterns: { scripts: [/\/react(?:\.production\.min)?\.js(?:\?|$)/i, /\/react-dom(?:\.production\.min)?\.js(?:\?|$)/i], html: [/\b__REACT_DEVTOOLS_GLOBAL_HOOK__\b/i, /\b__reactFiber\$/i] } },
  { name: "Vue.js", category: "platform", patterns: { scripts: [/\/vue(?:\.runtime)?(?:\.global|\.esm-browser|\.min)?\.js(?:\?|$)/i], html: [/\bdata-v-[a-f0-9]{6,}\b/i, /\b__VUE_DEVTOOLS_GLOBAL_HOOK__\b/i] } },
  { name: "Angular", category: "platform", patterns: { scripts: [/\/angular(?:\.min)?\.js(?:\?|$)/i, /\/main\.[a-f0-9]+\.js/i], html: [/\bng-version=["']/i, /\b_ngcontent-[a-z]+-\d+\b/i] } },
  { name: "Svelte", category: "platform", patterns: { scripts: [/\/_app\/immutable\//i], links: [/\/_app\/immutable\//i], html: [/\bdata-svelte(?:kit)?-/i] } },
  { name: "Laravel", category: "platform", patterns: { headers: [{ key: "x-powered-by", pattern: /\blaravel\b/i }], cookies: [/^laravel_session$/i, /^XSRF-TOKEN$/i], html: [/\bcsrf-token\b/i] } },
  { name: "Django", category: "platform", patterns: { cookies: [/^csrftoken$/i, /^sessionid$/i], html: [/\bname=["']csrfmiddlewaretoken["']/i] } },
  { name: "Ruby on Rails", category: "platform", patterns: { headers: [{ key: "x-powered-by", pattern: /\bphusion passenger\b/i }, { key: "server", pattern: /\bphusion passenger\b/i }], cookies: [/^_[a-z0-9_-]+_session$/i], html: [/\bname=["']csrf-token["']/i, /\bdata-turbo-track=/i] } },

  // Email and automation
  { name: "Klaviyo", category: "email", patterns: { scripts: [/\/\/static\.klaviyo\.com\//i, /\/\/a\.klaviyo\.com\//i], html: [/\bklaviyo(?:Forms|\.identify|\.push)\b/i], cookies: [/^__kla_id$/i] } },
  { name: "Mailchimp", category: "email", patterns: { scripts: [/\/\/chimpstatic\.com\//i, /\/\/mc\.us\d+\.list-manage\.com\//i, /\/\/(?:[^/]+\.)?mailchimp\.com\//i], html: [/\bmc_embed_signup\b/i] } },
  { name: "Brevo", category: "email", patterns: { scripts: [/\/\/sibautomation\.com\//i, /\/\/cdn\.brevo\.com\//i, /\/\/sendinblue\.com\//i], html: [/\bSendinblue\b/i, /\bBrevoConversations\b/i] } },
  { name: "ActiveCampaign", category: "email", patterns: { scripts: [/\/\/trackcmp\.net\//i, /\/\/(?:[^/]+\.)?activecampaign\.com\//i], html: [/\bvgo\(['"]setAccount/i] } },
  { name: "Drip", category: "email", patterns: { scripts: [/\/\/(?:[^/]+\.)?drip\.com\//i, /\/\/tag\.getdrip\.com\//i], html: [/\b_dcq\.push\b/i] } },
  { name: "Omnisend", category: "email", patterns: { scripts: [/\/\/omnisnippet\d?\.com\//i, /\/\/(?:[^/]+\.)?omnisend\.com\//i], html: [/\bomnisend\b/i] } },
  { name: "Dotdigital", category: "email", patterns: { scripts: [/dotdigital/i, /\/\/r\d+\.dotdigital-pages\.com\//i], html: [/\bdotdigital\b/i] } },
  { name: "HubSpot", category: "email", patterns: { scripts: [/\/\/js(?:-[a-z0-9]+)?\.hs-scripts\.com\//i, /\/\/js\.hsforms\.net\//i, /\/\/js\.hs-analytics\.net\//i], links: [/\/\/(?:[^/]+\.)?hubspot\.com\//i], html: [/\b_hsq\.push\b/i], cookies: [/^hubspotutk$/i, /^__hssc$/i, /^__hssrc$/i, /^__hstc$/i] } },
  { name: "ConvertKit", category: "email", patterns: { scripts: [/\/\/f\.convertkit\.com\//i, /\/\/(?:[^/]+\.)?convertkit\.com\//i], html: [/\bconvertkit\b/i] } },
  { name: "Salesforce", category: "email", patterns: { scripts: [/\/\/(?:[^/]+\.)?salesforce\.com\//i, /\/\/(?:[^/]+\.)?force\.com\//i], links: [/\/\/(?:[^/]+\.)?force\.com\//i], cookies: [/^BrowserId$/i] } },
  { name: "Pipedrive", category: "email", patterns: { scripts: [/\/\/(?:[^/]+\.)?pipedrive\.com\//i], links: [/\/\/(?:[^/]+\.)?pipedrive\.com\//i] } },

  // Advertising
  { name: "Meta Pixel", category: "ads", patterns: { scripts: [/\/\/connect\.facebook\.net\/[^/]+\/fbevents\.js/i], html: [/\bfbq\(['"]init['"],\s*['"]\d+/i, /\/\/www\.facebook\.com\/tr\?id=\d+/i], cookies: [/^_fbp$/i, /^_fbc$/i] } },
  { name: "Google Ads", category: "ads", patterns: { scripts: [/\/\/www\.googletagmanager\.com\/gtag\/js\?id=AW-\d+/i, /\/\/googleads\.g\.doubleclick\.net\//i], html: [/\bAW-\d{6,}\b/i, /\bgtag\(['"]config['"],\s*['"]AW-\d+/i] } },
  { name: "TikTok Pixel", category: "ads", patterns: { scripts: [/\/\/analytics\.tiktok\.com\/i18n\/pixel\//i], html: [/\bttq\.load\(['"][A-Z0-9]{8,}['"]/i], cookies: [/^_ttp$/i, /^ttclid$/i] } },
  { name: "Snapchat Pixel", category: "ads", patterns: { scripts: [/\/\/sc-static\.net\/scevent\.min\.js/i], html: [/\bsnaptr\(['"]init['"]/i] } },
  { name: "Pinterest Tag", category: "ads", patterns: { scripts: [/\/\/s\.pinimg\.com\/ct\/core\.js/i], html: [/\bpintrk\(['"]load['"]/i], cookies: [/^_pin_unauth$/i] } },
  { name: "LinkedIn Insight", category: "ads", patterns: { scripts: [/\/\/snap\.licdn\.com\/li\.lms-analytics\/insight\.min\.js/i], html: [/\b_linkedin_data_partner_id\b/i], cookies: [/^li_sugr$/i, /^bcookie$/i] } },
  { name: "Twitter/X Pixel", category: "ads", patterns: { scripts: [/\/\/static\.ads-twitter\.com\/uwt\.js/i], html: [/\btwq\(['"]init['"]/i] } },
  { name: "Criteo", category: "ads", patterns: { scripts: [/\/\/static\.criteo\.net\/js\/ld\/ld\.js/i, /\/\/dynamic\.criteo\.com\//i], html: [/\bcriteo_q\.push\b/i] } },
  { name: "Bing Ads", category: "ads", patterns: { scripts: [/\/\/bat\.bing\.com\/bat\.js/i], html: [/\buetq\.push\b/i], cookies: [/^_uetvid$/i, /^_uetsid$/i] } },

  // Analytics
  { name: "Google Analytics (GA4)", category: "analytics", patterns: { scripts: [/\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-[A-Z0-9]+/i, /\/\/www\.google-analytics\.com\/(?:analytics|gtag)\/js/i], html: [/\bG-[A-Z0-9]{5,}\b/i, /\bgtag\(['"]config['"],\s*['"]G-[A-Z0-9]+/i], cookies: [/^_ga$/i, /^_ga_[A-Z0-9]+$/i] } },
  { name: "Google Tag Manager", category: "analytics", patterns: { scripts: [/\/\/www\.googletagmanager\.com\/gtm\.js\?id=GTM-[A-Z0-9]+/i], html: [/\bGTM-[A-Z0-9]{4,}\b/i] } },
  { name: "Hotjar", category: "analytics", patterns: { scripts: [/\/\/static\.hotjar\.com\/c\/hotjar-/i, /\/\/script\.hotjar\.com\//i], html: [/\bhj\(['"]trigger['"]/i], cookies: [/^_hj/i] } },
  { name: "Mixpanel", category: "analytics", patterns: { scripts: [/\/\/cdn\.mxpnl\.com\/libs\/mixpanel-/i, /\/\/api\.mixpanel\.com\//i], html: [/\bmixpanel\.init\(/i] } },
  { name: "Amplitude", category: "analytics", patterns: { scripts: [/\/\/cdn\.amplitude\.com\/libs\//i, /\/\/api\.amplitude\.com\//i], html: [/\bamplitude\.init\(/i] } },
  { name: "Plausible", category: "analytics", patterns: { scripts: [/\/\/plausible\.io\/js\/script(?:\.[a-z-]+)?\.js/i], html: [/\bdata-domain=["'][^"']+["'][^>]*plausible/i] } },
  { name: "Matomo/Piwik", category: "analytics", patterns: { scripts: [/\/matomo\.js(?:\?|$)/i, /\/piwik\.js(?:\?|$)/i], html: [/\b_paq\.push\b/i, /\bMatomoTracker\b/i], cookies: [/^_pk_(?:id|ses|ref)/i] } },
  { name: "Heap", category: "analytics", patterns: { scripts: [/\/\/cdn\.heapanalytics\.com\/js\/heap-/i], html: [/\bheap\.load\(['"]/i] } },
  { name: "Segment", category: "analytics", patterns: { scripts: [/\/\/cdn\.segment\.com\/analytics\.js/i], html: [/\banalytics\.load\(['"][A-Za-z0-9]+['"]\)/i] } },
  { name: "Microsoft Clarity", category: "analytics", patterns: { scripts: [/\/\/www\.clarity\.ms\/tag\//i], html: [/\bclarity\(['"]set['"]/i], cookies: [/^_clck$/i, /^_clsk$/i] } },
  { name: "Lucky Orange", category: "analytics", patterns: { scripts: [/\/\/tools\.luckyorange\.com\//i, /\/\/(?:[^/]+\.)?luckyorange\.com\//i], html: [/\b_luckyOrange\b/i] } },
  { name: "Mouseflow", category: "analytics", patterns: { scripts: [/\/\/cdn\.mouseflow\.com\/projects\//i], html: [/\b_mouseflow\.push\b/i], cookies: [/^mf_/i] } },

  // Customer service, reviews, payments, shipping, CDN, utilities
  { name: "Zendesk", category: "other", patterns: { scripts: [/\/\/static\.zendesk\.com\//i, /\/\/ekr\.zdassets\.com\//i, /\/\/(?:[^/]+\.)?zendesk\.com\//i], html: [/\bzE\(['"]webWidget/i] } },
  { name: "Intercom", category: "other", patterns: { scripts: [/\/\/widget\.intercom\.io\/widget\//i, /\/\/js\.intercomcdn\.com\//i], html: [/\bIntercom\(['"]boot['"]/i], cookies: [/^intercom-/i] } },
  { name: "Tidio", category: "other", patterns: { scripts: [/\/\/code\.tidio\.co\//i, /\/\/(?:[^/]+\.)?tidio\.co\//i] } },
  { name: "LiveChat", category: "other", patterns: { scripts: [/\/\/cdn\.livechatinc\.com\//i, /\/\/secure\.livechatinc\.com\//i], html: [/\b__lc\.license\b/i] } },
  { name: "Drift", category: "other", patterns: { scripts: [/\/\/js\.driftt\.com\//i, /\/\/(?:[^/]+\.)?drift\.com\//i], html: [/\bdrift\.load\(['"]/i] } },
  { name: "Freshdesk/Freshchat", category: "other", patterns: { scripts: [/\/\/(?:[^/]+\.)?freshdesk\.com\//i, /\/\/wchat\.freshchat\.com\//i, /\/\/(?:[^/]+\.)?freshchat\.com\//i], html: [/\bFreshworksWidget\b/i] } },
  { name: "Crisp", category: "other", patterns: { scripts: [/\/\/client\.crisp\.chat\/l\.js/i], html: [/\bCRISP_WEBSITE_ID\b/i], cookies: [/^crisp-client/i] } },
  { name: "Tawk.to", category: "other", patterns: { scripts: [/\/\/embed\.tawk\.to\//i], html: [/\bTawk_API\b/i] } },
  { name: "Gorgias", category: "other", patterns: { scripts: [/\/\/config\.gorgias\.chat\//i, /\/\/(?:[^/]+\.)?gorgias\.com\//i], html: [/\bgorgias-chat/i] } },
  { name: "Trustpilot", category: "other", patterns: { scripts: [/\/\/widget\.trustpilot\.com\//i], links: [/\/\/(?:[^/]+\.)?trustpilot\.com\//i], html: [/\btrustpilot-widget\b/i] } },
  { name: "Judge.me", category: "other", patterns: { scripts: [/\/\/cdn\.judge\.me\//i], links: [/judge\.me/i], html: [/\bjdgm-widget\b/i] } },
  { name: "Loox", category: "other", patterns: { scripts: [/\/\/loox\.io\//i, /\/\/cdn\.shopify\.com\/extensions\/.*loox/i], html: [/\bloox-rating\b/i] } },
  { name: "Yotpo", category: "other", patterns: { scripts: [/\/\/staticw2\.yotpo\.com\//i, /\/\/(?:[^/]+\.)?yotpo\.com\//i], html: [/\byotpo-widget\b/i] } },
  { name: "Stamped", category: "other", patterns: { scripts: [/\/\/stamped\.io\//i, /\/\/cdn1\.stamped\.io\//i], html: [/\bstamped-product-reviews\b/i] } },
  { name: "Kiyoh", category: "other", patterns: { scripts: [/\/\/(?:[^/]+\.)?kiyoh\.com\//i], links: [/\/\/(?:[^/]+\.)?kiyoh\.com\//i], html: [/\bkiyoh\b/i] } },
  { name: "WebwinkelKeur", category: "other", patterns: { scripts: [/\/\/dashboard\.webwinkelkeur\.nl\//i, /\/\/(?:[^/]+\.)?webwinkelkeur\.nl\//i], links: [/webwinkelkeur\.nl/i], html: [/\bwebwinkelkeur\b/i] } },
  { name: "Trusted Shops", category: "other", patterns: { scripts: [/\/\/widgets\.trustedshops\.com\//i, /\/\/(?:[^/]+\.)?trustedshops\.com\//i], links: [/trustedshops\.com/i] } },
  { name: "Stripe", category: "other", patterns: { scripts: [/\/\/js\.stripe\.com\/v3/i], html: [/\bStripe\(['"]pk_(?:live|test)_/i] } },
  { name: "PayPal", category: "other", patterns: { scripts: [/\/\/www\.paypal\.com\/sdk\/js/i, /\/\/www\.paypalobjects\.com\//i], html: [/\bpaypal\.Buttons\(/i] } },
  { name: "Klarna", category: "other", patterns: { scripts: [/\/\/x\.klarnacdn\.net\//i, /\/\/(?:[^/]+\.)?klarna\.com\//i], html: [/\bklarna-placement\b/i] } },
  { name: "Mollie", category: "other", patterns: { scripts: [/\/\/js\.mollie\.com\/v1\/mollie\.js/i], links: [/\/\/(?:[^/]+\.)?mollie\.com\//i], html: [/\bmollie-components\b/i] } },
  { name: "Adyen", category: "other", patterns: { scripts: [/\/\/checkoutshopper-(?:live|test)\.adyen\.com\//i], links: [/\/\/(?:[^/]+\.)?adyen\.com\//i], html: [/\badyen-checkout\b/i] } },
  { name: "Apple Pay", category: "other", patterns: { html: [/\bapple-pay\b/i, /\bApplePaySession\b/i] } },
  { name: "Google Pay", category: "other", patterns: { scripts: [/\/\/pay\.google\.com\/gp\/p\/js\/pay\.js/i], html: [/\bgoogle-pay\b/i] } },
  { name: "Sendcloud", category: "other", patterns: { scripts: [/sendcloud/i], links: [/sendcloud/i], html: [/\bsendcloud\b/i] } },
  { name: "PostNL", category: "other", patterns: { scripts: [/postnl\.(?:nl|com).*widget/i], links: [/postnl\.(?:nl|com)/i], html: [/\bpostnl\b/i] } },
  { name: "MyParcel", category: "other", patterns: { scripts: [/myparcel/i], links: [/myparcel/i], html: [/\bmyparcel\b/i] } },
  { name: "Cloudflare", category: "other", patterns: { headers: [{ key: "cf-ray", pattern: /.+/i }, { key: "server", pattern: /\bcloudflare\b/i }], cookies: [/^__cf_bm$/i, /^cf_clearance$/i] } },
  { name: "Fastly", category: "other", patterns: { headers: [{ key: "x-served-by", pattern: /\bcache-/i }, { key: "server", pattern: /\bfastly\b/i }, { key: "via", pattern: /\bvarnish\b/i }] } },
  { name: "Vercel", category: "other", patterns: { headers: [{ key: "x-vercel-id", pattern: /.+/i }, { key: "server", pattern: /\bvercel\b/i }], cookies: [/^__vercel/i] } },
  { name: "Netlify", category: "other", patterns: { headers: [{ key: "server", pattern: /\bnetlify\b/i }, { key: "x-nf-request-id", pattern: /.+/i }] } },
  { name: "AWS CloudFront", category: "other", patterns: { headers: [{ key: "x-amz-cf-id", pattern: /.+/i }, { key: "x-cache", pattern: /\bcloudfront\b/i }, { key: "via", pattern: /\bcloudfront\b/i }] } },
  { name: "Google Fonts", category: "other", patterns: { links: [/\/\/fonts\.googleapis\.com\//i, /\/\/fonts\.gstatic\.com\//i] } },
  { name: "Font Awesome", category: "other", patterns: { scripts: [/fontawesome/i, /kit\.fontawesome\.com/i], links: [/fontawesome/i, /use\.fontawesome\.com/i], html: [/\bfa[srb]?\s+fa-[a-z0-9-]+/i] } },
  { name: "jQuery", category: "other", patterns: { scripts: [/\/jquery(?:-\d+\.\d+\.\d+)?(?:\.min)?\.js(?:\?|$)/i], html: [/\bjQuery(?:\.fn)?\.jquery\b/i] } },
  { name: "Bootstrap", category: "other", patterns: { scripts: [/\/bootstrap(?:\.bundle)?(?:\.min)?\.js(?:\?|$)/i], links: [/\/bootstrap(?:\.min)?\.css(?:\?|$)/i], html: [/\b(?:btn btn-|navbar-expand|container-fluid|col-md-\d)\b/i] } },
  { name: "Cookiebot", category: "other", patterns: { scripts: [/\/\/consent\.cookiebot\.com\/uc\.js/i], html: [/\bCookiebot\b/i], cookies: [/^CookieConsent$/i] } },
  { name: "OneTrust", category: "other", patterns: { scripts: [/\/\/cdn\.cookielaw\.org\/scripttemplates\/otSDKStub\.js/i], html: [/\bOptanonWrapper\b/i], cookies: [/^Optanon/i] } },
  { name: "CookieYes", category: "other", patterns: { scripts: [/\/\/cdn-cookieyes\.com\//i, /cookieyes\.com/i], html: [/\bcky-consent-container\b/i], cookies: [/^cookieyes-/i] } },
  { name: "accessiBe", category: "other", patterns: { scripts: [/\/\/acsbapp\.com\/apps\/app\/dist\/js\/app\.js/i], html: [/\bacsbJS\b/i] } },
  { name: "UserWay", category: "other", patterns: { scripts: [/\/\/cdn\.userway\.org\/widget\.js/i], html: [/\buserway\b/i] } },
];

function headerValue(headers: Record<string, string> | undefined, key: string): string {
  if (!headers) return "";
  if (key.endsWith("-")) {
    return Object.entries(headers)
      .filter(([name]) => name.startsWith(key))
      .map(([, value]) => value)
      .join(" ");
  }
  return headers[key] ?? "";
}

export function detectTechnologies(data: ScrapedData): TechDetection[] {
  const detected: TechDetection[] = [];
  const allScriptText = data.scripts.join(" ");
  const allLinksText = data.links.join(" ");
  const cookieNames = (data.cookies ?? []).map((cookie) => cookie.name);
  const robotsText = data.robotsTxt ?? "";

  for (const rule of rules) {
    let matches = 0;
    let totalPatterns = 0;
    let strongMatches = 0;

    const testPatterns = (patterns: RegExp[] | undefined, text: string, strong = false) => {
      if (!patterns) return;
      for (const pattern of patterns) {
        totalPatterns++;
        pattern.lastIndex = 0;
        if (pattern.test(text)) {
          matches++;
          if (strong) strongMatches++;
        }
      }
    };

    testPatterns(rule.patterns.scripts, allScriptText, true);
    testPatterns(rule.patterns.links, allLinksText);
    testPatterns(rule.patterns.html, data.html);
    testPatterns(rule.patterns.robots, robotsText);

    if (rule.patterns.metas) {
      for (const meta of rule.patterns.metas) {
        totalPatterns++;
        const value = data.metas[meta.key.toLowerCase()];
        meta.pattern.lastIndex = 0;
        if (value && meta.pattern.test(value)) {
          matches++;
          strongMatches++;
        }
      }
    }

    if (rule.patterns.headers) {
      for (const header of rule.patterns.headers) {
        totalPatterns++;
        const value = headerValue(data.responseHeaders, header.key.toLowerCase());
        header.pattern.lastIndex = 0;
        if (value && header.pattern.test(value)) {
          matches++;
          strongMatches++;
        }
      }
    }

    if (rule.patterns.cookies) {
      for (const pattern of rule.patterns.cookies) {
        totalPatterns++;
        if (cookieNames.some((name) => {
          pattern.lastIndex = 0;
          return pattern.test(name);
        })) {
          matches++;
          strongMatches++;
        }
      }
    }

    if (matches > 0) {
      const ratio = matches / Math.max(totalPatterns, 1);
      detected.push({
        name: rule.name,
        category: rule.category,
        confidence: strongMatches >= 2 || ratio >= 0.45 ? "high" : strongMatches >= 1 || ratio >= 0.2 ? "medium" : "low",
      });
    }
  }

  return detected.sort((a, b) => {
    const rank = { high: 3, medium: 2, low: 1 };
    return rank[b.confidence] - rank[a.confidence] || a.name.localeCompare(b.name);
  });
}
