"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const QUICK_PROJECTS = [
  "AI Chatbot",
  "Dashboard",
  "Mobile App",
  "Workflow Automation",
  "Something else",
];

export function CustomHero() {
  const [selected, setSelected] = useState<string>("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-ainomiq-navy-light/30 pt-32 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ainomiq-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue border border-ainomiq-blue/20">
            <Sparkles className="h-3.5 w-3.5" /> Custom Projects
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          Need a custom solution?
        </h1>

        {/* Subtext */}
        <p className="text-center text-lg md:text-xl text-ainomiq-text-muted max-w-2xl mx-auto mb-12">
          Tell us what you need. We'll calculate the cost, prepare a project brief, and connect you with a builder.
        </p>

        {/* Action Card */}
        <div className="mx-auto max-w-3xl rounded-3xl bg-white border border-ainomiq-border shadow-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            What are you building?
          </h2>
          <p className="text-center text-ainomiq-text-muted mb-8">
            Pick an option to get started — or describe it yourself.
          </p>

          {/* Quick select buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {QUICK_PROJECTS.map((project) => (
              <button
                key={project}
                onClick={() => setSelected(project)}
                className={`
                  rounded-xl px-4 py-4 text-sm font-semibold transition-all
                  ${
                    selected === project
                      ? "bg-ainomiq-blue text-white shadow-lg scale-105"
                      : "bg-ainomiq-surface text-ainomiq-text hover:bg-ainomiq-blue/10 hover:border-ainomiq-blue border border-ainomiq-border"
                  }
                `}
              >
                {project}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="flex-1 rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white shadow-lg text-base h-14"
            >
              <a href="#project-request">
                Start your project brief
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Trust line */}
          <p className="text-center text-sm text-ainomiq-text-muted mt-6">
            From concept to deployment — transparent pricing, clear timelines.
          </p>
        </div>

        {/* Trust scroller - simplified */}
        <div className="mt-16 text-center">
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
