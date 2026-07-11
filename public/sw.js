/*
 * Offline service worker for meetjain.xyz
 *
 * Strategy:
 *  - install    -> precache the app's pages from /precache.json (all articles
 *                  included), so the whole journal is readable offline.
 *  - navigate   -> network-first: readers always get fresh HTML when online;
 *                  the cached copy (or /offline) serves when the network dies.
 *  - immutable  -> cache-first for /_next/static and fonts (content-hashed).
 *  - data       -> stale-while-revalidate for the search index.
 *
 * Bump CACHE_PREFIX version to invalidate everything after breaking changes.
 */

const CACHE_PREFIX = "mj-v1";
const PAGE_CACHE = `${CACHE_PREFIX}-pages`;
const ASSET_CACHE = `${CACHE_PREFIX}-assets`;
const EXPECTED_CACHES = [PAGE_CACHE, ASSET_CACHE];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const response = await fetch("/precache.json", { cache: "no-cache" });
        if (!response.ok) return;
        const manifest = await response.json();
        const cache = await caches.open(PAGE_CACHE);
        // addAll would reject the whole install on one failed URL; settle
        // individually so a single bad route can't disable offline support.
        await Promise.allSettled(
          manifest.urls.map((url) => cache.add(new Request(url))),
        );
      } catch {
        // Offline during install — runtime caching still applies later.
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => !EXPECTED_CACHES.includes(name))
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

async function networkFirstPage(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const fresh = await fetch(request);
    if (fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const offline = await cache.match("/offline");
    if (offline) return offline;
    return new Response("Offline", { status: 503 });
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const fresh = await fetch(request);
  if (fresh.ok) cache.put(request, fresh.clone());
  return fresh;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(PAGE_CACHE);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((fresh) => {
      if (fresh.ok) cache.put(request, fresh.clone());
      return fresh;
    })
    .catch(() => cached);
  return cached ?? refresh;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg")
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (
    url.pathname === "/search-index.json" ||
    url.pathname === "/precache.json" ||
    url.pathname.startsWith("/_next/data/")
  ) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
