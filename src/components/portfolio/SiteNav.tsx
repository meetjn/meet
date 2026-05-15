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

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-portfolio-black/90 to-transparent">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-6 sm:px-10 lg:px-[60px]">
        <Link href="#" className="nav-logo">
          {site.name}
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
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
              className="text-portfolio-white hover:bg-portfolio-ash/50"
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
              <SheetTitle className="nav-logo text-left normal-case">
                {site.name}
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-link text-sm">
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
