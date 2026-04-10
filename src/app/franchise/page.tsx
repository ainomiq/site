import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { TrendingDown, TrendingUp, DollarSign, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Franchise AI — Ainomiq",
  description:
    "Cut costs, boost efficiency, and increase profit per location with AI-powered franchise operations.",
};

const results = [
  { icon: TrendingDown, value: "30%", label: "Labour cost reduction", desc: "AI identifies overspend patterns and optimizes scheduling across every shift." },
  { icon: Clock, value: "2 weeks", label: "Up and running", desc: "No 6-month rollout. Your AI system is live and learning within 14 days." },
  { icon: TrendingUp, value: "15%", label: "Revenue improvement", desc: "Smarter staffing + less waste = more profit per location, automatically." },
  { icon: DollarSign, value: "€8K+", label: "Saved per store per year", desc: "Across scheduling, inventory, and operational efficiency — measurable from month one." },
];

export default function FranchisePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Franchise
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Cut costs. Boost efficiency.{" "}
            <span className="gradient-text">Increase profit per location.</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mx-auto leading-relaxed mb-10">
            Franchise operations waste thousands on overstaffing, manual scheduling, and inventory guesswork. Ainomiq&apos;s AI fixes that — automatically, from day one.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/contact">Get a demo</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-ainomiq-border px-8 h-12"
            >
              <Link href="/contact">Watch video</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Results / ROI */}
      <Section label="Real results" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          The numbers that matter
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed mb-12">
          Every franchise owner cares about one thing: the bottom line. Here&apos;s what AI delivers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((r) => (
            <Card key={r.label} className="bg-white border-ainomiq-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                    <r.icon className="h-6 w-6 text-ainomiq-blue" />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tight text-ainomiq-blue">{r.value}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{r.label}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* What we do */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
            What we do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-12">
            AI that runs your stores — so you don&apos;t have to
          </h2>
          <div className="space-y-10">
            {[
              {
                num: "01",
                title: "We connect to your systems",
                body: "POS, planning tools, sales data — we plug into what you already have. No new hardware, no disruption.",
              },
              {
                num: "02",
                title: "AI takes over the busywork",
                body: "Scheduling, demand prediction, inventory — AI handles it 24/7. Your managers focus on customers, not spreadsheets.",
              },
              {
                num: "03",
                title: "You see the results immediately",
                body: "Lower labour costs, less waste, better shifts. Real-time dashboards show exactly where you're saving and earning more.",
              },
            ].map((s) => (
              <div key={s.num} className="flex gap-6">
                <span className="text-3xl font-extrabold text-ainomiq-blue/20 shrink-0">{s.num}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-ainomiq-text-muted leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            See what AI can save your franchise
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Book a 30-minute demo. We&apos;ll show you exactly how much you can save per location.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">
              Get a demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
