import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/section";
import { Zap, BadgeCheck, Info, Clock, RocketIcon, ArrowRightIcon } from "lucide-react";
import { ValuesScroll } from "@/components/values-scroll";

export const metadata: Metadata = {
  title: "About",
  description:
    "We are Ainomiq. Learn more about our team, our mission, and our values.",
};

const values = [
  {
    icon: Zap,
    num: "01",
    title: "Just get it done",
    body: "We value decisive action and speed over prolonged deliberation and planning.",
  },
  {
    icon: BadgeCheck,
    num: "02",
    title: "Invent what customers want",
    body: "Our core identity must always be rooted in building for our customers; this has been the foundation of our success.",
  },
  {
    icon: Info,
    num: "03",
    title: "Winner's mindset",
    body: "Fiercely competitive nature and fighting spirit are foundational.",
  },
  {
    icon: Clock,
    num: "04",
    title: "The Polymath Principle",
    body: "The best team members understand other functions deeply and promote cross-functional collaboration.",
  },
];


export default function AboutPage() {
  return (
    <>
      {/* About Hero */}
      <section className="relative overflow-hidden border-b border-ainomiq-border bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(59,130,246,0.08),transparent_32%)]"
        />
        <div className="mx-auto max-w-6xl">
          <div className="relative flex min-h-[calc(78vh-4rem)] flex-col items-center justify-center gap-5 px-6 pt-32 pb-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
            >
              <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:left-8" />
              <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-ainomiq-border to-ainomiq-border md:right-8" />
            </div>

            <Link
              className="group relative z-10 mx-auto flex w-fit items-center gap-3 rounded-full border border-ainomiq-border bg-white px-3 py-1 shadow-sm"
              href="#story"
            >
              <RocketIcon className="size-3 text-ainomiq-blue" />
              <span className="text-xs font-medium text-ainomiq-text">
                Systems that work from day one
              </span>
              <span className="block h-5 border-l border-ainomiq-border" />
              <ArrowRightIcon className="size-3 text-ainomiq-text-muted transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </Link>

            <h1 className="relative z-10 text-balance text-center text-5xl font-extrabold tracking-tight text-ainomiq-text md:text-6xl lg:text-7xl">
              Building The{" "}
              <span className="gradient-text">
                Momentum.
              </span>
              <span className="ml-1 inline-block h-[0.9em] w-px translate-y-1 bg-ainomiq-blue" />
            </h1>

            <p className="relative z-10 mx-auto max-w-lg text-center text-base tracking-wider text-ainomiq-text-muted sm:text-lg md:text-xl">
              Built for businesses that refuse to wait.
            </p>

            <div className="relative z-10 flex flex-row flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-full border border-ainomiq-border bg-white text-ainomiq-text hover:bg-ainomiq-navy-light"
              >
                <Link href="/demos">View demos</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-ainomiq-blue text-white shadow-lg shadow-ainomiq-blue/25 hover:bg-ainomiq-blue-hover"
              >
                <Link href="/get-started">
                  Get Started
                  <ArrowRightIcon className="ms-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="pt-24 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Our Story
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Text */}
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Two friends. One idea.
              </h2>
              <div className="space-y-4 text-ainomiq-text-muted text-lg leading-relaxed">
                <p>
                  Pim and Bink have been friends since they were kids. 
                  Pim built e-commerce brands - successful ones. Bink's an IT specialist who knows systems inside out.
                </p>
                <p>
                  Pim started building automation for his own stores. Customer emails, inventory alerts, campaigns - all handled automatically. 
                  It worked so well he showed Bink.
                </p>
                <p>
                  They realized: if this works for one store, it works for every store. 
                  Why should every founder rebuild the same systems?
                </p>
                <p>
                  That's Ainomiq. The systems Pim built for himself, now available to everyone. 
                  Plus custom solutions for businesses that need more than plug-and-play.
                </p>
                <p>
                  No consultants. No reports. Just systems that work from day one.
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

      {/* Team Structure */}
      <section className="overflow-hidden pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
              Team structure
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Built around focused teams
            </h2>
          </div>

          <div className="relative mx-auto max-w-6xl">
            <Card className="group relative z-10 mx-auto w-full max-w-2xl border-ainomiq-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-ainomiq-blue/30 hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)]">
              <CardContent className="p-5">
                <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl bg-ainomiq-blue-glow">
                  <Image
                    src="/team/founders.png"
                    alt="Bink Sanders and Pim Smit"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 672px, calc(100vw - 3rem)"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                  Founders
                </p>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ainomiq-text">
                  Bink & Pim
                </h3>
              </CardContent>
            </Card>

            <div className="relative mx-auto mt-8 max-w-5xl md:mt-0">
              <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-ainomiq-border md:left-1/2 md:top-0 md:h-14 md:-translate-x-1/2" />
              <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-14 hidden h-px bg-ainomiq-border md:block" />

              <div className="grid w-full gap-5 pt-8 md:grid-cols-3 md:pt-24">
              {[
                {
                  team: "Team Development",
                  lead: "Ashar",
                  photo: "/team/ashar.png",
                },
                {
                  team: "Team Sales",
                  lead: "Marnix",
                  photo: "/team/marnix.png",
                },
                {
                  team: "Team HR",
                  lead: "Nynke Jurjus",
                  photo: "/team/nynke.png",
                },
              ].map((item) => (
                <Card
                  key={item.team}
                  className="group relative ml-10 border-ainomiq-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-ainomiq-blue/30 hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)] md:ml-0"
                >
                  <div className="absolute -left-[2.95rem] top-1/2 h-px w-10 bg-ainomiq-border md:-top-10 md:left-1/2 md:h-10 md:w-px md:-translate-x-1/2" />
                  <CardContent className="p-5">
                    <div className="relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-ainomiq-navy-light text-sm font-medium text-ainomiq-text-muted">
                      {item.photo ? (
                        <Image
                          src={item.photo}
                          alt={item.lead}
                          fill
                          className="object-cover object-top"
                        />
                      ) : (
                        "Photo space"
                      )}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                      {item.team}
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ainomiq-text">
                      {item.lead}
                    </h3>
                  </CardContent>
                </Card>
              ))}
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

      {/* Values - scroll-driven */}
      <ValuesScroll />

      {/* Careers at Ainomiq */}
      <section id="jobs" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue">
            Careers at Ainomiq
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            Build the future with us
          </h2>
          <p className="text-ainomiq-text-muted text-lg max-w-2xl leading-relaxed mb-16">
            We&apos;re a small team with big ambitions. At Ainomiq, you won&apos;t sit in meetings about meetings. You&apos;ll ship real AI systems for real businesses - and see the impact from day one.
          </p>

          <div className="space-y-12">
            {[
              {
                dept: "Engineering",
                jobs: [
                  { title: "AI Engineer", location: "Remote" },
                  { title: "Full-Stack Developer", location: "Remote" },
                  { title: "Backend Developer (Python)", location: "Remote" },
                ],
              },
              {
                dept: "Growth",
                jobs: [
                  { title: "Sales & Partnerships", location: "Netherlands" },
                  { title: "Marketing & Content", location: "Remote" },
                ],
              },
            ].map((dept) => (
              <div key={dept.dept}>
                <h3 className="text-lg font-bold mb-0 pb-4 border-b border-ainomiq-border">{dept.dept}</h3>
                {dept.jobs.map((job) => (
                  <Link
                    key={job.title}
                    href="/get-started"
                    className="flex items-center justify-between py-4 border-b border-ainomiq-border group"
                  >
                    <span className="font-semibold group-hover:text-ainomiq-blue transition-colors">{job.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-ainomiq-text-muted">{job.location}</span>
                      <svg className="w-5 h-5 text-ainomiq-text-muted group-hover:text-ainomiq-blue transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.48 10.83H3.33V9.17h10.15L8.81 4.5 10 3.33l6.67 6.67L10 16.67l-1.19-1.17 4.67-4.67z" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
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
            <Link href="/get-started">Get in touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
