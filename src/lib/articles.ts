import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import GithubSlugger from "github-slugger";

/**
 * File-based article store. Articles are MDX files in src/content/articles;
 * everything is read at build time (SSG) — no database, no runtime I/O on Vercel.
 */

const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");

/** Average adult technical-reading speed; used for the reading-time estimate. */
const WORDS_PER_MINUTE = 215;

export type ArticleFrontmatter = {
  title: string;
  /** One-sentence dek shown under the title and in meta descriptions (~160 chars). */
  description: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  /** Last significant revision, YYYY-MM-DD. */
  updated?: string;
  tags: string[];
  /** Featured articles get the large card on /writing. */
  featured?: boolean;
  /** Drafts render in dev but are excluded from production builds. */
  draft?: boolean;
  /** Listed on the homepage but not published — no route, RSS, or search entry. */
  upcoming?: boolean;
};

export type TocEntry = {
  depth: 2 | 3;
  text: string;
  id: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
  wordCount: number;
  readingTimeMinutes: number;
  toc: TocEntry[];
};

/** Article metadata without the body — for lists, search indexes, feeds. */
export type ArticleSummary = Omit<Article, "content" | "toc">;

function isMdxFile(fileName: string): boolean {
  return fileName.endsWith(".mdx") || fileName.endsWith(".md");
}

function stripCodeBlocks(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, "");
}

/** Remove markdown/JSX syntax so word counts and search text reflect prose only. */
export function toPlainText(markdown: string): string {
  return stripCodeBlocks(markdown)
    .replace(/<[^>]+>/g, " ") // JSX / HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/[#>*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  const withoutCode = stripCodeBlocks(markdown);

  for (const match of withoutCode.matchAll(headingPattern)) {
    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    entries.push({ depth, text, id: slugger.slug(text) });
  }

  return entries;
}

function readArticleFile(fileName: string): Article {
  const filePath = path.join(ARTICLES_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  const slug = fileName.replace(/\.mdx?$/, "");

  const plain = toPlainText(content);
  const wordCount = plain.length === 0 ? 0 : plain.split(" ").length;

  return {
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    slug,
    content,
    wordCount,
    readingTimeMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    toc: extractToc(content),
  };
}

function includeInBuild(article: Article): boolean {
  if (article.upcoming) return true;
  return process.env.NODE_ENV !== "production" || !article.draft;
}

function isPublished(article: Article): boolean {
  return !article.upcoming;
}

/** All publishable articles, newest first. Excludes upcoming. */
export function getAllArticles(): Article[] {
  return getListedArticles().filter(isPublished);
}

/** Published and upcoming articles for the homepage list, newest first. */
export function getListedArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter(isMdxFile)
    .map(readArticleFile)
    .filter(includeInBuild)
    .sort((a, b) => {
      if (a.upcoming !== b.upcoming) return a.upcoming ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

/** Chronological neighbours for prev/next navigation (list is newest-first). */
export function getAdjacentArticles(slug: string): {
  newer: Article | undefined;
  older: Article | undefined;
} {
  const articles = getAllArticles();
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) return { newer: undefined, older: undefined };
  return { newer: articles[index - 1], older: articles[index + 1] };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const article of getListedArticles()) {
    for (const tag of article.tags) tags.add(tag);
  }
  return [...tags].sort();
}
