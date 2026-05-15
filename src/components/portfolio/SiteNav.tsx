"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { navLinks, site } from "@/content/site";
import { useScrolled } from "@/hooks/use-scrolled";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 520, damping: 34 };

export function SiteNav() {
  const scrolled = useScrolled();
  const reduceMotion = useReducedMotion();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-500",
        scrolled
          ? "glass-nav"
          : "border-b border-transparent bg-gradient-to-b from-portfolio-black/90 to-transparent",
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

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <motion.div
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              transition={spring}
            >
              <Button
                variant="ghost"
                size="icon"
                className="glass-icon-btn size-10 rounded-xl"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="right" className="glass-sheet text-portfolio-white">
            <SheetHeader>
              <SheetTitle className="nav-logo text-left normal-case">
                {site.name}
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-8 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link glass-nav-link block text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
