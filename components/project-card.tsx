"use client";

import {
  ArrowUpRight,
  GithubLogo,
  GlobeSimple,
} from "@phosphor-icons/react";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ProjectMark } from "./project-mark";

export type ProjectCardData = {
  slug: string;
  name: string;
  description: string;
  year: string;
  status?: string;
  logo?: string;
  stack: string[];
  github?: string;
  website?: string;
};

const PROJECT_COLORS: Record<string, string> = {
  aria: "#575d32",
  blockhive: "#253b59",
  crypt: "#24384f",
  echo: "#6a4038",
  envelope: "#71462f",
  flipit: "#68412f",
  gauntlet: "#443766",
  "gauntlet-base": "#343941",
  gdg: "#343941",
  jotter: "#32465a",
  kai: "#4d5935",
  lexis: "#684536",
  lisk: "#4b374f",
  nebula: "#52374f",
  offhrs: "#17364a",
  practice: "#4e5832",
  rizzlr: "#28545a",
};

const FALLBACK_COLORS = [
  "#4357ad",
  "#206a5d",
  "#8a4f7d",
  "#9a5a3a",
  "#385f71",
  "#6b5b95",
];

const colorForSlug = (slug: string) => {
  if (PROJECT_COLORS[slug]) return PROJECT_COLORS[slug];
  const index = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return FALLBACK_COLORS[index % FALLBACK_COLORS.length];
};

export const ProjectCard = ({ project }: { project: ProjectCardData }) => {
  const color = colorForSlug(project.slug);

  return (
    <article
      style={{ "--project-color": color } as CSSProperties}
      className="project-card group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-[14px] p-5 transition-transform duration-200 hover:-translate-y-1 focus-within:-translate-y-1"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.name}`}
        className="absolute inset-0 z-0 rounded-[14px]"
      />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} on GitHub`}
              title="GitHub"
              className="grid h-9 w-9 place-items-center rounded-full bg-black/18 text-white transition-colors hover:bg-black/32 focus-visible:bg-black/32"
            >
              <GithubLogo size={21} weight="fill" />
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name} live site`}
              title="Live site"
              className="grid h-9 w-9 place-items-center rounded-full bg-black/18 text-white transition-colors hover:bg-black/32 focus-visible:bg-black/32"
            >
              <GlobeSimple size={21} weight="bold" />
            </a>
          )}
        </div>
        <span className="project-card-muted text-[0.72rem] font-semibold uppercase tracking-[0.05em]">
          {project.status
            ? `${project.status.replace("-", " ")} · ${project.year}`
            : project.year}
        </span>
      </div>

      <div className="pointer-events-none relative z-[1] flex flex-1 items-center justify-center py-8">
        <ProjectMark
          name={project.name}
          slug={project.slug}
          logo={project.logo}
          size={104}
          colorful
          className="transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105"
        />
      </div>

      <div className="pointer-events-none relative z-[1] space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight">{project.name}</h3>
          <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
        </div>
        <p className="project-card-muted text-[0.9rem] leading-relaxed">
          {project.description}
        </p>
      </div>
    </article>
  );
};
