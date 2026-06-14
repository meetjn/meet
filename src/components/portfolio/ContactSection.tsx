"use client";

import { Calendar, Github, Linkedin } from "lucide-react";

import { XIcon } from "@/components/icons/XIcon";
import { site } from "@/content/site";
import { GlassChip, GlassCta } from "@/components/ui/glass-cta";
import { ScrollReveal } from "./ScrollReveal";

const socialLinks = [
  { href: site.x, label: "X", icon: "x" as const },
  { href: site.github, label: "GitHub", icon: Github },
  { href: site.linkedin, label: "LinkedIn", icon: Linkedin },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-portfolio-black px-5 py-[min(18vh,6rem)] text-center sm:px-10 sm:py-[min(20vh,7rem)] lg:px-[60px] lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[min(340px,55vh)] w-full max-w-[640px]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(200,75,17,0.15) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center xl:max-w-3xl">
        <ScrollReveal as="span" className="contact-eyebrow">
          Let&apos;s build something that matters
        </ScrollReveal>

        <ScrollReveal as="h2" delay={80} className="contact-title">
          Start a
          <br />
          fire.
        </ScrollReveal>

        <ScrollReveal delay={160} className="contact-sub">
          Available for remote founding roles, senior engineering, and
          high-stakes platform work.
        </ScrollReveal>

        <ScrollReveal
          delay={240}
          className="relative z-10 mb-12 flex flex-wrap items-center justify-center gap-3 sm:mb-14 sm:gap-4"
        >
          {socialLinks.map((link) => (
            <GlassChip
              key={link.label}
              href={link.href}
              aria-label={link.label === "X" ? "X (Twitter)" : link.label}
            >
              {link.icon === "x" ? (
                <XIcon />
              ) : (
                <link.icon className="size-3.5" />
              )}
              {link.label}
            </GlassChip>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={320} className="relative z-10">
          <GlassCta href={site.calendly} variant="primary" external>
            <Calendar className="size-3.5 shrink-0" aria-hidden />
            Reach out
          </GlassCta>
        </ScrollReveal>
      </div>
    </section>
  );
}
