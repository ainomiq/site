import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { Zap, BadgeCheck, Info, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "We are Ainomiq. Learn more about our team, our mission, and our values.",
};

const values = [
  {
    icon: Zap,
    title: "Building the future",
    body: "We run on the latest technology. What was cutting-edge yesterday is our baseline today.",
  },
  {
    icon: BadgeCheck,
    title: "Results first",
    body: "Everything we build must have measurable impact. No reports that end up in a drawer.",
  },
  {
    icon: Info,
    title: "Honest and direct",
    body: "We say what's possible and what isn't. No hidden costs, no unrealistic promises.",
  },
  {
    icon: Clock,
    title: "Ship fast",
    body: "Two-week implementation isn't marketing speak. We build fast because we carry no legacy.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "Ainomiq founded",
    body: "Bink Sanders starts Ainomiq from the conviction that automation can be faster, more practical, and more affordable.",
  },
  {
    year: "2026",
    title: "First client: Domino's",
    body: "Ainomiq begins building automated store operations for Domino's franchisees.",
  },
  {
    year: "2026",
    title: "App in development",
    body: "The Ainomiq app is being built — six intelligent modules for e-commerce and enterprise.",
  },
  {
    year: "2026+",
    title: "Growth and scale",
    body: "More clients, more modules, international expansion. The story starts here.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Our Story */}
      <section className="pt-40 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Our Story
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Text */}
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Two friends, one obsession
              </h2>
              <div className="space-y-4 text-ainomiq-text-muted text-lg leading-relaxed">
                <p>
                  Ainomiq started with two childhood friends who shared the same obsession: AI.
                  Bink came from years in IT. Pim from e-commerce. Different worlds, same fascination.
                  Both started small, automating parts of their own work. Over time, those small
                  automations turned into something bigger. Entire processes running on autopilot.
                  Teams getting smaller because the systems did the heavy lifting.
                </p>
                <p>
                  That&apos;s when it clicked. If we can do this for ourselves, we can do this for others.
                </p>
                <p>
                  Ainomiq was born from that moment. Two friends, built on mutual respect and a shared
                  belief that AI isn&apos;t just a tool, it&apos;s the foundation of how businesses will run.
                  We started Ainomiq with one conviction: to build the next generation of AI systems.
                  Not something you get delivered and is outdated in six months. We build alongside you
                  and keep optimizing, every single day.
                </p>
              </div>
            </div>
            {/* Portraits */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/team/bink.jpg"
                    alt="Bink Sanders"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold text-ainomiq-text">Bink Sanders</p>
                  <p className="text-sm text-ainomiq-text-muted">Co-Founder</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl">
                  <Image
                    src="/team/pim.jpg"
                    alt="Pim Smit"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-bold text-ainomiq-text">Pim Smit</p>
                  <p className="text-sm text-ainomiq-text-muted">Co-Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ainomiq */}
      <Section label="Why Ainomiq" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          AI moves fast. We move faster.
        </h2>
        <div className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed space-y-4">
          <p>
            At Ainomiq, staying ahead isn&apos;t a goal, it&apos;s how we work. Our team tests and applies new technology every single day, so everything we deliver uses what works best right now.
          </p>
          <p>
            And we keep it that way. Because AI evolves fast, your systems should too. Everything we build is designed to grow, adapt, and keep optimizing as the technology moves forward. That&apos;s what makes Ainomiq different. Not just a one-time solution, but a system that stays ahead.
          </p>
        </div>
      </Section>

      {/* Mission and Impact */}
      <Section label="Mission and Impact">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Bringing every business into the age of AI
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed">
          Every business deserves to benefit from AI, not just the ones with big budgets or tech teams. We&apos;re here to change that. By building smart, evolving systems that make AI work for businesses of any size, we help companies compete in a world that&apos;s changing faster than ever.
        </p>
      </Section>

      {/* Values */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-between overflow-hidden" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #4a3f6b 30%, #8b6fa8 50%, #c4919e 70%, #e8b4a2 85%, #d4a574 100%)' }}>
        {/* Top label */}
        <div className="px-8 pt-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Our values</span>
        </div>

        {/* Centered numbered list */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="space-y-3">
            {[
              { num: '01', title: 'Building the future', desc: 'We run on the latest technology. What was cutting-edge yesterday is our baseline today.' },
              { num: '02', title: 'Results first', desc: 'Everything we build must have measurable impact. No reports that end up in a drawer.' },
              { num: '03', title: 'Honest and direct', desc: 'We say what\'s possible and what isn\'t. No hidden costs, no unrealistic promises.' },
              { num: '04', title: 'Ship fast', desc: 'Two-week implementation isn\'t marketing speak. We build fast because we carry no legacy.' },
            ].map((v, i) => (
              <div key={v.num} className="group flex items-center gap-4 cursor-default">
                <span className={`text-sm font-mono ${ i === 0 ? 'text-white' : 'text-white/40' } group-hover:text-white transition-colors`}>{v.num}</span>
                <span className={`text-xl md:text-2xl font-bold tracking-tight ${ i === 0 ? 'text-white' : 'text-white/40' } group-hover:text-white transition-colors`}>{v.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom description */}
        <div className="px-8 pb-12">
          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            We value decisive action and speed over prolonged deliberation and planning. Every solution ships fast because our clients can&apos;t afford to wait.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <Section label="Our story">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-12">
          Just getting started — and that&apos;s our advantage
        </h2>
        <div className="relative max-w-xl pl-8 border-l-2 border-ainomiq-border space-y-10">
          {timeline.map((item) => (
            <div key={item.title} className="relative pl-6">
              <div className="absolute -left-[calc(0.5rem+1px)] top-1 h-3 w-3 rounded-full bg-ainomiq-blue border-2 border-white" />
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
            Our team is growing. Interested in working at Ainomiq?{" "}
            <Link
              href="/contact"
              className="text-ainomiq-blue font-semibold hover:underline"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </div>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-ainomiq-navy-light">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Let&apos;s get to know each other
          </h2>
          <p className="text-lg text-ainomiq-text-muted mb-10 max-w-lg mx-auto">
            Curious what Ainomiq can do for your business? We&apos;d love to chat.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-10 h-12"
          >
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
