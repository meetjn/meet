"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  PHASE_LABEL,
  usePomodoroStore,
  type PomodoroPhase,
} from "@/stores/pomodoro";
import { formatClock, playChime } from "./runtime";

/**
 * Headless, app-wide driver for the Pomodoro timer. Mounted once in the root
 * layout so the countdown keeps ticking, completes, chimes, fires
 * notifications, and updates the browser-tab title no matter which page
 * you're on. Every visible surface (the full timer page, the nav mini-timer)
 * only *renders* the store this component drives — so completion side-effects
 * fire exactly once, from here.
 */
export function PomodoroEngine() {
  // Rehydration itself is triggered at module load in stores/pomodoro.ts —
  // this component only drives the running countdown's side effects.
  const status = usePomodoroStore((state) => state.status);

  const notify = useCallback((finishedPhase: PomodoroPhase) => {
    const { settings } = usePomodoroStore.getState();
    if (settings.sound) playChime();
    if (
      settings.notifications &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification("Pomodoro", {
        body:
          finishedPhase === "focus"
            ? "Focus session complete. Take a break."
            : "Break's over. Back to it.",
        silent: true,
      });
    }
  }, []);

  // Title to restore when the timer stops — snapshot of whatever the page's
  // own title was when this running session began.
  const baseTitle = useRef<string | null>(null);

  useEffect(() => {
    if (status !== "running") return;
    if (baseTitle.current === null) baseTitle.current = document.title;

    const tick = () => {
      const state = usePomodoroStore.getState();
      if (state.status !== "running") return;
      const remaining = state.remainingMs();
      if (remaining <= 0) {
        const finished = state.phase;
        state.completePhase();
        notify(finished);
        return;
      }
      document.title = `${formatClock(remaining)} · ${PHASE_LABEL[state.phase]} · Meet Jain`;
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => {
      window.clearInterval(id);
      if (baseTitle.current !== null) {
        document.title = baseTitle.current;
        baseTitle.current = null;
      }
    };
  }, [status, notify]);

  return null;
}
