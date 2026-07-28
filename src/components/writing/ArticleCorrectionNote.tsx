import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** End-of-article correction prompt, pointing readers at the repo's issues. */
export function ArticleCorrectionNote({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "font-sans text-[11px] font-light leading-snug text-portfolio-mist",
        className,
      )}
    >
      Think I made a mistake?{" "}
      <a
        href={`${site.repo}/issues`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-portfolio-ember underline decoration-portfolio-ember/40 underline-offset-2 transition-colors duration-[60ms] hover:text-portfolio-ember-glow"
      >
        Open a PR here
      </a>
      .
    </p>
  );
}
