import { Sparkles } from "lucide-react";

import { traits } from "@/content/site";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

export function TraitsSection() {
  return (
    <section className="section-pad bg-portfolio-black">
      <SectionHeader
        label={
          <span className="flex items-center gap-2">
            <Sparkles className="size-3" />
            What sets apart top engineers
          </span>
        }
        title="The edge"
      />

      <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
        {traits.map((trait, index) => (
          <ScrollReveal
            key={trait.number}
            as="article"
            delay={index * 70}
            className="trait-card relative overflow-hidden bg-portfolio-ash p-8 sm:p-9"
          >
            <div className="trait-number mb-4">{trait.number}</div>
            <h3 className="trait-title mb-3">{trait.title}</h3>
            <p className="trait-desc">{trait.description}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
