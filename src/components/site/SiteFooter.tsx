import { Github, Linkedin, MapPin } from "lucide-react";

import { XIcon } from "@/components/icons/XIcon";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-portfolio-smoke px-6 py-12 sm:px-12 lg:px-[max(7vw,3.5rem)]">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-xl font-medium italic text-portfolio-bright">
            {site.name}
          </span>
          <span className="font-sans text-[13px] font-normal text-portfolio-bright/80">
            {site.focus}
          </span>
        </div>

        <nav aria-label="Social links" className="flex items-center gap-6">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-[13px] font-medium text-portfolio-bright transition-colors hover:text-portfolio-ember"
          >
            <Linkedin className="size-4" aria-hidden />
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-[13px] font-medium text-portfolio-bright transition-colors hover:text-portfolio-ember"
          >
            <Github className="size-4" aria-hidden />
            GitHub
          </a>
          <a
            href={site.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-sans text-[13px] font-medium text-portfolio-bright transition-colors hover:text-portfolio-ember"
          >
            <XIcon />X
          </a>
        </nav>

        <span className="flex items-center gap-2 font-sans text-[13px] font-normal text-portfolio-bright">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          {site.location}
        </span>
      </div>
    </footer>
  );
}
