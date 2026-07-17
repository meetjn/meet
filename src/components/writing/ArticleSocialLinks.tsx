import { Linkedin } from "lucide-react";

import { XLogo } from "@/components/icons/XLogo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function ArticleSocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a
        href={site.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Meet Jain on X"
        className="rounded-full p-1.5 text-portfolio-mist transition-colors duration-[60ms] hover:text-portfolio-ember"
      >
        <XLogo className="size-3.5" />
      </a>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Meet Jain on LinkedIn"
        className="rounded-full p-1.5 text-portfolio-mist transition-colors duration-[60ms] hover:text-portfolio-ember"
      >
        <Linkedin className="size-3.5" aria-hidden />
      </a>
    </div>
  );
}
