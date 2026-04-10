"use client";

import { useEffect, useRef, useState } from "react";

const valuesData = [
  {
    num: "01",
    title: "Just get it done",
    body: "We value decisive action and speed over prolonged deliberation and planning. Every solution ships fast because our clients can't afford to wait.",
  },
  {
    num: "02",
    title: "Invent what customers want",
    body: "Our core identity is rooted in building for our customers. We listen, we test, we iterate — because the best products come from obsessing over real problems.",
  },
  {
    num: "03",
    title: "Winner's mindset",
    body: "Fiercely competitive nature and fighting spirit are foundational. We play to win, learn from losses, and never settle for second best.",
  },
  {
    num: "04",
    title: "The Polymath Principle",
    body: "The best team members understand other functions deeply and promote cross-functional collaboration. Breadth of knowledge drives innovation.",
  },
];

export function ValuesScroll() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0f172a] text-white"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Sticky container */}
        <div className="flex flex-col md:flex-row md:min-h-screen">
          {/* Left: sticky labels */}
          <div className="md:sticky md:top-0 md:h-screen md:w-1/2 flex flex-col justify-center py-16 md:py-0">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-12">
              Our values
            </span>
            <div className="space-y-8">
              {valuesData.map((v, i) => (
                <button
                  key={v.num}
                  onClick={() => {
                    setActive(i);
                    itemRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="flex items-center gap-5 text-left transition-all duration-500 group cursor-pointer"
                >
                  <span
                    className={`text-sm font-mono transition-colors duration-500 ${
                      i === active ? "text-ainomiq-blue" : "text-white/25"
                    } group-hover:text-ainomiq-blue`}
                  >
                    {v.num}
                  </span>
                  <span
                    className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500 ${
                      i === active ? "text-white" : "text-white/25"
                    } group-hover:text-white`}
                  >
                    {v.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: scrolling descriptions */}
          <div className="md:w-1/2 flex flex-col">
            {valuesData.map((v, i) => (
              <div
                key={v.num}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex items-center min-h-[50vh] md:min-h-screen py-16 md:py-0"
              >
                <div
                  className={`max-w-md transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0 md:opacity-20"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ainomiq-blue mb-4 block">
                    Our values
                  </span>
                  <p className="text-lg md:text-xl leading-relaxed text-white/80">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
