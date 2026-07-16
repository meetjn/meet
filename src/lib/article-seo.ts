import type { Article } from "@/lib/articles";
import { toPlainText } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

/** Cap articleBody for JSON-LD — full text helps AI/snippet parsers without bloating the page. */
const ARTICLE_BODY_MAX_CHARS = 12_000;

export type ArticleSeoFaq = {
  question: string;
  answer: string;
};

export function buildArticleMetadataKeywords(article: Article): string[] {
  const fromTags = article.tags;
  const fromKeywords = article.keywords ?? [];
  return [...new Set([...fromTags, ...fromKeywords])];
}

export function buildArticleJsonLd(article: Article) {
  const url = `${SITE_URL}/writing/${article.slug}`;
  const plainBody = toPlainText(article.content);
  const articleBody =
    plainBody.length > ARTICLE_BODY_MAX_CHARS
      ? `${plainBody.slice(0, ARTICLE_BODY_MAX_CHARS)}…`
      : plainBody;

  const graph: Record<string, unknown>[] = [
    {
      "@type": ["BlogPosting", "TechArticle"],
      "@id": `${url}#article`,
      headline: article.title,
      description: article.description,
      abstract: article.description,
      url,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
      wordCount: article.wordCount,
      keywords: buildArticleMetadataKeywords(article).join(", "),
      articleSection: article.tags[0],
      inLanguage: "en-US",
      isPartOf: { "@id": `${SITE_URL}/#blog` },
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: {
        "@type": "ImageObject",
        url: `${url}/opengraph-image`,
        width: 1200,
        height: 630,
      },
      articleBody,
      ...(article.programmingLanguage
        ? { programmingLanguage: article.programmingLanguage }
        : {}),
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
        {
          "@type": "ListItem",
          position: 2,
          name: article.title,
          item: url,
        },
      ],
    },
  ];

  if (article.seoFaqs && article.seoFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: article.seoFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
