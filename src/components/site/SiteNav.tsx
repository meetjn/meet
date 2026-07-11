"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PomodoroMiniTimer } from "@/components/pomodoro/PomodoroMiniTimer";
import { useSearchUi } from "@/stores/search";

const links = [
  { href: "/", label: "Writing" },
  { href: "/tools/pomodoro", label: "Pomodoro" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname.startsWith("/writing");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const openSearch = useSearchUi((state) => state.setOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-portfolio-smoke/70 bg-portfolio-black/85 backdrop-blur-xl">
      <nav
        aria-label="Site"
        className="flex items-center justify-between px-6 py-5 sm:px-12 lg:px-[max(7vw,3.5rem)]"
      >
        <Link
          href="/"
          className="font-display text-[19px] font-medium italic tracking-[-0.01em] text-portfolio-white transition-colors hover:text-portfolio-ember"
        >
          Meet Jain
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-sans text-[13px] font-medium transition-colors ${
                  active
                    ? "text-portfolio-white underline decoration-portfolio-ember underline-offset-8"
                    : "text-portfolio-mist hover:text-portfolio-white"
                } ${link.href === "/" ? "hidden sm:inline" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* The full timer page already shows the countdown front and
              center — skip the nav pill there so it isn't shown twice. */}
          {pathname !== "/tools/pomodoro" && <PomodoroMiniTimer />}

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
