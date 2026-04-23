"use client";

import { FC } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  highlight?: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, highlight, className }) => {
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.06 }}
      className={cn("mx-auto max-w-4xl px-6", className)}
    >
      <p className="flex flex-wrap justify-center text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0.15 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-1 lg:mx-2.5 text-black"
          >
            {word}
          </motion.span>
        ))}
      </p>
      {highlight && (
        <p className="mt-4 flex flex-wrap justify-center text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl">
          {highlightWords.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0.15 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mx-1 lg:mx-2.5 text-ainomiq-blue"
            >
              {word}
            </motion.span>
          ))}
        </p>
      )}
    </motion.div>
  );
};

export { TextRevealByWord };
