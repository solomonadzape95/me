import Link from "next/link";
import type { Metadata } from "next";

import { Avatar } from "@/components/avatar";
import { IntroCopy } from "@/components/intro-copy";
import { ProjectCard } from "@/components/project-card";
import { Section, SiteShell } from "@/components/site-shell";
import { SocialLinks } from "@/components/social-links";
import { getAllProjects } from "@/lib/projects";

// Hand-curated — all four have real logo files in their content folders.
const SELECTED_SLUGS = ["offhrs", "kai", "nebula", "crypt"];

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
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {selected.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ol>
        </Section>

        <Section label="find me online">
          <SocialLinks />
        </Section>
      </div>
    </SiteShell>
  );
}
