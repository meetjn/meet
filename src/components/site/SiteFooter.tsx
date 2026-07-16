import { site } from "@/content/site";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";

const socials = [
  { href: site.linkedin, label: "LinkedIn" },
  { href: site.github, label: "GitHub" },
  { href: site.x, label: "X" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-portfolio-smoke px-6 py-14 sm:px-12 lg:px-[max(7vw,3.5rem)] lg:py-16">
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between lg:flex-col lg:gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-xl font-medium italic text-portfolio-bright">
              {site.name}
            </span>
            <span className="max-w-[36ch] font-sans text-[13px] font-normal leading-relaxed text-portfolio-bright/80">
              {site.focus}
            </span>
          </div>

          <nav
            aria-label="Social links"
            className="flex items-center gap-7 sm:self-start lg:self-auto"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[13px] font-medium text-portfolio-bright transition-colors hover:text-portfolio-ember"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>

        <NewsletterSignup variant="compact" className="lg:pt-1" />
      </div>
    </footer>
  );
}
