import Link from "next/link";
import { Calendar, Flame, Github, Linkedin } from "lucide-react";

import { XIcon } from "@/components/icons/XIcon";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";

const links = [
  { href: site.x, label: "X", external: true, icon: "x" as const },
  { href: site.github, label: "GitHub", external: true, icon: Github },
  { href: site.linkedin, label: "LinkedIn", external: true, icon: Linkedin },
  { href: site.calendly, label: "Book a call", external: true, icon: Calendar },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-portfolio-black px-5 pt-24 text-center sm:px-10 sm:pt-32 lg:px-[60px] lg:pt-[140px]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[min(300px,50%)] w-full max-w-[600px]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(200,75,17,0.15) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <ScrollReveal as="span" className="contact-eyebrow">
        Let&apos;s build something that matters
      </ScrollReveal>

      <ScrollReveal as="h2" delay={80} className="contact-title">
        Start a
        <br />
        fire.
      </ScrollReveal>

      <ScrollReveal delay={160} className="contact-sub">
        Available for remote founding roles, senior engineering, and high-stakes
        protocol work.
      </ScrollReveal>

      <ScrollReveal
        delay={240}
        className="relative z-10 mb-10 flex flex-wrap items-center justify-center gap-6"
      >
        {links.map((link, index) => (
          <span key={link.label} className="flex items-center gap-6">
            {index > 0 && (
              <span className="hidden text-portfolio-smoke sm:inline" aria-hidden>
                ·
              </span>
            )}
            <Link
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              aria-label={link.label === "X" ? "X (Twitter)" : link.label}
            >
              {link.icon === "x" ? (
                <XIcon />
              ) : (
                <link.icon className="size-3.5" />
              )}
              {link.label}
            </Link>
          </span>
        ))}
      </ScrollReveal>

      <ScrollReveal delay={320} variant="scale" className="relative z-10 pb-12 lg:pb-14">
        <Button asChild className="btn-primary h-auto rounded-none border-0">
          <Link href={`mailto:${site.email}`}>
            <Flame className="mr-2 size-3.5" />
            Reach out
          </Link>
        </Button>
      </ScrollReveal>
    </section>
  );
}
