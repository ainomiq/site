"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const REVEAL_FRACTION = 0.4;

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[120vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-screen max-w-4xl items-center justify-center bg-transparent px-6"
        }
      >
        <p
          className={
            "flex flex-wrap text-center justify-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = 0.05 + (i / words.length) * REVEAL_FRACTION;
            const end = start + (1 / words.length) * REVEAL_FRACTION;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <motion.span
        style={{ opacity }}
        className={"text-black"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
