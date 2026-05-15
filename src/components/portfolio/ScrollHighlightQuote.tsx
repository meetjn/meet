"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

const ACCENT_WORDS = new Set(["deep", "obsession"]);

type WordToken = {
  text: string;
  accent: boolean;
};

function HighlightWord({
  word,
  index,
  total,
  progress,
}: {
  word: WordToken;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.9;
  const end = Math.min(((index + 1) / total) * 0.9 + 0.08, 1);

  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const color = useTransform(
    progress,
    [start, end],
    word.accent
      ? ["rgba(140, 132, 128, 0.55)", "rgb(232, 98, 26)"]
      : ["rgba(140, 132, 128, 0.55)", "rgb(247, 244, 238)"],
  );

  return (
    <motion.span style={{ opacity, color }} className="inline">
      {word.text}
      {index < total - 1 ? " " : ""}
    </motion.span>
  );
}

export function ScrollHighlightQuote({ text }: { text: string }) {
  const containerRef = useRef<HTMLQuoteElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });

  const words = useMemo<WordToken[]>(() => {
    return text.split(/\s+/).map((token) => {
      const clean = token.replace(/[.,!?;:"“”]/g, "");
      return {
        text: token,
        accent: ACCENT_WORDS.has(clean.toLowerCase()),
      };
    });
  }, [text]);

  if (reduceMotion) {
    return (
      <blockquote className="narrative-quote m-0 max-w-none">
        I don&apos;t just write code. I develop a{" "}
        <span className="not-italic text-portfolio-ember-glow">deep obsession</span>{" "}
        with the domain until I understand it better than almost anyone in the
        room.
      </blockquote>
    );
  }

  return (
    <blockquote
      ref={containerRef}
      className={cn("narrative-quote m-0 max-w-none break-words")}
    >
      {words.map((word, index) => (
        <HighlightWord
          key={`${word.text}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </blockquote>
  );
}
