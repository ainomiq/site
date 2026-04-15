"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // scrollYProgress: 0 = top of container hits bottom of viewport, 1 = bottom hits top
  // With a 60rem container (~960px), scrollYProgress ~0.35 is when content center hits center
  // Tablet: steep 55° tilt at start, opens flat by ~35% scroll
  const rotate = useTransform(scrollYProgress, [0.05, 0.45], [55, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.45], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0.05, 0.45], [0, -100]);
  // Text: fully visible until 20% scroll, then fades to 0 by 40%
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.4], [1, 1, 0]);

  // Mobile: iPhone slides up from bottom with app inside
  if (isMobile) {
    return (
      <MobilePhoneScroll titleComponent={titleComponent}>
        {children}
      </MobilePhoneScroll>
    );
  }

  return (
    <div
      className="h-[60rem] md:h-[60rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} opacity={titleOpacity} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
      {/* Bottom gradient fade — smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />
    </div>
  );
};

// Mobile: sticky section — phone rises up as you scroll
function MobilePhoneScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Phone slides from below (100%) to center (0%)
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], ["80%", "0%", "-10%"]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[160vw] flex flex-col items-center justify-start overflow-hidden pt-8 px-6"
    >
      {/* Text above phone */}
      <motion.div
        style={{ opacity: titleOpacity, y: titleY }}
        className="text-center w-full mb-6 z-10 relative"
      >
        {titleComponent}
      </motion.div>

      {/* iPhone frame rising from bottom */}
      <motion.div
        style={{ y: phoneY, scale: phoneScale, width: "min(320px, 85vw)" }}
        className="relative mx-auto z-20"
      >
        {/* Phone outer shell */}
        <div
          className="relative w-full rounded-[3rem] bg-[#1a1a1a] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]"
          style={{ aspectRatio: "9/19.5" }}
        >
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[20%] w-[3px] h-8 bg-[#333] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[31%] w-[3px] h-10 bg-[#333] rounded-l-sm" />
          <div className="absolute -left-[3px] top-[43%] w-[3px] h-10 bg-[#333] rounded-l-sm" />
          <div className="absolute -right-[3px] top-[28%] w-[3px] h-14 bg-[#333] rounded-r-sm" />

          {/* Screen bezel */}
          <div className="absolute inset-[3px] rounded-[2.7rem] bg-black overflow-hidden">
            {/* Dynamic island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-20 h-5 bg-black rounded-full" />

            {/* Screen content */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.7rem] bg-white">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-12 z-20 flex items-end justify-between px-6 pb-1">
                <span className="text-[10px] font-semibold text-black">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5 items-end h-3">
                    {[3,4,5,6].map(h => (
                      <div key={h} className="w-[2px] bg-black rounded-sm" style={{ height: h }} />
                    ))}
                  </div>
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2C8.8 2 11 4.2 11 7H1C1 4.2 3.2 2 6 2Z" fill="black" opacity=".3"/>
                    <path d="M6 3.5C8 3.5 9.7 4.9 10.2 6.8H1.8C2.3 4.9 4 3.5 6 3.5Z" fill="black" opacity=".6"/>
                    <path d="M6 5C7.3 5 8.4 5.7 9 6.8H3C3.6 5.7 4.7 5 6 5Z" fill="black"/>
                  </svg>
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 h-2.5 rounded-sm border border-black/40 flex items-center p-0.5">
                      <div className="h-full bg-black rounded-[1px]" style={{ width: "75%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* App content — pushed down past status bar */}
              <div className="absolute inset-0 pt-12 pb-0">
                {children}
              </div>
            </div>
          </div>

          {/* Reflection glare */}
          <div className="absolute inset-[3px] rounded-[2.7rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />
        </div>

        {/* Phone shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/20 blur-xl rounded-full" />
      </motion.div>
      {/* Bottom gradient fade — smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-40" />
    </div>
  );
}

export const Header = ({ translate, titleComponent, opacity }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: opacity ?? 1,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.35), 0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.15), inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
      className="max-w-5xl -mt-12 mx-auto w-full"
    >
      {/* iPad Pro outer shell — silver aluminium */}
      <div
        className="relative w-full mx-auto"
        style={{
          background: "linear-gradient(145deg, #e8e8e8 0%, #d0d0d0 40%, #c8c8c8 60%, #d8d8d8 100%)",
          borderRadius: "28px",
          padding: "12px 10px 12px 10px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.15), inset 1px 0 0 rgba(255,255,255,0.4), inset -1px 0 0 rgba(0,0,0,0.1)",
        }}
      >
        {/* Top bar with front camera */}
        <div className="relative flex items-center justify-center mb-0" style={{ height: "18px" }}>
          {/* Front camera */}
          <div className="relative flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#1a1a1a", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.3)" }}>
              <div className="w-1 h-1 rounded-full mx-auto mt-0.5" style={{ background: "#2a4a8a", opacity: 0.7 }} />
            </div>
          </div>
        </div>

        {/* Screen bezel — thin black border */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "18px",
            background: "#000",
            padding: "1px",
          }}
        >
          {/* Screen content */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "17px",
              height: "min(40rem, 55vw)",
            }}
          >
            {children}

            {/* Screen glare */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "17px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                zIndex: 10,
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-center" style={{ height: "16px" }} />

        {/* Side volume buttons — left */}
        <div className="absolute left-0 top-[28%] w-[3px] h-8 rounded-l-sm" style={{ background: "linear-gradient(90deg, #b0b0b0, #c8c8c8)", marginLeft: "-3px" }} />
        <div className="absolute left-0 top-[38%] w-[3px] h-8 rounded-l-sm" style={{ background: "linear-gradient(90deg, #b0b0b0, #c8c8c8)", marginLeft: "-3px" }} />
        {/* Power button — right */}
        <div className="absolute right-0 top-[30%] w-[3px] h-12 rounded-r-sm" style={{ background: "linear-gradient(270deg, #b0b0b0, #c8c8c8)", marginRight: "-3px" }} />
      </div>
    </motion.div>
  );
};
