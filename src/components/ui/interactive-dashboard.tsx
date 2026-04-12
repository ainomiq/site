"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";

const modules = [
  { id: 1, title: "AI Ad Manager", desc: "Automates ad optimization, bid customization, and creative — powered by", row: 1, col: 1 },
  { id: 2, title: "AI Customer Service", desc: "Handles customer service inquiries, keeps your brand voice alive", row: 1, col: 2 },
  { id: 3, title: "Smart Inventory", desc: "Forecasts stock needs and automates stock and supplies", row: 1, col: 3 },
  { id: 4, title: "Email Marketing", desc: "Full-funnel integration for flows, campaigns, and subscriber", row: 2, col: 1 },
  { id: 5, title: "Content Pipeline", desc: "Google Drive integrations forms, your app content via production", row: 2, col: 2 },
  { id: 6, title: "Live Analytics", desc: "Real-time data from all platforms in one unified view", row: 2, col: 3 },
  { id: 7, title: "Onboarding System", desc: "Guides setup for new clients with smart customization and client", row: 3, col: 1 },
  { id: 8, title: "Performance & Profit", desc: "Full profit command center with spend data, tracking, and analysis", row: 3, col: 2 },
  { id: 9, title: "Account & Settings", desc: "Full control over integrations, notifications, navigation, and data", row: 3, col: 3 },
];

export function InteractiveDashboard() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Only enable interaction when scroll is complete (tablet is flat)
  const isInteractive = useTransform(scrollYProgress, (latest) => latest >= 0.95);
  const [interactive, setInteractive] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = isInteractive.on("change", (v) => setInteractive(v));
    return () => unsubscribe();
  }, [isInteractive]);

  const [hoveredModule, setHoveredModule] = React.useState<number | null>(null);

  return (
    <div ref={containerRef} className="w-full h-full bg-white rounded-2xl p-8 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            a
          </div>
          <span className="text-xl font-semibold">ainomiq</span>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Sign in
          </button>
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Get started
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your AI-powered</h1>
        <h2 className="text-3xl font-bold mb-4">e-commerce operator</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Ainomiq connects your entire e-commerce stack and runs it with AI.
          Automate ad campaigns, customer service, email, inventory management, and data-driven email marketing — one platform, zero manual work.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
            Start for free
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            Learn more
          </button>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            whileHover={interactive ? { scale: 1.05, y: -5 } : {}}
            transition={{ duration: 0.2 }}
            onHoverStart={() => interactive && setHoveredModule(module.id)}
            onHoverEnd={() => setHoveredModule(null)}
          >
            <Card className={`p-6 h-full cursor-pointer transition-all ${
              hoveredModule === module.id ? 'shadow-lg border-blue-400' : 'shadow-sm'
            } ${!interactive ? 'pointer-events-none' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-base">{module.title}</h3>
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-gray-400"
                  animate={hoveredModule === module.id ? { rotate: 45 } : { rotate: 0 }}
                >
                  <path d="M5 10h10M10 5v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </motion.svg>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{module.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Indicator when interactive */}
      {interactive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium"
        >
          ✨ Hover over modules to explore
        </motion.div>
      )}
    </div>
  );
}
