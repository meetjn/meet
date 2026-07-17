import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function ArticleCorrectionNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "font-sans text-[11px] font-light leading-snug text-portfolio-mist",
        className,
      )}
    >
      Did I make a mistake? Please consider{" "}
      <a
        href={`${site.repo}/pulls`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-portfolio-ember underline decoration-portfolio-ember/40 underline-offset-2 transition-colors duration-[60ms] hover:text-portfolio-ember-glow"
      >
        sending a pull request
      </a>
      .
    </p>
  );
}
