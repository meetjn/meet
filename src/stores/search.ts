"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Ephemeral UI state — whether the ⌘K palette is open. */
type SearchUiState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

export const useSearchUi = create<SearchUiState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set((state) => ({ open: !state.open })),
}));

export type LastReadArticle = {
  slug: string;
  title: string;
};

/**
 * Search memory, persisted to localStorage: recent queries and the last
 * article opened from the palette ("jump back in").
 *
 * skipHydration keeps the server-rendered HTML deterministic; the palette
 * rehydrates on mount (see CommandPalette).
 */
type SearchMemoryState = {
  recentQueries: string[];
  lastArticle: LastReadArticle | null;
  rememberQuery: (query: string) => void;
  rememberArticle: (article: LastReadArticle) => void;
  clearHistory: () => void;
};

const MAX_RECENT_QUERIES = 6;

export const useSearchMemory = create<SearchMemoryState>()(
  persist(
    (set) => ({
      recentQueries: [],
      lastArticle: null,
      rememberQuery: (query) => {
        const trimmed = query.trim();
        if (trimmed.length < 2) return;
        set((state) => ({
          recentQueries: [
            trimmed,
            ...state.recentQueries.filter(
              (existing) => existing.toLowerCase() !== trimmed.toLowerCase(),
            ),
          ].slice(0, MAX_RECENT_QUERIES),
        }));
      },
      rememberArticle: (article) => set({ lastArticle: article }),
      clearHistory: () => set({ recentQueries: [], lastArticle: null }),
    }),
    {
      name: "mj-search-memory",
      version: 1,
      skipHydration: true,
    },
  ),
);
