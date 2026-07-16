import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllArticles, getAllTags, getListedArticles } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { site } from "@/content/site";
import { SITE_DESCRIPTION } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { ArticleList } from "@/components/writing/ArticleList";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
};

function buildBlogJsonLd() {
  const articles = getAllArticles();
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/#blog`,
    url: SITE_URL,
    name: `${site.name} — Writing`,
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    author: { "@id": `${SITE_URL}/#person` },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/writing/${article.slug}#article`,
      headline: article.title,
      url: `${SITE_URL}/writing/${article.slug}`,
      datePublished: article.date,
    })),
  };
}

export default function HomePage() {
  const articles = getListedArticles();
  const tags = getAllTags();
  const featured =
    articles.find((article) => article.featured) ??
    articles.find((article) => !article.upcoming);
  const rest = articles;
  const jsonLd = buildBlogJsonLd();

  const featuredCard = featured ? (
    <div className="mb-28 rounded-3xl border border-portfolio-smoke bg-portfolio-ash/50 p-10 sm:p-14 lg:mb-36 lg:p-20">
      <div className="mb-7 flex flex-wrap items-center gap-5">
        <span className="eyebrow !text-portfolio-ember">
          {featured.upcoming ? "Upcoming" : featured.featured ? "Featured" : "Latest"}
        </span>
        {!featured.upcoming ? (
          <>
            <span className="h-px w-12 bg-portfolio-smoke" aria-hidden />
            <time
              dateTime={featured.date}
              className="font-sans text-[12px] font-normal text-portfolio-mist"
            >
              {formatDate(featured.date)} · {featured.readingTimeMinutes} min
              read
            </time>
          </>
        ) : null}
      </div>
      <h2 className="mb-6 max-w-3xl font-display text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.1] tracking-[-0.015em] text-portfolio-white">
        {featured.title}
      </h2>
      <p className="max-w-[58ch] font-display text-lg font-normal italic leading-[1.7] text-portfolio-cream sm:text-xl">
        {featured.description}
      </p>
      {!featured.upcoming ? (
        <Link
          href={`/writing/${featured.slug}`}
          className="group mt-10 inline-flex items-center gap-2.5 font-sans text-[13px] font-medium text-portfolio-white transition-colors hover:text-portfolio-ember"
        >
          Read the article
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1.5"
            aria-hidden
          />
        </Link>
      ) : null}
    </div>
  ) : null;

  return (
    <div className="section-pad">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-24 max-w-4xl lg:mb-32">
        <p className="eyebrow mb-8">
          {site.name} · {site.role}
        </p>
        <h1 className="font-display text-[clamp(44px,6.5vw,84px)] font-medium leading-[1.05] tracking-[-0.02em] text-portfolio-white">
          Systems,{" "}
          <em className="font-normal italic text-portfolio-ember">explained</em>
          .
        </h1>
        <p className="mt-10 max-w-[54ch] border-l border-portfolio-smoke pl-7 font-sans text-[16px] font-light leading-[1.9] text-portfolio-cream">
          I&apos;m Meet, I build payments and fintech infrastructure for a early-stage startups. Here I
          write down how these infrastructure actually work — backend systems,
          money movement pipelines, distributed systems, the parts I learned in
          production — with a pen and a lot of diagrams.
        </p>
      </header>

      {featuredCard}

      <section aria-label="All articles">
        <h2 className="eyebrow mb-12">All articles</h2>
        <ArticleList
          articles={rest.map((article) => ({
            slug: article.slug,
            title: article.title,
            description: article.description,
            date: article.date,
            tags: article.tags,
            readingTimeMinutes: article.readingTimeMinutes,
            upcoming: article.upcoming,
          }))}
          tags={tags}
        />
      </section>
    </div>
  );
}
