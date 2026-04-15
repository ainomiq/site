"use client";

import { 
  Sparkles, 
  Globe, 
  LayoutDashboard, 
  Bot, 
  Zap, 
  ShoppingCart, 
  Plug, 
  Smartphone, 
  BarChart3, 
  Star 
} from "lucide-react";

const PROJECT_TYPES = [
  { id: "website-landing", label: "Website / Landing page", Icon: Globe },
  { id: "web-app-dashboard", label: "Web app / Dashboard", Icon: LayoutDashboard },
  { id: "ai-chatbot", label: "AI Integration / Chatbot", Icon: Bot },
  { id: "automation-workflow", label: "Automation / Workflow", Icon: Zap },
  { id: "ecommerce", label: "E-commerce", Icon: ShoppingCart },
  { id: "api-development", label: "API Development", Icon: Plug },
  { id: "mobile-app", label: "Mobile App", Icon: Smartphone },
  { id: "data-analytics", label: "Data & Analytics", Icon: BarChart3 },
  { id: "other", label: "Other", Icon: Star },
];

export function CustomHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-ainomiq-navy-light/20 pt-24 pb-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ainomiq-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue border border-ainomiq-blue/20">
            <Sparkles className="h-3.5 w-3.5" /> Custom Projects
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
          Need a custom solution?
        </h1>

        {/* Subtext */}
        <p className="text-center text-lg md:text-xl text-ainomiq-text-muted max-w-2xl mx-auto mb-4">
          Tell us what you need. We'll calculate the cost, prepare a project brief, and connect you with a builder.
        </p>

        {/* Trust line */}
        <p className="text-center text-sm text-ainomiq-text-muted mb-12">
          From concept to deployment — transparent pricing, clear timelines.
        </p>

        {/* Glassmorphism elevated card - wizard preview */}
        <div className="relative -mt-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-ainomiq-blue/20 via-ainomiq-violet/20 to-ainomiq-blue/20 blur-3xl -z-10 scale-95" />
          
          {/* Glass card */}
          <div className="mx-auto max-w-4xl rounded-3xl bg-white/80 backdrop-blur-xl border border-ainomiq-border shadow-2xl p-1">
            <div className="rounded-[22px] bg-white p-8 md:p-10 border border-ainomiq-border/50">
              {/* Card header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-ainomiq-navy mb-2">
                  What are you building?
                </h2>
                <p className="text-ainomiq-text-muted text-sm">
                  Select the option that best describes your project.
                </p>
              </div>

              {/* Project type grid - visual preview */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {PROJECT_TYPES.map((item) => {
                  const IconComponent = item.Icon;
                  return (
                    <div
                      key={item.id}
                      className="rounded-xl bg-ainomiq-surface border border-ainomiq-border p-5 hover:border-ainomiq-blue hover:bg-ainomiq-blue/5 transition-all cursor-pointer group"
                    >
                      <IconComponent className="h-6 w-6 mb-3 text-ainomiq-blue group-hover:scale-110 transition-transform" />
                      <div className="text-sm text-ainomiq-text font-medium leading-tight">
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <a
                  href="#project-request"
                  className="inline-flex items-center gap-2 rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white font-semibold px-8 py-4 shadow-lg transition-all hover:scale-105"
                >
                  Start your project brief
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust scroller - below card */}
        <div className="mt-20 text-center">
          <p className="text-sm text-ainomiq-text-muted mb-6">
            Trusted by businesses like yours
          </p>
          <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
            {/* Logo placeholders - replace with actual client logos */}
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
            <div className="h-8 w-24 bg-ainomiq-text-muted/20 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
