"use client";

import { useEffect, useState } from "react";

const WORDS = ["Future.", "Advantage.", "Momentum.", "Edge.", "Standard."];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_BEFORE_DELETE = 2400;
const PAUSE_BEFORE_TYPE = 350;

export function AboutTypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];

    if (!deleting && charIndex < word.length) {
      const timeout = window.setTimeout(() => {
        setCharIndex((current) => current + 1);
      }, TYPE_SPEED);

      return () => window.clearTimeout(timeout);
    }

    if (!deleting && charIndex === word.length) {
      const timeout = window.setTimeout(() => {
        setDeleting(true);
      }, PAUSE_BEFORE_DELETE);

      return () => window.clearTimeout(timeout);
    }

    if (deleting && charIndex > 0) {
      const timeout = window.setTimeout(() => {
        setCharIndex((current) => current - 1);
      }, DELETE_SPEED);

      return () => window.clearTimeout(timeout);
    }

    if (deleting && charIndex === 0) {
      const timeout = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % WORDS.length);
      }, PAUSE_BEFORE_TYPE);

      return () => window.clearTimeout(timeout);
    }
  }, [charIndex, deleting, wordIndex]);

  return (
    <>
      {WORDS[wordIndex].slice(0, charIndex)}
      <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-1 bg-ainomiq-blue align-baseline animate-pulse" />
    </>
  );
}
