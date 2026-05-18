"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrainCircuit,
  Factory,
  Globe2,
  Hand,
  RadioTower,
  RocketIcon,
  Smartphone,
  Sparkles,
} from "lucide-react";

const timeline = [
  {
    era: "01",
    title: "Handwork",
    detail: "Human effort.",
    icon: Hand,
  },
  {
    era: "02",
    title: "Steam",
    detail: "Work became scalable.",
    icon: Factory,
  },
  {
    era: "03",
    title: "Signals",
    detail: "Information moved faster.",
    icon: RadioTower,
  },
  {
    era: "04",
    title: "Rockets",
    detail: "Ambition accelerated.",
    icon: RocketIcon,
  },
  {
    era: "05",
    title: "Internet",
    detail: "Knowledge connected.",
    icon: Globe2,
  },
  {
    era: "06",
    title: "Mobile",
    detail: "Business entered every pocket.",
    icon: Smartphone,
  },
  {
    era: "07",
    title: "AI",
    detail: "Software starts thinking with us.",
    icon: BrainCircuit,
    current: true,
  },
];

export function EvolutionTimeline() {
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLanded(true), 5200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-ainomiq-border bg-ainomiq-navy-light py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.10),transparent_32%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.08),transparent_34%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue shadow-sm">
              The timeline
            </div>
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-ainomiq-text md:text-5xl">
              Every era made work move faster.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-ainomiq-text-muted md:justify-self-end">
            From hands to machines, from signals to software, from mobile to AI.
            Then comes the missing layer: Ainomiq running the business with it.
          </p>
        </div>

        <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-ainomiq-border bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-ainomiq-blue/35 to-transparent"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-white to-transparent" />

          <AnimatePresence mode="wait">
            {!landed ? (
              <motion.div
                key="timeline-run"
                className="absolute left-1/2 top-1/2 flex -translate-y-1/2 gap-4"
                initial={{ x: "28%" }}
                animate={{ x: "-88%" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 5.1, ease: [0.76, 0, 0.24, 1] }}
              >
                {timeline.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`relative min-w-[250px] rounded-2xl border p-5 shadow-sm ${
                        item.current
                          ? "border-ainomiq-blue bg-ainomiq-blue text-white shadow-ainomiq-blue/25"
                          : "border-ainomiq-border bg-white text-ainomiq-text"
                      }`}
                    >
                      <div className="mb-8 flex items-center justify-between">
                        <span
                          className={`text-xs font-bold tracking-[0.18em] ${
                            item.current ? "text-white/70" : "text-ainomiq-text-subtle"
                          }`}
                        >
                          {item.era}
                        </span>
                        <div
                          className={`flex size-11 items-center justify-center rounded-xl ${
                            item.current
                              ? "bg-white/15 text-white"
                              : "bg-ainomiq-blue-glow text-ainomiq-blue"
                          }`}
                        >
                          <Icon className="size-5" />
                        </div>
                      </div>
                      <div
                        className={`absolute left-6 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 ${
                          item.current ? "border-white bg-white" : "border-white bg-ainomiq-blue"
                        }`}
                      />
                      <div className="pt-8">
                        <h3 className="text-xl font-extrabold tracking-tight">
                          {item.title}
                        </h3>
                        <p
                          className={`mt-2 text-sm leading-relaxed ${
                            item.current ? "text-white/78" : "text-ainomiq-text-muted"
                          }`}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="ainomiq-landed"
                className="absolute inset-0 flex items-center justify-center px-6"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ainomiq-blue/10 blur-3xl" />
                <motion.div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ainomiq-blue/15"
                  initial={{ scale: 0.65, opacity: 0 }}
                  animate={{ scale: 1.08, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="relative w-full max-w-2xl rounded-[2rem] border border-ainomiq-blue/30 bg-ainomiq-text p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] md:p-10">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                      <Sparkles className="size-3.5" />
                      Next layer
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-ainomiq-blue">
                      <Sparkles className="size-6" />
                    </div>
                  </div>
                  <h3 className="text-5xl font-extrabold tracking-tight md:text-7xl">
                    Ainomiq
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/76 md:text-xl">
                    The moment AI stops being a tool and becomes the operating
                    layer that runs the business with you.
                  </p>
                  <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
                    <span className="rounded-2xl bg-white/10 px-4 py-3">Automates work</span>
                    <span className="rounded-2xl bg-white/10 px-4 py-3">Connects systems</span>
                    <span className="rounded-2xl bg-white/10 px-4 py-3">Keeps improving</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
