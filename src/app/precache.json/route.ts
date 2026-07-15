import { getAllArticles } from "@/lib/articles";

/**
 * Build-time manifest of URLs the service worker precaches on install, so
 * every published article is readable offline even if it was never visited.
 */
export const dynamic = "force-static";

export function GET() {
  const urls = [
    "/",
    "/reflection",
    "/offline",
    "/search-index.json",
    ...getAllArticles().map((article) => `/writing/${article.slug}`),
  ];

  return Response.json({ version: Date.now().toString(36), urls });
}
