'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, Package, Mail, Check } from 'lucide-react'

const modules = [
  {
    id: 'customer-service',
    icon: Bot,
    number: '01',
    label: 'Intelligent Customer Service',
    headline: 'Your support team that never sleeps',
    description:
      'An intelligent agent that answers customer questions 24/7, handles returns, and identifies escalations. Trained on your products, tone of voice, and policies.',
    capabilities: [
      'Multilingual support across 30+ languages',
      'Sentiment analysis and auto-escalation',
      'Handles 200+ tickets per day',
      'Trained on your brand voice and policies',
    ],
    stat: '200+',
    statLabel: 'tickets handled daily',
    gradient: 'from-blue-600 to-cyan-500',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'smart-inventory',
    icon: Package,
    number: '02',
    label: 'Smart Inventory',
    headline: 'Predict demand before it happens',
    description:
      'Intelligent forecasting that prevents stockouts and minimizes overstock. Real-time tracking across all your warehouses and sales channels.',
    capabilities: [
      'Predictive demand forecasting',
      'Automatic reorder alerts',
      'Seasonal trend analysis',
      'Multi-warehouse sync',
    ],
    stat: '30%',
    statLabel: 'less overstock',
    gradient: 'from-violet-600 to-purple-500',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    id: 'email-marketing',
    icon: Mail,
    number: '03',
    label: 'E-mail Marketing',
    headline: 'Automated flows that convert',
    description:
      'Personalized email flows from welcome to win-back. Intelligently optimizes timing, subject lines, and content for maximum conversions.',
    capabilities: [
      'Optimized send times',
      'Dynamic personalization',
      'Automated A/B testing',
      'Smart segmentation',
    ],
    stat: '3.2x',
    statLabel: 'higher conversion',
    gradient: 'from-emerald-600 to-teal-500',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
]

function ModuleCard({ mod, index }: { mod: (typeof modules)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1628] to-[#0f2038] border border-white/[0.08] p-8 md:p-10 h-full transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Gradient accent line at top */}
        <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${mod.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

        {/* Number + Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-xs font-mono font-bold bg-gradient-to-r ${mod.gradient} bg-clip-text text-transparent`}>
            {mod.number}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
            {mod.label}
          </span>
        </div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: 'backOut' }}
          className={`w-14 h-14 rounded-2xl ${mod.iconBg} flex items-center justify-center mb-6`}
        >
          <mod.icon className={`h-7 w-7 ${mod.iconColor}`} />
        </motion.div>

        {/* Headline */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          {mod.headline}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {mod.description}
        </p>

        {/* Capabilities */}
        <ul className="space-y-2.5 mb-8">
          {mod.capabilities.map((cap, i) => (
            <motion.li
              key={cap}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.15 + 0.4 + i * 0.08 }}
              className="flex items-center gap-2.5 text-sm text-white/60"
            >
              <Check className={`h-4 w-4 ${mod.iconColor} shrink-0`} />
              {cap}
            </motion.li>
          ))}
        </ul>

        {/* Stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.6, ease: 'backOut' }}
          className="flex items-baseline gap-2 pt-6 border-t border-white/[0.06]"
        >
          <span className={`text-4xl font-extrabold bg-gradient-to-r ${mod.gradient} bg-clip-text text-transparent`}>
            {mod.stat}
          </span>
          <span className="text-sm text-white/40">{mod.statLabel}</span>
        </motion.div>

        {/* Hover glow */}
        <div className={`absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br ${mod.gradient} opacity-0 group-hover:opacity-[0.08] blur-3xl rounded-full transition-opacity duration-700 pointer-events-none`} />
      </div>
    </motion.div>
  )
}

export function FeaturedModulesScroll() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#060d19] overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400/80 mb-4">
            Modules
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Everything your store needs
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Three powerful modules that work together to run your e-commerce on autopilot.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
