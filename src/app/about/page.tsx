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
    title: "Just get it done",
    body: "We run on the latest technology. What was cutting-edge yesterday is our baseline today.",
  },
  {
    icon: BadgeCheck,
    title: "Invent what customers want",
    body: "Everything we build must have measurable impact. No reports that end up in a drawer.",
  },
  {
    icon: Info,
    title: "Winner's mindset",
    body: "We say what's possible and what isn't. No hidden costs, no unrealistic promises.",
  },
  {
    icon: Clock,
    title: "The Polymath Principle",
    body: "Two-week implementation isn't marketing speak. We build fast because we carry no legacy.",
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
      <Section label="Our values" className="bg-ainomiq-navy-light">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <Card
              key={v.title}
              className="bg-white border-ainomiq-border text-center"
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

      {/* Careers */}
      <Section label="Careers">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Build the future with us
        </h2>
        <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed mb-4">
          We&apos;re a small team with big ambitions. At Ainomiq, you won&apos;t sit in meetings about meetings. You&apos;ll ship real AI systems for real businesses — and see the impact from day one.
        </p>
      </Section>
      <section className="py-32">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-left text-3xl font-medium md:text-4xl">Open positions</h2>
            <div className="mx-auto mt-6 flex flex-col gap-16 md:mt-14">
              <div className="grid">
                <h3 className="border-b pb-4 text-xl font-bold">Engineering</h3>
                {[
                  { title: "AI Engineer", location: "Remote" },
                  { title: "Full-Stack Developer", location: "Remote" },
                  { title: "Backend Developer (Python)", location: "Remote" },
                ].map((job) => (
                  <div key={job.title} className="flex items-center justify-between border-b py-4">
                    <Link href="/contact" className="font-semibold hover:underline">{job.title}</Link>
                    <Button variant="outline" size="sm" className="pointer-events-none rounded-full">{job.location}</Button>
                  </div>
                ))}
              </div>
              <div className="grid">
                <h3 className="border-b pb-4 text-xl font-bold">Growth</h3>
                {[
                  { title: "Sales & Partnerships", location: "Netherlands" },
                  { title: "Marketing & Content", location: "Remote" },
                ].map((job) => (
                  <div key={job.title} className="flex items-center justify-between border-b py-4">
                    <Link href="/contact" className="font-semibold hover:underline">{job.title}</Link>
                    <Button variant="outline" size="sm" className="pointer-events-none rounded-full">{job.location}</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
