"use client";

import Link from "next/link";
import { Pause, Play } from "lucide-react";

import { PHASE_LABEL, usePomodoroStore } from "@/stores/pomodoro";
import { formatClock, useNow, usePomodoroHydrated } from "./runtime";

const RING_R = 7;
const RING_C = 2 * Math.PI * RING_R;

/**
 * Compact live timer for the site nav. Appears on every page whenever a
 * Pomodoro session is active (running or paused) and disappears when idle, so
 * you can watch — and pause/resume — the timer while reading. The label links
 * back to the full timer page.
 */
export function PomodoroMiniTimer() {
  const hydrated = usePomodoroHydrated();
  const store = usePomodoroStore();
  const running = hydrated && store.status === "running";
  const now = useNow(running);

  // Nothing to show until a session has been started.
  if (!hydrated || store.status === "idle") return null;

  const duration = store.phaseDurationMs();
  const remaining = store.remainingMs(now);
  const progress = duration === 0 ? 0 : 1 - remaining / duration;
  const isBreak = store.phase !== "focus";

  return (
    <div
      className={`flex items-center gap-1 rounded-full border py-1 pl-3 pr-1 transition-colors ${
        running ? "border-portfolio-ember/45" : "border-portfolio-smoke"
      }`}
    >
      <Link
        href="/tools/pomodoro"
        aria-label={`Pomodoro — ${formatClock(remaining)} left in ${PHASE_LABEL[store.phase]}. Open timer.`}
        className="flex items-center gap-2"
      >
        <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden>
          <circle
            cx={9}
            cy={9}
            r={RING_R}
            fill="none"
            style={{ stroke: "rgb(var(--line))" }}
            strokeWidth={2}
          />
          <circle
            cx={9}
            cy={9}
            r={RING_R}
            fill="none"
            style={{
              stroke: isBreak
                ? "rgb(var(--accent-dim))"
                : "rgb(var(--accent-bright))",
              transition: "stroke-dashoffset 0.3s linear",
            }}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - progress)}
            transform="rotate(-90 9 9)"
          />
        </svg>
        <span className="font-mono text-[12.5px] font-medium tabular-nums tracking-tight text-portfolio-white">
          {formatClock(remaining)}
        </span>
      </Link>
      <button
        type="button"
        onClick={() => (running ? store.pause() : store.start())}
        aria-label={running ? "Pause timer" : "Resume timer"}
        className="flex size-7 items-center justify-center rounded-full text-portfolio-mist transition-colors hover:bg-portfolio-white/[0.06] hover:text-portfolio-white"
      >
        {running ? (
          <Pause className="size-3.5" aria-hidden />
        ) : (
          <Play className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
