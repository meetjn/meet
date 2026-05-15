"use client";

import { useCallback, useRef, useState } from "react";
import { Briefcase } from "lucide-react";

import { experience } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

function pickExpIndex(
  section: HTMLElement | null,
  clientX: number,
  clientY: number,
): number | null {
  if (!section) return null;
  if (typeof document === "undefined") return null;
  const stack = document.elementsFromPoint(clientX, clientY);
  for (const el of stack) {
    const row = el.closest<HTMLElement>("[data-exp-item]");
    if (row && section.contains(row)) {
      const raw = row.dataset.expIndex;
      if (raw !== undefined) {
        const i = Number(raw);
        return Number.isFinite(i) ? i : null;
      }
    }
  }
  return null;
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [touchActiveIndex, setTouchActiveIndex] = useState<number | null>(
    null,
  );

  const updateFromPoint = useCallback((clientX: number, clientY: number) => {
    const next = pickExpIndex(sectionRef.current, clientX, clientY);
    if (next !== null) setTouchActiveIndex(next);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-pad touch-pan-y bg-portfolio-ash"
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromPoint(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") return;
        updateFromPoint(e.clientX, e.clientY);
      }}
      onPointerUp={(e) => {
        if (e.pointerType === "mouse") return;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
      onPointerCancel={(e) => {
        if (e.pointerType === "mouse") return;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
    >
      <SectionHeader
        label={
          <span className="flex items-center gap-2">
            <Briefcase className="size-3" />
            Work experience
          </span>
        }
        title="The record"
      />

      <div className="flex flex-col">
        {experience.map((job, index) => (
          <ScrollReveal
            key={job.role}
            as="article"
            data-exp-item
            data-exp-index={index}
            delay={index * 100}
            className={cn(
              "exp-item relative grid gap-6 border-b border-portfolio-smoke py-10 sm:grid-cols-[180px_1fr] sm:gap-12 sm:py-12 lg:grid-cols-[200px_1fr] lg:gap-[60px]",
              touchActiveIndex === index && "exp-item-active",
            )}
          >
            <div className="flex flex-col gap-2 pt-1">
              <span className="exp-period">{job.period}</span>
              <Badge
                variant="outline"
                className="w-fit rounded-none border-portfolio-smoke bg-transparent px-2.5 py-1 text-[10px] font-normal uppercase tracking-[1.5px] text-portfolio-mist"
              >
                {job.tag}
              </Badge>
            </div>

            <div>
              <h3 className="exp-role mb-1">{job.role}</h3>
              <p className="exp-company mb-5">{job.company}</p>
              <ul className="flex flex-col gap-3">
                {job.points.map((point) => (
                  <li
                    key={point.slice(0, 48)}
                    className="exp-point relative pl-5 before:absolute before:left-0 before:text-portfolio-ember-dim before:content-['—']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <Badge className="mt-5 rounded-none border-0 bg-portfolio-ember-dim px-3 py-1 text-[10px] font-medium uppercase tracking-[2px] text-portfolio-ember-glow hover:bg-portfolio-ember-dim">
                {job.impact}
              </Badge>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
