"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { ProjectMark } from "./project-mark";
import { ThumbPreview, type Preview } from "./thumb-preview";

export type ProjectListItem = {
  slug: string;
  name: string;
  description: string;
  year: string;
  status?: string;
  logo?: string;
  stack: string[];
  thumb?: string;
};

type Props = {
  projects: ProjectListItem[];
};

export const ProjectListClient = ({ projects }: Props) => {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 1024px)");
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent, slug: string, src?: string) => {
      if (!canHover || !src) return;
      setPreview({ slug, src, x: e.clientX, y: e.clientY });
    },
    [canHover],
  );
  const onLeave = useCallback(() => setPreview(null), []);

  return (
    <>
      <ol className="space-y-1">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              onMouseEnter={(e) => onMove(e, p.slug, p.thumb)}
              onMouseMove={(e) => onMove(e, p.slug, p.thumb)}
              onMouseLeave={onLeave}
              className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 py-5 items-start transition-colors duration-150"
            >
              <ProjectMark name={p.name} slug={p.slug} logo={p.logo} size={48} />
              <div className="min-w-0 space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl leading-tight text-(--color-ink) group-hover:text-(--color-accent) transition-colors duration-150">
                    {p.name}
                  </span>
                  <span className="label-mono tabular-nums shrink-0">
                    {p.year}
                  </span>
                </div>
                <p className="text-(--color-ink-soft) text-[0.92rem] leading-relaxed">
                  {p.description}
                </p>
                {p.stack.length > 0 && (
                  <ul className="flex flex-wrap items-baseline gap-x-2 gap-y-1 label-mono normal-case tracking-[0.04em]">
                    {p.stack.slice(0, 6).map((tag, i, arr) => (
                      <li
                        key={tag}
                        className="inline-flex items-baseline gap-2"
                      >
                        <span>{tag}</span>
                        {i < arr.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="text-(--color-rule)"
                          >
                            ·
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <ThumbPreview preview={preview} />
    </>
  );
};
