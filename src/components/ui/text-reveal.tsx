"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  highlight?: string;
  tail?: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, highlight, tail, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];
  const tailWords = tail ? tail.split(" ") : [];
  const total = words.length + highlightWords.length + tailWords.length;

  return (
    <div ref={targetRef} className={cn("mx-auto max-w-4xl px-6", className)}>
      <p className="flex flex-wrap justify-center text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
        {words.map((word, i) => {
          const start = i / total;
          const end = (i + 1) / total;
          return (
            <Word key={`t-${i}`} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
      {(highlight || tail) && (
        <p className="mt-4 flex flex-wrap justify-center text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
          {highlightWords.map((word, i) => {
            const offset = words.length + i;
            const start = offset / total;
            const end = (offset + 1) / total;
            return (
              <Word key={`h-${i}`} progress={scrollYProgress} range={[start, end]} accent>
                {word}
              </Word>
            );
          })}
          {tailWords.map((word, i) => {
            const offset = words.length + highlightWords.length + i;
            const start = offset / total;
            const end = (offset + 1) / total;
            return (
              <Word key={`tl-${i}`} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      )}
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}

const Word: FC<WordProps> = ({ children, progress, range, accent }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn("mx-1 lg:mx-2.5", accent ? "text-ainomiq-blue" : "text-black")}
    >
      {children}
    </motion.span>
  );
};

export { TextRevealByWord };
