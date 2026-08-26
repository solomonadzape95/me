import Link from "next/link";
import type { Metadata } from "next";

import { Avatar } from "@/components/avatar";
import { IntroCopy } from "@/components/intro-copy";
import { ProjectCard } from "@/components/project-card";
import { Section, SiteShell } from "@/components/site-shell";
import { getAllProjects } from "@/lib/projects";

// Hand-curated — all three have real logo files in their content folders.
const SELECTED_SLUGS = ["kai", "nebula", "crypt"];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const projects = await getAllProjects();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const selected = SELECTED_SLUGS.map((s) => bySlug.get(s)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <SiteShell>
      <div className="flex flex-col gap-20 lg:gap-24">
        <header className="space-y-6">
          <h1 className="page-title flex max-w-[28ch] flex-wrap items-center gap-x-[0.28em] gap-y-2">
            <span>hey there, i&apos;m</span>
            <span className="inline-flex items-center gap-[0.2em] whitespace-nowrap">
              <Avatar size={44} className="-rotate-6" />
              solomon.
            </span>
          </h1>
          <IntroCopy />
        </header>

        <Section
          label="side projects"
          action={
          <Link
            href="/projects"
            className="label-mono link-underline normal-case tracking-[0.06em]"
          >
            view all projects
          </Link>
          }
        >
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {selected.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ol>
        </Section>

        <Section label="find me online">
          <ul className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2 text-[0.92rem]">
          <li className="text-(--color-ink-soft)">github</li>
          <li>
            <a
              href="https://github.com/solomonadzape95"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              solomonadzape95
            </a>
          </li>
          <li className="text-(--color-ink-soft)">linkedin</li>
          <li>
            <a
              href="https://www.linkedin.com/in/solomonadzape/"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              solomonadzape
            </a>
          </li>
          <li className="text-(--color-ink-soft)">x</li>
          <li>
            <a
              href="https://x.com/0xsolenoid"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              0xsolenoid
            </a>
          </li>
          <li className="text-(--color-ink-soft)">mail</li>
          <li>
            <a href="mailto:adzapesolomon@gmail.com" className="link-underline">
              adzapesolomon@gmail.com
            </a>
          </li>
          <li className="text-(--color-ink-soft)">instagram</li>
          <li>
            <a
              href="https://www.instagram.com/0xsolenoid/"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              0xsolenoid
            </a>
          </li>
          <li className="text-(--color-ink-soft)">discord</li>
          <li>
            <a
              href="https://discordapp.com/users/0xsolenoid"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              0xsolenoid
            </a>
          </li>
          </ul>
        </Section>
      </div>
    </SiteShell>
  );
}
