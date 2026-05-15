import {
  ContactSection,
  CraftSection,
  Divider,
  ExperienceSection,
  Hero,
  NarrativeSection,
  SiteFooter,
  SiteNav,
  StackSection,
  TraitsSection,
} from "@/components/portfolio";

export default function Home() {
  return (
    <>
      <SiteNav />
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
      <SiteFooter />
    </>
  );
}
