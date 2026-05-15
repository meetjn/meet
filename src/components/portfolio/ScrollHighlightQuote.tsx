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
  const slice = 0.88;
  const start = (index / total) * slice;
  const end = Math.min(((index + 1) / total) * slice + 0.06, 1);

  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const color = useTransform(
    progress,
    [start, end],
    word.accent
      ? ["rgba(140, 132, 128, 0.45)", "rgb(232, 98, 26)"]
      : ["rgba(140, 132, 128, 0.5)", "rgb(247, 244, 238)"],
  );

  return (
    <motion.span style={{ opacity, color }} className="inline">
      {word.text}
      {index < total - 1 ? "\u00A0" : ""}
    </motion.span>
  );
}

export function ScrollHighlightQuote({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.25"],
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
      <blockquote className="narrative-quote m-0">
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
      className="relative h-[min(180vh,1400px)] px-5 lg:h-[min(200vh,1600px)] lg:px-0"
    >
      <div className="sticky top-20 flex min-h-[min(85vh,720px)] items-center py-10 sm:top-24 lg:top-28">
        <blockquote className={cn("narrative-quote m-0 leading-[1.35]")}>
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
    </div>
  );
}
