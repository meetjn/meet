import { Separator } from "@/components/ui/separator";
import { ScrollHighlightQuote } from "./ScrollHighlightQuote";
import { ScrollReveal } from "./ScrollReveal";

const QUOTE =
  "I don't just write code. I develop a deep obsession with the domain until I understand it better than almost anyone in the room.";

const paragraphs = [
  <>
    Most engineers learn a tool and use it. I learn a domain until I become the
    tool. When I joined MetaKeep, I didn&apos;t just integrate a SDK — I shipped
    the{" "}
    <strong>primary technical validator for a NASDAQ acquisition</strong>.
    That&apos;s not output. That&apos;s ownership.
  </>,
  <>
    When I co-founded Revalon, I didn&apos;t just write Solidity — I designed a
    7-signal underwriting engine, architected flash-loan resistance, built a
    two-sided marketplace, and maintained <strong>zero bad debt</strong> across
    the full testnet lifecycle. From zero to production-grade in weeks.
  </>,
  <>
    This is what separates me — not the stack, not the titles. It&apos;s the{" "}
    <strong>refusal to stop at &ldquo;good enough&rdquo;</strong> when I know
    what &ldquo;right&rdquo; looks like. I&apos;ve worked alongside world-class
    engineers who built WhatsApp Pay, Diem blockchain at Meta, and Twitter&apos;s
    social graph. That environment sharpened something in me: the standard is
    always higher than what you think.
  </>,
];

export function NarrativeSection() {
  return (
    <section id="narrative" className="section-pad scroll-mt-24 bg-portfolio-ash">
      <ScrollReveal as="span" className="section-label">
        Philosophy
      </ScrollReveal>

      <div className="grid min-w-0 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0 overflow-hidden">
          <ScrollHighlightQuote text={QUOTE} />
        </div>

        <div className="flex min-w-0 flex-col gap-8">
          {paragraphs.map((paragraph, index) => (
            <ScrollReveal key={index} delay={120 + index * 90}>
              <p className="narrative-para">{paragraph}</p>
              {index < paragraphs.length - 1 && (
                <Separator className="mt-8 bg-portfolio-smoke" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
