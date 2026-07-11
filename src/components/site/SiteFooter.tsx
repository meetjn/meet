import { site } from "@/content/site";

const socials = [
  { href: site.linkedin, label: "LinkedIn" },
  { href: site.github, label: "GitHub" },
  { href: site.x, label: "X" },
] as const;

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

        <nav aria-label="Social links" className="flex items-center gap-7">
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
    </footer>
  );
}
