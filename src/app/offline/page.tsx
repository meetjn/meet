import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

/**
 * Served by the service worker when a navigation fails with no cached copy.
 * Articles already precached remain readable.
 */
export default function OfflinePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="eyebrow mb-8">No connection</p>
      <h1 className="mb-8 font-display text-[clamp(40px,6vw,72px)] font-medium leading-tight tracking-[-0.02em] text-portfolio-white">
        You&apos;re{" "}
        <em className="italic text-portfolio-ember">offline</em>.
      </h1>
      <p className="mb-12 max-w-[42ch] font-sans text-[15px] font-light leading-[1.9] text-portfolio-cream">
        This page isn&apos;t cached yet — but every published article is.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Read the writing
        </Link>
      </div>
    </section>
  );
}
