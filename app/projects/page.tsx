import type { Metadata } from "next";

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

export default async function ProjectsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const projects = await getAllProjects();
  const { type } = await searchParams;
  const initialType =
    type === "web" ||
    type === "desktop" ||
    type === "extension" ||
    type === "onchain"
      ? type
      : undefined;

  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">things i&apos;ve built.</h1>
      </header>

      <Section label="projects" count={initialType ? undefined : projects.length}>
        <ProjectListClient
          initialType={initialType}
          projects={projects.map((p) => ({
            slug: p.slug,
            name: p.name,
            description: p.description,
            year: p.year,
            status: p.status,
            logo: p.logo,
            stack: p.stack,
            github: p.github,
            website: p.website,
            thumb: p.thumbnail ?? p.images[0],
          }))}
        />
      </Section>
    </SiteShell>
  );
}
