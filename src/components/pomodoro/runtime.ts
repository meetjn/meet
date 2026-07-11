"use client";

import { useEffect, useState } from "react";

import { usePomodoroStore } from "@/stores/pomodoro";

/** ms -> "MM:SS", rounding up so the final second reads 00:01, not 00:00. */
export function formatClock(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** Two soft sine tones via WebAudio — no audio asset to download or cache. */
export function playChime() {
  try {
    const AudioContextCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextCtor) return;
    const context = new AudioContextCtor();
    [523.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      const start = context.currentTime + index * 0.18;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.55);
    });
    window.setTimeout(() => void context.close(), 1500);
  } catch {
    // Audio blocked — silent completion is fine.
  }
}

/**
 * True once the persisted store has rehydrated. The store uses
 * `skipHydration`, so SSR HTML stays deterministic; the actual rehydrate is
 * triggered once at module load in stores/pomodoro.ts, ahead of any
 * component mount.
 *
 * Hydration can finish (it's just a synchronous localStorage read) in the
 * gap between this hook's initial render and its effect committing — e.g.
 * another component's effect runs first in the same flush. Subscribing in
 * the effect would miss that already-fired event, so we re-check right
 * after subscribing to close the race instead of relying on the listener
 * alone.
 */
export function usePomodoroHydrated(): boolean {
  // Must start `false` (not a lazy `persist.hasHydrated()` check) — the
  // initializer would also run during SSR, where the persist store isn't
  // safely accessible. Everything hydration-related happens in the effect
  // below, which is client-only.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (usePomodoroStore.persist.hasHydrated()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- re-sync with an external singleton that may have changed since render, not a render-derived value
      setHydrated(true);
      return;
    }
    return usePomodoroStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}

/** Wall-clock `now`, refreshed 4x/sec while `active`. Render-only. */
export function useNow(active: boolean): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    // `now` may be stale by however long `active` was false (idle, paused,
    // or just mounted mid-session) — refresh immediately on activation
    // instead of waiting up to 250ms for the first tick.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- re-sync with the wall clock on activation, not a render-derived value
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [active]);
  return now;
}
