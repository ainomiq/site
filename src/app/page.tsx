import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Globe } from "@/components/ui/globe";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Gauge,
  Workflow,
  Zap,
  Clock,
  Shield,
  ArrowRight,
  Check,
} from "lucide-react";

const trustedBy = [
  "Domino's",
  "Billie Jeans",
  "Enterprise Co.",
  "RetailMax",
  "FoodFlow",
  "LogiTech NL",
  "StyleHouse",
  "DataDriven",
  "ScaleUp Labs",
  "CloudFirst",
  "Domino's",
  "Billie Jeans",
  "Enterprise Co.",
  "RetailMax",
  "FoodFlow",
  "LogiTech NL",
  "StyleHouse",
  "DataDriven",
  "ScaleUp Labs",
  "CloudFirst",
];

const features = [
  {
    icon: Bot,
    title: "AI Klantenservice",
    description:
      "24/7 intelligente support die vragen beantwoordt, problemen oplost en je team ontlast.",
  },
  {
    icon: BarChart3,
    title: "Ads & Marketing",
    description:
      "Geautomatiseerde campagnes, creatieve tests en ROAS-optimalisatie op autopilot.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Gepersonaliseerde flows die converteren. Van welkom tot win-back, volledig AI-gestuurd.",
  },
  {
    icon: Package,
    title: "Inventory Intelligence",
    description:
      "Voorspel vraag, voorkom stockouts en optimaliseer je voorraad met AI forecasting.",
  },
  {
    icon: Gauge,
    title: "Performance Analytics",
    description:
      "Realtime dashboards met actionable insights. Zie precies wat werkt en waarom.",
  },
  {
    icon: Workflow,
    title: "Workflow Automations",
    description:
      "Verbind je systemen en elimineer handmatig werk. Van order tot fulfillment, geautomatiseerd.",
  },
];

const pricingPlans = [
  {
    name: "App",
    price: "€149",
    period: "/maand",
    description: "Voor webshops die willen groeien met AI",
    features: [
      "AI Klantenservice agent",
      "Marketing automation",
      "Performance dashboard",
      "Email automation",
      "Shopify / WooCommerce integratie",
      "Dedicated support",
    ],
    cta: "Start nu",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Voor organisaties die op schaal willen automatiseren",
    features: [
      "Alles in App",
      "Custom AI agents",
      "Process automation",
      "Data analytics & insights",
      "API integraties op maat",
      "Dedicated team & SLA",
    ],
    cta: "Neem contact op",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — BeamsBackground */}
      <BeamsBackground intensity="medium">
        <div className="flex flex-col items-center justify-center gap-6 px-6 text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-ainomiq-blue-glow/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue animate-float-up">
            AI Automation Platform
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.02] animate-float-up delay-100">
            Your business.{" "}
            <span className="gradient-text">Automated.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl animate-float-up delay-200">
            Geen PowerPoints. Geen pilots die nergens landen. Wij implementeren
            AI-automatisering die vanaf week 1 resultaat levert.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-float-up delay-300">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12 text-base shadow-lg shadow-ainomiq-blue/25"
            >
              <Link href="/contact">Plan een gesprek</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/15 hover:border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 h-12 text-base"
            >
              <Link href="/platform">Bekijk platform</Link>
            </Button>
          </div>
        </div>
      </BeamsBackground>

      {/* Trusted By — Marquee */}
      <div className="border-y border-ainomiq-border overflow-hidden py-6 bg-ainomiq-surface">
        <div className="flex gap-12 animate-marquee w-max">
          {trustedBy.map((name, i) => (
            <span
              key={i}
              className="text-sm font-semibold uppercase tracking-wider text-ainomiq-text-subtle whitespace-nowrap opacity-50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <Section label="Waarom ainomiq">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Wat ons anders maakt
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Geen consultancybureau dat rapporten schrijft. We bouwen AI die draait.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: "Altijd de nieuwste technologie",
              body: "Wij draaien op de nieuwste modellen en frameworks. Wat gisteren cutting-edge was, is vandaag onze baseline.",
            },
            {
              icon: Clock,
              title: "Live binnen 2 weken",
              body: "Geen maandenlange trajecten. Wij analyseren, bouwen en implementeren. Resultaat vanaf dag 1.",
            },
            {
              icon: Shield,
              title: "Geen legacy, geen ballast",
              body: "Elke oplossing is gebouwd met de technologie van morgen. Geen verouderde systemen, geen aannames.",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="bg-ainomiq-surface border-ainomiq-border hover:border-ainomiq-border-hover transition-colors group"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <item.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Features Grid */}
      <Section label="Platform" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Alles wat je nodig hebt
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Zes AI-modules die samenwerken om je bedrijf te automatiseren.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-ainomiq-surface border-ainomiq-border hover:border-ainomiq-border-hover transition-all group hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <feature.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-transparent text-white"
          >
            <Link href="/platform">
              Bekijk het volledige platform <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Globe — Social Proof */}
      <section className="py-24 px-6 bg-ainomiq-navy-light overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                Vanuit Nederland, voor Europa
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                Actief in <span className="gradient-text">8+ landen</span>
              </h2>
              <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8 max-w-lg">
                Onze AI-oplossingen draaien voor bedrijven door heel Europa. Van
                Amsterdam tot Berlijn, van Londen tot Madrid — geoptimaliseerd
                voor lokale markten.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    8+
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">Landen</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    24/7
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">
                    AI Operations
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    {"<"}2 wk
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">
                    Time to live
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white">
                    99.9%
                  </div>
                  <div className="text-sm text-ainomiq-text-muted">Uptime</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <Globe />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Section label="Pricing" id="pricing">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Simpele pricing, geen verrassingen
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-xl mb-16">
          Start klein, groei mee. Geen langlopende contracten.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-ainomiq-border bg-ainomiq-surface ${
                plan.featured ? "ring-2 ring-ainomiq-blue" : ""
              }`}
            >
              <CardContent className="p-8">
                {plan.featured && (
                  <span className="mb-4 inline-block rounded-full bg-ainomiq-blue px-3 py-1 text-xs font-semibold text-white">
                    Populair
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-ainomiq-text-muted text-sm">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-ainomiq-text-muted mb-6">
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-ainomiq-text-muted"
                    >
                      <Check className="h-4 w-4 text-ainomiq-blue shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full rounded-full ${
                    plan.featured
                      ? "bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white"
                      : "bg-ainomiq-surface-hover border border-ainomiq-border hover:border-ainomiq-border-hover text-white"
                  }`}
                >
                  <Link href="/contact">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Always <span className="gradient-text">ahead.</span>
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Plan een gratis strategiegesprek van 30 minuten. Geen verkooppraatje,
            maar echte inzichten in de mogelijkheden.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12 text-base"
          >
            <Link href="/contact">Plan een gesprek</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
