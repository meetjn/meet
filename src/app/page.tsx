import {
  ContactSection,
  CraftSection,
  Divider,
  ExperienceSection,
  Hero,
  NarrativeSection,
  StackSection,
  TraitsSection,
} from "@/components/portfolio";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-col bg-portfolio-black">
      <main>
        <Hero />
        <Divider />
        <NarrativeSection />
        <Divider />
        <TraitsSection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <CraftSection />
        <Divider />
        <StackSection />
        <Divider />
        <ContactSection />
      </main>
    </div>
  );
}
