"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { navLinks, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinkClass =
  "text-xs uppercase tracking-[0.2em] text-portfolio-mist transition-colors hover:text-portfolio-white";

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-portfolio-smoke/40 bg-portfolio-black/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-10 lg:px-[60px]">
        <Link
          href="#"
          className="font-display text-lg tracking-[0.2em] text-portfolio-white sm:text-[22px] sm:tracking-[3px]"
        >
          {site.name}
        </Link>

        <ul className="hidden items-center gap-6 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-portfolio-white hover:bg-portfolio-ash"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-portfolio-smoke bg-portfolio-black text-portfolio-white"
          >
            <SheetHeader>
              <SheetTitle className="font-display tracking-[0.2em] text-portfolio-white">
                {site.name}
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${navLinkClass} text-sm`}>
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
