import { Users } from "lucide-react";

import { mentors, site } from "@/content/site";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

export function CraftSection() {
  return (
    <section id="craft" className="section-pad bg-portfolio-black">
      <SectionHeader
        className="mb-14 md:mb-20 lg:mb-24"
        label={
          <span className="flex items-center gap-2">
            <Users className="size-3" />
            Environment & mentorship
          </span>
        }
        title="The room I was in"
      />

      <div className="mx-auto w-full max-w-6xl">
        <ScrollReveal
          as="article"
          className="flex flex-col gap-14 bg-portfolio-smoke p-10 sm:gap-16 sm:p-12 md:p-14 lg:flex-row lg:items-start lg:justify-between lg:gap-x-24 lg:gap-y-0 lg:p-16 xl:gap-x-32 xl:px-20 xl:py-[4.5rem]"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:max-w-lg xl:max-w-xl">
            <p className="craft-quote m-0">
              &ldquo;Being in a room with people who&apos;ve shipped systems at
              civilisational scale doesn&apos;t just teach you — it permanently
              recalibrates what you think is possible.&rdquo;
            </p>
            <span className="font-sans text-[11px] font-normal uppercase tracking-[2px] text-portfolio-ember">
              {site.name} · On working with world-class engineers
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col lg:max-w-md xl:max-w-lg">
            <p className="mb-8 font-sans text-[10px] font-normal uppercase tracking-[3px] text-portfolio-ember md:mb-10">
              Worked alongside builders of
            </p>
            <ul className="flex flex-col divide-y divide-portfolio-smoke/80">
              {mentors.map((mentor) => (
                <li key={mentor.name} className="flex flex-col gap-2 py-8">
                  <span className="font-sans text-sm font-medium text-portfolio-white">
                    {mentor.name}
                  </span>
                  <span className="font-sans text-xs font-normal leading-relaxed tracking-wide text-portfolio-mist">
                    {mentor.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
