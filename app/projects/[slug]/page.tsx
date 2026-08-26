import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ProjectMark } from "@/components/project-mark";
import { ScreenshotStrip } from "@/components/screenshot-strip";
import { Section, SiteShell } from "@/components/site-shell";
import { getAllProjects, getProject } from "@/lib/projects";

type Params = { slug: string };

export const generateStaticParams = async () => {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Solomon Adzape`,
      description: project.description,
      url: `/projects/${project.slug}`,
      type: "article" as const,
    },
  };
};

type TagRowProps = { label: string; children: React.ReactNode };
const TagRow = ({ label, children }: TagRowProps) => (
  <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-x-4">
    <dt className="label-mono">{label}</dt>
    <dd className="font-mono text-[0.86rem] text-(--color-ink)">{children}</dd>
  </div>
);

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <SiteShell>
      <Link
        href="/projects"
        className="label-mono link-underline self-start normal-case tracking-[0.04em]"
      >
        ← all projects
      </Link>

      {(() => {
        // Thumb leads the slideshow when present. Dedup so a thumbnail that
        // also lives in the images array doesn't appear twice.
        const strip = project.thumbnail
          ? [project.thumbnail, ...project.images.filter((src) => src !== project.thumbnail)]
          : project.images;
        return strip.length > 0 ? (
          <ScreenshotStrip images={strip} name={project.name} />
        ) : null;
      })()}

      <header className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <ProjectMark
              name={project.name}
              slug={project.slug}
              logo={project.logo}
              size={56}
              colorful
            />
            <h1 className="page-title text-[clamp(2.25rem,6vw,4rem)]">
              {project.name}
            </h1>
          </div>

          {(project.website || project.github) && (
            <div className="flex items-center gap-5 sm:gap-6">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`open ${project.name} live site`}
                  className="group inline-flex items-center gap-2 text-[1rem] font-medium text-(--color-ink) transition-colors hover:text-(--color-accent)"
                >
                  <ArrowUpRight size={24} weight="bold" aria-hidden="true" />
                  <span className="link-underline max-sm:!hidden">live</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`view ${project.name} source on github`}
                  className="group inline-flex items-center gap-2 text-[1rem] font-medium text-(--color-ink) transition-colors hover:text-(--color-accent)"
                >
                  <GithubLogo size={24} weight="fill" aria-hidden="true" />
                  <span className="link-underline max-sm:!hidden">source</span>
                </a>
              )}
            </div>
          )}
        </div>

        <p className="max-w-[68ch] text-[1.08rem] leading-relaxed text-(--color-ink-soft) sm:text-lg">
          {project.description}
        </p>

        <dl className="space-y-2.5">
          {project.year && <TagRow label="year">{project.year}</TagRow>}
          {project.status && (
            <TagRow label="status">
              {project.status.replace("-", " ")}
            </TagRow>
          )}
          {project.stack.length > 0 && (
            <TagRow label="built with">
              {project.stack.map((tag, i, arr) => (
                <span key={tag} className="inline-flex items-baseline gap-2">
                  <span>{tag}</span>
                  {i < arr.length - 1 && (
                    <span aria-hidden="true" className="px-2 text-(--color-rule)">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </TagRow>
          )}
        </dl>
      </header>

      <Section label="project notes">
        <article className="max-w-[72ch] space-y-5 text-[1.04rem] leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: (props) => <h2 {...props} className="label-mono pt-4" />,
              h3: (props) => (
                <h3
                  {...props}
                  className="font-display text-xl text-(--color-ink) leading-snug pt-2"
                />
              ),
              p: (props) => (
                <p
                  {...props}
                  className="leading-relaxed text-(--color-ink) [&_a]:link-underline"
                />
              ),
              ul: (props) => (
                <ul {...props} className="list-none space-y-1.5 pl-0" />
              ),
              li: (props) => (
                <li
                  {...props}
                  className="grid grid-cols-[1ch_minmax(0,1fr)] gap-2 before:content-['·'] before:text-(--color-ink-soft)"
                />
              ),
              a: (props) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                />
              ),
              code: (props) => (
                <code
                  {...props}
                  className="font-mono text-[0.875em] px-1 py-0.5 bg-(--color-accent-soft)"
                />
              ),
            }}
          >
            {project.body}
          </ReactMarkdown>
        </article>
      </Section>
    </SiteShell>
  );
}
