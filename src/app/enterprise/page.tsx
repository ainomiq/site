import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { TopRequestedSolutions } from "@/components/ui/top-requested-solutions";
import {
  MessageCircle,
  Smartphone,
  ArrowRight,
  Check,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Solutions",
  description:
    "Custom solutions: automation suites, chatbots, mobile apps, and more. Built for your business.",
};

const customSolutions = [
  {
    id: "workflow",
    icon: Workflow,
    title: "Workflow",
    headline: "Custom workflows that remove manual work",
    description:
      "We design workflows around the way your business actually runs. Orders, tickets, reports, approvals, and handoffs move automatically between your tools and teams.",
    capabilities: [
      "Built around your exact process",
      "Connects the tools you already use",
      "Triggers, approvals, and follow-ups automated",
      "Clear reporting on every step",
    ],
    stat: "0",
    statLabel: "manual handoffs",
  },
  {
    id: "chatbot",
    icon: MessageCircle,
    title: "Chatbot",
    headline: "Intelligent conversations, anywhere",
    description:
      "Intelligent chatbots for your website, WhatsApp, Instagram, and more. Trained on your knowledge base, answering questions and converting visitors into customers 24/7.",
    capabilities: [
      "Website, WhatsApp & social media",
      "Trained on your products and FAQs",
      "Seamless handoff to human agents",
      "Multi-language support",
    ],
    stat: "24/7",
    statLabel: "always available",
  },
  {
    id: "app",
    icon: Smartphone,
    title: "App",
    headline: "Your brand, in every pocket",
    description:
      "Custom iOS and Android apps built with intelligence at the core. From loyalty programs to real-time order tracking - a mobile experience your customers will love.",
    capabilities: [
      "iOS & Android (Playstore)",
      "Push notifications & engagement",
      "Integrated with your backend",
      "Smart personalization",
    ],
    stat: "2",
    statLabel: "platforms, one codebase",
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Custom Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Where automation meets{" "}
            <span className="gradient-text">ambition</span>
          </h1>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mb-10">
            From automation suites to custom chatbots and mobile apps - we
            build solutions that tackle your specific business challenges.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-8 h-12"
            >
              <Link href="/get-started#book-demo">Book a strategy call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-ainomiq-navy text-ainomiq-text px-8 h-12"
            >
              <Link href="#workflow">View solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Solutions - scrollable sections */}
      {customSolutions.map((sol, i) => (
        <section
          key={sol.id}
          id={sol.id}
          className={`scroll-mt-28 px-6 py-16 md:py-24 ${i % 2 === 0 ? "bg-ainomiq-navy-light" : ""}`}
        >
          <div className="mx-auto max-w-6xl">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              <div className={i % 2 !== 0 ? "lg:col-start-2" : ""}>
                <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
                  {String(i + 1).padStart(2, "0")} - {sol.title}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  {sol.headline}
                </h2>
                <p className="text-ainomiq-text-muted text-lg leading-relaxed mb-8">
                  {sol.description}
                </p>
                <ul className="space-y-3">
                  {sol.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-3 text-sm text-ainomiq-text-muted"
                    >
                      <Check className="h-4 w-4 text-ainomiq-blue shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stat card */}
              <div className={`flex items-center justify-center ${i % 2 !== 0 ? "lg:col-start-1" : ""}`}>
                <Card className="bg-ainomiq-navy border-ainomiq-border w-full max-w-sm">
                  <CardContent className="p-10 text-center">
                    <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ainomiq-blue-glow">
                      <sol.icon className="h-8 w-8 text-ainomiq-blue" />
                    </div>
                    <div className="text-5xl font-extrabold tracking-tight text-[#0f1b2d] mb-2">
                      {sol.stat}
                    </div>
                    <p className="text-sm text-ainomiq-text-muted">
                      {sol.statLabel}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Top 10 Most Requested Solutions */}
      <TopRequestedSolutions />

      {/* CTA */}
      <section className="px-6 py-20 text-center md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Book a strategy call
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Discover in 45 minutes how automation can transform your organization. No
            obligations, completely confidential.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
            >
              <Link href="/get-started#book-demo">Book a call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-ainomiq-border hover:border-ainomiq-border-hover bg-ainomiq-navy text-ainomiq-text px-8 h-12"
            >
              <Link href="/custom">
                Request directly <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
