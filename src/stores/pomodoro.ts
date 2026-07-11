"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Pomodoro engine. Time is anchored to wall-clock timestamps (`endsAt`), not
 * an interval counter — so the timer stays correct across page reloads,
 * laptop sleep, and background-tab throttling. The UI merely *renders*
 * `remaining(now)`; it never owns time.
 */

export type PomodoroPhase = "focus" | "shortBreak" | "longBreak";
export type PomodoroStatus = "idle" | "running" | "paused";

export const PHASE_LABEL: Record<PomodoroPhase, string> = {
  focus: "Focus",
  shortBreak: "Short break",
  longBreak: "Long break",
};

type PomodoroSettings = {
  /** Minutes per phase. */
  focus: number;
  shortBreak: number;
  longBreak: number;
  /** A long break replaces every Nth short break. */
  longBreakEvery: number;
  notifications: boolean;
  sound: boolean;
};

export const DEFAULT_SETTINGS: PomodoroSettings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakEvery: 4,
  notifications: false,
  sound: true,
};

type PomodoroState = {
  phase: PomodoroPhase;
  status: PomodoroStatus;
  /** Epoch ms when the running phase completes; null unless running. */
  endsAt: number | null;
  /** Milliseconds left, snapshotted while paused. */
  pausedRemainingMs: number;
  /** Focus sessions completed today (resets when the date changes). */
  completedToday: number;
  completedDate: string;
  settings: PomodoroSettings;

  phaseDurationMs: (phase?: PomodoroPhase) => number;
  remainingMs: (now?: number) => number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  /** Called by the ticking UI when remaining hits zero. */
  completePhase: () => void;
  updateSettings: (patch: Partial<PomodoroSettings>) => void;
};

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function nextPhase(
  current: PomodoroPhase,
  completedFocus: number,
  longBreakEvery: number,
): PomodoroPhase {
  if (current !== "focus") return "focus";
  return completedFocus > 0 && completedFocus % longBreakEvery === 0
    ? "longBreak"
    : "shortBreak";
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      phase: "focus",
      status: "idle",
      endsAt: null,
      pausedRemainingMs: 0,
      completedToday: 0,
      completedDate: today(),
      settings: DEFAULT_SETTINGS,

      phaseDurationMs: (phase) => {
        const { settings } = get();
        const target = phase ?? get().phase;
        const minutes =
          target === "focus"
            ? settings.focus
            : target === "shortBreak"
              ? settings.shortBreak
              : settings.longBreak;
        return minutes * 60 * 1000;
      },

      remainingMs: (now = Date.now()) => {
        const state = get();
        if (state.status === "running" && state.endsAt !== null) {
          return Math.max(0, state.endsAt - now);
        }
        if (state.status === "paused") return state.pausedRemainingMs;
        return state.phaseDurationMs();
      },

      start: () => {
        const state = get();
        const remaining =
          state.status === "paused"
            ? state.pausedRemainingMs
            : state.phaseDurationMs();
        set({ status: "running", endsAt: Date.now() + remaining });
      },

      pause: () => {
        const state = get();
        if (state.status !== "running" || state.endsAt === null) return;
        set({
          status: "paused",
          pausedRemainingMs: Math.max(0, state.endsAt - Date.now()),
          endsAt: null,
        });
      },

      reset: () => set({ status: "idle", endsAt: null, pausedRemainingMs: 0 }),

      skip: () => {
        const state = get();
        set({
          phase: nextPhase(
            state.phase,
            state.completedToday,
            state.settings.longBreakEvery,
          ),
          status: "idle",
          endsAt: null,
          pausedRemainingMs: 0,
        });
      },

      completePhase: () => {
        const state = get();
        const isFocus = state.phase === "focus";
        const date = today();
        const completedToday = isFocus
          ? (state.completedDate === date ? state.completedToday : 0) + 1
          : state.completedDate === date
            ? state.completedToday
            : 0;
        set({
          completedToday,
          completedDate: date,
          phase: nextPhase(
            state.phase,
            completedToday,
            state.settings.longBreakEvery,
          ),
          status: "idle",
          endsAt: null,
          pausedRemainingMs: 0,
        });
      },

      updateSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),
    }),
    {
      name: "mj-pomodoro",
      version: 1,
      skipHydration: true,
    },
  ),
);
