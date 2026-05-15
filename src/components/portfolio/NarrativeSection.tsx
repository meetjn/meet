import { Quote } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function NarrativeSection() {
  return (
    <section id="narrative" className="section-pad scroll-mt-24 bg-portfolio-ash">
      <span className="section-label">Philosophy</span>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <blockquote className="font-serif text-[clamp(1.5rem,3.5vw,2.625rem)] italic leading-snug text-portfolio-white">
          <Quote className="mb-4 size-5 text-portfolio-ember opacity-80" />
          &ldquo;I don&apos;t just write code. I develop a{" "}
          <span className="not-italic text-portfolio-ember-glow">
            deep obsession
          </span>{" "}
          with the domain until I understand it better than almost anyone in the
          room.&rdquo;
        </blockquote>

        <div className="flex flex-col gap-8">
          <p className="text-sm leading-relaxed text-portfolio-cream sm:text-[15px] sm:leading-[1.85]">
            Most engineers learn a tool and use it. I learn a domain until I
            become the tool. When I joined MetaKeep, I didn&apos;t just integrate
            a SDK — I shipped the{" "}
            <strong className="font-medium text-portfolio-white">
              primary technical validator for a NASDAQ acquisition
            </strong>
            . That&apos;s not output. That&apos;s ownership.
          </p>
          <Separator className="bg-portfolio-smoke" />
          <p className="text-sm leading-relaxed text-portfolio-cream sm:text-[15px] sm:leading-[1.85]">
            When I co-founded Revalon, I didn&apos;t just write Solidity — I
            designed a 7-signal underwriting engine, architected flash-loan
            resistance, built a two-sided marketplace, and maintained{" "}
            <strong className="font-medium text-portfolio-white">
              zero bad debt
            </strong>{" "}
            across the full testnet lifecycle. From zero to production-grade in
            weeks.
          </p>
          <Separator className="bg-portfolio-smoke" />
          <p className="text-sm leading-relaxed text-portfolio-cream sm:text-[15px] sm:leading-[1.85]">
            This is what separates me — not the stack, not the titles. It&apos;s
            the{" "}
            <strong className="font-medium text-portfolio-white">
              refusal to stop at &ldquo;good enough&rdquo;
            </strong>{" "}
            when I know what &ldquo;right&rdquo; looks like. I&apos;ve worked
            alongside world-class engineers who built WhatsApp Pay, Diem
            blockchain at Meta, and Twitter&apos;s social graph. That environment
            sharpened something in me: the standard is always higher than what
            you think.
          </p>
        </div>
      </div>
    </section>
  );
}
