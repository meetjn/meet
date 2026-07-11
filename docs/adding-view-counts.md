# Adding article view counts (when you want them)

The blog is intentionally backend-free today. View counts were designed for
from day one, though — the seam is `src/lib/metrics/index.ts`, and everything
that should ever record a view already calls it
(`src/components/writing/ArticleViewTracker.tsx` fires once per article per
browser session).

When you're ready, the upgrade is one route handler + one adapter swap. No
separate service, no FastAPI, no second deployment — it all ships inside the
same Next.js app on Vercel, in TypeScript.

## 1. Create a free Upstash Redis database

- <https://console.upstash.com> → Create Database (choose a region near your
  Vercel deployment).
- Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` into Vercel →
  Project → Settings → Environment Variables.

Free tier (500k commands/month) is far more than a personal blog needs.

## 2. Add the route handler

```ts
// src/app/api/views/[slug]/route.ts
import { Redis } from "@upstash/redis";
import { getArticleBySlug } from "@/lib/articles";

const redis = Redis.fromEnv();

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getArticleBySlug(slug)) {
    return new Response("Unknown article", { status: 404 });
  }
  const views = await redis.incr(`views:${slug}`);
  return Response.json({ views });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const views = await redis.get<number>(`views:${slug}`);
  return Response.json({ views: views ?? 0 });
}
```

```sh
pnpm add @upstash/redis
```

## 3. Swap the adapter

In `src/lib/metrics/index.ts`, replace `noopMetrics` with:

```ts
const httpMetrics: MetricsClient = {
  async recordView(slug) {
    try {
      await fetch(`/api/views/${slug}`, { method: "POST", keepalive: true });
    } catch {
      /* metrics must never break reading */
    }
  },
  async getViews(slug) {
    try {
      const res = await fetch(`/api/views/${slug}`);
      const data = (await res.json()) as { views: number };
      return data.views;
    } catch {
      return null;
    }
  },
};

export const metrics: MetricsClient = httpMetrics;
```

## 4. Show the number (optional)

Anywhere in a client component:
`metrics.getViews(slug)` → render "1,204 reads" next to the date.

## Notes

- The article pages stay fully static — counts are fetched client-side, so
  offline reading and CDN caching are unaffected.
- `ArticleViewTracker` already dedupes per browser session via
  `sessionStorage`, which keeps refresh-spam out of the numbers.
- If you ever outgrow this: same interface, new adapter (e.g. Tinybird,
  PostHog, or your own Go service). Nothing else changes.
