import Link from "next/link";
import { Calendar, Flame, Github, Linkedin, Mail } from "lucide-react";

import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "./ScrollReveal";

type ContactLink = {
  href: string;
  label: string;
  icon: typeof Mail;
  external?: boolean;
};

const links: ContactLink[] = [
  { href: `mailto:${site.email}`, label: site.email, icon: Mail },
  { href: site.github, label: "GitHub", icon: Github, external: true },
  { href: site.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: site.calendly, label: "Book a call", icon: Calendar, external: true },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden px-5 py-24 text-center sm:px-10 sm:py-32 lg:px-[60px] lg:py-[140px]"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-full max-w-[600px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(200,75,17,0.15) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <ScrollReveal as="span" className="mb-6 block text-[11px] uppercase tracking-[0.35em] text-portfolio-ember">
        Let&apos;s build something that matters
      </ScrollReveal>

      <ScrollReveal as="h2" delay={80} className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9]">
        Start a
        <br />
        fire.
      </ScrollReveal>

      <ScrollReveal delay={160} className="mx-auto mb-10 mt-8 max-w-md text-sm text-portfolio-mist sm:text-[15px]">
        Available for remote founding roles, senior engineering, and high-stakes
        protocol work.
      </ScrollReveal>

      <ScrollReveal delay={240} className="mb-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <span key={link.label} className="flex items-center gap-4 sm:gap-6">
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="hidden h-4 bg-portfolio-smoke sm:block"
                />
              )}
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-portfolio-mist transition-colors hover:text-portfolio-ember-glow"
              >
                <Icon className="size-3.5" />
                {link.label}
              </Link>
            </span>
          );
        })}
      </ScrollReveal>

      <ScrollReveal delay={320} variant="scale">
        <Button
          asChild
          className="h-auto rounded-none bg-portfolio-ember px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-portfolio-white hover:bg-portfolio-ember-glow"
        >
          <Link href={`mailto:${site.email}`}>
            <Flame className="mr-2 size-3.5" />
            Reach out
          </Link>
        </Button>
      </ScrollReveal>
    </section>
  );
}
