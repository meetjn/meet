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
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Media &amp; Contact
            </p>
            {/* <p className="text-sm text-white/65">Get in touch</p> */}
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-white/70 sm:gap-10">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                Email
              </p>
              <Link
                href={`mailto:${identity.email}`}
                className="text-white/85 hover:text-white"
              >
                {identity.email}
              </Link>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                Phone
              </p>
              <Link href={telHref} className="text-white/85 hover:text-white">
                {identity.phone}
              </Link>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                GitHub
              </p>
              <Link
                href={identity.github}
                className="text-white/85 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Profile
              </Link>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                LinkedIn
              </p>
              <Link
                href={identity.linkedin}
                className="text-white/85 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
