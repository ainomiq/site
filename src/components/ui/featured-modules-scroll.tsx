'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MessageSquare, Package, BarChart3, Zap } from 'lucide-react'

/* ---------- email preview (rendered as styled React, not iframe) ---------- */
function EmailPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-[420px] w-full mx-auto text-left">
      {/* Email chrome bar */}
      <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[10px] text-gray-400 font-medium">Klaviyo &mdash; Campaign Preview</span>
        </div>
      </div>

      <div className="p-5">
        {/* Logo */}
        <div className="text-center mb-4">
          <div className="inline-block bg-gray-900 rounded-lg px-4 py-2">
            <span className="text-white font-bold text-sm tracking-wide">BILLIE JEANS</span>
          </div>
        </div>

        {/* Nav */}
        <div className="border-t border-b border-gray-200 py-2 mb-4 flex justify-center gap-4">
          <span className="text-[10px] font-semibold tracking-widest text-gray-500">SHOP</span>
          <span className="text-[10px] text-gray-300">|</span>
          <span className="text-[10px] font-semibold tracking-widest text-gray-500">BESTSELLERS</span>
          <span className="text-[10px] text-gray-300">|</span>
          <span className="text-[10px] font-semibold tracking-widest text-gray-500">SUPPORT</span>
        </div>

        {/* Tracker image placeholder */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Order Status: Delivered ✓</p>
            <p className="text-[10px] text-gray-500">Tracking: NL48291034820</p>
          </div>
        </div>

        {/* Body */}
        <div className="mb-4 space-y-2">
          <p className="text-sm text-gray-800">Hi Sarah,</p>
          <p className="text-sm text-gray-800">Great news — your order has been delivered!</p>
          <p className="text-sm text-gray-600">We hope you love it. If you have any questions, don&apos;t hesitate to reach out.</p>
        </div>

        {/* CTA */}
        <div className="mb-5">
          <div className="inline-block bg-gray-900 text-white text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full">
            TRACK MY ORDER
          </div>
        </div>

        {/* Sign off */}
        <p className="text-xs text-gray-500">Thank you for shopping with us,<br /><strong className="text-gray-700">Billie Jeans</strong></p>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 px-5 py-4 flex items-center justify-between">
        <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
          <span className="text-[8px] font-bold text-white/60">BJ</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-gray-500">Shop</span>
          <span className="text-[9px] text-gray-500">Bestsellers</span>
          <span className="text-[9px] text-gray-500">Support</span>
        </div>
      </div>
    </div>
  )
}

/* ---------- capability pills ---------- */
const capabilities = [
  { icon: MessageSquare, label: 'Customer Service', desc: 'Email, chat, DMs, comments' },
  { icon: Package, label: 'Smart Inventory', desc: 'Forecasting & reorder alerts' },
  { icon: Mail, label: 'Email Marketing', desc: 'Automated flows & campaigns' },
  { icon: BarChart3, label: 'Performance Tracking', desc: 'Revenue, profit, growth — free' },
]

export function FeaturedModulesScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 bg-[#060d19] overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: text + modules */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400/80 mb-4">
              <Zap className="w-3.5 h-3.5" />
              What it does
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              One system.<br />Every department.
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-md">
              Connect your store and watch it handle customer service, inventory, email campaigns, and analytics — automatically.
            </p>

            {/* Module list */}
            <div className="space-y-4">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors">
                    <cap.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{cap.label}</h4>
                    <p className="text-white/40 text-sm">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: email preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Glow behind */}
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 blur-3xl rounded-full pointer-events-none" />
            
            {/* Label */}
            <div className="text-center mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Live output — Customer Service module
              </span>
            </div>

            <div className="relative">
              <EmailPreview />
            </div>

            {/* Activity badges */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -right-4 top-1/4 hidden lg:block"
            >
              <div className="bg-[#0f2038] border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
                <p className="text-[10px] text-emerald-400 font-medium">✓ Auto-sent</p>
                <p className="text-[9px] text-white/30">2 min ago</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="absolute -left-4 bottom-1/3 hidden lg:block"
            >
              <div className="bg-[#0f2038] border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
                <p className="text-[10px] text-blue-400 font-medium">↻ Flow triggered</p>
                <p className="text-[9px] text-white/30">Order #4821</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
