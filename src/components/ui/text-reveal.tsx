"use client";

import { FC } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className }) => {
  const words = text.split(" ");

  return (
    <div className={cn("mx-auto max-w-4xl px-6", className)}>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.08 }}
        className="flex flex-wrap justify-center text-center text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl"
      >
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
      </motion.p>
    </div>
  );
};

export { TextRevealByWord };
