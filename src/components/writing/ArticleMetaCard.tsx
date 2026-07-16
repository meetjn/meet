"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";

import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type ArticleMetaCardProps = {
  title: string;
  slug: string;
  date: string;
  tags: string[];
};

const xHandle = site.x.replace(
  /^https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\//i,
  "@",
);

function SocialRow({
  label,
  href,
  linkLabel,
}: {
  label: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div>
      <p className="font-sans text-[11px] font-light text-portfolio-mist">
        {label}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block font-sans text-[12px] font-medium text-portfolio-ember transition-colors duration-[60ms] hover:text-portfolio-ember-glow"
      >
        {linkLabel}
      </a>
    </div>
  );
}

function MetaCell({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("px-3 py-3 text-center", className)}>
      <p className="eyebrow !text-[10px] !tracking-[0.16em] text-portfolio-mist">
        {label}
      </p>
      <p className="mt-1.5 font-sans text-[11px] font-light leading-snug text-portfolio-cream">
        {value}
      </p>
    </div>
  );
}

export function ArticleMetaCard({
  title,
  slug,
  date,
  tags,
}: ArticleMetaCardProps) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/writing/${slug}`;
  const topic = tags[0] ?? "Writing";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable.
    }
  }

  return (
    <aside
      aria-label="Article details"
      className="w-48 overflow-hidden rounded-xl border border-portfolio-smoke/80 bg-portfolio-ash/30 shadow-[inset_0_1px_0_rgb(var(--ink-strong)/0.04)]"
    >
      <div className="border-b border-portfolio-smoke/80 bg-portfolio-ash/50 px-3.5 py-3.5">
        <p className="eyebrow !text-[10px] !text-portfolio-ember">Article</p>
        <div className="mt-2.5 flex items-start gap-2">
          <p className="min-w-0 flex-1 font-display text-[13px] font-medium italic leading-snug text-portfolio-white">
            {title}
          </p>
          <button
            type="button"
            onClick={copyLink}
            aria-label={copied ? "Link copied" : "Copy article link"}
            className="mt-0.5 shrink-0 rounded-md p-1 text-portfolio-mist transition-[color,background-color] duration-[60ms] hover:bg-portfolio-smoke/40 hover:text-portfolio-ember"
          >
            <Link2 className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 border-b border-portfolio-smoke/80">
        <MetaCell
          label="Published"
          value={formatDate(date)}
          className="border-r border-portfolio-smoke/80"
        />
        <MetaCell
          label="Topic"
          value={topic}
          className="[&_p:last-child]:capitalize"
        />
      </div>

      <div className="flex flex-col gap-4 px-3.5 py-3.5 text-center">
        <SocialRow
          label="I am on X (Twitter)"
          href={site.x}
          linkLabel={xHandle}
        />
        <SocialRow
          label="I am on LinkedIn"
          href={site.linkedin}
          linkLabel="LinkedIn"
        />
      </div>
    </aside>
  );
}
