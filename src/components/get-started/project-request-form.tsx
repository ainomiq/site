"use client";

import { useState, FormEvent } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";

const PROJECT_TYPES = [
  "Website / Landing page",
  "Web app / Dashboard",
  "AI Integration / Chatbot",
  "Automation / Workflow",
  "E-commerce",
  "API Development",
  "Other",
];

const TIMELINES = [
  "ASAP (< 1 week)",
  "1-2 weeks",
  "2-4 weeks",
  "1-2 months",
  "Flexible",
];

const BUDGETS = [
  "< €500",
  "€500-€1K",
  "€1K-€2.5K",
  "€2.5K-€5K",
  "€5K-€10K",
  "€10K+",
  "Not sure",
];

const SOURCES = ["Google", "Social media", "Referral", "Other"];

interface FormData {
  company: string;
  contact: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
  references: string;
  foundVia: string;
  _hp: string;
}

const initial: FormData = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  projectType: "",
  description: "",
  timeline: "",
  budget: "",
  references: "",
  foundVia: "",
  _hp: "",
};

export function ProjectRequestForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);

    // Client-side validation
    const errs: string[] = [];
    if (!form.company.trim()) errs.push("Company name is required.");
    if (!form.contact.trim()) errs.push("Contact name is required.");
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.push("Valid email is required.");
    if (!form.projectType) errs.push("Select a project type.");
    if (form.description.trim().length < 50)
      errs.push("Description must be at least 50 characters.");
    if (!form.timeline) errs.push("Select a timeline.");
    if (!form.budget) errs.push("Select a budget range.");

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setErrors(data.errors || ["Something went wrong."]);
      }
    } catch {
      setErrors(["Network error. Please try again."]);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section className="py-20 px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#1e293b] bg-[#0f172a] p-10 text-center shadow-2xl">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-400" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Thanks! We&apos;ll review your project and get back within 24h.
          </h3>
          <p className="text-gray-400">
            Check your email for a confirmation.
          </p>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5] transition-colors";
  const selectCls =
    "w-full rounded-xl border border-[#1e293b] bg-[#1e293b]/50 px-4 py-3 text-white focus:border-[#4A90F5] focus:outline-none focus:ring-1 focus:ring-[#4A90F5] transition-colors appearance-none cursor-pointer";
  const labelCls = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <section id="project-request" className="py-20 px-6">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-[#4A90F5]/10 px-4 py-1.5 text-xs font-semibold text-[#4A90F5] uppercase tracking-wider mb-4">
            Custom Project
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Tell us about your project
          </h2>
          <p className="mt-3 text-gray-400 max-w-md mx-auto">
            Fill in the details below and we&apos;ll get back to you within 24
            hours with a plan.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-8 shadow-2xl space-y-6"
        >
          {/* Honeypot — hidden from humans */}
          <div className="absolute opacity-0 pointer-events-none" aria-hidden>
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website_url"
              value={form._hp}
              onChange={(e) => set("_hp", e.target.value)}
            />
          </div>

          {/* Row: Company + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>
                Company name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className={inputCls}
                placeholder="Acme Inc."
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>
                Contact name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className={inputCls}
                placeholder="John Doe"
                value={form.contact}
                onChange={(e) => set("contact", e.target.value)}
              />
            </div>
          </div>

          {/* Row: Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                className={inputCls}
                placeholder="john@acme.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input
                type="tel"
                className={inputCls}
                placeholder="+31 6 1234 5678"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
          </div>

          {/* Project type */}
          <div>
            <label className={labelCls}>
              Project type <span className="text-red-400">*</span>
            </label>
            <select
              className={selectCls}
              value={form.projectType}
              onChange={(e) => set("projectType", e.target.value)}
            >
              <option value="" disabled>
                Select a type…
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              className={inputCls + " min-h-[120px] resize-y"}
              placeholder="Tell us what you need built. What problem does it solve? Any specific features? (min 50 characters)"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-500">
              {form.description.trim().length}/50 characters minimum
            </p>
          </div>

          {/* Row: Timeline + Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>
                Timeline <span className="text-red-400">*</span>
              </label>
              <select
                className={selectCls}
                value={form.timeline}
                onChange={(e) => set("timeline", e.target.value)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>
                Budget range <span className="text-red-400">*</span>
              </label>
              <select
                className={selectCls}
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* References */}
          <div>
            <label className={labelCls}>Reference links</label>
            <textarea
              className={inputCls + " min-h-[80px] resize-y"}
              placeholder="Any inspiration sites, competitor examples, or design references…"
              value={form.references}
              onChange={(e) => set("references", e.target.value)}
            />
          </div>

          {/* How did you find us */}
          <div>
            <label className={labelCls}>How did you find us?</label>
            <select
              className={selectCls}
              value={form.foundVia}
              onChange={(e) => set("foundVia", e.target.value)}
            >
              <option value="">Rather not say</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4A90F5] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#3a7de0] disabled:opacity-60 transition-colors shadow-lg shadow-[#4A90F5]/25"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Project Request
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
