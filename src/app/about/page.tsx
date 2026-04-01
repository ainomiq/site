import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { TeamSection } from "@/components/team-section";
import { Zap, BadgeCheck, Info, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Wij zijn Ainomiq. Leer meer over ons team, onze missie en onze waarden.",
};

const values = [
  {
    icon: Zap,
    title: "Altijd voorop",
    body: "We draaien op de nieuwste AI-technologie. Wat gisteren cutting-edge was, is vandaag onze baseline.",
  },
  {
    icon: BadgeCheck,
    title: "Resultaat eerst",
    body: "Alles wat we bouwen moet meetbare impact hebben. Geen rapporten die in een la belanden.",
  },
  {
    icon: Info,
    title: "Eerlijk en direct",
    body: "We zeggen wat kan en wat niet. Geen verborgen kosten, geen onrealistische beloftes.",
  },
  {
    icon: Clock,
    title: "Snel leveren",
    body: "Twee weken implementatie is geen marketingpraatje. We bouwen snel omdat we geen legacy meeslepen.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "Ainomiq opgericht",
    body: "Bink Sanders start Ainomiq vanuit de overtuiging dat AI-implementatie sneller, praktischer en betaalbaarder kan.",
  },
  {
    year: "2026",
    title: "Eerste klant: Domino's",
    body: "Ainomiq gaat AI-gestuurde store operations bouwen voor Domino's franchisenemers.",
  },
  {
    year: "2026",
    title: "Platform in ontwikkeling",
    body: "Het Ainomiq platform wordt gebouwd — zes AI-modules voor e-commerce en enterprise.",
  },
  {
    year: "2026+",
    title: "Groei en schaal",
    body: "Meer klanten, meer modules, internationaal. Het verhaal begint hier.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Over Ainomiq
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Wij zijn{" "}
            <span className="gradient-text">Ainomiq</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl">
            Een jong AI-bedrijf dat bouwt wat werkt. Geen hype, geen lege
            beloftes — concrete oplossingen die je bedrijf vooruit helpen.
          </p>
        </div>
      </section>

      {/* Mission */}
      <Section label="Onze missie" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          AI toegankelijk maken voor elk bedrijf
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed">
          AI hoeft niet ingewikkeld of duur te zijn. Wij maken het praktisch,
          betaalbaar en effectief. Of je nu een webshop runt of een enterprise
          leidt — wij bouwen AI die voor je werkt vanaf dag 1.
        </p>
      </Section>

      {/* Team — Marquee Section */}
      <TeamSection />

      {/* Values */}
      <Section label="Onze waarden" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          Waar we voor staan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <Card
              key={v.title}
              className="bg-ainomiq-surface border-ainomiq-border text-center"
            >
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ainomiq-blue-glow">
                  <v.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                  {v.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section label="Ons verhaal">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-12">
          Net begonnen — en dat is ons voordeel
        </h2>
        <div className="relative max-w-xl pl-8 border-l-2 border-ainomiq-border space-y-10">
          {timeline.map((item) => (
            <div key={item.title} className="relative pl-6">
              <div className="absolute -left-[calc(0.5rem+1px)] top-1 h-3 w-3 rounded-full bg-ainomiq-blue border-2 border-ainomiq-navy" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                {item.year}
              </span>
              <h3 className="font-bold mt-1 mb-1">{item.title}</h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Hiring CTA */}
      <div className="px-6 pb-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-ainomiq-text-subtle">
            Ons team groeit. Geïnteresseerd in werken bij Ainomiq?{" "}
            <Link
              href="/contact"
              className="text-ainomiq-blue font-semibold hover:underline"
            >
              Neem contact op
            </Link>
          </p>
        </div>
      </div>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-ainomiq-navy-light">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Laten we kennismaken
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Benieuwd wat Ainomiq voor jouw bedrijf kan betekenen? We praten
            graag.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">Neem contact op</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
