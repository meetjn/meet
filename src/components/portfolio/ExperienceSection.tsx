import { Briefcase } from "lucide-react";

import { experience } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

export function ExperienceSection() {
  return (
    <section id="work" className="section-pad scroll-mt-24 bg-portfolio-ash">
      <SectionHeader
        label={
          <span className="flex items-center gap-2">
            <Briefcase className="size-3" />
            Work experience
          </span>
        }
        title="The record"
        className="mb-12 sm:mb-[60px]"
      />

      <div className="flex flex-col">
        {experience.map((job, index) => (
          <ScrollReveal
            key={job.role}
            as="article"
            delay={index * 100}
            className="exp-item relative grid gap-6 border-b border-portfolio-smoke py-10 sm:grid-cols-[180px_1fr] sm:gap-12 sm:py-12 lg:grid-cols-[200px_1fr] lg:gap-[60px]"
          >
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[11px] uppercase tracking-[0.15em] text-portfolio-ember">
                {job.period}
              </span>
              <Badge
                variant="outline"
                className="w-fit rounded-none border-portfolio-smoke bg-transparent px-2.5 py-1 text-[10px] uppercase tracking-wider text-portfolio-mist"
              >
                {job.tag}
              </Badge>
            </div>

            <div>
              <h3 className="font-display text-2xl tracking-wide sm:text-[32px]">
                {job.role}
              </h3>
              <p className="mb-5 mt-1 text-[13px] uppercase tracking-[0.15em] text-portfolio-ember">
                {job.company}
              </p>
              <ul className="flex flex-col gap-3">
                {job.points.map((point) => (
                  <li
                    key={point.slice(0, 48)}
                    className="relative pl-5 text-sm leading-relaxed text-portfolio-cream before:absolute before:left-0 before:text-portfolio-ember-dim before:content-['—']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <Badge className="mt-5 rounded-none border-0 bg-portfolio-ember-dim px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-portfolio-ember-glow hover:bg-portfolio-ember-dim">
                {job.impact}
              </Badge>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
