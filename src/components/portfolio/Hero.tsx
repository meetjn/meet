import Link from "next/link";
import { Mail } from "lucide-react";

import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-5 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-[60px] lg:pb-[80px]">
      <div
        className="pointer-events-none absolute right-16 top-0 hidden h-full w-px opacity-30 lg:right-[120px] lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #C84B11 40%, #7A2D0A 60%, transparent)",
        }}
        aria-hidden
      />

      <span className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 text-[11px] uppercase tracking-[0.35em] text-portfolio-ember lg:right-[60px] lg:block">
        2026
      </span>

      <div className="relative z-10 max-w-5xl">
        <p className="animate-fade-up animate-delay-200 mb-6 text-[11px] uppercase tracking-[0.35em] text-portfolio-ember opacity-0 sm:mb-8">
          {site.role}
        </p>

        <h1 className="hero-title animate-fade-up animate-delay-400 mb-8 opacity-0 sm:mb-9">
          Built to
          <br />
          <em>burn</em>
          <br />
          problems
          <br />
          down.
        </h1>

        <p className="animate-fade-up animate-delay-600 mb-10 max-w-[520px] text-sm leading-relaxed text-portfolio-cream opacity-0 sm:text-[15px] sm:leading-[1.8]">
          I build financial infrastructure at the founding layer — lending
          protocols, payment rails, acquisition-grade systems. Not because
          it&apos;s a job. Because I can&apos;t stop until something works
          exactly the way it should.
        </p>

        <div className="animate-fade-up animate-delay-800 flex flex-wrap items-center gap-4 opacity-0">
          <Button
            asChild
            className="h-auto rounded-none bg-portfolio-ember px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-portfolio-white hover:bg-portfolio-ember-glow"
          >
            <Link href="#work">See the work</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-none border-portfolio-smoke bg-transparent px-8 py-3.5 text-[11px] uppercase tracking-[0.15em] text-portfolio-mist hover:border-portfolio-mist hover:bg-transparent hover:text-portfolio-white"
          >
            <Link href={`mailto:${site.email}`}>
              <Mail className="mr-2 size-3.5" />
              Let&apos;s build
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 right-5 hidden flex-col items-center gap-2 lg:right-[60px] lg:flex">
        <div
          className="h-[60px] w-px animate-scroll-pulse"
          style={{
            background: "linear-gradient(to bottom, #C84B11, transparent)",
          }}
          aria-hidden
        />
        <span className="text-[10px] uppercase tracking-[0.3em] text-portfolio-mist [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </section>
  );
}
