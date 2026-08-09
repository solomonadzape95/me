import type { Metadata } from "next";

import { CascadeName } from "@/components/cascade-name";
import { ProjectListClient } from "@/components/project-list-client";
import { Section, SiteShell } from "@/components/site-shell";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software engineering projects by Solomon Adzape across AI agents, desktop apps, fintech, developer tools, and onchain products.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects" },
};

export default async function ProjectsIndexPage() {
  const projects = await getAllProjects();

  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="font-display font-light leading-[1.05] tracking-tight text-(--color-ink) text-[clamp(2rem,5vw,3.25rem)]">
          <CascadeName text="here are things I've built..." />
        </h1>
      </header>

      <Section label="projects" count={projects.length}>
        <ProjectListClient
          projects={projects.map((p) => ({
            slug: p.slug,
            name: p.name,
            description: p.description,
            year: p.year,
            status: p.status,
            logo: p.logo,
            stack: p.stack,
            thumb: p.thumbnail ?? p.images[0],
          }))}
        />
      </Section>
    </SiteShell>
  );
}
