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

/** Scroll runway + per-word timing — tuned for a readable ~2–3s pass through the quote */
const SCROLL_OFFSET_START = "start 0.92";
const SCROLL_OFFSET_END = "end 0.08";
const PROGRESS_PAD_START = 0.05;
const PROGRESS_PAD_END = 0.1;
const WORD_FADE_MULTIPLIER = 1.65;

type WordToken = {
  text: string;
  accent: boolean;
};

function wordProgressRange(index: number, total: number) {
  const usable = 1 - PROGRESS_PAD_START - PROGRESS_PAD_END;
  const slot = usable / total;
  const fade = slot * WORD_FADE_MULTIPLIER;
  const start = PROGRESS_PAD_START + index * slot;
  const end = Math.min(start + fade, 1 - PROGRESS_PAD_END * 0.5);
  return { start, end };
}

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
  const { start, end } = wordProgressRange(index, total);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [SCROLL_OFFSET_START, SCROLL_OFFSET_END],
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
    <div
      ref={containerRef}
      className="min-w-0 pt-2 pb-[min(44vh,460px)] sm:pb-[min(48vh,520px)]"
    >
      <blockquote
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
    </div>
  );
}
