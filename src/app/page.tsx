import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { HeroOrbit } from "@/components/HeroOrbit";
import { Footer } from "@/components/Footer";
import {
  contact,
  demoSuite,
  experience,
  openSource,
  personalProjects,
} from "@/content/portfolio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SectionShell = ({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`glass-panel rounded-[32px] border border-white/10 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-10 ${
      className ?? ""
    }`}
  >
    <div className="mb-6 space-y-2">
      <p className="text-xs uppercase tracking-[0.35em] text-white/50">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
    {children}
  </section>
);

export default function Home() {
  return (
    <main className="px-4 pb-20 pt-0 text-white sm:px-6 sm:pt-4 lg:px-10">
      <HeroOrbit />
      <div className="mx-auto mt-16 flex w-full max-w-[1500px] flex-col gap-10">
        <SectionShell
          eyebrow="Work experience"
          title="Building rails end-to-end"
          className="planet-panel"
        >
          <div className="space-y-8">
            {experience.map((role) => (
              <Card
                key={role.company}
                className="card-hover-zoom-out rounded-[28px] border-white/10 bg-white/5"
              >
                <CardHeader>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/50">
                    {role.timeline}
                  </p>
                  <CardTitle>
                    {role.title} · {role.company}
                  </CardTitle>
                  <CardDescription>{role.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-white/40">
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-white/80">
                    {role.impact.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Live projects"
          title="Personal projects"
          className="star-panel"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {personalProjects.map((project) => (
              <Card
                key={project.name}
                className="card-hover-zoom-out card-bg-animated rounded-[28px] border-white/10 bg-white/5"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/45">
                      Case Study
                    </p>
                    <CardTitle>{project.name}</CardTitle>
                  </div>
                  <Link
                    href={project.link}
                    className="text-sm text-emerald-300 transition hover:text-emerald-200"
                  >
                    View repo →
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-white/75">{project.summary}</p>
                  <p className="text-sm text-white">{project.highlight}</p>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.35em] text-white/45">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="SDK Suite"
          title="Cross-platform SDK demos"
          className="star-panel"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {demoSuite.map((demo) => (
              <div
                key={demo.name}
                className="card-hover-zoom-out card-bg-animated rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70"
              >
                <p className="text-white">{demo.name}</p>
                <p className="mt-2">{demo.description}</p>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Open source"
          title="Communities"
          className="solid-panel"
        >
          <div className="space-y-4">
            {openSource.map((entry) => (
              <div
                key={entry.org}
                className="card-hover-zoom-out flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-white">
                    {entry.org}
                  </p>
                  <p className="text-white/70">{entry.contribution}</p>
                </div>
                <Link
                  href={entry.link}
                  className="inline-flex items-center gap-2 text-sm text-emerald-300 transition hover:text-emerald-200"
                >
                  Proof <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Get in touch"
          title={contact.headline}
          className="solid-panel"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-base text-white/80">{contact.pitch}</p>
            <div className="flex flex-wrap gap-3">
              {contact.actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
                >
                  {action.label}
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </SectionShell>
      </div>
      <Footer />
    </main>
  );
}
