"use client";

import { useEffect } from "react";

/**
 * Registers the offline service worker. Production only — a SW in dev caches
 * stale HMR chunks and makes local development miserable.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failing (unsupported / blocked) just means no offline
        // support — the site itself is unaffected.
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
