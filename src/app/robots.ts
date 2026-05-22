import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/** Broad allow + explicit common AI/search crawlers for clarity */
const EXPLICIT_ALLOW_UAS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-SearchBot",
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "PerplexityBot",
  "OAI-SearchBot",
  "Meta-ExternalAgent",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...EXPLICIT_ALLOW_UAS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).host,
  };
}
