"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MapPin } from "lucide-react";

import { ParticleHero } from "@/components/ParticleCanvas";
import { identity, stats } from "@/content/portfolio";

const HERO_PARALLAX_RELEASE_MS = 420;
const HERO_REVEAL_DELAY_MS = 750;
const HERO_CURSOR_SHIFT = 18;
const HERO_CURSOR_TILT = 2.5;

type HeroAnimationStyle = CSSProperties & {
  "--hero-delay"?: string;
  "--hero-layer-depth"?: number | string;
};

const delayStyle = (delaySeconds: number): HeroAnimationStyle => ({
  "--hero-delay": `${delaySeconds}s`,
});

const layerStyle = (depth: number): HeroAnimationStyle => ({
  "--hero-layer-depth": depth,
});

export function HeroOrbit() {
  const [isReady, setIsReady] = useState(false);
  const [isParallaxActive, setIsParallaxActive] = useState(true);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const cursorTarget = useRef({
    shiftX: 0,
    shiftY: 0,
    tiltX: 0,
    tiltY: 0,
  });

  useEffect(() => {
    const revealTimer = window.setTimeout(
      () => setIsReady(true),
      HERO_REVEAL_DELAY_MS
    );
    const parallaxTimer = window.setTimeout(
      () => setIsParallaxActive(false),
      HERO_PARALLAX_RELEASE_MS
    );
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(parallaxTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    const handleChange = () => setIsPointerFine(query.matches);
    handleChange();
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const animateClass = `hero-animate${isReady ? " hero-animate--ready" : ""}`;
  const parallaxClass = `hero-parallax${
    isParallaxActive ? " hero-parallax--active" : ""
  }`;

  const flushCursor = () => {
    rafRef.current = null;
    if (!heroRef.current) return;
    const { shiftX, shiftY, tiltX, tiltY } = cursorTarget.current;
    heroRef.current.style.setProperty("--hero-shift-x", `${shiftX}px`);
    heroRef.current.style.setProperty("--hero-shift-y", `${shiftY}px`);
    heroRef.current.style.setProperty("--hero-tilt-x", `${tiltX}deg`);
    heroRef.current.style.setProperty("--hero-tilt-y", `${tiltY}deg`);
  };

  const queueCursorFlush = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(flushCursor);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isPointerFine || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const normX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const clamp = (value: number) => Math.max(-1, Math.min(1, value));
    cursorTarget.current = {
      shiftX: clamp(normX) * HERO_CURSOR_SHIFT,
      shiftY: clamp(normY) * HERO_CURSOR_SHIFT,
      tiltX: clamp(normY) * -HERO_CURSOR_TILT,
      tiltY: clamp(normX) * HERO_CURSOR_TILT,
    };
    queueCursorFlush();
  };

  const handlePointerLeave = () => {
    cursorTarget.current = { shiftX: 0, shiftY: 0, tiltX: 0, tiltY: 0 };
    queueCursorFlush();
  };

  return (
    <section
      ref={heroRef}
      className="hero-orbit relative mx-auto mt-10 w-full max-w-[1500px] rounded-[32px] border border-white/8 bg-white/5 px-4 py-12 text-white shadow-[0_60px_140px_rgba(0,0,0,0.55)] sm:mt-16 sm:rounded-[44px] sm:px-8 sm:py-16 lg:mt-20 lg:rounded-[52px] lg:px-20 lg:py-[5.5rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ParticleHero className="hero-orbit__background" />
      <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:gap-20">
        <div
          className="hero-orbit__panel flex-1 space-y-8 lg:max-w-[55%] lg:pr-12 xl:pr-16"
          style={layerStyle(0.45)}
        >
          <div className="space-y-6">
            <p
              className={[
                animateClass,
                "inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60",
              ].join(" ")}
              style={delayStyle(0.05)}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Full‑stack product engineer
            </p>
            <h1
              className={[
                animateClass,
                "text-balance text-[clamp(2.5rem,6vw,3.8rem)] font-semibold leading-tight text-white lg:text-6xl",
              ].join(" ")}
              style={delayStyle(0.15)}
            >
              {identity.headline}
            </h1>
            <p
              className={[
                animateClass,
                "text-lg text-white/70 sm:text-xl",
              ].join(" ")}
              style={delayStyle(0.25)}
            >
              {identity.role}
            </p>
            <p
              className={[
                animateClass,
                "text-sm text-white/60 sm:text-base",
              ].join(" ")}
              style={delayStyle(0.3)}
            >
              Open to remote YC‑backed and early‑stage teams building web,
              fintech, or crypto products.
            </p>
            <div
              className="flex flex-wrap gap-3 text-sm text-white/65"
              style={delayStyle(0.35)}
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} />
                {identity.location}
              </span>
            </div>
            {/* heroSignals cards removed per design request */}
          </div>
        </div>

        <div
          className="hero-orbit__panel flex-1 space-y-8 lg:pl-6 xl:pl-10"
          style={layerStyle(0.75)}
        >
          <div
            className={[
              animateClass,
              parallaxClass,
              "texture-panel noise-surface radial-highlight rounded-[28px] border border-white/10 p-6 sm:rounded-[36px] sm:p-8",
            ].join(" ")}
            style={delayStyle(0.7)}
          >
            <div className="flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
              <p>Invisible Infra, Visible Results</p>
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.35em]">
                Active
              </span>
            </div>
            <p className="mt-6 text-4xl font-semibold text-white lg:text-[2.6rem]">
              Highlights
            </p>
            <p className="mt-3 text-base text-white/75">
              Built the fiat on-ramp from scratch, productionized wallet
              isolation, and wired MoonPay → Jupiter → $LOOK directly into
              MetaKeep wallets
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 text-xs text-white/60">
              {/* <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">
                  Delivery
                </p>
                <p>Weekly launch rhythm</p>
              </div> */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">
                  Toolchain
                </p>
                <p>Next.js · Solana/EVM · Node.js · AWS</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={[
                  "glass-panel card-hover-zoom-out",
                  animateClass,
                  parallaxClass,
                  "rounded-[26px] border-white/5 p-5 sm:p-6",
                ].join(" ")}
                style={delayStyle(0.95 + index * 0.12)}
              >
                <p className="text-sm uppercase tracking-[0.35em] text-white/55">
                  {stat.label}
                </p>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-white/70">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
