import type { ReactNode } from "react";

import { ScrollReveal } from "./ScrollReveal";

export function SectionHeader({
  label,
  title,
  className,
}: {
  label: ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <ScrollReveal as="span" className="section-label block" delay={0}>
        {label}
      </ScrollReveal>
      <ScrollReveal as="h2" className="section-title" delay={80}>
        {title}
      </ScrollReveal>
    </div>
  );
}
