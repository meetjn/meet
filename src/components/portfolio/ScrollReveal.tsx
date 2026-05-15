"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade" | "scale";

type ScrollRevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function ScrollReveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  variant = "fade-up",
  ...props
}: ScrollRevealProps<T>) {
  const Component = as ?? "div";

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      // Polymorphic `as` prevents a single ref type; observer only needs an Element.
      ref={ref as never}
      className={cn(
        "reveal",
        variant === "fade-up" && "reveal-fade-up",
        variant === "fade" && "reveal-fade",
        variant === "scale" && "reveal-scale",
        visible && "reveal-visible",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}
