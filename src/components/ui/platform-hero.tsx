"use client";

import { GradientWave } from "@/components/ui/gradient-wave";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import {
  ShoppingBag,
  Store,
  Megaphone,
  Search,
  Mail,
  MessageCircle,
  Bot,
  BarChart3,
  Package,
  Gauge,
  Workflow,
  ArrowRight,
} from "lucide-react";

const integrations = [
  {
    name: "AI Klantenservice",
    designation: "24/7 Support Agent",
    description: "Beantwoordt vragen, lost problemen op.",
    icon: <Bot className="h-5 w-5 text-ainomiq-blue" />,
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    name: "Ads Automation",
    designation: "ROAS Optimalisatie",
    description: "Campagnes op autopilot, creatieve tests.",
    icon: <BarChart3 className="h-5 w-5 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    name: "Email Flows",
    designation: "Gepersonaliseerde Flows",
    description: "Van welkom tot win-back, AI-gestuurd.",
    icon: <Mail className="h-5 w-5 text-violet-400" />,
    gradient: "from-violet-500/20 to-violet-600/5",
  },
  {
    name: "Inventory AI",
    designation: "Demand Forecasting",
    description: "Voorspel vraag, voorkom stockouts.",
    icon: <Package className="h-5 w-5 text-amber-400" />,
    gradient: "from-amber-500/20 to-amber-600/5",
  },
  {
    name: "Analytics",
    designation: "Performance Dashboard",
    description: "Realtime inzichten, actionable data.",
    icon: <Gauge className="h-5 w-5 text-rose-400" />,
    gradient: "from-rose-500/20 to-rose-600/5",
  },
  {
    name: "Workflows",
    designation: "Process Automation",
    description: "Verbind systemen, elimineer handwerk.",
    icon: <Workflow className="h-5 w-5 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-cyan-600/5",
  },
];

export function PlatformHero() {
  return (
    <div className="relative min-h-[90vh] pt-28 pb-12">
      <div className="overflow-hidden flex flex-col px-6 items-center justify-center">
        <GradientWave className="absolute inset-0 opacity-30" />

        <div className="z-10 my-12 space-y-10 border border-ainomiq-border shadow-2xl shadow-black/40 backdrop-blur-sm bg-ainomiq-navy/60 rounded-xl p-8 lg:p-16 mx-auto max-w-7xl flex flex-col">
          <div className="flex justify-center flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-8xl text-center text-white">
              AI{" "}
              <span className="gradient-text">Automations</span>
            </h1>
            <p className="max-w-md text-sm text-ainomiq-text-muted text-center lg:text-left leading-relaxed">
              Zes AI-modules die samenwerken om je e-commerce te
              automatiseren. Van klantenservice tot inventory — alles op
              autopilot.
            </p>
          </div>

          {/* Integration Logos Row */}
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex justify-center flex-wrap -space-x-4">
              <div className="bg-ainomiq-navy-light border border-ainomiq-border shadow-xl h-16 w-16 md:h-20 md:w-20 rounded-full p-4 md:p-5 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 md:h-7 md:w-7 text-green-400" />
              </div>
              <div className="bg-ainomiq-navy-light border border-ainomiq-border shadow-xl h-16 w-16 md:h-20 md:w-20 rounded-full p-4 md:p-5 flex items-center justify-center">
                <Store className="h-6 w-6 md:h-7 md:w-7 text-purple-400" />
              </div>
              <div className="bg-ainomiq-navy-light border border-ainomiq-border shadow-xl h-16 w-16 md:h-20 md:w-20 rounded-full p-4 md:p-5 hidden md:flex items-center justify-center">
                <Megaphone className="h-6 w-6 md:h-7 md:w-7 text-blue-400" />
              </div>
              <div className="bg-ainomiq-navy-light border border-ainomiq-border shadow-xl h-16 w-16 md:h-20 md:w-20 rounded-full p-4 md:p-5 flex items-center justify-center">
                <Search className="h-6 w-6 md:h-7 md:w-7 text-yellow-400" />
              </div>
              <div className="bg-ainomiq-navy-light border border-ainomiq-border shadow-xl h-16 w-16 md:h-20 md:w-20 rounded-full p-4 md:p-5 hidden md:flex items-center justify-center">
                <Mail className="h-6 w-6 md:h-7 md:w-7 text-rose-400" />
              </div>
              <div className="bg-ainomiq-navy-light border border-ainomiq-border shadow-xl h-16 w-16 md:h-20 md:w-20 rounded-full p-4 md:p-5 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-8xl text-center text-white">
              Naadloze{" "}
              <span className="gradient-text">Integraties</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-8xl text-center lg:text-left text-white">
              Connect{" "}
              <span className="gradient-text">&amp; Scale</span>
            </h1>
            <Button
              asChild
              className="rounded-full bg-ainomiq-blue hover:bg-ainomiq-blue-hover text-white px-12 md:px-20 h-14 md:h-16 text-base md:text-lg font-semibold shadow-lg shadow-ainomiq-blue/25"
            >
              <Link href="/contact">
                Start nu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Integration Modules Marquee */}
      <div className="w-full z-10 relative flex flex-col items-center mt-8">
        <p className="text-center text-ainomiq-text-muted mb-8 text-base z-10 relative">
          Zes AI-modules die samenwerken als een platform
        </p>
        <Marquee className="w-full [--duration:50s] [--gap:2rem]">
          {integrations.map((item, index) => (
            <div key={index} className="h-full">
              <div className="relative flex items-center gap-3 h-full overflow-visible border border-ainomiq-border backdrop-blur-md bg-ainomiq-surface rounded-xl mx-2 min-w-[260px]">
                <div className="flex flex-col px-5 py-4 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient}`}>
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-sm text-white">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-ainomiq-blue font-medium">
                    {item.designation}
                  </p>
                  <p className="text-xs text-ainomiq-text-muted mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
