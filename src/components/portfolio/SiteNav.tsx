"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { navLinks, site } from "@/content/site";
import { useHideNavOnScroll } from "@/hooks/use-hide-nav-on-scroll";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 520, damping: 34 };

export function SiteNav() {
  const scrolled = useScrolled();
  const navHidden = useHideNavOnScroll();
  const reduceMotion = useReducedMotion();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background,box-shadow,border-color,opacity] duration-500 ease-out",
        scrolled
          ? "glass-nav"
          : "border-b border-transparent bg-gradient-to-b from-portfolio-black/90 to-transparent",
        navHidden && "max-md:pointer-events-none max-md:-translate-y-full max-md:opacity-0",
      )}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-[60px]">
        <Link href="#" className="nav-logo">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={spring}
              >
                <Link href={link.href} className="nav-link glass-nav-link">
                  {link.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
