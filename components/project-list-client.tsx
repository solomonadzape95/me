"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { ProjectCard } from "./project-card";

export type ProjectListItem = {
  slug: string;
  name: string;
  description: string;
  year: string;
  status?: string;
  logo?: string;
  stack: string[];
  github?: string;
  website?: string;
  thumb?: string;
};

type Props = {
  projects: ProjectListItem[];
  initialType?: ProjectType;
};

type ProjectType = "web" | "desktop" | "extension" | "onchain";

const matchesType = (project: ProjectListItem, type?: ProjectType) => {
  if (!type) return true;
  const stack = project.stack.map((item) => item.toLowerCase());
  const description = project.description.toLowerCase();
  const isDesktop =
    stack.some((item) => item.includes("tauri") || item.includes("electron")) ||
    description.includes("desktop");
  const isExtension =
    stack.some(
      (item) => item.includes("plasmo") || item.includes("chrome ext"),
    ) || description.includes("extension");
  const isOnchain =
    stack.some((item) =>
      [
        "soroban",
        "stellar",
        "solana",
        "anchor",
        "sui",
        "walrus",
        "wagmi",
        "viem",
        "celo",
        "web3",
      ].some((token) => item.includes(token)),
    ) || description.includes("onchain");

  if (type === "desktop") return isDesktop;
  if (type === "extension") return isExtension;
  if (type === "onchain") return isOnchain;
  return (
    !isDesktop &&
    (stack.some((item) =>
      ["next", "react", "vite", "plasmo", "html"].some((token) =>
        item.includes(token),
      ),
    ) ||
      description.includes("browser") ||
      description.includes("web"))
  );
};

export const ProjectListClient = ({ projects, initialType }: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (!matchesType(project, initialType)) return false;
      if (!normalized) return true;
      return [
        project.name,
        project.description,
        project.status,
        project.year,
        ...project.stack,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalized));
    });
  }, [initialType, projects, query]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("focus") === "search") {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-xl">
          <span className="sr-only">search projects</span>
          <MagnifyingGlass
            size={19}
            weight="duotone"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-ink-soft)"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="search projects"
            className="w-full rounded-[10px] border border-(--color-rule) bg-transparent py-3.5 pl-12 pr-12 text-[0.95rem] text-(--color-ink) outline-none transition-colors placeholder:text-(--color-ink-soft) focus:border-(--color-accent)"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="clear search"
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-(--color-ink-soft) hover:text-(--color-accent)"
            >
              <X size={15} weight="bold" />
            </button>
          )}
        </label>
        {initialType && (
          <div className="flex shrink-0 items-center gap-3 text-[0.88rem] text-(--color-ink-soft)">
            <span>showing {initialType} projects</span>
            <button
              type="button"
              onClick={() => router.replace("/projects")}
              className="link-underline text-(--color-ink)"
            >
              clear
            </button>
          </div>
        )}
      </div>

      {filtered.length ? (
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>
      ) : (
        <p className="py-10 text-(--color-ink-soft)">
          no projects match “{query}”.
        </p>
      )}
    </div>
  );
};
