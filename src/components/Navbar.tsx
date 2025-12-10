"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  MetaKeepConstructor,
  MetaKeepInstance,
  MetaKeepWalletResponse,
} from "@/types/metakeep";
import { MEDIA_SECTION_ID } from "@/components/Footer";

const MOBILE_NAV_ID = "portfolio-nav-mobile";
const RESUME_PATH = "/Resume.pdf";
const METAKEEP_APP_ID = process.env.NEXT_PUBLIC_METAKEEP_APP_ID;
const METAKEEP_POLL_INTERVAL_MS = 200;

/**
 * @notice Sticky navigation with MetaKeep-powered wallet verification -> resume handoff.
 */
export function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [sdk, setSdk] = useState<MetaKeepInstance | null>(null);
  const lastScrollY = useRef(0);
  const reduceMotionQuery = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (Math.abs(delta) < 5) return;
      if (currentY > 120 && delta > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    reduceMotionQuery.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!METAKEEP_APP_ID) {
      console.warn("MetaKeep app id missing. Set NEXT_PUBLIC_METAKEEP_APP_ID.");
      return;
    }

    let hasLoggedWaiting = false;
    let pollTimer: number | undefined;
    let isUnmounted = false;

    const attemptInit = () => {
      const MetaKeepCtor: MetaKeepConstructor | undefined = window.MetaKeep;
      if (!MetaKeepCtor) {
        if (!hasLoggedWaiting) {
          console.warn(
            "MetaKeep SDK script not yet available. Waiting for load…"
          );
          hasLoggedWaiting = true;
        }
        return false;
      }
      const instance = new MetaKeepCtor({ appId: METAKEEP_APP_ID });
      if (!isUnmounted) {
        setSdk(instance);
      }
      return true;
    };

    if (attemptInit()) {
      return () => {
        isUnmounted = true;
      };
    }

    pollTimer = window.setInterval(() => {
      if (attemptInit() && pollTimer) {
        window.clearInterval(pollTimer);
        pollTimer = undefined;
      }
    }, METAKEEP_POLL_INTERVAL_MS);

    return () => {
      isUnmounted = true;
      if (pollTimer) {
        window.clearInterval(pollTimer);
      }
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const scrollToMedia = () => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const target = document.getElementById(MEDIA_SECTION_ID);
    if (!target) return;

    // Account for sticky navbar height so the footer isn't hidden behind it,
    // especially on smaller mobile screens.
    const targetRect = target.getBoundingClientRect();
    const headerOffset = 120; // approx navbar + spacing
    const scrollTop = window.scrollY + targetRect.top - headerOffset;

    window.scrollTo({ top: Math.max(scrollTop, 0), behavior: "smooth" });
  };

  const handleResumeDownload = () => {
    if (typeof window === "undefined") return;
    // Use direct navigation so iOS treats it as a user gesture and opens reliably.
    window.location.assign(RESUME_PATH);
  };

  const handleConnect = useCallback(async () => {
    if (wallet) {
      handleResumeDownload();
      return;
    }
    if (!sdk) {
      console.warn(
        "MetaKeep SDK not ready yet; falling back to direct resume download."
      );
      // Fallback so mobile users and non-configured envs still get the resume.
      handleResumeDownload();
      return;
    }
    setIsConnecting(true);
    try {
      const response: MetaKeepWalletResponse = await sdk.getWallet();
      if (response.status === "SUCCESS" && response.wallet?.solAddress) {
        setWallet(response.wallet.solAddress);
        handleResumeDownload();
      }
    } catch (error) {
      console.error("MetaKeep connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  }, [sdk, wallet]);

  const buttonLabel = isConnecting ? "Connecting…" : "Resume";
  const formattedRecruiterWallet = wallet
    ? `${wallet.slice(0, 6)}…${wallet.slice(-4)}`
    : null;

  return (
    <header
      className={`sticky top-4 z-30 mx-auto w-full max-w-[1600px] px-4 transition duration-500 ease-out sm:top-6 sm:px-6 ${
        isHidden
          ? "-translate-y-20 opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="glass-panel noise-surface flex items-center justify-between gap-3 rounded-3xl px-4 py-3 backdrop-blur-2xl sm:px-6 sm:py-4">
        <Link
          href="/"
          aria-label="Return home"
          className="flex flex-1 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.5),rgba(255,255,255,0.08)_40%,transparent_70%)] text-[18px] font-semibold tracking-[0.25em] text-white shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
            M
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70 sm:text-sm">
              Meet Jain
            </p>
            <p className="text-[11px] text-white/40 sm:text-xs">
              Full Stack × Blockchain
            </p>
          </div>
        </Link>

        <button
          type="button"
          aria-controls={MOBILE_NAV_ID}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
          className="nav-pill flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 transition hover:border-[#f5c775] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M4 7h16M4 12h12M4 17h16" />
          </svg>
        </button>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={scrollToMedia}
            className="nav-pill inline-flex items-center justify-center border border-white/20 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-[#f5c775] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Media
          </button>
          <button
            type="button"
            onClick={handleConnect}
            className="nav-pill inline-flex items-center justify-center border border-white/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-[#f5c775] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            disabled={isConnecting}
          >
            {buttonLabel}
          </button>
          {formattedRecruiterWallet && (
            <p className="text-[11px] text-white/35">
              Recruiter wallet{" "}
              <span
                className="font-mono text-white/55"
                aria-label={`Technical recruiter Solana wallet ${wallet}`}
              >
                {formattedRecruiterWallet}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-20 bg-black/70 backdrop-blur-lg transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden="true"
          onClick={closeMenu}
        />
        <nav
          id={MOBILE_NAV_ID}
          className={`fixed left-4 right-4 top-4 z-30 rounded-[32px] border border-white/15 bg-[#05070c]/95 px-6 pb-8 pt-20 text-sm text-white/80 shadow-[0_40px_140px_rgba(0,0,0,0.65)] transition-all duration-300 ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute right-4 top-4">
            <button
              type="button"
              onClick={closeMenu}
              className="nav-pill inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white/70 hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span className="sr-only">Close navigation</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleConnect}
              className="nav-pill flex w-full items-center justify-center border border-white/20 px-5 py-3 text-base font-semibold text-white transition hover:border-[#f5c775] hover:text-white"
              disabled={isConnecting}
            >
              {buttonLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                scrollToMedia();
              }}
              className="nav-pill flex w-full items-center justify-center border border-white/20 px-5 py-3 text-base font-semibold text-white/85 transition hover:border-[#f5c775] hover:text-white"
            >
              Media
            </button>
            {formattedRecruiterWallet && (
              <p className="text-center text-xs text-white/40">
                Recruiter wallet{" "}
                <span
                  className="font-mono text-white/60"
                  aria-label={`Technical recruiter Solana wallet ${wallet}`}
                >
                  {formattedRecruiterWallet}
                </span>
              </p>
            )}
            {wallet && (
              <p className="text-center text-xs text-white/50">
                Verified Solana wallet: {wallet.slice(0, 6)}…{wallet.slice(-4)}
              </p>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
