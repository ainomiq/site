import type { Metadata } from "next";
import { BuildYourSolution } from "@/components/get-started/build-your-solution";
import { CustomHero } from "@/components/get-started/custom-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

export const metadata: Metadata = {
  title: "Custom Solutions - Ainomiq",
  description:
    "Need a custom automation solution? From chatbots to full dashboards - we build what you need.",
};

const PROJECT_TIMELINE = [
  {
    id: 1,
    title: "Intake",
    date: "Day 1",
    content: "You fill out the brief. We calculate cost, scope, and timeline instantly.",
    category: "Planning",
    icon: "MessageCircle" as const,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Brief Review",
    date: "Day 1-2",
    content: "Our team reviews your project, refines the scope, and confirms tech stack.",
    category: "Planning",
    icon: "FileText" as const,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Builder Match",
    date: "Day 2-3",
    content: "We connect you with a dedicated builder. You'll meet them before work starts.",
    category: "Team",
    icon: "User" as const,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Development",
    date: "Week 1-N",
    content: "Builder starts working. Weekly updates, live demos, continuous feedback.",
    category: "Build",
    icon: "Code" as const,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Testing & QA",
    date: "Final Week",
    content: "Thorough testing, bug fixes, and final polish before handoff.",
    category: "Quality",
    icon: "Calendar" as const,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 40,
  },
  {
    id: 6,
    title: "Launch",
    date: "Delivery",
    content: "We deploy your project. Post-launch support included for 30 days.",
    category: "Delivery",
    icon: "Rocket" as const,
    relatedIds: [5],
    status: "pending" as const,
    energy: 20,
  },
];

export default function CustomPage() {
  return (
    <div className="relative">


      {/* Hero with wizard */}
      <CustomHero />

      {/* Use cases */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-ainomiq-blue mb-3">Use cases</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
              What we typically build
            </h2>
            <p className="text-ainomiq-text-muted text-lg max-w-2xl mx-auto">
              Every project is custom. These are the problems we solve most often.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💬",
                title: "AI customer support",
                desc: "Handles returns, FAQs, order status, and complaints — 24/7, across email, chat, and DMs. Escalates to humans when needed.",
              },
              {
                icon: "📦",
                title: "Inventory & order automation",
                desc: "Auto-reorder triggers, supplier notifications, low-stock alerts, and fulfillment sync — without manual spreadsheets.",
              },
              {
                icon: "📣",
                title: "Marketing automation",
                desc: "Email flows, ad performance triggers, post-purchase sequences, and review requests — all automated based on customer behavior.",
              },
              {
                icon: "🛒",
                title: "Shopify integrations",
                desc: "Custom Shopify apps, theme logic, checkout flows, metafield syncs, and third-party API connections tailored to your store.",
              },
              {
                icon: "📊",
                title: "Reporting dashboards",
                desc: "Live dashboards that pull from Shopify, Meta, Google, and Klaviyo — so you always know what's working and what isn't.",
              },
              {
                icon: "🤖",
                title: "Custom AI agents",
                desc: "Agents that monitor, decide, and act — from ad budget pacing to review moderation to supplier communication.",
              },
            ].map((uc) => (
              <div
                key={uc.title}
                className="rounded-2xl border border-ainomiq-border bg-white/60 backdrop-blur-sm p-6 flex flex-col gap-3 hover:border-ainomiq-blue/40 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{uc.icon}</span>
                <h3 className="text-lg font-bold text-ainomiq-text">{uc.title}</h3>
                <p className="text-sm text-ainomiq-text-muted leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Solution section - code + robot */}
      <BuildYourSolution />

      {/* Project Journey Timeline */}
      <section className="relative">
        <div className="py-16 px-6">
          <div className="text-center mb-8 relative z-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-ainomiq-text mb-4">
              Your project journey
            </h2>
            <p className="text-ainomiq-text-muted text-lg max-w-2xl mx-auto">
              Click any node to explore the process. Related steps light up.
            </p>
          </div>

          <RadialOrbitalTimeline timelineData={PROJECT_TIMELINE} />
        </div>
      </section>
    </div>
  );
}
