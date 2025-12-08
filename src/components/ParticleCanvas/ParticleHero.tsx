"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { initWebGLParticles } from "@/lib/webglParticles";

type ParticleHeroProps = {
  /**
   * @notice Optional className for cursor parallax transforms.
   */
  className?: string;
};

/**
 * @notice Renders GPU particle canvas for hero background (desktop only).
 */
export function ParticleHero({ className = "" }: ParticleHeroProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMotionAllowed, setIsMotionAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setIsMotionAllowed(!mediaQuery.matches);
    handleChange();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
    }
    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMotionAllowed || !canvasRef.current) return;
    const cleanup = initWebGLParticles(canvasRef.current);
    return () => {
      cleanup?.();
    };
  }, [isMotionAllowed]);

  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] ${className}`}
    >
      <Image
        src="/design/revalon-frame.png"
        alt="Frame II glass gradient backdrop"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70 mix-blend-screen"
      />
      <div ref={canvasRef} className="absolute inset-0" />
      {!isMotionAllowed && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#04050b00] via-[#05060d88] to-[#010104]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
    </div>
  );
}
