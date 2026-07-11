"use client";

import { useEffect } from "react";

import { metrics } from "@/lib/metrics";
import { useSearchMemory } from "@/stores/search";

/**
 * Fires once per article per browser session. Currently feeds the no-op
 * metrics adapter (future view counts) and updates "jump back in" memory for
 * the search palette.
 */
export function ArticleViewTracker({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    useSearchMemory.persist.rehydrate();
    useSearchMemory.getState().rememberArticle({ slug, title });

    const sessionKey = `mj-viewed:${slug}`;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, "1");
    } catch {
      // Storage unavailable (private mode) — still record the view.
    }
    void metrics.recordView(slug);
  }, [slug, title]);

  return null;
}
