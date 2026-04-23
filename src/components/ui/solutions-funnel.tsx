"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Bot, LayoutDashboard, Zap, Globe, Smartphone, Paintbrush,
  RefreshCw, Plug, Users, TrendingUp, Check, ArrowRight,
  Code, Rocket, FileText, MessageCircle, ChevronRight,
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

      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-ainomiq-blue animate-pulse" />
          Custom AI solutions
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-ainomiq-text mb-6 text-balance">
          Smart companies don&apos;t hire more.{" "}
          <span className="bg-gradient-to-r from-ainomiq-blue to-violet-400 bg-clip-text text-transparent">
            They use smarter systems.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg md:text-xl text-ainomiq-text-muted leading-relaxed mb-10">
          We build those systems. Custom to how your business actually works. AI that quietly takes the repetitive work off your team, so they can focus on what moves the company forward.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCTA}
            className="group inline-flex items-center gap-2 rounded-xl bg-ainomiq-blue px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-ainomiq-blue/25 hover:bg-ainomiq-blue/90 transition-all"
          >
            See what AI could take over
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Pain Points ──────────────────────────────────────────────────────────────

const pains = [
  {
    Icon: RefreshCw,
    title: "You're not short on people.",
    body: "You're short on hours. Admin, follow-ups, reports. They eat the day before the real work starts.",
  },
  {
    Icon: Plug,
    title: "Your tools don't talk to each other.",
    body: "So your team fills the gaps. Manually. Every day. That's not a workflow, that's a cost.",
  },
  {
    Icon: Users,
    title: "You keep hiring. Costs keep climbing.",
    body: "More headcount means more overhead. AI doesn't call in sick, doesn't scale linearly, never asks for a raise.",
  },
  {
    Icon: TrendingUp,
    title: "Your industry hasn't been touched by AI yet.",
    body: "That's about to change. The question isn't if. It's who gets there first in your sector.",
  },
];

function PainPoints() {
  return (
    <section className="bg-ainomiq-navy-light border-y border-ainomiq-border py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            Sound familiar?
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            You&apos;re not behind.<br />You&apos;re just still doing it manually.
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

// ─── Portfolio / Built By Us ─────────────────────────────────────────────────

const projects = [
  {
    client: "Consumer brand",
    logo: "/logos/billie-jeans.png",
    type: "AI Customer Support",
    Icon: Bot,
    accentColor: "#3b82f6",
    shipped: "3 weeks",
    headline: "Cut support tickets by 80%. Same team size.",
    result: "Resolves email, Instagram & Facebook DMs automatically",
    // Preview: chat UI mockup
    preview: (
      <div className="rounded-xl bg-[#0d1117] border border-white/10 p-4 text-left space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 h-6 w-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Bot className="h-3 w-3 text-blue-400" />
          </div>
          <div className="rounded-2xl rounded-tl-none bg-white/5 border border-white/8 px-3 py-2 text-xs text-white/80 max-w-[80%]">
            Hi! Your order is on its way - estimated delivery in 3-5 days.
          </div>
        </div>
        <div className="flex items-start gap-2.5 flex-row-reverse">
          <div className="mt-0.5 h-6 w-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[9px] font-bold text-white/60">C</div>
          <div className="rounded-2xl rounded-tr-none bg-blue-500/20 border border-blue-500/20 px-3 py-2 text-xs text-white/80 max-w-[80%]">
            Can I change my delivery address?
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 h-6 w-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <Bot className="h-3 w-3 text-blue-400" />
          </div>
          <div className="rounded-2xl rounded-tl-none bg-white/5 border border-white/8 px-3 py-2 text-xs text-white/80 max-w-[80%]">
            Of course! Please share your new address and I will update it right away.
          </div>
        </div>
      </div>
    ),
  },
  {
    client: "Padelland",
    logo: "/logos/padelland.png",
    type: "Booking Dashboard",
    Icon: LayoutDashboard,
    accentColor: "#10b981",
    shipped: "4 weeks",
    headline: "Zero admin hours on bookings. Ever again.",
    result: "Real-time courts, members, payments in one view",
    preview: (
      <div className="rounded-xl bg-[#0d1117] border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Today's Courts</span>
          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5">Live</span>
        </div>
        <div className="space-y-2">
          {[["Court 1","09:00","Booked","#10b981"],["Court 2","11:00","Open","#3b82f6"],["Court 3","14:00","Booked","#10b981"],["Court 4","16:00","Open","#3b82f6"]].map(([court,time,status,color]) => (
            <div key={court} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
              <span className="text-[10px] font-medium text-white/80">{court}</span>
              <span className="text-[9px] text-white/40">{time}</span>
              <span className="text-[9px] font-semibold rounded-full px-2 py-0.5" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    client: "AccuExpert",
    logo: "/logos/accu-expert.png",
    type: "Full Website",
    Icon: Globe,
    accentColor: "#8b5cf6",
    shipped: "2 weeks",
    headline: "New site. New leads. Fully automated pipeline.",
    result: "Quote tool + CRM sync running day one",
    preview: (
      <div className="rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden">
        <div className="bg-violet-500/10 border-b border-white/8 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 rounded bg-white/10 h-4 mx-2" />
        </div>
        <div className="p-4 space-y-2">
          <div className="h-3 rounded-full bg-white/15 w-2/3" />
          <div className="h-2 rounded-full bg-white/8 w-full" />
          <div className="h-2 rounded-full bg-white/8 w-4/5" />
          <div className="mt-3 h-8 rounded-lg bg-violet-500/30 border border-violet-500/30 flex items-center justify-center">
            <span className="text-[9px] font-bold text-violet-300">Get Free Quote</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    client: "Domino's",
    logo: "/logos/dominos.png",
    type: "Order Automation",
    Icon: Zap,
    accentColor: "#f59e0b",
    shipped: "5 weeks",
    headline: "60% faster orders. Across every location.",
    result: "Routing + upsell running in every store, 24/7",
    preview: (
      <div className="rounded-xl bg-[#0d1117] border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Order Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          {[["Received","#f59e0b"],["Assigned","#f59e0b"],["Making","#f59e0b"],["Delivered","#10b981"]].map(([label, color], i) => (
            <>
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ background: `${color}20`, border: `1.5px solid ${color}60` }}>
                  <Check className="h-3 w-3" style={{ color }} />
                </div>
                <span className="text-[7px] text-white/50 text-center leading-tight">{label}</span>
              </div>
              {i < 3 && <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-amber-500/20 mb-3" />}
            </>
          ))}
        </div>
      </div>
    ),
  },
  {
    client: "SchoolRegister",
    logo: "/logos/schoolregister.png",
    type: "iOS & Android App",
    Icon: Smartphone,
    accentColor: "#ec4899",
    shipped: "6 weeks",
    headline: "Replaced 3 spreadsheets with one app.",
    result: "Live in App Store and Google Play",
    preview: (
      <div className="flex justify-center">
        <div className="w-28 rounded-[20px] border border-white/15 bg-[#0d1117] overflow-hidden" style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
          <div className="bg-pink-500/10 border-b border-white/8 px-2 py-1.5 flex items-center justify-center">
            <div className="h-1.5 w-8 rounded-full bg-white/20" />
          </div>
          <div className="p-2 space-y-1.5">
            <div className="h-2.5 rounded bg-pink-500/30 border border-pink-500/20 flex items-center px-1">
              <span className="text-[5px] text-pink-300 font-bold">SchoolRegister</span>
            </div>
            {["Mon","Wed","Fri"].map(d => (
              <div key={d} className="flex items-center justify-between rounded bg-white/5 px-1.5 py-1">
                <span className="text-[6px] text-white/60">{d}</span>
                <span className="text-[6px] text-emerald-400">09:00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    client: "Alpina",
    logo: "/logos/alpina.png",
    type: "Brand Design",
    Icon: Paintbrush,
    accentColor: "#06b6d4",
    shipped: "3 weeks",
    headline: "New identity. Ready for market launch.",
    result: "Logo, design system, and brand kit delivered",
    preview: (
      <div className="rounded-xl bg-[#0d1117] border border-white/10 p-4 space-y-3">
        <div className="flex gap-2">
          {["#06b6d4","#0e7490","#1e3a5f","#f8fafc","#64748b"].map(c => (
            <div key={c} className="h-8 flex-1 rounded-lg" style={{ background: c }} />
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="h-4 rounded bg-white/10 w-1/2" style={{ background: "rgba(6,182,212,0.2)" }} />
          <div className="h-2.5 rounded bg-white/8 w-full" />
          <div className="h-2.5 rounded bg-white/8 w-4/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 flex-1 rounded-lg flex items-center justify-center" style={{ background: "#06b6d420", border: "1px solid #06b6d440" }}>
            <span className="text-[8px] font-bold text-cyan-400">Aa</span>
          </div>
          <div className="h-7 flex-1 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
            <span className="text-[8px] text-white/50">Logo</span>
          </div>
        </div>
      </div>
    ),
  },
];

function WhatWeBuild() {
  return (
    <section className="bg-ainomiq-navy py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            Our work
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
            Built by us. Running every day.
          </h2>
          <p className="text-lg text-ainomiq-text-muted max-w-2xl mx-auto">
            Not case studies. Live systems, quietly doing the work for real companies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(({ client, logo, type, accentColor, headline, result, preview, shipped }) => (
            <div
              key={client}
              className="group rounded-2xl border border-ainomiq-border bg-ainomiq-navy-light overflow-hidden hover:border-ainomiq-blue/30 transition-all"
            >
              {/* Preview area with shipped pill */}
              <div
                className="relative p-5 border-b border-ainomiq-border"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}08, transparent)` }}
              >
                {shipped && (
                  <div className="absolute top-3 right-3 z-10 rounded-full bg-ainomiq-navy/80 backdrop-blur-sm border border-ainomiq-blue/30 px-2.5 py-1 text-[10px] font-semibold text-ainomiq-blue">
                    Shipped in {shipped}
                  </div>
                )}
                {preview}
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={logo} alt={client} className="h-6 w-auto object-contain opacity-80" />
                  <div
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}
                  >
                    {type}
                  </div>
                </div>
                <p className="text-base font-bold text-ainomiq-text mb-3 leading-snug">{headline}</p>
                <div className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-xs text-ainomiq-text-subtle">{result}</span>
                </div>
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
    title: "Tell us what's eating your week.",
    body: "Three minutes. No calls. You describe the work you want to stop doing, we give you a price on the spot.",
  },
  {
    Icon: FileText,
    num: "02",
    title: "We scope it within 24 hours.",
    body: "Our team reads your brief, sharpens the scope, confirms the plan. No sales call unless you want one.",
  },
  {
    Icon: Code,
    num: "03",
    title: "One builder. Not a committee.",
    body: "A dedicated specialist starts building. Weekly demos, constant progress, zero handoff confusion.",
  },
  {
    Icon: Rocket,
    num: "04",
    title: "We ship. You own it.",
    body: "All code, all credentials, all documentation. Plus 30 days of support after launch. No lock-in.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-ainomiq-navy-light border-y border-ainomiq-border py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            The process
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            From idea to running in weeks.<br />Not quarters.
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map(({ Icon, num, title, body }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────

const quotes = [
  {
    text: "It replaced an entire shift of support work. Nobody noticed the handover because it just answered faster.",
    name: "Operations lead",
    detail: "Multi-location franchise, NL",
  },
  {
    text: "We were paying four tools to do what one dashboard now does. The difference lands in the P&L every month.",
    name: "Operations manager",
    detail: "Logistics company, BE",
  },
  {
    text: "I expected a months-long project. It was live in five weeks. Exactly what we asked for.",
    name: "Marketing director",
    detail: "B2B SaaS, DE",
  },
];

function SocialProof() {
  return (
    <section className="bg-ainomiq-navy py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Testimonials */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            What clients say
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            Built it. Shipped it.<br />They kept using it.
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
    a: "No. Every project is built from scratch, scoped and architected specifically for how your business works.",
  },
  {
    q: "What if I don't know exactly what I need?",
    a: "That's fine. Tell us the problem, we'll shape the solution. The intake form walks you through it.",
  },
  {
    q: "What happens after it's built?",
    a: "You own everything. Code, credentials, documentation. Plus 30 days of support after launch.",
  },
  {
    q: "How much does it cost?",
    a: "Most projects land between EUR 95 and EUR 25,000. Fill in the form and see your exact estimate in 3 minutes.",
  },
  {
    q: "How long does it take?",
    a: "Most projects ship in 2 to 6 weeks. Rush delivery is available when you need it sooner.",
  },
  {
    q: "What if I want changes later?",
    a: "Ongoing support packages available. Or take the code to any developer. No lock-in, ever.",
  },
];

function Objections({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="bg-ainomiq-navy-light border-y border-ainomiq-border py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">
            Before you ask
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text">
            The questions you&apos;re about to ask.
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
            Still thinking? Just fill in the form.
          </h3>
          <p className="text-ainomiq-text-muted mb-6 max-w-md mx-auto">
            3 minutes. Instant price estimate. No calls, no pressure. A clear proposal in your inbox within 24 hours.
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
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10 overflow-hidden">
        <ProjectRequestForm />
      </div>
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
