"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useSearchUi } from "@/stores/search";

const links = [
  { href: "/", label: "Articles" },
  { href: "/reflection", label: "Reflection" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname.startsWith("/writing");
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Hide the header while scrolling down and reveal it on the way back up
 * (always visible near the top). Tracked with rAF so the scroll handler stays
 * cheap.
 */
function useHideOnScroll(): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

export function SiteNav() {
  const pathname = usePathname();
  const openSearch = useSearchUi((state) => state.setOpen);
  const hidden = useHideOnScroll();

  return (
    <header
      className={`sticky top-0 z-40 bg-portfolio-black/80 backdrop-blur-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Site"
        className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-5 sm:px-12 lg:px-[max(7vw,3.5rem)]"
      >
        <Link
          href="/"
          className="font-display text-[19px] font-medium italic tracking-[-0.01em] text-portfolio-white transition-colors hover:text-portfolio-ember"
        >
          Meet Jain
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap font-sans text-[13px] font-medium transition-colors ${
                  active
                    ? "text-portfolio-white underline decoration-portfolio-ember underline-offset-8"
                    : "text-portfolio-mist hover:text-portfolio-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-6">
          <button
            type="button"
            onClick={() => openSearch(true)}
            aria-label="Search articles"
            className="chip !py-2 text-portfolio-white"
          >
            <Search className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-portfolio-smoke px-1.5 py-0.5 font-mono text-[9px] text-portfolio-mist sm:inline">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
