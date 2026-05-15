import { MapPin } from "lucide-react";

import { site } from "@/content/site";
import { ScrollReveal } from "./ScrollReveal";

export function SiteFooter() {
  return (
    <footer className="flex flex-col items-start justify-between gap-4 border-t border-portfolio-smoke px-5 py-6 sm:flex-row sm:items-center sm:px-10 lg:px-[60px]">
      <ScrollReveal className="font-display text-lg tracking-[0.2em] text-portfolio-smoke">
        {site.name}
      </ScrollReveal>
      <ScrollReveal delay={80} className="flex items-center gap-2 text-[11px] tracking-wide text-portfolio-smoke">
        <MapPin className="size-3" />
        {site.location}
      </ScrollReveal>
    </footer>
  );
}
