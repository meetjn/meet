"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, CornerDownLeft, Search, X } from "lucide-react";
import type MiniSearch from "minisearch";

import { formatDate } from "@/lib/format";
import { useSearchMemory, useSearchUi } from "@/stores/search";

/**
 * ⌘K command palette. The MiniSearch engine and the index JSON are loaded
 * lazily on first open, so readers who never search pay zero bytes for it.
 * The index is a static build artifact cached by the service worker — search
 * works offline.
 */

type SearchDoc = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTimeMinutes: number;
  text: string;
};

type Engine = {
  mini: MiniSearch<SearchDoc>;
  docs: Map<string, SearchDoc>;
  ordered: SearchDoc[];
};

let enginePromise: Promise<Engine> | null = null;

function loadEngine(): Promise<Engine> {
  enginePromise ??= (async () => {
    const [{ default: MiniSearchCtor }, response] = await Promise.all([
      import("minisearch"),
      fetch("/search-index.json"),
    ]);
    const payload = (await response.json()) as { articles: SearchDoc[] };

    const mini = new MiniSearchCtor<SearchDoc>({
      idField: "slug",
      fields: ["title", "description", "tags", "text"],
      storeFields: ["slug"],
      searchOptions: {
        boost: { title: 5, tags: 3, description: 2 },
        prefix: true,
        fuzzy: 0.15,
      },
    });
    mini.addAll(payload.articles);

    return {
      mini,
      docs: new Map(payload.articles.map((doc) => [doc.slug, doc])),
      ordered: payload.articles,
    };
  })().catch((error) => {
    enginePromise = null; // allow retry (e.g. transient network failure)
    throw error;
  });
  return enginePromise;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Wrap matched terms in an ember highlight. */
function highlight(text: string, terms: string[]): ReactNode {
  const usable = terms.filter((term) => term.length > 1);
  if (usable.length === 0) return text;
  const pattern = new RegExp(`(${usable.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, index) =>
    pattern.test(part) ? (
      <mark key={index} className="bg-transparent text-portfolio-ember-glow">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

/** Short context window around the first matched term in the body text. */
function makeSnippet(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  for (const term of terms) {
    if (term.length < 2) continue;
    const at = lower.indexOf(term.toLowerCase());
    if (at !== -1) {
      const start = Math.max(0, at - 55);
      const end = Math.min(text.length, at + 95);
      return `${start > 0 ? "…" : ""}${text.slice(start, end)}${
        end < text.length ? "…" : ""
      }`;
    }
  }
  return `${text.slice(0, 140)}…`;
}

type ResultRow = {
  doc: SearchDoc;
  terms: string[];
};

export function CommandPalette() {
  const router = useRouter();
  const open = useSearchUi((state) => state.open);
  const setOpen = useSearchUi((state) => state.setOpen);
  const recentQueries = useSearchMemory((state) => state.recentQueries);
  const lastArticle = useSearchMemory((state) => state.lastArticle);
  const rememberQuery = useSearchMemory((state) => state.rememberQuery);
  const rememberArticle = useSearchMemory((state) => state.rememberArticle);
  const clearHistory = useSearchMemory((state) => state.clearHistory);

  const [engine, setEngine] = useState<Engine | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global shortcut: ⌘K / Ctrl+K toggles, Escape closes.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        useSearchUi.getState().toggle();
      } else if (event.key === "Escape") {
        useSearchUi.getState().setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lazy-init on first open; rehydrate persisted memory; focus; lock scroll.
  useEffect(() => {
    if (!open) return;
    void useSearchMemory.persist.rehydrate();
    loadEngine()
      .then((loaded) => {
        setEngine(loaded);
        setFailed(false);
      })
      .catch(() => setFailed(true));
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const trimmed = query.trim();

  const suggestions = useMemo(() => {
    if (!engine || trimmed.length < 2) return [];
    return engine.mini
      .autoSuggest(trimmed, { fuzzy: 0.2 })
      .slice(0, 3)
      .map((entry) => entry.suggestion)
      .filter(
        (suggestion) => suggestion.toLowerCase() !== trimmed.toLowerCase(),
      );
  }, [engine, trimmed]);

  const results = useMemo<ResultRow[]>(() => {
    if (!engine) return [];
    if (trimmed.length === 0) {
      return engine.ordered
        .slice(0, 5)
        .map((doc) => ({ doc, terms: [] as string[] }));
    }
    return engine.mini
      .search(trimmed)
      .slice(0, 8)
      .flatMap((hit) => {
        const doc = engine.docs.get(hit.id as string);
        return doc ? [{ doc, terms: hit.terms }] : [];
      });
  }, [engine, trimmed]);

  // Keyboard cursor is reset by the input handlers and clamped here, so a
  // shrinking result list can never leave it out of range.
  const activeIndex =
    results.length === 0 ? 0 : Math.min(selected, results.length - 1);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, [setOpen]);

  const openArticle = useCallback(
    (doc: SearchDoc) => {
      if (trimmed.length > 0) rememberQuery(trimmed);
      rememberArticle({ slug: doc.slug, title: doc.title });
      close();
      router.push(`/writing/${doc.slug}`);
    },
    [trimmed, rememberQuery, rememberArticle, close, router],
  );

  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected(Math.min(activeIndex + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected(Math.max(activeIndex - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      openArticle(results[activeIndex].doc);
    }
  };

  if (!open) return null;

  const showEmptyState = trimmed.length === 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
      className="fixed inset-0 z-50"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={close}
        className="absolute inset-0 cursor-default bg-portfolio-black/70 backdrop-blur-sm"
      />

      <div className="panel relative mx-auto mt-[10vh] flex w-[min(640px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3 border-b border-portfolio-smoke px-5 py-4">
          <Search
            className="size-4 shrink-0 text-portfolio-ember"
            aria-hidden
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search articles, topics, systems…"
            aria-label="Search query"
            className="w-full bg-transparent font-sans text-[15px] font-light text-portfolio-white outline-none placeholder:text-portfolio-mist"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="rounded-lg p-1 text-portfolio-mist transition-colors hover:text-portfolio-cream"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {suggestions.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 border-b border-portfolio-smoke/70 px-5 py-2.5">
            <span className="font-sans text-[10px] uppercase tracking-[2px] text-portfolio-mist">
              Did you mean
            </span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  setQuery(suggestion);
                  setSelected(0);
                }}
                className="chip !px-3 !py-1"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}

        <div className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
          {failed ? (
            <p className="px-4 py-10 text-center font-sans text-sm text-portfolio-mist">
              Couldn&apos;t load the search index. Check your connection and try
              again.
            </p>
          ) : null}

          {showEmptyState && (lastArticle || recentQueries.length > 0) ? (
            <div className="px-3 pb-2 pt-3">
              {lastArticle ? (
                <button
                  type="button"
                  onClick={() =>
                    openArticle({
                      slug: lastArticle.slug,
                      title: lastArticle.title,
                      description: "",
                      date: "",
                      tags: [],
                      readingTimeMinutes: 0,
                      text: "",
                    })
                  }
                  className="mb-3 flex w-full items-center gap-3 rounded-xl border border-portfolio-ember/30 bg-portfolio-ember/[0.06] px-4 py-3 text-left transition-colors hover:border-portfolio-ember/60"
                >
                  <Clock
                    className="size-3.5 shrink-0 text-portfolio-ember"
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block font-sans text-[10px] uppercase tracking-[2px] text-portfolio-ember">
                      Jump back in
                    </span>
                    <span className="block truncate font-sans text-sm text-portfolio-white">
                      {lastArticle.title}
                    </span>
                  </span>
                </button>
              ) : null}

              {recentQueries.length > 0 ? (
                <div className="mb-1 flex flex-wrap items-center gap-2 px-1">
                  <span className="font-sans text-[10px] uppercase tracking-[2px] text-portfolio-mist">
                    Recent
                  </span>
                  {recentQueries.map((recent) => (
                    <button
                      key={recent}
                      type="button"
                      onClick={() => {
                        setQuery(recent);
                        setSelected(0);
                      }}
                      className="chip !px-3 !py-1"
                    >
                      {recent}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="font-sans text-[10px] uppercase tracking-[1.5px] text-portfolio-mist underline-offset-2 hover:underline"
                  >
                    clear
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          {showEmptyState && results.length > 0 ? (
            <p className="px-4 pb-1 pt-3 font-sans text-[10px] uppercase tracking-[2px] text-portfolio-mist">
              Latest
            </p>
          ) : null}

          <ul role="listbox" aria-label="Search results">
            {results.map(({ doc, terms }, index) => {
              const active = index === activeIndex;
              return (
                <li key={doc.slug} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => openArticle(doc)}
                    onMouseEnter={() => setSelected(index)}
                    className={`flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                      active ? "bg-portfolio-smoke/40" : "hover:bg-portfolio-smoke/25"
                    }`}
                  >
                    <ArrowRight
                      className={`mt-1 size-3.5 shrink-0 transition-opacity ${
                        active
                          ? "text-portfolio-ember opacity-100"
                          : "opacity-0"
                      }`}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans text-[15px] text-portfolio-white">
                        {highlight(doc.title, terms)}
                      </span>
                      <span className="mt-0.5 block truncate font-sans text-[12.5px] font-light leading-relaxed text-portfolio-mist">
                        {trimmed.length > 0
                          ? highlight(makeSnippet(doc.text, terms), terms)
                          : doc.description}
                      </span>
                      <span className="mt-1 block font-sans text-[10px] uppercase tracking-[1.5px] text-portfolio-smoke">
                        {doc.date ? formatDate(doc.date) : ""}
                        {doc.readingTimeMinutes
                          ? ` · ${doc.readingTimeMinutes} min`
                          : ""}
                        {doc.tags.length > 0
                          ? ` · ${doc.tags.join(" · ")}`
                          : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {!failed && trimmed.length > 0 && results.length === 0 && engine ? (
            <p className="px-4 py-10 text-center font-sans text-sm text-portfolio-mist">
              No articles match “{trimmed}” yet.
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-4 border-t border-portfolio-smoke px-5 py-2.5 font-sans text-[10px] uppercase tracking-[1.5px] text-portfolio-mist">
          <span className="flex items-center gap-1">
            ↑↓ <span className="normal-case">navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="size-3" aria-hidden />
            <span className="normal-case">open</span>
          </span>
          <span>
            esc <span className="normal-case">close</span>
          </span>
        </div>
      </div>
    </div>
  );
}
