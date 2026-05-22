"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 400, damping: 32, mass: 0.8 };

type GlassCtaProps = {
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

export function GlassCta({
  href,
  variant = "primary",
  className,
  children,
  external,
}: GlassCtaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { scale: 1.01, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98, y: 0 }}
      transition={spring}
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cn(
          "glass-cta",
          variant === "primary" ? "glass-cta-primary" : "glass-cta-ghost",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}

type GlassChipProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

export function GlassChip({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: GlassChipProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={spring}
    >
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className={cn("glass-chip contact-link", className)}
      >
        {children}
      </Link>
    </motion.div>
  );
}
