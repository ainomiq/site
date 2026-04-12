"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { 
  Bot, ChartColumn, Package, Mail, FileText, BarChart3, 
  UserPlus, TrendingUp, Settings, ChevronRight, 
  Home, Gauge, Workflow, ShoppingBag, MessageSquare, Instagram, Send, HelpCircle, LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    icon: ChartColumn,
    title: "AI Ad Manager",
    description: "Autonomous ad creation, optimization, and scaling — powered by dedicated AI agents.",
  },
  {
    icon: Bot,
    title: "AI Customer Service",
    description: "AI handles support across all channels. Learns your brand voice and policies.",
  },
  {
    icon: Package,
    title: "Smart Inventory",
    description: "Real-time stock tracking with automated alerts and supplier management.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Full Klaviyo integration for flows, campaigns, and subscriber analytics.",
  },
  {
    icon: FileText,
    title: "Content Pipeline",
    description: "Google Drive integration turns your raw content into production-ready ads.",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description: "Real-time data from all platforms in one unified view.",
  },
  {
    icon: UserPlus,
    title: "Onboarding System",
    description: "Guided setup for new clients with smart questionnaires and sheet output.",
  },
  {
    icon: TrendingUp,
    title: "Performance & Profit",
    description: "Profit command center with revenue tracking, cost analysis, and growth metrics.",
  },
  {
    icon: Settings,
    title: "Account & Settings",
    description: "Full control over integrations, notifications, navigation, and data.",
  },
];

const sidebarItems = [
  { icon: Home, label: "Overview" },
  { icon: Gauge, label: "Performance" },
  { icon: Workflow, label: "Automations" },
  { icon: ShoppingBag, label: "Stock Management" },
  { icon: Bot, label: "Customer Service" },
  { icon: Instagram, label: "Instagram" },
  { icon: Send, label: "Email Marketing" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Support" },
];

export function InteractiveDashboard() {
  const [showApp, setShowApp] = useState(false);
  const [activeView, setActiveView] = useState("Customer Service");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const interactiveEnabled = useTransform(scrollYProgress, [0.98, 1], [0, 1]);

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <AnimatePresence mode="wait">
        {!showApp ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-gradient-to-br from-blue-50 to-white overflow-auto"
          >
            <div className="max-w-6xl mx-auto px-6 py-12">
              {/* Hero */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Your AI-powered
                  <br />
                  e-commerce operator
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  Ainomiq connects your entire e-commerce stack and runs it with AI.
                  Automated ad creation and optimization, AI customer service, smart
                  inventory management, and data-driven email marketing — one
                  platform, zero manual work.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5"
                    onClick={() => setShowApp(true)}
                  >
                    Start for free
                  </Button>
                  <Button variant="outline" className="px-6 py-2.5">
                    Learn more
                  </Button>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module, i) => {
                  const Icon = module.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-lg border p-6 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setShowApp(true)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-lg">{module.title}</h3>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  );
                })}
              </div>

              <motion.div
                style={{ opacity }}
                className="text-center text-sm text-gray-500 mt-8"
              >
                ✨ Click "Start for free" or any module to explore the app
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex h-full"
          >
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r flex flex-col shrink-0">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-1">
                  <LayoutDashboard className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-lg">ainomiq</span>
                </div>
                <p className="text-xs text-gray-600">Billie Jeans Clo</p>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-auto">
                {sidebarItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.label;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveView(item.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{activeView}</h2>
                  <div className="flex gap-2 text-xs">
                    {["Today", "7 days", "14 days", "30 days", "90 days"].map((range, i) => (
                      <button
                        key={i}
                        className={`px-3 py-1.5 rounded ${
                          i === 1 ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mock Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Tickets Handled", value: "1,247", change: "+12.3%", positive: true },
                    { label: "Avg Response Time", value: "2.4 min", change: "-18%", positive: true },
                    { label: "CSAT Score", value: "4.8/5", change: "+0.3", positive: true },
                    { label: "Escalations", value: "23", change: "-8%", positive: true },
                  ].map((metric, i) => (
                    <div
                      key={i}
                      className="bg-white border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                    >
                      <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                      <p className="text-2xl font-bold mb-1">{metric.value}</p>
                      <p
                        className={`text-sm font-medium ${
                          metric.positive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {metric.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="mt-6 bg-white border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { user: "Sophie M.", message: "Issue with order #12847", status: "Resolved", time: "2 min ago" },
                      { user: "Jake D.", message: "Shipping delay inquiry", status: "In Progress", time: "8 min ago" },
                      { user: "Emma R.", message: "Product size question", status: "Resolved", time: "12 min ago" },
                      { user: "Liam K.", message: "Return request", status: "Pending", time: "18 min ago" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.user}</p>
                          <p className="text-xs text-gray-600">{activity.message}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              activity.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : activity.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {activity.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                style={{ opacity }}
                className="text-center text-sm text-gray-500 py-4"
              >
                ✨ Click sidebar items to switch views
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
