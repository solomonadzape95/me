import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ProjectCarousel from "@/components/project-carousel";
import React from "react";

type ProjectMeta = {
  name?: string;
  title?: string;
  description?: string;
  tagline?: string;
  website?: string;
  github?: string;
  date?: string;
  images?: string[];
  [key: string]: unknown;
};

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const mdPath = path.join(process.cwd(), "public", "content", "projects", slug, `${slug}.md`);
  if (!fs.existsSync(mdPath))
    return (
      <div className="w-11/12 lg:w-10/12 mx-auto py-12 text-gray-400">
        project not found.
      </div>
    );
  const src = fs.readFileSync(mdPath, "utf8");
  const { data, content } = matter(src);
  const meta: ProjectMeta = (data ?? {}) as ProjectMeta;
  const resolveImg = (v: string) =>
    v?.startsWith("/content/") ? v : `/content/projects/${slug}/${v}`;
  const images: string[] = Array.isArray(meta.images)
    ? meta.images.map(resolveImg)
    : [];

  return (
    <main className="w-11/12 lg:w-10/12 mx-auto">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/projects"
          className="text-sm text-gray-300 hover:text-white transition"
        >
          ← projects
        </Link>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-6">
        <section>
          <h1 className="text-2xl lg:text-5xl font-mono text-gray-200 mb-2">
            {meta.name || meta.title || slug}
          </h1>
          <p className="text-gray-400 mb-2 lg:text-base text-sm">
            {meta.description || meta.tagline || ""}
          </p>
        </section>
        <section className="flex flex-col lg:items-end lg:justify-end gap-3 ml-auto">
          <nav className="flex items-center gap-2 lg:gap-8 text-gray-300">
            {typeof meta.website === "string" && meta.website && (
              <a
                href={meta.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition lg:text-base text-sm"
              >
                site ↗
              </a>
            )}
            {typeof meta.github === "string" && meta.github && (
              <a
                href={meta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition lg:text-base text-sm"
              >
                github ↗
              </a>
            )}
          </nav>
          {meta.date && <p className="text-xs text-gray-500 mt-1">{new Date(meta.date).toLocaleDateString()}</p>}

        </section>
      </div>

      {images.length > 0 && (
        <div className="mb-10 w-screen relative left-1/2 -translate-x-1/2">
          <ProjectCarousel
            images={images}
            altBase={String(meta.name || meta.title || slug)}
          />
        </div>
      )}

      <article>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl lg:text-4xl font-mono mt-10 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl lg:text-3xl font-mono mt-8 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg lg:text-2xl font-mono mt-6 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-300">{children}</li>
            ),
            a: (props) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted hover:decoration-solid text-gray-200"
              >
                {props.children}
              </a>
            ),
          
            code: ({ children }) => (
              <code className="px-1 py-0.5 bg-black/40 border border-white/10 text-gray-200">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-black/50 border border-white/10 p-4 overflow-auto mb-4">
                {children}
              </pre>
            ),
            hr: () => <hr className="my-8 border-white/10" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
