import { Separator } from "@/components/ui/separator";
import { ScrollHighlightQuote } from "./ScrollHighlightQuote";
import { ScrollReveal } from "./ScrollReveal";

const QUOTE =
  "I don't just write code. I develop a deep obsession with the domain until I understand it better than almost anyone in the room.";

const paragraphs = [
  <>
    I started writing code at 17 — not because someone handed me a curriculum, but
    because broken systems bothered me more than broken grades. At MetaKeep,
    within my first year on the job, I shipped an acquisition-grade payment
    integration that became the technical backbone of due diligence for a
    NASDAQ-listed deal. At Revalon, I built the core lending engine from scratch
    — pricing risk, executing loans, running it live with zero bad debt
  </>,
  <>
    Before this, I worked alongside engineers who built WhatsApp Pay, Meta’s
    Diem, and Twitter’s social graph. That’s the bar I hold myself to: not
    whether something works, but whether it’s right
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
