"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, ChartColumn, Package, Mail, FileText, BarChart3,
  UserPlus, TrendingUp, Settings, ChevronRight,
  Home, Gauge, Workflow, ShoppingBag, MessageSquare, Instagram, Send, HelpCircle, LayoutDashboard, ArrowLeft
} from "lucide-react";

const modules = [
  { icon: ChartColumn, title: "AI Ad Manager", description: "Autonomous ad creation & optimization." },
  { icon: Bot, title: "Customer Service", description: "AI handles support across all channels." },
  { icon: Package, title: "Smart Inventory", description: "Real-time stock tracking & alerts." },
  { icon: Mail, title: "Email Marketing", description: "Klaviyo flows & campaign automation." },
  { icon: BarChart3, title: "Live Analytics", description: "Real-time data from all platforms." },
  { icon: TrendingUp, title: "Performance", description: "Revenue tracking & growth metrics." },
];

const bottomTabs = [
  { icon: Home, label: "Overview" },
  { icon: Gauge, label: "Performance" },
  { icon: Bot, label: "Automations" },
  { icon: ShoppingBag, label: "Stock" },
  { icon: Settings, label: "Settings" },
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

const metrics = [
  { label: "Tickets Handled", value: "1,247", change: "+12.3%", positive: true },
  { label: "Avg Response", value: "2.4 min", change: "-18%", positive: true },
  { label: "CSAT Score", value: "4.8/5", change: "+0.3", positive: true },
  { label: "Escalations", value: "23", change: "-8%", positive: true },
];

const activity = [
  { user: "Sophie M.", message: "Issue with order #12847", status: "Resolved", time: "2m ago" },
  { user: "Jake D.", message: "Shipping delay inquiry", status: "In Progress", time: "8m ago" },
  { user: "Emma R.", message: "Product size question", status: "Resolved", time: "12m ago" },
  { user: "Liam K.", message: "Return request", status: "Pending", time: "18m ago" },
];

function MobileApp({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-base">ainomiq</span>
        </div>
        <span className="text-xs text-gray-500">Billie Jeans Clo</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2">
        <h2 className="text-lg font-bold mb-3 text-gray-900">{activeTab}</h2>

        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-xl border p-3 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">{m.label}</p>
              <p className="text-lg font-bold text-gray-900">{m.value}</p>
              <p className={`text-xs font-medium mt-0.5 ${m.positive ? "text-green-600" : "text-red-500"}`}>{m.change}</p>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-sm">Recent Activity</p>
          </div>
          {activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{a.user}</p>
                <p className="text-xs text-gray-500">{a.message}</p>
              </div>
              <div className="text-right ml-2 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  a.status === "Resolved" ? "bg-green-100 text-green-700" :
                  a.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{a.status}</span>
                <p className="text-xs text-gray-400 mt-1">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tab bar */}
      <div className="bg-white border-t shrink-0">
        <div className="flex">
          {bottomTabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.label;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(tab.label)}
                className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full bg-blue-600 mt-0.5" />}
              </button>
            );
          })}
        </div>
        {/* iPhone home indicator */}
        <div className="flex justify-center pb-1">
          <div className="w-24 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function DesktopApp({ onBack }: { onBack: () => void }) {
  const [activeView, setActiveView] = useState("Customer Service");

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-56 bg-gray-50 border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span className="font-bold">ainomiq</span>
          </div>
          <p className="text-xs text-gray-500">Billie Jeans Clo</p>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-auto">
          {sidebarItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeView === item.label;
            return (
              <button
                key={i}
                onClick={() => setActiveView(item.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-xl font-bold mb-4">{activeView}</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white border rounded-lg p-3 hover:shadow-md transition-all">
              <p className="text-xs text-gray-500 mb-1">{m.label}</p>
              <p className="text-xl font-bold">{m.value}</p>
              <p className={`text-xs font-medium mt-0.5 ${m.positive ? "text-green-600" : "text-red-500"}`}>{m.change}</p>
            </div>
          ))}
        </div>
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b font-semibold text-sm">Recent Activity</div>
          {activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b last:border-0">
              <div>
                <p className="text-sm font-medium">{a.user}</p>
                <p className="text-xs text-gray-500">{a.message}</p>
              </div>
              <div className="text-right ml-2 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  a.status === "Resolved" ? "bg-green-100 text-green-700" :
                  a.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{a.status}</span>
                <p className="text-xs text-gray-400 mt-1">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InteractiveDashboard() {
  const [showApp, setShowApp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!showApp ? (
          /* Landing screen */
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full overflow-auto"
          >
            {isMobile ? (
              /* Mobile landing */
              <div className="flex flex-col h-full bg-white px-5 pt-6 pb-4">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <LayoutDashboard className="w-6 h-6 text-blue-600" />
                    <span className="text-xl font-bold">ainomiq</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    Your AI-powered<br />e-commerce operator
                  </h1>
                  <p className="text-sm text-gray-500 mb-6">
                    One platform, zero manual work.
                  </p>
                  <button
                    onClick={() => setShowApp(true)}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl text-sm shadow-md active:scale-95 transition-transform"
                  >
                    Start for free
                  </button>
                </div>

                <div className="flex-1 overflow-auto space-y-2">
                  {modules.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => setShowApp(true)}
                        className="w-full flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 text-left active:bg-gray-100 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{m.title}</p>
                          <p className="text-xs text-gray-500 truncate">{m.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Desktop landing */
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white overflow-auto p-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold mb-3 text-gray-900">Your AI-powered<br />e-commerce operator</h1>
                  <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm">
                    Ainomiq connects your entire e-commerce stack and runs it with AI — one platform, zero manual work.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setShowApp(true)}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      Start for free
                    </button>
                    <button className="border px-6 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
                  {modules.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => setShowApp(true)}
                        className="bg-white rounded-xl border p-4 text-left hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="font-semibold text-xs">{m.title}</p>
                        </div>
                        <p className="text-xs text-gray-500">{m.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* App screen */
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full"
          >
            {isMobile ? (
              <MobileApp onBack={() => setShowApp(false)} />
            ) : (
              <DesktopApp onBack={() => setShowApp(false)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
