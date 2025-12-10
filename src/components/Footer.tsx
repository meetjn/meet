import Link from "next/link";

import { identity } from "@/content/portfolio";

export const MEDIA_SECTION_ID = "media-footer";

export function Footer() {
  const telHref = `tel:${identity.phone.replace(/\s+/g, "")}`;

  return (
    <footer
      id={MEDIA_SECTION_ID}
      className="footer-cosmos mt-20 w-full pb-8 pt-4"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="glass-panel footer-panel flex flex-col gap-6 rounded-[36px] border border-white/10 px-6 py-4 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Get in touch
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 sm:gap-10">
            <Link
              href={`mailto:${identity.email}`}
              className="transition hover:text-white"
            >
              {identity.email}
            </Link>
            <Link href={telHref} className="transition hover:text-white">
              {identity.phone}
            </Link>
            <Link
              href={identity.github}
              className="text-xs uppercase tracking-[0.35em] transition hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
            <Link
              href={identity.linkedin}
              className="text-xs uppercase tracking-[0.35em] transition hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
