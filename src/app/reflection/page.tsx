import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site";

const TALK_TITLE =
  "Career stability isn't career safety—here's why";
const TALK_SPEAKER = "Andreas Gebhardt";
const TALK_EVENT = "TEDxGraz";

export const metadata: Metadata = {
  title: "Reflection",
  description:
    "I keep coming back to this TEDx talk when I start mistaking comfort for progress. Gebhardt on why real safety comes from letting go—not holding on.",
  alternates: { canonical: "/reflection" },
  openGraph: {
    title: "Reflection · Meet Jain",
    description:
      "A TEDx talk I come back to whenever I need a reminder that today's risk becomes tomorrow's safety.",
    url: `${SITE_URL}/reflection`,
    type: "website",
  },
};

export default function ReflectionPage() {
  return (
    <div className="section-pad">
      <header className="mb-14 max-w-3xl">
        <p className="eyebrow mb-6">{TALK_EVENT}</p>
        <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-medium leading-[1.1] tracking-[-0.015em] text-portfolio-white">
          {TALK_TITLE}
        </h1>
        <p className="mt-6 font-sans text-[14px] font-medium text-portfolio-mist">
          {TALK_SPEAKER}
        </p>
        <p className="mt-8 max-w-[54ch] border-l border-portfolio-smoke pl-7 font-sans text-[16px] font-light leading-[1.9] text-portfolio-cream">
          I keep coming back to this talk when I start mistaking comfort for
          progress in my own work.
          <br />
          <br />
          Today&apos;s risk becomes tomorrow&apos;s safety—and Gebhardt
          explains why, with juggling and a lot of humor.
        </p>
      </header>

      <div className="max-w-4xl overflow-hidden rounded-2xl border border-portfolio-smoke bg-portfolio-ash/30">
        <div className="relative aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/U8YyGRE_-zI?si=leFBQ-oqT5gMLnzc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
