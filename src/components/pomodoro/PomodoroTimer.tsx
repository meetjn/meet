"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Bell,
  BellOff,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  PHASE_LABEL,
  usePomodoroStore,
  type PomodoroPhase,
} from "@/stores/pomodoro";

const RING_RADIUS = 130;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function formatClock(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** Two soft sine tones via WebAudio — no audio asset to download or cache. */
function playChime() {
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

export function PomodoroTimer() {
  const store = usePomodoroStore();
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Rehydrate persisted state after mount (SSR HTML stays deterministic).
  useEffect(() => {
    const unsubscribe = usePomodoroStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    void usePomodoroStore.persist.rehydrate();
    return unsubscribe;
  }, []);

  const notifyPhaseComplete = useCallback((finishedPhase: PomodoroPhase) => {
    const { settings } = usePomodoroStore.getState();
    if (settings.sound) playChime();
    if (
      settings.notifications &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      const body =
        finishedPhase === "focus"
          ? "Focus session complete. Take a break."
          : "Break's over. Back to it.";
      new Notification("Pomodoro", { body, silent: true });
    }
  }, []);

  // The render clock: 4 ticks/sec while running; completion fires here.
  useEffect(() => {
    if (!hydrated || store.status !== "running") return;
    const interval = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      const state = usePomodoroStore.getState();
      if (state.status === "running" && state.remainingMs(current) <= 0) {
        const finishedPhase = state.phase;
        state.completePhase();
        notifyPhaseComplete(finishedPhase);
      }
    }, 250);
    return () => window.clearInterval(interval);
  }, [hydrated, store.status, notifyPhaseComplete]);

  const durationMs = store.phaseDurationMs();
  const remainingMs = hydrated ? store.remainingMs(now) : durationMs;
  const progress = durationMs === 0 ? 0 : 1 - remainingMs / durationMs;
  const clock = formatClock(remainingMs);
  const running = hydrated && store.status === "running";

  // Countdown in the tab title while running.
  useEffect(() => {
    if (!running) return;
    document.title = `${clock} · ${PHASE_LABEL[store.phase]} · Meet Jain`;
    return () => {
      document.title = "Pomodoro · Meet Jain";
    };
  }, [running, clock, store.phase]);

  const switchPhase = (phase: PomodoroPhase) => {
    if (running) return;
    usePomodoroStore.setState({
      phase,
      status: "idle",
      endsAt: null,
      pausedRemainingMs: 0,
    });
  };

  const toggleNotifications = async () => {
    const { settings, updateSettings } = usePomodoroStore.getState();
    if (settings.notifications) {
      updateSettings({ notifications: false });
      return;
    }
    if (!("Notification" in window)) return;
    const permission =
      Notification.permission === "granted"
        ? "granted"
        : await Notification.requestPermission();
    if (permission === "granted") updateSettings({ notifications: true });
  };

  return (
    <section aria-label="Pomodoro timer" className="flex flex-col items-center">
      <div
        role="tablist"
        aria-label="Timer phase"
        className="mb-8 flex flex-wrap items-center justify-center gap-2.5"
      >
        {(Object.keys(PHASE_LABEL) as PomodoroPhase[]).map((phase) => {
          const active = store.phase === phase;
          return (
            <button
              key={phase}
              role="tab"
              aria-selected={active}
              type="button"
              disabled={running}
              onClick={() => switchPhase(phase)}
              className={`chip disabled:cursor-not-allowed disabled:opacity-50 ${
                active ? "chip-active" : ""
              }`}
            >
              {PHASE_LABEL[phase]}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <svg
          width={320}
          height={320}
          viewBox="0 0 320 320"
          className="max-w-[78vw]"
          aria-hidden
        >
          <circle
            cx={160}
            cy={160}
            r={RING_RADIUS}
            fill="none"
            style={{ stroke: "rgb(var(--line))" }}
            strokeWidth={3}
          />
          <circle
            cx={160}
            cy={160}
            r={RING_RADIUS}
            fill="none"
            stroke="url(#pomodoro-ember)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
            transform="rotate(-90 160 160)"
            style={{ transition: "stroke-dashoffset 0.3s linear" }}
          />
          <defs>
            <linearGradient id="pomodoro-ember" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "rgb(var(--accent-dim))" }} />
              <stop offset="100%" style={{ stopColor: "rgb(var(--accent-bright))" }} />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono text-[64px] font-light leading-none tracking-[-0.02em] text-portfolio-white"
            role="timer"
            aria-live="off"
            aria-label={`${clock} remaining in ${PHASE_LABEL[store.phase]}`}
          >
            {clock}
          </span>
          <span className="eyebrow mt-3 !text-portfolio-ember">
            {PHASE_LABEL[store.phase]}
          </span>
        </div>
      </div>

      <div className="mt-9 flex items-center gap-3">
        <button
          type="button"
          onClick={() => (running ? store.pause() : store.start())}
          className="btn-primary !px-10"
        >
          {running ? (
            <Pause className="size-3.5" aria-hidden />
          ) : (
            <Play className="size-3.5" aria-hidden />
          )}
          {running ? "Pause" : store.status === "paused" ? "Resume" : "Start"}
        </button>
        <button
          type="button"
          onClick={store.reset}
          aria-label="Reset timer"
          className="btn-icon"
        >
          <RotateCcw className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={store.skip}
          aria-label="Skip to next phase"
          className="btn-icon"
        >
          <SkipForward className="size-4" aria-hidden />
        </button>
      </div>

      <div className="mt-7 flex items-center gap-7">
        <button
          type="button"
          onClick={() => store.updateSettings({ sound: !store.settings.sound })}
          className="flex items-center gap-2 font-sans text-[12px] font-medium text-portfolio-mist transition-colors hover:text-portfolio-white"
        >
          {store.settings.sound ? (
            <Volume2 className="size-3.5" aria-hidden />
          ) : (
            <VolumeX className="size-3.5" aria-hidden />
          )}
          Sound {store.settings.sound ? "on" : "off"}
        </button>
        <button
          type="button"
          onClick={toggleNotifications}
          className="flex items-center gap-2 font-sans text-[12px] font-medium text-portfolio-mist transition-colors hover:text-portfolio-white"
        >
          {store.settings.notifications ? (
            <Bell className="size-3.5" aria-hidden />
          ) : (
            <BellOff className="size-3.5" aria-hidden />
          )}
          Alerts {store.settings.notifications ? "on" : "off"}
        </button>
      </div>

      {hydrated && store.completedToday > 0 ? (
        <div
          className="mt-7 flex items-center gap-1.5"
          aria-label={`${store.completedToday} focus sessions completed today`}
        >
          {Array.from({ length: store.completedToday }).map((_, index) => (
            <span
              key={index}
              className="size-1.5 rounded-full bg-portfolio-ember"
              aria-hidden
            />
          ))}
          <span className="ml-2 font-sans text-[11px] font-medium text-portfolio-mist">
            today
          </span>
        </div>
      ) : null}
    </section>
  );
}
