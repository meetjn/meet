import type { Metadata } from "next";

import { PomodoroTimer } from "@/components/pomodoro/PomodoroTimer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pomodoro",
  description:
    "A minimal, offline-capable pomodoro timer. Focus sessions, breaks, and desktop notifications — no account, nothing stored outside your browser.",
  alternates: { canonical: "/tools/pomodoro" },
  openGraph: {
    title: "Pomodoro · Meet Jain",
    description: "A minimal, offline-capable pomodoro timer.",
    url: `${SITE_URL}/tools/pomodoro`,
    type: "website",
  },
};

export default function PomodoroPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
      <PomodoroTimer />
    </div>
  );
}
