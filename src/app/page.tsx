import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { HeroOrbit } from "@/components/HeroOrbit";
import { Footer } from "@/components/Footer";
import {
  contact,
  demoSuite,
  experience,
  keystoneBuilds,
  openSource,
  personalProjects,
  techStack,
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

const TechPill = ({ label }: { label: string }) => (
  <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60 transition hover:border-emerald-400/40 hover:text-emerald-300/80">
    {label}
  </span>
);

export default function Home() {
  return (
    <main className="px-4 pb-20 pt-0 text-white sm:px-6 sm:pt-4 lg:px-10">
      <HeroOrbit />
      <div className="mx-auto mt-16 flex w-full max-w-[1500px] flex-col gap-10">
        {/* Work Experience */}
        <SectionShell
          eyebrow="Work experience"
          title="Building infrastructure end-to-end"
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
                  <CardTitle className="text-lg">
                    {role.title}
                    <span className="mx-2 text-white/30">·</span>
                    <span className="text-white/80">{role.company}</span>
                  </CardTitle>
                  <CardDescription className="text-sm text-white/55">
                    {role.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <TechPill key={tech} label={tech} />
                    ))}
                  </div>
                  <ul className="mt-5 space-y-3 text-sm text-white/80">
                    {role.impact.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionShell>

        {/* Keystone Builds */}
        <SectionShell
          eyebrow="Signature work"
          title="Systems that moved the needle"
          className="star-panel"
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {keystoneBuilds.map((build) => (
              <div
                key={build.title}
                className="card-hover-zoom-out card-bg-animated group flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                      Impact
                    </p>
                    <p className="mt-1 text-xl font-semibold text-emerald-300">
                      {build.metric}
                    </p>
                  </div>
                  {build.link && (
                    <Link
                      href={build.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 shrink-0 text-white/30 transition hover:text-white"
                    >
                      <ExternalLink size={15} />
                    </Link>
                  )}
                </div>
                <p className="text-base font-semibold text-white">
                  {build.title}
                </p>
                <p className="text-sm text-white/65">{build.description}</p>
                <p className="text-xs italic text-white/40">{build.proof}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {build.tags.map((tag) => (
                    <TechPill key={tag} label={tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Technical Arsenal */}
        <SectionShell
          eyebrow="Technical depth"
          title="Full-stack · Blockchain · DevOps"
          className="solid-panel"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(
              [
                ["Languages", techStack.languages],
                ["Frontend", techStack.frontend],
                ["Backend", techStack.backend],
                ["Blockchain", techStack.blockchain],
                ["Infrastructure & DevOps", techStack.infrastructure],
                ["Databases", techStack.databases],
                ["Mobile", techStack.mobile],
              ] as [string, string[]][]
            ).map(([category, tools]) => (
              <div key={category} className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <TechPill key={tool} label={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Personal Projects */}
        <SectionShell
          eyebrow="Projects"
          title="Built and shipped"
          className="star-panel"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {personalProjects.map((project) => (
              <Card
                key={project.name}
                className="card-hover-zoom-out card-bg-animated rounded-[28px] border-white/10 bg-white/5"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/45">
                      {project.isLive ? "Live · Production" : "Case Study"}
                    </p>
                    <CardTitle className="mt-1 text-base">
                      {project.name}
                    </CardTitle>
                  </div>
                  <Link
                    href={project.link}
                    target={project.isLive ? "_blank" : undefined}
                    rel={project.isLive ? "noreferrer" : undefined}
                    className="shrink-0 text-sm text-emerald-300 transition hover:text-emerald-200"
                  >
                    {project.isLive ? (
                      <span className="inline-flex items-center gap-1">
                        Live <ExternalLink size={13} />
                      </span>
                    ) : (
                      "View repo →"
                    )}
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-white/75">{project.summary}</p>
                  <p className="text-sm text-white/90">{project.highlight}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <TechPill key={tech} label={tech} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionShell>

        {/* SDK Demo Suite */}
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

        {/* Open Source */}
        <SectionShell
          eyebrow="Open source"
          title="Community contributions"
          className="solid-panel"
        >
          <div className="space-y-4">
            {openSource.map((entry) => (
              <div
                key={entry.org}
                className="card-hover-zoom-out flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-white">
                    {entry.org}
                  </p>
                  <p className="mt-1 text-white/65">{entry.contribution}</p>
                </div>
                <Link
                  href={entry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 text-sm text-emerald-300 transition hover:text-emerald-200"
                >
                  View PR <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* Contact */}
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
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
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
