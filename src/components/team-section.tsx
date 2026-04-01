"use client";

import { Marquee } from "@/components/ui/marquee";
import { Users } from "lucide-react";

const teamMembers = [
  {
    initials: "BS",
    name: "Bink Sanders",
    role: "Founder & CEO",
    gradient: "from-ainomiq-blue to-blue-400",
  },
  {
    initials: "PK",
    name: "Pim Klaver",
    role: "Co-founder & CTO",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    initials: "AI",
    name: "Marco",
    role: "AI Operations Agent",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    initials: "BS",
    name: "Bink Sanders",
    role: "Founder & CEO",
    gradient: "from-ainomiq-blue to-blue-400",
  },
  {
    initials: "PK",
    name: "Pim Klaver",
    role: "Co-founder & CTO",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    initials: "AI",
    name: "Marco",
    role: "AI Operations Agent",
    gradient: "from-emerald-500 to-teal-400",
  },
];

export function TeamSection() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Decorative SVG */}
      <svg
        className="absolute right-0 bottom-0 text-ainomiq-border opacity-30"
        fill="none"
        height="154"
        viewBox="0 0 460 154"
        width="460"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_team)">
          <path
            d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="40"
          />
        </g>
        <defs>
          <clipPath id="clip0_team">
            <rect fill="white" height="154" width="460" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ainomiq-blue text-white">
            <Users className="h-6 w-6" />
          </div>

          <h2 className="relative mb-4 text-3xl font-extrabold tracking-tight md:text-5xl text-white">
            De mensen achter Ainomiq
            <svg
              className="absolute -top-2 -right-8 -z-10 w-24 text-ainomiq-border opacity-40"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h2>
          <p className="max-w-2xl text-ainomiq-text-muted">
            Een klein, slagvaardig team dat elke dag AI-oplossingen bouwt die
            echt werken. Geen overhead, geen vergaderingen — alleen resultaat.
          </p>
        </div>

        {/* Team Marquee */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-ainomiq-navy to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-ainomiq-navy to-transparent" />

          <Marquee className="[--gap:1.5rem] [--duration:30s]" pauseOnHover>
            {teamMembers.map((member, i) => (
              <div
                className="group flex w-64 shrink-0 flex-col"
                key={`${member.name}-${i}`}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-ainomiq-border bg-ainomiq-navy-light">
                  {/* Avatar with gradient */}
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${member.gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-extrabold text-white/30 group-hover:text-white/50 transition-colors duration-300">
                      {member.initials}
                    </span>
                  </div>
                  <div className="absolute bottom-0 w-full rounded-b-2xl bg-ainomiq-navy/85 backdrop-blur-sm p-4 border-t border-ainomiq-border">
                    <h3 className="font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-ainomiq-text-muted">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Quote */}
        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <p className="mb-8 text-lg font-medium leading-relaxed text-white md:text-xl">
            &ldquo;Wij bouwen AI die draait. Geen pilots die nergens landen,
            geen rapporten die in een la belanden. Werkende oplossingen,
            binnen 2 weken live.&rdquo;
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ainomiq-blue-glow text-lg font-bold text-ainomiq-blue">
              BS
            </div>
            <div className="text-center">
              <p className="font-semibold text-white">Bink Sanders</p>
              <p className="text-sm text-ainomiq-text-muted">
                Founder & CEO &middot; Ainomiq
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
