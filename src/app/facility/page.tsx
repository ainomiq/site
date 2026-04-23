import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Shield, Utensils, Sparkles, Clock, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Facility Services - Ainomiq",
  description: "AI automation for cleaning, security, and catering companies. Less admin, more control.",
};

const sectors = [
  {
    icon: Sparkles,
    title: "Cleaning",
    points: [
      "Automatic scheduling across locations",
      "Client reports sent automatically after each visit",
      "Quality checks without calling around",
      "Staff changes handled without manual rescheduling",
    ],
  },
  {
    icon: Shield,
    title: "Security",
    points: [
      "Incident reports drafted and sent automatically",
      "Shift coverage gaps flagged before they happen",
      "Client communication handled 24/7",
      "Compliance checklists automated",
    ],
  },
  {
    icon: Utensils,
    title: "Catering",
    points: [
      "Order confirmations and changes handled automatically",
      "Dietary requirements tracked per client",
      "Invoices generated and sent without manual input",
      "Last-minute requests answered instantly",
    ],
  },
];

const results = [
  { value: "80%", label: "Less admin time", desc: "Reports, scheduling, and client updates - automated" },
  { value: "24/7", label: "Client support", desc: "Questions answered instantly, even outside office hours" },
  { value: "<2 days", label: "To go live", desc: "Connected to your existing tools, no IT project needed" },
  { value: "0", label: "Missed follow-ups", desc: "Every client gets a response, every time" },
];

export default function FacilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue mb-6">
            Facility Services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Less time on admin.{" "}
            <span className="text-ainomiq-blue">More time on the job.</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mx-auto mb-10">
            Ainomiq handles the repetitive work - scheduling, reporting, client communication - so your team can focus on delivering the service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8 h-12 font-bold">
              <Link href="/get-started#book-demo">
                Book a demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-12 border-ainomiq-border text-ainomiq-text hover:bg-ainomiq-navy-light">
              <Link href="/get-started">See how it works</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((r) => (
            <div key={r.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-ainomiq-blue mb-1">{r.value}</div>
              <div className="font-bold text-sm mb-1">{r.label}</div>
              <div className="text-xs text-ainomiq-text-muted">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Built for your sector
            </h2>
            <p className="text-ainomiq-text-muted mt-4 max-w-xl mx-auto">
              Whether you run a cleaning company, security firm, or catering operation - Ainomiq fits in without disrupting how you work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((s) => (
              <div key={s.title} className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                  <s.icon className="h-6 w-6 text-ainomiq-blue" />
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <ul className="space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-ainomiq-text-muted">
                      <Check className="h-4 w-4 text-ainomiq-blue shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-ainomiq-navy-light">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 mb-12">
            Up and running in 2 days
          </h2>
          <div className="space-y-8">
            {[
              { num: "01", title: "We connect to your tools", body: "Planning software, email, WhatsApp - we plug in to what you already use. No new systems." },
              { num: "02", title: "We set up the automations", body: "Scheduling, reports, client messages. Configured to match how your business works." },
              { num: "03", title: "You see the difference immediately", body: "Less back-and-forth. Clients get faster responses. Your team has more time." },
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
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            See what it does for your company.
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
            30-minute demo. We show you exactly which tasks we can take off your plate.
          </p>
          <Button asChild size="lg" className="rounded-full bg-ainomiq-blue text-white hover:bg-ainomiq-blue/90 px-10 h-12 font-bold">
            <Link href="/get-started#book-demo">
              Book a demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
