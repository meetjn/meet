import { Separator } from "@/components/ui/separator";
import { ScrollHighlightQuote } from "./ScrollHighlightQuote";
import { ScrollReveal } from "./ScrollReveal";

const QUOTE =
  "I don't just write code. I develop a deep obsession with the domain until I understand it better than almost anyone in the room.";

const paragraphs = [
  <>
    I treat depth as a prerequisite, not a flex. At MetaKeep I owned the stack end
    to end &mdash; not wiring a demo but shipping the work that held up under real
    diligence. The integration I built became the{" "}
    <strong>primary technical validator for a NASDAQ acquisition</strong>
    {" "}
    &mdash; the kind of proof that turns a deal from maybe to closed.
  </>,
  <>
    At Revalon I co-founded the protocol layer from zero: a{" "}
    <strong>7-signal underwriting engine</strong>,{" "}
    <strong>flash-loan-resistant</strong> architecture, and a two-sided
    marketplace that had to survive adversarial markets, not slide decks. We ran
    the full testnet lifecycle with <strong>zero bad debt</strong> &mdash;
    because production discipline is the only honest dress rehearsal.
  </>,
  <>
    This is what separates me &mdash; not the stack, not the titles. It&apos;s
    the{" "}
    <strong>refusal to stop at &ldquo;good enough&rdquo;</strong> when I know
    what &ldquo;right&rdquo; looks like. I&apos;ve worked alongside world-class
    engineers who built WhatsApp Pay, Diem blockchain at Meta, and Twitter&apos;s
    social graph. That environment sharpened something in me: the standard is
    always higher than what you think.
  </>,
];

export function NarrativeSection() {
  return (
    <section id="narrative" className="relative section-pad bg-portfolio-ash">
      <ScrollReveal as="span" className="section-label">
        Philosophy
      </ScrollReveal>

      <div className="grid min-w-0 items-start gap-6 md:gap-10 lg:grid-cols-2 lg:gap-20">
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
