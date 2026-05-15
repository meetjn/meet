import { Mail } from "lucide-react";

import { site } from "@/content/site";
import { GlassCta } from "@/components/ui/glass-cta";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-5 pb-16 pt-[max(5rem,calc(env(safe-area-inset-top)+3rem))] sm:px-10 sm:pb-20 lg:px-[60px] lg:pb-[80px] lg:pt-20">
      <div
        className="pointer-events-none absolute right-16 top-0 hidden h-full w-px opacity-30 lg:right-[120px] lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #C84B11 40%, #7A2D0A 60%, transparent)",
        }}
        aria-hidden
      />

      <span className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 font-sans text-[11px] font-normal uppercase tracking-[4px] text-portfolio-ember lg:right-[60px] lg:block">
        2026
      </span>

      <div className="relative z-10 max-w-5xl">
        <p className="hero-eyebrow animate-fade-up animate-delay-200 mb-6 opacity-0">
          {site.role}
        </p>

        <h1 className="hero-title animate-fade-up animate-delay-400 opacity-0">
          Built to
          <br />
          <em>burn</em>
          <br />
          problems
          <br />
          down.
        </h1>

        <p className="hero-desc animate-fade-up animate-delay-600 opacity-0">
          I build financial infrastructure at the founding layer — lending
          protocols, payment rails, acquisition-grade systems. Not because
          it&apos;s a job. Because I can&apos;t stop until something works
          exactly the way it should.
        </p>

        <div className="animate-fade-up animate-delay-800 flex flex-wrap items-center gap-4 opacity-0">
          <GlassCta href="#work" variant="primary">
            See the work
          </GlassCta>
          <GlassCta href={`mailto:${site.email}`} variant="ghost">
            <Mail className="mr-2 size-3.5" />
            Let&apos;s build
          </GlassCta>
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
        <span className="font-sans text-[10px] font-normal uppercase tracking-[3px] text-portfolio-mist [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </section>
  );
}
