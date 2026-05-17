import Link from "next/link";

import { CascadeName } from "@/components/cascade-name";
import { ProjectMark } from "@/components/project-mark";
import { Section, SiteShell } from "@/components/site-shell";
import { getAllProjects } from "@/lib/projects";

// Hand-curated — all four have real logo files in their content folder so
// the home page never falls back to identicons.
const SELECTED_SLUGS = ["blockhive", "lexis", "aria", "rizzlr"];

export default async function HomePage() {
  const projects = await getAllProjects();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const selected = SELECTED_SLUGS.map((s) => bySlug.get(s)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <SiteShell>
      <header className="space-y-6 mb-3">
        <h1 className="font-display font-light leading-[0.95] tracking-tight text-(--color-ink) text-[clamp(2.5rem,7vw,4.75rem)] break-words">
          <CascadeName text="Solomon Adzape" nickname="solenoid" />
        </h1>
        <p className="text-(--color-ink-soft) leading-relaxed">
          i&apos;m someone who likes to build things and figure stuff out.
          Currently working on <span className="text-(--color-ink)">Blockhive</span>,
          and a few other things on the side.
        </p>
      </header>

      <Section label="quick picks">
        <ol className="space-y-2">
          {selected.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-x-5 py-5 items-start transition-colors duration-150"
              >
                <ProjectMark
                  name={p.name}
                  slug={p.slug}
                  logo={p.logo}
                  size={48}
                />
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
                      {p.stack.slice(0, 5).map((tag, i, arr) => (
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
        <div className="pt-2">
          <Link
            href="/projects"
            className="label-mono link-underline normal-case tracking-[0.06em]"
          >
            full index
          </Link>
        </div>
      </Section>

      <Section label="elsewhere">
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
              href="https://www.linkedin.com/in/solomon-adzape/"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              solomon-adzape
            </a>
          </li>
          <li className="text-(--color-ink-soft)">x</li>
          <li>
            <a
              href="https://x.com/solenoid"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              @solenoid
            </a>
          </li>
          <li className="text-(--color-ink-soft)">mail</li>
          <li>
            <a href="mailto:contact@solenoid.me" className="link-underline">
              contact@solenoid.me
            </a>
          </li>
        </ul>
      </Section>
    </SiteShell>
  );
}
