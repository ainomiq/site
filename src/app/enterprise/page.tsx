import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import {
  Cog,
  Users,
  BarChart3,
  FileText,
  Layers,
  Lightbulb,
  Lock,
  Code,
  Headphones,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Enterprise AI-oplossingen: process automation, AI agents, data analytics en meer.",
};

const solutions = [
  {
    icon: Cog,
    title: "Process Automation",
    description:
      "Elimineer repetitieve taken. Van data-entry tot rapportage — AI automatiseert wat mensen vertraagt.",
  },
  {
    icon: Users,
    title: "AI Agents",
    description:
      "Autonome digitale medewerkers die zelfstandig taken uitvoeren, beslissingen nemen en samenwerken met je team.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Insights",
    description:
      "Realtime dashboards en voorspellende analytics. Neem betere beslissingen op basis van AI-gestuurde inzichten.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Automatische verwerking van facturen, contracten en rapporten. OCR, extractie en classificatie met AI.",
  },
  {
    icon: Layers,
    title: "Custom AI Development",
    description:
      "Op maat gebouwde AI-modellen voor jouw specifieke use case. Van concept tot productie.",
  },
  {
    icon: Lightbulb,
    title: "AI Strategy Consulting",
    description:
      "Roadmap, haalbaarheidsanalyse en implementatiestrategie. Wij helpen je AI-visie concreet te maken.",
  },
];

const enterpriseFeatures = [
  {
    icon: Lock,
    title: "Security & Compliance",
    subtitle: "AVG-compliant, ISO 27001, EU-hosted",
  },
  {
    icon: Code,
    title: "API Integraties",
    subtitle: "Koppel met elk systeem via REST of GraphQL",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    subtitle: "Persoonlijk team, snelle responstijden",
  },
  {
    icon: BadgeCheck,
    title: "SLA Garantie",
    subtitle: "99.9% uptime, contractueel vastgelegd",
  },
];

const industries = [
  "Retail",
  "Hospitality",
  "Logistics",
  "Finance",
  "Healthcare",
];

const steps = [
  {
    num: "01",
    title: "Analyse",
    body: "Diepgaande analyse van je processen, data en systemen om de grootste AI-kansen te identificeren.",
  },
  {
    num: "02",
    title: "Strategie",
    body: "Een concrete roadmap met prioriteiten, verwachte ROI en implementatieplan op maat.",
  },
  {
    num: "03",
    title: "Implementatie",
    body: "Agile ontwikkeling in sprints. Integratie met je bestaande systemen en uitgebreid testen.",
  },
  {
    num: "04",
    title: "Optimalisatie",
    body: "Continu monitoren, bijsturen en verbeteren. Je AI-systemen worden elke dag slimmer.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Enterprise
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Where automation meets{" "}
            <span className="gradient-text">ambition</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mb-10">
            Van process automation tot autonome AI agents — wij bouwen
            enterprise-grade oplossingen die complexe bedrijfsprocessen aanpakken.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/contact">Plan een strategisch gesprek</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-transparent text-white px-8 h-12"
            >
              <Link href="#oplossingen">Bekijk oplossingen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <Section
        label="Oplossingen"
        id="oplossingen"
        className="bg-ainomiq-navy-light"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          Zes enterprise AI-modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s) => (
            <Card
              key={s.title}
              className="bg-ainomiq-surface border-ainomiq-border hover:border-ainomiq-border-hover transition-all hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <s.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {s.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section label="Onze aanpak">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          Van analyse tot optimalisatie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num}>
              <span className="text-6xl font-extrabold text-ainomiq-blue/10 leading-none block mb-3">
                {step.num}
              </span>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section label="Sectoren" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-10">
          Sectoren waar AI impact maakt
        </h2>
        <div className="flex flex-wrap gap-3">
          {industries.map((ind) => (
            <span
              key={ind}
              className="rounded-full border border-ainomiq-border px-5 py-2 text-sm font-medium text-ainomiq-text-muted"
            >
              {ind}
            </span>
          ))}
        </div>
      </Section>

      {/* Enterprise Features */}
      <Section label="Enterprise-grade">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          Gebouwd voor schaal en veiligheid
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {enterpriseFeatures.map((feat) => (
            <Card
              key={feat.title}
              className="bg-ainomiq-surface border-ainomiq-border text-center"
            >
              <CardContent className="p-6">
                <feat.icon className="h-8 w-8 text-ainomiq-blue mx-auto mb-3" />
                <h4 className="text-sm font-bold mb-1">{feat.title}</h4>
                <p className="text-xs text-ainomiq-text-muted">
                  {feat.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Plan een strategisch gesprek
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Ontdek in 45 minuten hoe AI jouw organisatie kan transformeren.
            Vrijblijvend en vertrouwelijk.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">Plan een gesprek</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
