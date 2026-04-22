"use client";

import { useRef } from "react";
import {
  Bot, LayoutDashboard, Zap, Globe, Smartphone, Paintbrush,
  RefreshCw, Plug, Users, TrendingUp, Check, ArrowRight,
  Clock, Code, Rocket, FileText, MessageCircle, ChevronRight,
  ShieldCheck, Star,
} from "lucide-react";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative overflow-hidden bg-ainomiq-navy">
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.12), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-ainomiq-blue animate-pulse" />
          Custom AI solutions
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-ainomiq-text mb-6">
          Your business.{" "}
          <span className="bg-gradient-to-r from-ainomiq-blue to-violet-400 bg-clip-text text-transparent">
            Automated.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg md:text-xl text-ainomiq-text-muted leading-relaxed mb-10">
          We build the AI tools your business actually needs. Chatbots, dashboards,
          automations, apps, and full site design - scoped and shipped in weeks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCTA}
            className="group inline-flex items-center gap-2 rounded-xl bg-ainomiq-blue px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-ainomiq-blue/25 hover:bg-ainomiq-blue/90 transition-all"
          >
            Get a free estimate
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <p className="text-sm text-ainomiq-text-subtle">No commitment. Response within 24h.</p>
        </div>
      </div>
    </section>
  );
}

// ─── Pain Points ──────────────────────────────────────────────────────────────

const pains = [
  {
    Icon: RefreshCw,
    title: "You're repeating the same tasks every day",
    body: "Answering the same emails. Updating spreadsheets. Sending manual follow-ups. Every hour spent on this is an hour not spent on growth.",
  },
  {
    Icon: Plug,
    title: "Your tools don't connect to each other",
    body: "Shopify, CRM, email platform, WhatsApp - none of it talks. Data slips through the cracks and nothing runs automatically.",
  },
  {
    Icon: Users,
    title: "Hiring more people isn't the answer",
    body: "Staff is expensive, unpredictable, and doesn't scale. There's a faster, cheaper way - one that works around the clock.",
  },
  {
    Icon: TrendingUp,
    title: "Your competitors are automating faster",
    body: "Businesses that automate early have more time to focus on what matters. That gap compounds every week you wait.",
  },
];

function PainPoints() {
  return (
    <section className="bg-ainomiq-navy-light border-y border-ainomiq-border py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            Sound familiar?
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            Manual work is killing your growth
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {pains.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-7 hover:border-ainomiq-blue/30 transition-colors"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ainomiq-blue-glow">
                <Icon className="h-5 w-5 text-ainomiq-blue" />
              </div>
              <h3 className="text-base font-bold text-ainomiq-text mb-2">{title}</h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── What We Build ────────────────────────────────────────────────────────────

const services = [
  {
    Icon: Bot,
    color: "text-ainomiq-blue",
    bg: "bg-ainomiq-blue-glow",
    label: "AI Chatbots",
    desc: "Handle customer support, lead qualification, and FAQs 24/7 across your website, WhatsApp, Instagram, or email.",
    tags: ["Customer support", "Sales qualification", "WhatsApp bots", "FAQ automation"],
  },
  {
    Icon: LayoutDashboard,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "Dashboards & Portals",
    desc: "Real-time data, clean UI. From internal KPI dashboards to full client portals with login and role management.",
    tags: ["KPI dashboards", "Client portals", "Admin panels", "Analytics platforms"],
  },
  {
    Icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    label: "Automations",
    desc: "Connect your tools and automate the workflows eating your time. No more copy-paste between systems.",
    tags: ["Email flows", "Order automation", "CRM sync", "Inventory alerts"],
  },
  {
    Icon: Globe,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    label: "Landing Pages & Websites",
    desc: "High-converting pages and full websites designed to turn visitors into customers from the first scroll.",
    tags: ["Campaign pages", "Product launches", "Full redesigns", "SEO pages"],
  },
  {
    Icon: Smartphone,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    label: "iOS & Android Apps",
    desc: "Custom mobile apps shipped to the App Store and Google Play - branded, fast, and built to last.",
    tags: ["Consumer apps", "B2B tools", "Loyalty apps", "Companion apps"],
  },
  {
    Icon: Paintbrush,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    label: "Full Site Design",
    desc: "Complete brand experience from scratch - design systems, component libraries, pixel-perfect execution.",
    tags: ["Brand design", "UI/UX systems", "Component libraries", "CRO-optimized UX"],
  },
];

function WhatWeBuild() {
  return (
    <section className="bg-ainomiq-navy py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            What we build
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
            Six solutions. One team.
          </h2>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mx-auto">
            Every project is scoped specifically for your business, your stack, and your goals.
            No templates. No guesswork.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ Icon, color, bg, label, desc, tags }) => (
            <div
              key={label}
              className="group rounded-2xl border border-ainomiq-border bg-ainomiq-navy-light p-7 hover:border-ainomiq-blue/40 transition-all"
            >
              <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className={`text-lg font-bold text-ainomiq-text mb-3 group-hover:${color} transition-colors`}>
                {label}
              </h3>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed mb-5">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ainomiq-border bg-ainomiq-navy px-2.5 py-1 text-xs font-medium text-ainomiq-text-subtle"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const steps = [
  {
    Icon: MessageCircle,
    num: "01",
    title: "Fill in the brief",
    body: "Tell us what you need. Takes 3 minutes. No calls required. You get an instant cost estimate on the spot.",
  },
  {
    Icon: FileText,
    num: "02",
    title: "We review and scope",
    body: "Within 24 hours our team reviews your request, refines the scope, and confirms the plan with you.",
  },
  {
    Icon: Code,
    num: "03",
    title: "A dedicated builder starts",
    body: "One specialist - not a committee. Weekly demos, constant progress, zero confusion.",
  },
  {
    Icon: Rocket,
    num: "04",
    title: "We ship. You own it.",
    body: "Full handover: all code, all credentials, all documentation. Plus 30 days of post-launch support.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-ainomiq-navy-light border-y border-ainomiq-border py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            The process
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            From idea to live in weeks
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map(({ Icon, num, title, body }, i) => (
            <div
              key={num}
              className="flex items-start gap-6 rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-7"
            >
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ainomiq-blue-glow border border-ainomiq-blue/20">
                  <Icon className="h-5 w-5 text-ainomiq-blue" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 min-h-4 bg-ainomiq-border" />
                )}
              </div>
              <div className="pt-2">
                <div className="text-xs font-bold text-ainomiq-blue mb-1 uppercase tracking-widest">{num}</div>
                <h3 className="text-lg font-bold text-ainomiq-text mb-2">{title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

const stats = [
  { value: "< 48h", label: "First response time" },
  { value: "2-6 wks", label: "Typical delivery" },
  { value: "30 days", label: "Post-launch support" },
  { value: "100%", label: "Code ownership" },
];

const quotes = [
  {
    text: "We had a fully working customer support bot within 3 weeks. It handles 80% of our tickets automatically now.",
    name: "E-commerce founder",
    detail: "Apparel brand, Netherlands",
  },
  {
    text: "The dashboard they built replaced 4 different tools we were paying for. It pays for itself every month.",
    name: "Operations manager",
    detail: "Logistics company, Belgium",
  },
  {
    text: "I expected it to take months. It was live in 5 weeks and exactly what we asked for.",
    name: "Marketing director",
    detail: "SaaS startup, Germany",
  },
];

function SocialProof() {
  return (
    <section className="bg-ainomiq-navy py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy-light p-6 text-center"
            >
              <div className="text-3xl font-extrabold text-ainomiq-blue mb-2">{s.value}</div>
              <div className="text-xs text-ainomiq-text-subtle">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            What clients say
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            Real results. Real businesses.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy-light p-7"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed mb-5 italic">
                &ldquo;{q.text}&rdquo;
              </p>
              <div>
                <div className="text-sm font-semibold text-ainomiq-text">{q.name}</div>
                <div className="text-xs text-ainomiq-text-subtle mt-0.5">{q.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Objections ───────────────────────────────────────────────────────────────

const objections = [
  {
    q: "Is this just a template?",
    a: "No. Every project is custom-built from scratch. We scope it, architect it, and ship it specifically for you.",
  },
  {
    q: "What if I don't know exactly what I need?",
    a: "That's fine. Tell us the problem. We'll figure out the solution. Our intake form helps clarify scope automatically.",
  },
  {
    q: "What happens after it's built?",
    a: "You own everything - code, credentials, documentation. Plus 30 days of support for any issues post-launch.",
  },
  {
    q: "How much does it cost?",
    a: "Fill in the form and get an instant estimate. Most projects land between EUR 1,500 and EUR 15,000 depending on scope.",
  },
  {
    q: "How long does it take?",
    a: "Most projects ship in 2 to 6 weeks. Rush delivery is available for time-sensitive builds.",
  },
  {
    q: "What if I want changes after?",
    a: "We offer ongoing support packages. Or take the code to any developer. No lock-in, ever.",
  },
];

function Objections({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="bg-ainomiq-navy-light border-y border-ainomiq-border py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            Before you ask
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            Common questions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {objections.map((o) => (
            <div
              key={o.q}
              className="rounded-2xl border border-ainomiq-border bg-ainomiq-navy p-6"
            >
              <div className="flex items-start gap-3 mb-2">
                <Check className="h-4 w-4 text-ainomiq-blue mt-0.5 flex-shrink-0" />
                <h3 className="text-sm font-bold text-ainomiq-text">{o.q}</h3>
              </div>
              <p className="text-sm text-ainomiq-text-muted leading-relaxed pl-7">{o.a}</p>
            </div>
          ))}
        </div>

        {/* Pre-CTA nudge */}
        <div
          className="rounded-2xl border border-ainomiq-blue/30 p-10 text-center"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.08), transparent)",
          }}
        >
          <ShieldCheck className="h-8 w-8 text-ainomiq-blue mx-auto mb-4" />
          <h3 className="text-2xl font-extrabold text-ainomiq-text mb-3">
            Still not sure? Just fill in the form.
          </h3>
          <p className="text-ainomiq-text-muted mb-6 max-w-md mx-auto">
            3 minutes. Instant price estimate. No calls, no pressure. A clear proposal in
            your inbox within 24 hours.
          </p>
          <button
            onClick={onCTA}
            className="group inline-flex items-center gap-2 rounded-xl bg-ainomiq-blue px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-ainomiq-blue/25 hover:bg-ainomiq-blue/90 transition-all"
          >
            Get my free estimate
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Form Section ─────────────────────────────────────────────────────────────

function FormSection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section ref={formRef} id="get-started" className="bg-ainomiq-navy py-24 px-6">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
          Get started
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
          Tell us what you need
        </h2>
        <p className="text-lg text-ainomiq-text-muted">
          3 minutes. Instant estimate. No commitment.
        </p>
      </div>
      <ProjectRequestForm />
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function SolutionsFunnel() {
  const formRef = useRef<HTMLDivElement>(null);
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-ainomiq-navy">
      <Hero onCTA={scrollToForm} />
      <PainPoints />
      <WhatWeBuild />
      <HowItWorks />
      <SocialProof />
      <Objections onCTA={scrollToForm} />
      <FormSection formRef={formRef} />
    </div>
  );
}
