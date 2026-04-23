"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Globe, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnalysisProgress } from "./progress";
import { Results } from "./results";
import type { SiteAnalysis, ManualAnswers } from "@/lib/analysis-types";

// ---- constants ----
const TABS = ["Project Type", "Details", "Timeline", "Contact", "Your Estimate"] as const;
type TabLabel = (typeof TABS)[number];

const STEP_INDEX: Record<TabLabel, number> = {
  "Project Type": 0,
  "Details": 1,
  "Timeline": 2,
  "Contact": 3,
  "Your Estimate": 4,
};

const platforms = ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Other"];
const volumes = ["< 100", "100 - 1,000", "1,000+", "10,000+"];
const ecommerceTools = ["Klaviyo", "Mailchimp", "Meta Ads", "Google Ads", "TikTok Ads", "Google Analytics", "Hotjar"];
const industries = ["Cleaning / Facility", "Catering / Hospitality", "Healthcare", "Consulting", "Logistics", "Construction", "Education", "Other"];
const teamSizes = ["1-5", "6-20", "21-50", "50+"];
const timelines = ["ASAP", "Within 1 month", "1-3 months", "Just exploring"];

// ---- types ----
interface FormState {
  description: string;
  url: string;
  businessType: "ecommerce" | "service" | "";
  platform: string;
  orderVolume: string;
  tools: string[];
  industry: string;
  teamSize: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
}

interface MultiStepFormProps {
  onReset?: () => void;
}

// ---- Pill button helper ----
function Pill({
  label,
  selected,
  multi,
  onClick,
}: {
  label: string;
  selected: boolean;
  multi?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-all",
        selected
          ? multi
            ? "border-blue-500 bg-blue-50 text-blue-700"
            : "border-blue-500 bg-blue-500 text-white"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
      )}
    >
      {label}
    </button>
  );
}

// ---- main component ----
export function MultiStepForm({ onReset }: MultiStepFormProps) {
  const [step, setStep] = useState<"form" | "analyzing" | "results">("form");
  const [activeStep, setActiveStep] = useState(0);
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(null);
  const [form, setForm] = useState<FormState>({
    description: "",
    url: "",
    businessType: "",
    platform: "",
    orderVolume: "",
    tools: [],
    industry: "",
    teamSize: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
  });

  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const toggleTool = (tool: string) =>
    update({ tools: form.tools.includes(tool) ? form.tools.filter((t) => t !== tool) : [...form.tools, tool] });

  // ---- step validation ----
  const step0Valid = form.description.trim().length > 0;
  const step1Valid =
    form.businessType === "ecommerce"
      ? form.platform !== "" && form.orderVolume !== ""
      : form.businessType === "service"
        ? form.industry !== ""
        : false;
  const step2Valid = form.timeline !== "";
  const step3Valid = form.email.trim().length > 0 && form.email.includes("@");

  const canContinue = [step0Valid, step1Valid, step2Valid, step3Valid, true][activeStep] ?? false;

  // ---- Step 1 submit (Go button) ----
  const handleGo = async () => {
    if (!step0Valid) return;
    if (form.url.trim()) {
      // Analyze URL
      setStep("analyzing");
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: form.url.trim() }),
        });
        const data = await res.json();
        if (res.ok && !data.error) {
          setAnalysis(data.analysis);
        }
      } catch {
        // ignore - proceed without analysis
      }
      // After analysis (or failure), go to step 1
      setStep("form");
      setActiveStep(1);
    } else {
      setActiveStep(1);
    }
  };

  const handleProgressComplete = () => {
    // This is called when progress bar finishes - we already set activeStep=1
  };

  // ---- Contact submit ----
  const handleContactSubmit = () => {
    if (!step3Valid) return;
    // Fire Klaviyo event
    void fetch("/api/klaviyo-track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Project Form Submitted",
        email: form.email,
        properties: {
          source: "multi_step_form",
          name: form.name,
          company: form.company,
          business_type: form.businessType,
          platform: form.platform,
          order_volume: form.orderVolume,
          industry: form.industry,
          timeline: form.timeline,
          description: form.description,
          tools: form.tools.join(", "),
        },
      }),
    });
    setActiveStep(4);
  };

  const handleContinue = () => {
    if (activeStep === 0) {
      handleGo();
    } else if (activeStep === 3) {
      handleContactSubmit();
    } else if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    }
  };

  // Build ManualAnswers for Results
  const manual: ManualAnswers | undefined =
    activeStep === 4
      ? {
          businessType: form.businessType || "ecommerce",
          platform: form.businessType === "ecommerce" ? form.platform : undefined,
          orderVolume: form.businessType === "ecommerce" ? form.orderVolume : undefined,
          industry: form.businessType === "service" ? form.industry : undefined,
          teamSize: form.businessType === "service" ? form.teamSize : undefined,
          description: form.description,
          tools: form.tools,
          email: form.email,
          company: form.company || undefined,
        }
      : undefined;

  // ---- render analyzing state ----
  if (step === "analyzing") {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <AnalysisProgress onComplete={handleProgressComplete} />
        </div>
      </div>
    );
  }

  // ---- render results ----
  if (activeStep === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Card header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Progress tabs */}
          <ProgressTabs activeStep={4} />
          <div className="p-8">
            <Results analysis={analysis} manual={manual} onReset={onReset} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 tracking-wider uppercase mb-4">
            Get Started
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Tell us what you need</h1>
          <p className="text-sm text-gray-500">3 minutes. Instant estimate. No commitment.</p>
        </div>

        {/* Progress tabs */}
        <ProgressTabs activeStep={activeStep} />

        {/* Step content */}
        <div className="px-8 py-6 min-h-[280px]">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <StepProjectType
                key="step0"
                form={form}
                update={update}
                onGo={handleGo}
                valid={step0Valid}
              />
            )}
            {activeStep === 1 && (
              <StepDetails
                key="step1"
                form={form}
                update={update}
                toggleTool={toggleTool}
              />
            )}
            {activeStep === 2 && (
              <StepTimeline key="step2" form={form} update={update} />
            )}
            {activeStep === 3 && (
              <StepContact key="step3" form={form} update={update} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer with Continue button */}
        {activeStep > 0 && (
          <div className="px-8 pb-8 flex justify-end">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full px-7 text-sm font-medium text-white transition-all",
                canContinue
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-200 text-gray-400 pointer-events-none"
              )}
            >
              {activeStep === 3 ? "Get my estimate" : "Continue"}
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ---- Progress Tabs ----
function ProgressTabs({ activeStep }: { activeStep: number }) {
  return (
    <div className="px-8 border-b border-gray-100">
      <div className="flex gap-0 overflow-x-auto">
        {TABS.map((tab, i) => (
          <div
            key={tab}
            className={cn(
              "relative flex-shrink-0 px-3 py-3 text-xs font-medium transition-colors whitespace-nowrap",
              i === activeStep
                ? "text-blue-600"
                : i < activeStep
                  ? "text-gray-500"
                  : "text-gray-300"
            )}
          >
            {tab}
            {i === activeStep && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Step 0: Project Type ----
function StepProjectType({
  form,
  update,
  onGo,
  valid,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
  onGo: () => void;
  valid: boolean;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && valid) {
      e.preventDefault();
      onGo();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5"
    >
      {/* Description textarea */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          <Sparkles className="size-4 text-blue-500" />
          Describe what you need
        </label>
        <div className="relative">
          <textarea
            value={form.description}
            onChange={(e) => update({ description: e.target.value })}
            onKeyDown={handleKeyDown}
            placeholder="e.g. I need a chatbot for my webshop that handles returns and FAQs"
            rows={4}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors resize-none"
          />
        </div>
      </div>

      {/* URL field */}
      <div className="flex flex-col gap-2">
        <div className="relative flex items-center">
          <Globe className="absolute left-3 size-4 text-gray-400 pointer-events-none" />
          <input
            type="url"
            value={form.url}
            onChange={(e) => update({ url: e.target.value })}
            placeholder="yourwebsite.com (optional - we'll analyze your brand)"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
          />
        </div>
        <p className="text-xs text-gray-400 pl-1">
          We'll scan your site for brand voice, tech stack, and integrations.
        </p>
      </div>

      {/* Go button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onGo}
          disabled={!valid}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-full px-7 text-sm font-medium text-white transition-all",
            valid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-200 text-gray-400 pointer-events-none"
          )}
        >
          Go
          <ArrowRight className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ---- Step 1: Details ----
function StepDetails({
  form,
  update,
  toggleTool,
}: {
  form: FormState;
  update: (p: Partial<FormState>) => void;
  toggleTool: (t: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      {/* Business type */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700">What type of business are you?</label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "ecommerce" as const, label: "E-commerce / Webshop" },
            { value: "service" as const, label: "Service business" },
          ].map((opt) => (
            <Pill
              key={opt.value}
              label={opt.label}
              selected={form.businessType === opt.value}
              onClick={() => update({ businessType: opt.value })}
            />
          ))}
        </div>
      </div>

      {/* Ecommerce specifics */}
      {form.businessType === "ecommerce" && (
        <>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">What platform does your store run on?</label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <Pill key={p} label={p} selected={form.platform === p} onClick={() => update({ platform: p })} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">How many orders per month?</label>
            <div className="flex flex-wrap gap-2">
              {volumes.map((v) => (
                <Pill key={v} label={v} selected={form.orderVolume === v} onClick={() => update({ orderVolume: v })} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">
              Which tools do you use? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ecommerceTools.map((t) => (
                <Pill key={t} label={t} selected={form.tools.includes(t)} multi onClick={() => toggleTool(t)} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Service specifics */}
      {form.businessType === "service" && (
        <>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">What industry are you in?</label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <Pill key={ind} label={ind} selected={form.industry === ind} onClick={() => update({ industry: ind })} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">
              How big is your team? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {teamSizes.map((s) => (
                <Pill key={s} label={s} selected={form.teamSize === s} onClick={() => update({ teamSize: s })} />
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ---- Step 2: Timeline ----
function StepTimeline({ form, update }: { form: FormState; update: (p: Partial<FormState>) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      <label className="text-sm font-medium text-gray-700">When do you need this?</label>
      <div className="flex flex-wrap gap-3">
        {timelines.map((t) => (
          <Pill key={t} label={t} selected={form.timeline === t} onClick={() => update({ timeline: t })} />
        ))}
      </div>
    </motion.div>
  );
}

// ---- Step 3: Contact ----
function StepContact({ form, update }: { form: FormState; update: (p: Partial<FormState>) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      <p className="text-sm text-gray-500">Almost there - where should we send your estimate?</p>
      <input
        type="text"
        value={form.name}
        onChange={(e) => update({ name: e.target.value })}
        placeholder="Your name"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
      />
      <input
        type="email"
        value={form.email}
        onChange={(e) => update({ email: e.target.value })}
        placeholder="Email address (required)"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
      />
      <input
        type="text"
        value={form.company}
        onChange={(e) => update({ company: e.target.value })}
        placeholder="Company name (optional)"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
      />
    </motion.div>
  );
}
