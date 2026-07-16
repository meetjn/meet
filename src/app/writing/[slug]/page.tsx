import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAdjacentArticles,
  getAllArticles,
  getArticleBySlug,
} from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/site";
import { renderArticleMdx } from "@/lib/render-mdx";
import { PrevNext } from "@/components/writing/PrevNext";
import { ReadingProgress } from "@/components/writing/ReadingProgress";
import { ArticleViewTracker } from "@/components/writing/ArticleViewTracker";
import { ArticleMetaCard } from "@/components/writing/ArticleMetaCard";
import { ArticleNewsletterRail } from "@/components/writing/ArticleNewsletterRail";
import { ArticleFocusRails } from "@/components/writing/ArticleFocusRails";
import { Toc } from "@/components/writing/Toc";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `${SITE_URL}/writing/${slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: site.name, url: SITE_URL }],
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: "meetjain.xyz",
      locale: "en_US",
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [site.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

function buildArticleJsonLd(slug: string) {
  const article = getArticleBySlug(slug);
  if (!article) return null;
  const url = `${SITE_URL}/writing/${slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.description,
        url,
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        wordCount: article.wordCount,
        keywords: article.tags.join(", "),
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#blog` },
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Writing",
            item: SITE_URL,
          },
          { "@type": "ListItem", position: 2, name: article.title, item: url },
        ],
      },
    ],
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { newer, older } = getAdjacentArticles(slug);
  const jsonLd = buildArticleJsonLd(slug);
  const body = await renderArticleMdx(article.content);

  return (
    <article className="section-pad !pt-14 lg:!pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <ArticleViewTracker slug={slug} title={article.title} />

      <div className="mx-auto w-full xl:grid xl:grid-cols-[1fr_minmax(0,720px)_1fr] xl:grid-rows-[auto_1fr]">
        <header className="mb-16 w-full max-w-[720px] mx-auto xl:col-start-2 xl:row-start-1 xl:mx-0 xl:max-w-none lg:mb-24">
        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="/"
            className="eyebrow transition-colors hover:!text-portfolio-white"
          >
            Writing
          </Link>
          <span className="h-px w-8 bg-portfolio-smoke" aria-hidden />
          {article.tags.map((tag) => (
            <span key={tag} className="eyebrow !text-portfolio-ember">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-8 font-display text-[clamp(36px,5.4vw,64px)] font-medium leading-[1.08] tracking-[-0.02em] text-portfolio-white">
          {article.title}
        </h1>

        <p className="mb-10 max-w-[56ch] font-display text-lg font-normal italic leading-[1.7] text-portfolio-cream sm:text-[21px]">
          {article.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-portfolio-smoke pt-6 font-sans text-[13px] font-normal text-portfolio-mist">
          <span className="font-medium text-portfolio-white">{site.name}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>{article.readingTimeMinutes} min read</span>
          {article.updated ? (
            <span>Updated {formatDate(article.updated)}</span>
          ) : null}
        </div>
        </header>

        <ArticleFocusRails
          left={
            <ArticleMetaCard
              title={article.title}
              slug={slug}
              date={article.date}
              tags={article.tags}
            />
          }
          right={
            <>
              <Toc entries={article.toc} />
              <ArticleNewsletterRail />
            </>
          }
        />

        <div className="writing-prose min-w-0 w-full max-w-[720px] mx-auto xl:col-start-2 xl:row-start-2 xl:mx-0 xl:max-w-none">
          {body}

          <PrevNext newer={newer} older={older} />
          <ArticleNewsletterRail className="xl:hidden" />
        </div>
      </div>
    </article>
  );
}
