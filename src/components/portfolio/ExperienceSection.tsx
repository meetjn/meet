import { Briefcase } from "lucide-react";

import { experience } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

export function ExperienceSection() {
  return (
    <section id="work" className="section-pad bg-portfolio-ash">
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
            delay={index * 100}
            className="exp-item relative grid gap-6 border-b border-portfolio-smoke py-10 sm:grid-cols-[180px_1fr] sm:gap-12 sm:py-12 lg:grid-cols-[200px_1fr] lg:gap-[60px]"
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
