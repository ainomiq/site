"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bot,
  BarChart3,
  Mail,
  Package,
  Gauge,
  Workflow,
  ArrowRight,
  X,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Customer Service",
    description:
      "Handles customer service inquiries, keeps your brand voice alive and personal.",
  },
  {
    icon: BarChart3,
    title: "AI Ad Manager",
    description:
      "Automates ad optimization, bid customization, and creative — powered by real-time data.",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description:
      "Forecasts stock needs and automates stock and supplies management.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description:
      "Full-funnel integration for flows, campaigns, and subscriber engagement.",
  },
  {
    icon: Workflow,
    title: "Content Pipeline",
    description:
      "Google Drive integrations, forms, and app content via production workflows.",
  },
  {
    icon: Gauge,
    title: "Live Analytics",
    description:
      "Real-time data from all platforms in one unified dashboard view.",
  },
];

const mockStats = [
  { label: "Revenue (30d)", value: "€47,329", change: "+23%" },
  { label: "Orders", value: "1,847", change: "+18%" },
  { label: "ROAS", value: "3.2x", change: "+0.4x" },
  { label: "Active automations", value: "24", change: "6 new" },
];

export function InteractiveDashboard() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Only enable interaction when scroll is complete (tablet is flat)
  const isInteractive = useTransform(scrollYProgress, (latest) => latest >= 0.98);
  const [interactive, setInteractive] = React.useState(false);
  const [showDashboard, setShowDashboard] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = isInteractive.on("change", (v) => setInteractive(v));
    return () => unsubscribe();
  }, [isInteractive]);

  const [hoveredModule, setHoveredModule] = React.useState<number | null>(null);

  if (showDashboard) {
    // Full mock dashboard view
    return (
      <div ref={containerRef} className="w-full h-full bg-white rounded-2xl p-6 md:p-10 overflow-auto">
        {/* Header with close */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              a
            </div>
            <span className="text-xl font-semibold">ainomiq</span>
          </div>
          <button
            onClick={() => setShowDashboard(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {mockStats.map((stat) => (
            <Card key={stat.label} className="border border-gray-200">
              <CardContent className="p-4">
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active modules */}
        <div>
          <h2 className="text-lg font-bold mb-4">Active modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <Card key={idx} className="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <feature.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional modules */}
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Onboarding System", desc: "Guides setup for new clients", icon: Workflow },
              { title: "Performance & Profit", desc: "Full profit command center", icon: Gauge },
              { title: "Account & Settings", desc: "Full control over integrations", icon: Bot },
            ].map((module, idx) => (
              <Card key={idx} className="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <module.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{module.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Landing view with "Get started" button
  return (
    <div ref={containerRef} className="w-full h-full bg-white rounded-2xl p-6 md:p-10 overflow-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Your AI-powered</h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">e-commerce operator</h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6">
          Ainomiq connects your entire e-commerce stack and runs it with AI.
          Automate ad campaigns, customer service, email, inventory management,
          and data-driven marketing — one platform, zero manual work.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setShowDashboard(true)}
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-6"
          >
            Get started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={interactive ? { scale: 1.05, y: -5 } : {}}
            transition={{ duration: 0.2 }}
            onHoverStart={() => interactive && setHoveredModule(idx)}
            onHoverEnd={() => setHoveredModule(null)}
          >
            <Card className={`border transition-all h-full ${
              hoveredModule === idx 
                ? 'shadow-lg border-blue-400' 
                : 'shadow-sm border-gray-200'
            } ${!interactive ? 'pointer-events-none' : 'cursor-pointer'}`}>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional modules row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-4">
        {[
          { title: "Onboarding System", desc: "Guides setup for new clients with smart customization", icon: Workflow },
          { title: "Performance & Profit", desc: "Full profit command center with spend data and analysis", icon: Gauge },
          { title: "Account & Settings", desc: "Full control over integrations and notifications", icon: Bot },
        ].map((module, idx) => (
          <motion.div
            key={idx}
            whileHover={interactive ? { scale: 1.05, y: -5 } : {}}
            transition={{ duration: 0.2 }}
            onHoverStart={() => interactive && setHoveredModule(idx + 6)}
            onHoverEnd={() => setHoveredModule(null)}
          >
            <Card className={`border transition-all h-full ${
              hoveredModule === idx + 6
                ? 'shadow-lg border-blue-400'
                : 'shadow-sm border-gray-200'
            } ${!interactive ? 'pointer-events-none' : 'cursor-pointer'}`}>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <module.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-base font-bold mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{module.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Indicator when interactive */}
      {interactive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium inline-block mx-auto"
        >
          ✨ Hover over modules to explore
        </motion.div>
      )}
    </div>
  );
}
