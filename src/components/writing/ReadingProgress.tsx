"use client";

import { useEffect, useRef } from "react";

/**
 * Ember progress hairline under the nav. Width is driven directly on the DOM
 * node inside a rAF-throttled scroll handler — no React re-render per frame.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable <= 0 ? 1 : Math.min(1, window.scrollY / scrollable);
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(to right, rgb(var(--accent-dim)), rgb(var(--accent-bright)))",
        }}
      />
    </div>
  );
}
