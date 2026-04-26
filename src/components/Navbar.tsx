"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { MEDIA_SECTION_ID } from "@/components/Footer";

const MOBILE_NAV_ID = "portfolio-nav-mobile";
const RESUME_PATH = "/Resume.pdf";

export function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

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
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const timer = window.setTimeout(() => setIsMobileNavVisible(true), 3250);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.clearTimeout(timer);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const scrollToMedia = () => {
    if (typeof document === "undefined") return;
    document.getElementById(MEDIA_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleResumeDownload = () => {
    if (typeof window === "undefined") return;
    window.location.assign(RESUME_PATH);
  };

  const shouldShowNavbar = !isMobile || isMobileNavVisible;
  const navbarVisibilityClass =
    !shouldShowNavbar || isHidden
      ? "-translate-y-20 opacity-0 pointer-events-none"
      : "translate-y-0 opacity-100";

  return (
    <header
      className={`sticky top-4 z-50 mx-auto w-full max-w-[1600px] px-4 transition duration-500 ease-out sm:top-6 sm:px-6 lg:px-10 ${navbarVisibilityClass}`}
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
              Co-founder · Fintech &amp; Blockchain
            </p>
          </div>
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-controls={MOBILE_NAV_ID}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
          className="nav-pill relative z-50 flex h-11 w-11 items-center justify-center border border-white/30 bg-black/60 text-white backdrop-blur-sm transition hover:border-[#f5c775] hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 7h16M4 12h12M4 17h16" />
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={scrollToMedia}
            className="nav-pill inline-flex items-center justify-center border border-white/25 bg-white/5 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#f5c775] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:scale-[0.98]"
          >
            Contact
          </button>
          <button
            type="button"
            onClick={handleResumeDownload}
            className="nav-pill inline-flex items-center justify-center border border-white/25 bg-white/5 px-6 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#f5c775] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:scale-[0.98]"
          >
            Resume
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-lg transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden="true"
          onClick={closeMenu}
        />
        <nav
          id={MOBILE_NAV_ID}
          className={`mobile-nav-starfield fixed left-4 right-4 top-4 z-[70] overflow-hidden rounded-[32px] border border-white/20 bg-[#05070c]/98 backdrop-blur-xl px-6 pb-8 pt-20 text-sm text-white shadow-[0_40px_140px_rgba(0,0,0,0.85)] transition-all duration-300 ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute right-4 top-4 z-20">
            <button
              type="button"
              onClick={closeMenu}
              className="nav-pill inline-flex h-10 w-10 items-center justify-center border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span className="sr-only">Close navigation</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <button
              type="button"
              onClick={handleResumeDownload}
              className="nav-pill flex w-full items-center justify-center border border-white/25 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:border-[#f5c775] hover:bg-white/10 active:scale-[0.98]"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                scrollToMedia();
              }}
              className="nav-pill flex w-full items-center justify-center border border-white/25 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:border-[#f5c775] hover:bg-white/10 active:scale-[0.98]"
            >
              Contact
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
