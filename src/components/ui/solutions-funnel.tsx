"use client";

import { useRef } from "react";
import { ProjectRequestForm } from "@/components/get-started/project-request-form";

// ─── Section: Hero ────────────────────────────────────────────────────────────

function Hero({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 text-center">
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute top-20 -right-40 h-[400px] w-[400px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Custom AI solutions - built for your business
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white mb-6">
          Your business.<br />
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Automated.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-xl text-slate-400 leading-relaxed mb-10">
          We build custom AI tools that handle what your team shouldn&apos;t have to.
          Chatbots, dashboards, automations, apps, full website design - scoped and shipped in weeks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCTA}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all"
          >
            Get a free estimate →
          </button>
          <p className="text-sm text-slate-500">No commitment. Reply within 24h.</p>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Pain Points ────────────────────────────────────────────────────

function PainPoints() {
  const pains = [
    {
      emoji: "🔄",
      title: "You're doing the same tasks every day",
      body: "Answering the same emails. Updating spreadsheets. Sending follow-ups manually. Every hour you spend on this is an hour not spent growing.",
    },
    {
      emoji: "📉",
      title: "Your tools don't talk to each other",
      body: "You've got Shopify, a CRM, an email platform, WhatsApp. But none of it is connected. Data gets lost. Things fall through the cracks.",
    },
    {
      emoji: "💸",
      title: "Hiring more people isn't the answer",
      body: "Staff is expensive, unpredictable, and doesn't scale. There's a better way - and it doesn't require a 6-month onboarding.",
    },
    {
      emoji: "⏳",
      title: "Your competitors are moving faster",
      body: "Businesses that automate early win. Not because they're smarter - because they have more time to focus on what actually matters.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Sound familiar?</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            The manual work is killing your growth
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pains.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 hover:border-blue-500/30 transition-colors"
            >
              <div className="text-3xl mb-4">{p.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-slate-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: What We Build ──────────────────────────────────────────────────

function WhatWeBuild() {
  const services = [
    {
      icon: "🤖",
      label: "AI Chatbots",
      desc: "Handle customer support, lead qualification, and FAQs 24/7 - on your website, WhatsApp, Instagram, or email.",
      examples: ["Customer support bots", "Sales qualification bots", "FAQ bots", "WhatsApp automation"],
    },
    {
      icon: "📊",
      label: "Dashboards & Portals",
      desc: "Real-time data, beautiful UI. From internal KPI dashboards to full client portals with authentication.",
      examples: ["KPI dashboards", "Client portals", "Admin panels", "Analytics platforms"],
    },
    {
      icon: "⚡",
      label: "Automations",
      desc: "Connect your tools and automate the workflows draining your time. No more copy-paste between systems.",
      examples: ["Email flows", "Order automation", "CRM sync", "Inventory alerts"],
    },
    {
      icon: "🌐",
      label: "Landing Pages & Websites",
      desc: "High-converting landing pages and full websites designed to turn visitors into customers.",
      examples: ["Campaign pages", "Product launches", "Full site redesigns", "SEO-optimized pages"],
    },
    {
      icon: "📱",
      label: "iOS & Android Apps",
      desc: "Custom mobile apps shipped to the App Store and Google Play - branded, fast, and built to last.",
      examples: ["Consumer apps", "B2B tools", "Loyalty apps", "Companion apps"],
    },
    {
      icon: "🎨",
      label: "Full Site Design",
      desc: "Complete brand experience from scratch. Design systems, component libraries, and pixel-perfect execution.",
      examples: ["Brand design", "UI/UX systems", "Component libraries", "Conversion-optimized UX"],
    },
  ];

  return (
    <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.03) 50%, transparent 100%)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">What we build</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Six tools. One team. Zero nonsense.
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We don&apos;t do generic. Every project is scoped specifically for your business, your stack, and your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7 hover:border-blue-500/40 hover:bg-slate-900/70 transition-all group"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{s.label}</h3>
              <p className="text-slate-400 leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.examples.map((e) => (
                  <span key={e} className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                    {e}
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

// ─── Section: How It Works ───────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "You fill in the brief",
      body: "Tell us what you need. Our form takes 3 minutes. No calls required. You get an instant estimate.",
      color: "#3b82f6",
    },
    {
      num: "02",
      title: "We review and scope",
      body: "Within 24 hours, our team reviews your request, refines the scope, and confirms the plan with you.",
      color: "#6366f1",
    },
    {
      num: "03",
      title: "A dedicated builder starts",
      body: "You're matched with one specialist. Not a team of 10. Weekly demos, constant progress, zero confusion.",
      color: "#8b5cf6",
    },
    {
      num: "04",
      title: "We ship. You own it.",
      body: "Full handover. All code, all credentials, all documentation. Plus 30 days of post-launch support.",
      color: "#a855f7",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">The process</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            From idea to live in weeks
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-purple-500 opacity-30 hidden md:block" />

          <div className="space-y-8">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-8 items-start">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white z-10"
                  style={{ background: `linear-gradient(135deg, ${s.color}33, ${s.color}11)`, border: `1px solid ${s.color}44` }}
                >
                  <span style={{ color: s.color }}>{s.num}</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Social Proof ───────────────────────────────────────────────────

function SocialProof() {
  const stats = [
    { value: "< 48h", label: "Average time to first response" },
    { value: "2-6 wks", label: "Typical delivery time" },
    { value: "30 days", label: "Post-launch support included" },
    { value: "100%", label: "Ownership - all code is yours" },
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

  return (
    <section className="py-24 px-6" style={{ background: "rgba(59,130,246,0.03)" }}>
      <div className="mx-auto max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="text-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-3xl font-black text-blue-400 mb-2">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">What clients say</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Real results. Real businesses.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div key={q.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-5 italic">&ldquo;{q.text}&rdquo;</p>
              <div>
                <div className="text-sm font-semibold text-white">{q.name}</div>
                <div className="text-xs text-slate-500">{q.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Pre-CTA (objection handling) ───────────────────────────────────

function Objections({ onCTA }: { onCTA: () => void }) {
  const objections = [
    {
      q: "Is this just a template?",
      a: "No. Every project is custom-built from scratch. We scope it, architect it, and ship it specifically for you.",
    },
    {
      q: "What if I don't know exactly what I need?",
      a: "That's fine. Tell us the problem. We'll figure out the solution. Our AI-assisted intake form helps clarify scope automatically.",
    },
    {
      q: "What happens after it's built?",
      a: "You own everything. Code, credentials, documentation. Plus 30 days of support for any issues post-launch.",
    },
    {
      q: "How much does it cost?",
      a: "Fill in the form and get an instant estimate. Prices vary by scope - but most projects land between €1,500 and €15,000.",
    },
    {
      q: "How long does it take?",
      a: "Most projects ship in 2-6 weeks. Rush delivery is available for time-sensitive builds.",
    },
    {
      q: "What if I want changes after?",
      a: "We offer ongoing support packages. Or you can take the code and work with any developer. No lock-in.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Before you ask</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Questions we always get
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {objections.map((o) => (
            <div key={o.q} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="font-bold text-white mb-2">{o.q}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{o.a}</p>
            </div>
          ))}
        </div>

        {/* Final push before CTA */}
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-10 text-center">
          <h3 className="text-2xl font-extrabold text-white mb-3">Still on the fence?</h3>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Fill in the form. It takes 3 minutes. You get an instant price estimate - completely free.
            No calls, no pressure. Just a clear proposal in your inbox within 24 hours.
          </p>
          <button
            onClick={onCTA}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all"
          >
            Get my free estimate →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Section: CTA Form ───────────────────────────────────────────────────────

function FormSection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section
      ref={formRef}
      id="get-started"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.05) 50%, transparent 100%)" }}
    >
      <div className="mx-auto max-w-3xl text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Get started</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Tell us what you need
        </h2>
        <p className="text-xl text-slate-400">
          3 minutes. Instant estimate. No commitment required.
        </p>
      </div>
      <ProjectRequestForm />
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SolutionsFunnel() {
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-ainomiq-navy">
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
