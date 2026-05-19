"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const teams = [
  {
    team: "Head of Development",
    lead: "Ashar",
    photo: "/team/ashar.png",
  },
  {
    team: "Head of Sales",
    lead: "Marnix",
    photo: "/team/marnix.png",
  },
  {
    team: "Head of HR",
    lead: "Nynke",
    photo: "/team/nynke.png",
  },
];

export function AboutTeamStructure() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 55%", "end 75%"],
  });

  const trunkScale = useTransform(scrollYProgress, [0.08, 0.34], [0, 1]);
  const branchScale = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.48, 0.7], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.48, 0.78], [56, 0]);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="scroll-mt-24 overflow-hidden px-6 pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-ainomiq-blue-glow px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ainomiq-blue">
            Team structure
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Built around focused teams
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="group relative z-20 mx-auto w-full max-w-2xl border-ainomiq-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-ainomiq-blue/30 hover:shadow-[0_20px_55px_rgba(15,23,42,0.10)]">
              <CardContent className="p-5">
                <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl bg-ainomiq-blue-glow">
                  <Image
                    src="/team/founders.png"
                    alt="Bink Sanders and Pim Smit"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 768px) 672px, calc(100vw - 3rem)"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                  Founders
                </p>
                <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ainomiq-text">
                  Bink & Pim
                </h3>
              </CardContent>
            </Card>
          </motion.div>

          <div className="relative mx-auto mt-10 max-w-5xl md:mt-0">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-ainomiq-blue/70 via-ainomiq-border to-ainomiq-border md:left-1/2 md:h-24 md:-translate-x-1/2"
              style={{ scaleY: trunkScale }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-24 hidden h-px origin-center bg-gradient-to-r from-ainomiq-border via-ainomiq-blue/60 to-ainomiq-border md:block"
              style={{ scaleX: branchScale }}
            />

            <motion.div
              className="grid w-full gap-5 pt-8 md:grid-cols-3 md:pt-36"
              style={{ opacity: cardOpacity, y: cardY }}
            >
              {teams.map((item, index) => (
                <motion.div
                  key={item.team}
                  initial={{ opacity: 0, y: 38, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative ml-10 md:ml-0"
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[2.95rem] top-1/2 h-px w-10 origin-right bg-ainomiq-border md:-top-12 md:left-1/2 md:h-12 md:w-px md:-translate-x-1/2"
                    style={{ scaleX: branchScale, scaleY: branchScale }}
                  />
                  <Card className="group relative border-ainomiq-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-ainomiq-blue/30 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
                    <CardContent className="p-5">
                      <div className="relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-ainomiq-navy-light text-sm font-medium text-ainomiq-text-muted">
                        <Image
                          src={item.photo}
                          alt={item.lead}
                          fill
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(min-width: 768px) 288px, calc(100vw - 6rem)"
                        />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                        {item.team}
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ainomiq-text">
                        {item.lead}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
