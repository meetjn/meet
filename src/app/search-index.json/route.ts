import { getAllArticles, toPlainText } from "@/lib/articles";

/**
 * Client-side search index, generated once at build time (force-static means
 * this is a plain JSON file on the CDN — no server work at request time).
 * The command palette lazy-loads it on first open; the service worker caches
 * it, so search keeps working offline.
 */
export const dynamic = "force-static";

/** Keep the payload lean — plenty for snippets and matching. */
const MAX_TEXT_LENGTH = 8000;

export function GET() {
  const articles = getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.date,
    tags: article.tags,
    readingTimeMinutes: article.readingTimeMinutes,
    text: toPlainText(article.content).slice(0, MAX_TEXT_LENGTH),
  }));

  return Response.json({ generatedAt: new Date().toISOString(), articles });
}
