"use client";

import { useEffect, useRef, useState } from "react";

// SVG viewBox: 0 0 200 100, y=0 is top
// Before: chaotic sine-wave style path
const BEFORE_PATH = "M0,55 C4,55 6,75 10,75 C14,75 16,25 20,25 C24,25 26,78 30,78 C34,78 36,22 40,22 C44,22 46,72 50,72 C54,72 56,18 60,18 C64,18 66,68 70,68 C74,68 76,15 80,15 C84,15 86,65 90,65 C94,65 96,12 100,12";

// After: smooth exponential growth
const AFTER_PATH = "M0,88 C30,88 50,80 80,60 C110,40 140,20 200,5";

function AnimatedChart({
  path,
  color,
  label,
  labelColor,
  delay = 0,
}: {
  path: string;
  color: string;
  label: string;
  labelColor: string;
  delay?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(1000);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      setLen(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setTimeout(() => setStarted(true), delay);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [started, delay]);

  return (
    <div ref={containerRef} className="rounded-2xl border border-gray-100 bg-white p-4"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 text-center ${labelColor}`}>
        {label}
      </p>
      <svg viewBox="0 0 200 100" className="w-full" style={{ height: 200 }} preserveAspectRatio="none">
        {/* Grid */}
        {[25, 50, 75].map(y => (
          <line key={y} x1={0} x2={200} y1={y} y2={y} stroke="#f3f4f6" strokeWidth={0.5} />
        ))}
        {[50, 100, 150].map(x => (
          <line key={x} x1={x} x2={x} y1={0} y2={100} stroke="#f3f4f6" strokeWidth={0.5} />
        ))}

        {/* Animated line */}
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={len}
          strokeDashoffset={started ? 0 : len}
          style={{
            transition: started
              ? `stroke-dashoffset 2.4s cubic-bezier(0.4, 0, 0.2, 1)`
              : "none",
          }}
        />
      </svg>
    </div>
  );
}

export function GrowthChartSection() {
  return (
    <section className="py-10 md:py-16 px-6 bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0f1b2d]">
            What consistent automation looks like.
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Erratic performance before. Steady growth after.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedChart
            path={BEFORE_PATH}
            color="#f87171"
            label="Before"
            labelColor="text-red-400"
            delay={0}
          />
          <AnimatedChart
            path={AFTER_PATH}
            color="#3b82f6"
            label="After"
            labelColor="text-[#0f1b2d]"
            delay={200}
          />
        </div>
      </div>
    </section>
  );
}
