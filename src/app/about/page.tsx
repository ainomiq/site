import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RocketIcon,
  ArrowRightIcon,
} from "lucide-react";
import { AboutTypewriterWord } from "@/components/about-typewriter-word";
import { AboutTeamStructure } from "@/components/about-team-structure";
import { LocationMap } from "@/components/ui/expand-map";

export const metadata: Metadata = {
  title: "About",
  description:
    "We are Ainomiq. Learn more about our team, our mission, and our values.",
};

export default function AboutPage() {
  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com/ainomiq",
      icon: "https://images.shadcnspace.com/assets/svgs/icon-facebook.svg",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/ainomiq",
      icon: "https://cdn.simpleicons.org/instagram/E4405F",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/ainomiq",
      icon: "https://images.shadcnspace.com/assets/svgs/icon-linkedin.svg",
    },
  ];

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
              href="/get-started"
            >
              <RocketIcon className="size-3 text-ainomiq-blue" />
              <span className="text-xs font-medium text-ainomiq-text">
                Start implementing
              </span>
              <span className="block h-5 border-l border-ainomiq-border" />
              <ArrowRightIcon className="size-3 text-ainomiq-text-muted transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </Link>

            <h1 className="relative z-10 text-balance text-center text-5xl font-extrabold tracking-tight text-ainomiq-text md:text-6xl lg:text-7xl">
              Building The{" "}
              <span className="gradient-text">
                <AboutTypewriterWord />
              </span>
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
                <Link href="#team">Ainomiq team</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-ainomiq-blue text-white shadow-lg shadow-ainomiq-blue/25 hover:bg-ainomiq-blue-hover"
              >
                <Link href="#story">
                  Ainomiq story
                  <ArrowRightIcon className="ms-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-b border-ainomiq-border bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_auto]">
          <div className="text-center md:text-left">
            <div className="mb-5 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
              Based in Amsterdam
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ainomiq-text md:text-5xl">
              Amsterdam, The Netherlands
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ainomiq-text-muted">
              Built in Amsterdam for businesses that want AI systems, software,
              automations, and workflows that work from day one.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <LocationMap
              location="Amsterdam, The Netherlands"
              coordinates="52.3676° N, 4.9041° E"
            />
          </div>
        </div>
      </section>

      <AboutTeamStructure />

      {/* Socials */}
      <section className="border-y border-ainomiq-border bg-ainomiq-navy-light px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Socials
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-ainomiq-text md:text-4xl">
            Follow the build
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ainomiq-text-muted">
            See what we are building, shipping, and learning as Ainomiq grows.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                asChild
                variant="outline"
                type="button"
                className="size-12 rounded-lg border-ainomiq-border bg-white shadow-sm transition-all duration-300 hover:scale-[1.15] hover:bg-white hover:shadow-md"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open Ainomiq on ${social.label}`}
                >
                  <img
                    src={social.icon}
                    alt={`${social.label} icon`}
                    className="h-5 w-5"
                  />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ainomiq */}
      <section className="bg-white px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Why Ainomiq
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            AI moves fast. We move faster.
          </h2>
          <div className="mx-auto max-w-2xl space-y-4 text-lg leading-relaxed text-ainomiq-text-muted">
            <p>
              At Ainomiq, staying ahead isn&apos;t a goal, it&apos;s how we work. Our team tests and applies new technology every single day, so everything we deliver uses what works best right now.
            </p>
            <p>
              And we keep it that way. Because AI evolves fast, your systems should too. Everything we build is designed to grow, adapt, and keep optimizing as the technology moves forward. That&apos;s what makes Ainomiq different. Not just a one-time solution, but a system that stays ahead.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Impact */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Mission and Impact
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Bringing every business into the age of AI
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ainomiq-text-muted">
            Every business deserves to benefit from AI, not just the ones with big budgets or tech teams. We&apos;re here to change that. By building smart, evolving systems that make AI work for businesses of any size, we help companies compete in a world that&apos;s changing faster than ever.
          </p>
        </div>
      </section>

      {/* Careers at Ainomiq */}
      <section id="jobs" className="bg-ainomiq-navy-light py-24 px-6">
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
