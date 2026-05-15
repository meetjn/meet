import { Sparkles } from "lucide-react";

import { traits } from "@/content/site";

export function TraitsSection() {
  return (
    <section className="section-pad bg-portfolio-black">
      <span className="section-label flex items-center gap-2">
        <Sparkles className="size-3" />
        What sets apart top 1%
      </span>
      <h2 className="section-title mb-12 sm:mb-[60px]">The edge</h2>

      <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
        {traits.map((trait) => (
          <article
            key={trait.number}
            className="trait-card relative overflow-hidden bg-portfolio-ash p-8 transition-colors hover:bg-[#1E1B17] sm:p-9"
          >
            <div className="font-display mb-4 text-5xl leading-none text-portfolio-smoke sm:text-[64px]">
              {trait.number}
            </div>
            <h3 className="mb-3 text-[13px] font-medium uppercase tracking-[0.15em] text-portfolio-ember">
              {trait.title}
            </h3>
            <p className="text-sm leading-relaxed text-portfolio-cream">
              {trait.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
