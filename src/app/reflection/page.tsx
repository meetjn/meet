import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site";

type Reflection = {
  /** YouTube video id — the embed URL is built from this. */
  videoId: string;
  title: string;
  speaker: string;
  event: string;
  /** Each string renders as its own paragraph. */
  note: string[];
};

/** Newest first. Add to the top as you find things worth keeping. */
const reflections: Reflection[] = [
  {
    videoId: "eQZO-MPpbJg",
    title: "How to Win Without Crushing Your Soul",
    speaker: "Graham Weaver",
    event: "Stanford Graduate School of Business",
    note: [
      "I watched this twice in the same week.",
      "Weaver spent thirty years chasing the next milestone — the hundred-hour weeks, fourteen years before his own company really worked — and his point is that the scoreboard was never the problem. The voice keeping score was.",
      "The line I keep repeating back to myself: fear in your head is paralyzing, but fear on paper is just a problem you can solve. If you're waiting to arrive somewhere before you let yourself feel alright, start here.",
    ],
  },
  {
    videoId: "U8YyGRE_-zI",
    title: "Career stability isn't career safety—here's why",
    speaker: "Andreas Gebhardt",
    event: "TEDxGraz",
    note: [
      "I keep coming back to this talk when I start mistaking comfort for progress in my own work.",
      "Today's risk becomes tomorrow's safety—and Gebhardt explains why, with juggling and a lot of humor.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Reflection",
  description:
    "Talks I keep coming back to — on doing hard things, trading comfort for progress, and winning without crushing your soul.",
  alternates: { canonical: "/reflection" },
  openGraph: {
    title: "Reflection · Meet Jain",
    description:
      "A running list of talks that pushed me in the right direction, and what stuck with me from each.",
    url: `${SITE_URL}/reflection`,
    type: "website",
  },
};

export default function ReflectionPage() {
  return (
    <div className="section-pad">
      <header className="mb-20 max-w-3xl lg:mb-24">
        <p className="eyebrow mb-6">Reflection</p>
        <h1 className="font-display text-[clamp(32px,4.5vw,52px)] font-medium leading-[1.1] tracking-[-0.015em] text-portfolio-white">
          Things I keep coming back to
        </h1>
        <p className="mt-8 max-w-[54ch] border-l border-portfolio-smoke pl-7 font-sans text-[16px] font-light leading-[1.9] text-portfolio-cream">
          When something I watch pushes me in the right direction, I keep it
          here — along with the part of it that stuck.
        </p>
      </header>

      <div className="flex flex-col gap-24 lg:gap-32">
        {reflections.map((item) => (
          <section key={item.videoId} aria-label={item.title}>
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow mb-5">{item.event}</p>
              <h2 className="font-display text-[clamp(26px,3.4vw,40px)] font-medium leading-[1.12] tracking-[-0.015em] text-portfolio-white">
                {item.title}
              </h2>
              <p className="mt-5 font-sans text-[14px] font-medium text-portfolio-mist">
                {item.speaker}
              </p>
              <div className="mt-7 max-w-[54ch] border-l border-portfolio-smoke pl-7 font-sans text-[16px] font-light leading-[1.9] text-portfolio-cream">
                {item.note.map((paragraph) => (
                  <p key={paragraph} className="[&+p]:mt-5">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="max-w-4xl overflow-hidden rounded-2xl border border-portfolio-smoke bg-portfolio-ash/30">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={`${item.title} — ${item.speaker}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
