import Link from "next/link";
import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import {
  contact,
  demoSuite,
  experience,
  heroSignals,
  identity,
  keystoneBuilds,
  openSource,
  personalProjects,
  stats,
} from "@/content/portfolio";

/// @notice Reusable pill used for micro-proof points.
const SignalChip = ({ text }: { text: string }) => (
  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm text-white/80 backdrop-blur">
    {text}
  </span>
);

/// @notice Generic section wrapper keeping spacing consistent.
const Section = ({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) => (
  <section className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(15,15,30,0.35)] backdrop-blur">
    <div className="mb-6 space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{eyebrow}</p>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
    {children}
  </section>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#03010a] px-6 py-16 text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/80 via-gray-900/30 to-indigo-900/40 p-10 shadow-[0_20px_80px_rgba(3,1,10,0.65)]">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-fuchsia-500 blur-[90px]" />
            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-cyan-500 blur-[120px]" />
          </div>
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-white/60">
                <span className="inline-block h-1 w-1 rounded-full bg-emerald-400" />
                YC-ready builder
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                {identity.name}
          </h1>
              <p className="text-lg text-white/80">{identity.role}</p>
              <p className="max-w-2xl text-base leading-relaxed text-white/70">
                {identity.headline}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} />
                  {identity.location}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-white/70">
                  {identity.availability}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`mailto:${identity.email}?subject=Let%27s%20ship%20wallet%20infra`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-white/90"
                >
                  <Mail size={16} />
                  Intro call
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href={identity.github}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
                >
                  <Github size={16} />
                  GitHub
                </Link>
              </div>
            </div>
            <div className="grid w-full gap-3 lg:w-[320px]">
              {heroSignals.map((signal) => (
                <SignalChip key={signal} text={signal} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 shadow-inner"
            >
              <p className="text-4xl font-semibold text-white">{stat.value}</p>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
              <p className="mt-3 text-sm text-white/70">{stat.detail}</p>
            </div>
          ))}
        </div>

        <Section eyebrow="Execution History" title="Building rails end-to-end">
          <div className="space-y-10">
            {experience.map((role) => (
              <div
                key={role.company}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                      {role.timeline}
                    </p>
                    <h3 className="text-2xl font-semibold text-white">
                      {role.title} · {role.company}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wide text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/70">{role.summary}</p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  {role.impact.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Signature programs" title="Keystone builds for YC-scale teams">
          <div className="grid gap-4 md:grid-cols-3">
            {keystoneBuilds.map((build) => (
              <div
                key={build.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-5"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">{build.metric}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{build.title}</h3>
                <p className="mt-3 text-sm text-white/70">{build.description}</p>
                <p className="mt-3 text-sm text-white/80">{build.proof}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {build.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Founder-facing tools" title="Personal projects that keep shipping">
          <div className="grid gap-6 md:grid-cols-2">
            {personalProjects.map((project) => (
              <div
                key={project.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">Case study</p>
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  </div>
                  <Link
                    href={project.link}
                    className="text-sm text-emerald-300 transition hover:text-emerald-200"
                  >
                    View repo →
                  </Link>
                </div>
                <p className="mt-4 text-sm text-white/70">{project.summary}</p>
                <p className="mt-2 text-sm text-white">{project.highlight}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wide text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="SDK suite" title="Multi-platform demo lab">
          <div className="grid gap-4 md:grid-cols-3">
            {demoSuite.map((demo) => (
              <div
                key={demo.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
              >
                <p className="text-white">{demo.name}</p>
                <p className="mt-2">{demo.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Open source" title="Communities I back">
          <div className="space-y-4">
            {openSource.map((entry) => (
              <div
                key={entry.org}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-white">{entry.org}</p>
                  <p className="text-sm text-white/70">{entry.contribution}</p>
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
        </Section>

        <Section eyebrow="Next chapter" title={contact.headline}>
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
        </Section>
        </div>
      </main>
  );
}
