import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CascadeName } from "@/components/cascade-name";
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
  };
};

type TagRowProps = { label: string; children: React.ReactNode };
const TagRow = ({ label, children }: TagRowProps) => (
  <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 items-baseline">
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
      <header className="space-y-6">
        <div className="flex items-baseline gap-4">
          <Link
            href="/projects"
            className="label-mono link-underline normal-case tracking-[0.06em]"
          >
            index
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <ProjectMark
            name={project.name}
            slug={project.slug}
            logo={project.logo}
            size={56}
            colorful
          />
          <h1 className="font-display font-light leading-[1.0] tracking-tight text-(--color-ink) text-[clamp(2.25rem,6vw,4rem)]">
            <CascadeName key={project.slug} text={project.name} />
          </h1>
        </div>
        <p className="text-(--color-ink-soft) text-lg leading-relaxed">
          {project.description}
        </p>
        <dl className="space-y-2">
          {project.year && <TagRow label="year">{project.year}</TagRow>}
          {project.stack.length > 0 && (
            <TagRow label="stack">
              {project.stack.map((tag, i, arr) => (
                <span key={tag} className="inline-flex items-baseline gap-2">
                  <span>{tag}</span>
                  {i < arr.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="text-(--color-rule) px-2"
                    >
                      ·
                    </span>
                  )}
                </span>
              ))}
            </TagRow>
          )}
        </dl>
        <div className="flex items-baseline gap-5 label-mono normal-case tracking-[0.06em] pt-1">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              source
            </a>
          )}
        </div>
      </header>

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

      <Section label="notes">
        <article className="space-y-5 leading-relaxed">
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
