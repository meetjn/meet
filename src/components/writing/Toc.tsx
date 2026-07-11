"use client";

import { useEffect, useState } from "react";

import type { TocEntry } from "@/lib/articles";

/**
 * Sticky table of contents with scrollspy. The active heading is tracked with
 * an IntersectionObserver over the article's h2/h3 elements.
 */
export function Toc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length === 0) return;
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        // Prefer the heading closest to the top band of the viewport.
        const visible = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-1">
      <span className="eyebrow mb-4 !text-portfolio-ember">On this page</span>
      {entries.map((entry) => {
        const active = entry.id === activeId;
        return (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            className={`border-l py-1.5 text-[12.5px] leading-snug transition-colors ${
              entry.depth === 3 ? "pl-6" : "pl-3"
            } ${
              active
                ? "border-portfolio-ember text-portfolio-white"
                : "border-portfolio-smoke text-portfolio-mist hover:text-portfolio-cream"
            }`}
          >
            {entry.text}
          </a>
        );
      })}
    </nav>
  );
}
