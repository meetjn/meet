"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { formatDate } from "@/lib/format";

export type ArticleListEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTimeMinutes: number;
  upcoming?: boolean;
};

type ArticleListProps = {
  articles: ArticleListEntry[];
  tags: string[];
};

/** Chronological article index with client-side tag filtering. */
export function ArticleList({ articles, tags }: ArticleListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      activeTag === null
        ? articles
        : articles.filter((article) => article.tags.includes(activeTag)),
    [articles, activeTag],
  );

  return (
    <div>
      {tags.length > 1 ? (
        <div
          role="group"
          aria-label="Filter by topic"
          className="mb-14 flex flex-wrap gap-3"
        >
          {[null, ...tags].map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveTag(tag)}
                className={`chip capitalize ${active ? "chip-active" : ""}`}
              >
                {tag ?? "All"}
              </button>
            );
          })}
        </div>
      ) : null}

      <ol className="flex flex-col">
        {visible.map((article, index) => {
          const rowClass =
            "grid gap-3 py-12 pl-7 pr-2 sm:grid-cols-[120px_1fr_auto] sm:gap-10 sm:py-14";
          const meta = (
            <>
              <div className="flex items-baseline gap-5 sm:flex-col sm:gap-3">
                <span className="font-mono text-[12px] text-portfolio-mist">
                  {String(visible.length - index).padStart(2, "0")}
                </span>
                {article.upcoming ? (
                  <span className="font-sans text-[11px] font-normal uppercase tracking-eyebrow text-portfolio-mist">
                    Upcoming
                  </span>
                ) : (
                  <time
                    dateTime={article.date}
                    className="font-sans text-[12px] font-normal text-portfolio-mist"
                  >
                    {formatDate(article.date)}
                  </time>
                )}
              </div>

              <div className="min-w-0">
                <h3
                  className={`font-display text-[26px] font-medium leading-[1.15] tracking-[-0.015em] sm:text-[30px] ${
                    article.upcoming
                      ? "text-portfolio-cream"
                      : "text-portfolio-white transition-colors group-hover:text-portfolio-ember"
                  }`}
                >
                  {article.title}
                </h3>
                <p className="mt-4 max-w-[60ch] font-sans text-[14.5px] font-light leading-[1.8] text-portfolio-cream">
                  {article.description}
                </p>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2.5">
                {!article.upcoming ? (
                  <span className="font-sans text-[12px] font-normal text-portfolio-mist">
                    {article.readingTimeMinutes} min
                  </span>
                ) : null}
                <span className="hidden flex-wrap justify-end gap-2 sm:flex">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[11px] font-medium capitalize text-portfolio-ember"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </>
          );

          return (
            <li
              key={article.slug}
              className={`group relative border-t border-portfolio-smoke last:border-b ${
                article.upcoming ? "opacity-80" : ""
              }`}
            >
              {!article.upcoming ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-0 w-px bg-portfolio-ember transition-all duration-300 group-hover:h-full"
                />
              ) : null}
              {article.upcoming ? (
                <div className={rowClass}>{meta}</div>
              ) : (
                <Link href={`/writing/${article.slug}`} className={rowClass}>
                  {meta}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {visible.length === 0 ? (
        <p className="border-t border-portfolio-smoke py-20 text-center font-sans text-sm text-portfolio-mist">
          Nothing under this topic yet.
        </p>
      ) : null}
    </div>
  );
}
