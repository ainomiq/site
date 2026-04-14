'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function FeaturedModulesScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 block">
            Customer Service Module
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Emails that send themselves.
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Order updates, tracking notifications, follow-ups — fully automated, on brand, every time.
          </p>
        </motion.div>

        {/* Email preview in a device frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-lg mx-auto"
        >
          {/* Shadow */}
          <div className="absolute -inset-4 bg-gray-100 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          {/* Browser chrome */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Top bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white border border-gray-200 rounded-md px-4 py-1 text-[11px] text-gray-400 font-medium">
                  mail.klaviyo.com/campaign/preview
                </div>
              </div>
            </div>

            {/* Email iframe */}
            <div className="relative w-full" style={{ height: '620px' }}>
              <iframe
                src="/showcase/email-delivered.html"
                className="w-full h-full border-0"
                title="Email preview"
                sandbox="allow-same-origin"
                loading="lazy"
              />
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -right-3 top-20 hidden md:block"
          >
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 shadow-lg">
              <p className="text-xs text-emerald-700 font-semibold">✓ Auto-sent</p>
              <p className="text-[10px] text-emerald-500">Triggered by delivery event</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
