"use client";

import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { ArticleNewsletterRail } from "@/components/writing/ArticleNewsletterRail";
import { ArticleSocialLinks } from "@/components/writing/ArticleSocialLinks";

type ArticleMetaCardProps = {
  date: string;
  tags: string[];
};

export function ArticleMetaCard({
  date,
  tags,
}: ArticleMetaCardProps) {
  const topic = tags[0] ?? "Writing";

  return (
    <aside aria-label="Article details" className="w-48 shrink-0 px-1">
      <div className="flex flex-col gap-8">
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
          aria-label={`${site.name} on LinkedIn`}
        >
          <img
            src={site.authorImage}
            alt={`Portrait of ${site.name}`}
            width={40}
            height={40}
            className="size-10 rounded-full border border-portfolio-smoke/80 object-cover transition-[border-color] duration-[60ms] group-hover:border-portfolio-ember/50"
          />
          <p className="font-sans text-[11px] font-light leading-snug text-portfolio-mist">
            <span className="text-portfolio-cream">{site.name}</span> — Backend &
            distributed systems engineer
          </p>
        </a>

        <ArticleSocialLinks />

        <p className="font-sans text-[11px] font-light leading-snug text-portfolio-mist">
          <span className="text-portfolio-cream">{formatDate(date)}</span> ·{" "}
          <span className="capitalize text-portfolio-cream">{topic}</span>
        </p>

        <ArticleNewsletterRail variant="card" inputId="article-meta-email" />
      </div>
    </aside>
  );
}
