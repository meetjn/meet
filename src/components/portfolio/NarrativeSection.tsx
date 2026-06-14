import { Separator } from "@/components/ui/separator";
import { ScrollHighlightQuote } from "./ScrollHighlightQuote";
import { ScrollReveal } from "./ScrollReveal";

const QUOTE =
  "I don't just write code. I develop a deep obsession with the domain until I understand it better than almost anyone in the room.";

const paragraphs = [
  <>
    I build financial systems that hold up under real money and real scrutiny.
    At MetaKeep, my integration became the technical backbone of due diligence
    for a NASDAQ-listed acquisition. At Revalon, I co-founded the company and
    built its core engine from scratch — the system that prices risk and
    executes trades — running it live with zero losses
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
