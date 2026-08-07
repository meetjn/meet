import { ImageResponse } from "next/og";

import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { formatDate } from "@/lib/format";

/*
 * Per-article social card, rendered at build time for each slug.
 * Node runtime (not edge) — the article store reads from the filesystem.
 */

export const alt = "Article by Meet Jain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.title ?? "Writing";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0908",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            background: "linear-gradient(to bottom, #F6F2EA, #4C453C)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#F6F2EA",
            fontSize: 22,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <span>Writing</span>
          <span style={{ color: "#2C2620" }}>—</span>
          <span style={{ color: "#98908F" }}>meetjain.xyz</span>
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 58 : 72,
            fontWeight: 700,
            color: "#F6F2EA",
            lineHeight: 1.05,
            maxWidth: 1000,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            color: "#98908F",
          }}
        >
          <span style={{ color: "#F6F2EA" }}>Meet Jain</span>
          {article ? <span>{formatDate(article.date)}</span> : null}
          {article ? <span>{article.readingTimeMinutes} min read</span> : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
