"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const teams = [
  {
    team: "Head of Development",
    lead: "Ashar Mehmood",
    photo: "/team/ashar.png",
    members: [
      {
        role: "Development",
        name: "Jayden de Roo",
        photo: "/team/jayden.png",
      },
      {
        role: "Development",
        name: "Teis Egelie",
        photo: "/team/teis.png",
      },
    ],
  },
  {
    team: "Head of Sales",
    lead: "Marnix Schouten",
    photo: "/team/marnix.png",
    members: [],
  },
  {
    team: "Head of HR",
    lead: "Nynke Jurjus",
    photo: "/team/nynke.png",
    members: [],
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
  const levelTwoOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const levelTwoY = useTransform(scrollYProgress, [0.45, 0.68], [18, 0]);
  const memberBranchScale = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const levelThreeOpacity = useTransform(scrollYProgress, [0.54, 0.68], [0, 1]);
  const levelThreeY = useTransform(scrollYProgress, [0.54, 0.72], [20, 0]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="scroll-mt-24 overflow-hidden px-6 pt-24 pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Two friends. One idea.
          </h2>
        </div>

        <div id="team" className="scroll-mt-24">
          <div className="md:hidden">
            <Card className="border-ainomiq-border bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-ainomiq-blue-glow">
                  <Image
                    src="/team/founders.png"
                    alt="Bink Sanders and Pim Smit"
                    fill
                    className="object-cover object-center"
                    sizes="calc(100vw - 3rem)"
                  />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                  Founders
                </p>
                <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-ainomiq-text">
                  Bink Sander & Pim Smit
                </h3>
              </CardContent>
            </Card>

            <div className="relative mt-8 space-y-5 pl-7">
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-3 top-0 w-px bg-ainomiq-border"
              />
              {teams.map((item) => (
                <div key={item.team} className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute -left-4 top-28 h-px w-4 bg-ainomiq-border"
                  />
                  <Card className="border-ainomiq-border bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-ainomiq-navy-light">
                        <Image
                          src={item.photo}
                          alt={item.lead}
                          fill
                          className="object-cover object-top"
                          sizes="calc(100vw - 5.5rem)"
                        />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                        {item.team}
                      </p>
                      <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-ainomiq-text">
                        {item.lead}
                      </h3>
                    </CardContent>
                  </Card>

                  {item.members.length > 0 && (
                    <div className="relative mt-4 space-y-4 pl-5">
                      <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-2 top-0 w-px bg-ainomiq-border"
                      />
                      {item.members.map((member) => (
                        <div key={member.name} className="relative">
                          <div
                            aria-hidden="true"
                            className="absolute -left-3 top-20 h-px w-3 bg-ainomiq-border"
                          />
                          <Card className="border-ainomiq-border bg-white shadow-sm">
                            <CardContent className="p-3">
                              <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-ainomiq-navy-light">
                                <Image
                                  src={member.photo}
                                  alt={member.name}
                                  fill
                                  className="object-cover object-top"
                                  sizes="calc(100vw - 7rem)"
                                />
                              </div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                                {member.role}
                              </p>
                              <h3 className="mt-1 text-base font-extrabold tracking-tight text-ainomiq-text">
                                {member.name}
                              </h3>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden max-w-6xl md:block">
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
                  <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-extrabold tracking-tight text-ainomiq-text">
                      Bink Sander & Pim Smit
                    </h3>
                    <Button
                      asChild
                      variant="outline"
                      className="w-fit rounded-full border-ainomiq-border bg-white text-ainomiq-text hover:border-ainomiq-blue/40 hover:bg-ainomiq-blue-glow"
                    >
                      <Link href="#founder-story">
                        Read story
                        <ArrowRightIcon className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="relative mx-auto mt-0 max-w-5xl">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-0 h-full w-px origin-top bg-ainomiq-border md:hidden"
              style={{ scaleY: trunkScale }}
            />
            <motion.svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 hidden h-36 w-full overflow-visible text-ainomiq-border md:block"
              viewBox="0 0 100 144"
              preserveAspectRatio="none"
              fill="none"
              shapeRendering="crispEdges"
            >
              <motion.path
                d="M50 0V96"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: trunkScale }}
              />
              <motion.path
                d="M18 96H82"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: branchScale }}
              />
              {[18, 50, 82].map((x) => (
                <motion.path
                  key={x}
                  d={`M${x} 96V130`}
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: branchScale }}
                />
              ))}
            </motion.svg>

            <motion.div
              className="grid w-full gap-5 pt-8 md:grid-cols-3 md:pt-36"
              style={{ opacity: levelTwoOpacity, y: levelTwoY }}
            >
              {teams.map((item, index) => (
                <motion.div
                  key={item.team}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative ml-10 md:ml-0"
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[2.95rem] top-1/2 h-px w-10 origin-right bg-ainomiq-border md:hidden"
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
                  {item.members.length > 0 && (
                    <motion.div
                      className="relative mt-10 grid gap-4 sm:grid-cols-2 md:-mx-20"
                      style={{ opacity: levelThreeOpacity, y: levelThreeY }}
                    >
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-10 left-1/2 h-10 w-px origin-top -translate-x-1/2 bg-ainomiq-border"
                        style={{ scaleY: memberBranchScale }}
                      />
                      <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-5 left-1/4 right-1/4 hidden h-px origin-center bg-ainomiq-border sm:block"
                        style={{ scaleX: memberBranchScale }}
                      />
                      {item.members.map((member, memberIndex) => (
                        <motion.div
                          key={member.name}
                          initial={{ opacity: 0, y: 18, scale: 0.98 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{
                            duration: 0.55,
                            delay: memberIndex * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Card className="group relative border-ainomiq-border bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-ainomiq-blue/30 hover:shadow-[0_22px_60px_rgba(15,23,42,0.12)]">
                            <motion.div
                              aria-hidden="true"
                              className="pointer-events-none absolute -top-5 left-1/2 h-5 w-px origin-top -translate-x-1/2 bg-ainomiq-border"
                              style={{ scaleY: memberBranchScale }}
                            />
                            <CardContent className="p-4">
                              <div className="relative mb-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-ainomiq-navy-light text-sm font-medium text-ainomiq-text-muted">
                                <Image
                                  src={member.photo}
                                  alt={member.name}
                                  fill
                                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                  sizes="(min-width: 768px) 288px, calc(100vw - 6rem)"
                                />
                              </div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ainomiq-blue">
                                {member.role}
                              </p>
                              <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-ainomiq-text">
                                {member.name}
                              </h3>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        </div>

        <div
          id="founder-story"
          className="mx-auto mt-20 max-w-3xl scroll-mt-28 text-center"
        >
          <div className="space-y-4 text-lg leading-relaxed text-ainomiq-text-muted">
            <p>
              Pim and Bink have been friends since they were kids. One built e-commerce brands. The other built systems. Different backgrounds, same instinct: if work can be made smarter, faster or more scalable, it should be.
            </p>
            <p>
              After years of building their own businesses, they saw the same shift happening everywhere: AI is changing how companies operate, and the businesses that adapt early will move faster than the ones that wait.
            </p>
            <p>
              ainomiq was built to help businesses move ahead of that shift.
            </p>
            <p>
              We build what each company needs to stay ahead: custom software, AI systems, automations, dashboards and integrations that fit the way the business actually works.
            </p>
            <p>
              Not vague tools. Not generic AI promises. Custom-built systems that create real value inside the company.
            </p>
            <p>
              Because we believe the companies that build their own software layer in the coming years will move faster than the companies relying only on disconnected tools.
            </p>
            <p>
              Working systems, built for the business from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
