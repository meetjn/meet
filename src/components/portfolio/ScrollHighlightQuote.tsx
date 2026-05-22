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

/** HTML: --white #F7F4EE · --ember-glow #E8621A · dim ≈ 18% white / ~40% ember */
const COLOR_DIM_BASE = "rgba(247, 244, 238, 0.18)";
const COLOR_LIT_BASE = "rgb(247, 244, 238)";
const COLOR_DIM_ACCENT = "rgba(232, 98, 26, 0.42)";
const COLOR_LIT_ACCENT = "rgb(232, 98, 26)";

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
  /* Compress span so words finish lighting earlier in scroll — faster, mobile-friendly */
  const span = 0.82;
  const start = (index / total) * span;
  const end = Math.min(((index + 1) / total) * span + 0.06, 1);

  const color = useTransform(
    progress,
    [start, end],
    word.accent
      ? [COLOR_DIM_ACCENT, COLOR_LIT_ACCENT]
      : [COLOR_DIM_BASE, COLOR_LIT_BASE],
  );

  return (
    <motion.span
      style={{ color }}
      className={cn("inline", word.accent && "not-italic")}
    >
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
    offset: ["start end", "end start"],
  });

  /** Scroll tracking stops short on some layouts; ease completion without overshooting */
  const phraseProgress = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, v * 1.28)),
  );

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
      <blockquote className="narrative-quote m-0 max-w-none break-words">
        I don&apos;t just write code. I develop a{" "}
        <em>deep obsession</em> with the domain until I understand it better
        than almost anyone in the room.
      </blockquote>
    );
  }

  return (
    <div ref={containerRef} className="relative min-w-0">
      <blockquote className={cn("narrative-quote m-0 max-w-none break-words")}>
        {words.map((word, index) => (
          <HighlightWord
            key={`${word.text}-${index}`}
            word={word}
            index={index}
            total={words.length}
            progress={phraseProgress}
          />
        ))}
      </blockquote>
    </div>
  );
}
