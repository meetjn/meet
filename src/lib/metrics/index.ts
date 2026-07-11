/**
 * Metrics abstraction — the seam where article view counts plug in later.
 *
 * Today: a no-op (nothing is stored anywhere; the site has no backend).
 *
 * Upgrade path (see docs/adding-view-counts.md): swap `noopMetrics` for an
 * implementation that POSTs to a Next.js route handler backed by Upstash
 * Redis. Same repo, same Vercel deployment, TypeScript end to end — nothing
 * else in the app changes.
 */

export type MetricsClient = {
  /** Record that an article was opened. Must never throw or block the UI. */
  recordView(slug: string): Promise<void>;
  /** Read a view count, or null when the backend doesn't exist yet. */
  getViews(slug: string): Promise<number | null>;
};

const noopMetrics: MetricsClient = {
  async recordView() {
    // Intentionally empty — no backend yet.
  },
  async getViews() {
    return null;
  },
};

export const metrics: MetricsClient = noopMetrics;
