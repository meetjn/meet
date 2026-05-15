import { Users } from "lucide-react";

import { craftStats, mentors, site } from "@/content/site";

export function CraftSection() {
  return (
    <section id="craft" className="section-pad scroll-mt-24 bg-portfolio-black">
      <span className="section-label flex items-center gap-2">
        <Users className="size-3" />
        Environment & mentorship
      </span>
      <h2 className="section-title mb-12 sm:mb-[60px]">The room I was in</h2>

      <div className="grid gap-0.5 lg:grid-cols-2">
        <article className="flex flex-col gap-8 bg-portfolio-smoke p-8 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:p-12">
          <div className="flex-1">
            <p className="font-serif text-xl italic leading-relaxed text-portfolio-cream sm:text-[22px]">
              &ldquo;Being in a room with people who&apos;ve shipped systems at
              civilisational scale doesn&apos;t just teach you — it permanently
              recalibrates what you think is possible.&rdquo;
            </p>
            <span className="mt-3 block text-[11px] uppercase tracking-[0.15em] text-portfolio-ember">
              {site.name} · On working with world-class engineers
            </span>
          </div>

          <div className="flex-1">
            <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-portfolio-ember">
              Worked alongside builders of
            </p>
            <ul className="flex flex-col">
              {mentors.map((mentor) => (
                <li
                  key={mentor.name}
                  className="border-b border-portfolio-smoke py-4 last:border-0"
                >
                  <span className="block text-sm font-medium text-portfolio-white">
                    {mentor.name}
                  </span>
                  <span className="text-xs text-portfolio-mist">
                    {mentor.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {craftStats.map((stat) => (
          <article key={stat.number} className="bg-portfolio-ash p-8 sm:p-10">
            <p className="font-display mb-3 text-6xl leading-none text-portfolio-ember sm:text-[80px]">
              {stat.number}
            </p>
            <p className="mb-4 text-[13px] uppercase tracking-[0.15em] text-portfolio-mist">
              {stat.label}
            </p>
            <p className="text-sm leading-relaxed text-portfolio-cream">
              {stat.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
