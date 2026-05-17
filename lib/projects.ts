import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectStatus = "shipped" | "in-progress" | "scaffold" | "archived";

export type Project = {
  slug: string;
  name: string;
  description: string;
  date: string;
  year: string;
  github?: string;
  website?: string;
  thumbnail?: string;
  logo?: string;
  images: string[];
  stack: string[];
  status?: ProjectStatus;
  body: string;
  published: boolean;
};

const PROJECTS_DIR = path.join(process.cwd(), "public", "content", "projects");

const ensureProtocol = (url: string | undefined) => {
  if (!url) return undefined;
  if (/^https?:\/\//.test(url)) return url;
  return `https://${url}`;
};

const resolveAsset = (slug: string, file: string) =>
  file.startsWith("/") ? file : `/content/projects/${slug}/${file}`;

/**
 * YAML 1.1 inside gray-matter auto-parses bare ISO dates (2025-10-15) into JS
 * `Date` objects. We always want the YYYY-MM-DD string. Anything quoted in
 * the frontmatter (e.g. "2026") passes through as a string already.
 */
const formatDate = (raw: unknown): string => {
  if (raw == null) return "";
  if (raw instanceof Date) {
    const yyyy = raw.getUTCFullYear();
    const mm = String(raw.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(raw.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return String(raw);
};

const loadOne = async (slug: string): Promise<Project | null> => {
  const file = path.join(PROJECTS_DIR, slug, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const dateRaw = formatDate(data.date);
  const year = /^\d{4}/.test(dateRaw) ? dateRaw.slice(0, 4) : dateRaw;
  return {
    slug,
    name: String(data.name ?? slug),
    description: String(data.description ?? ""),
    date: dateRaw,
    year,
    github: ensureProtocol(data.github as string | undefined),
    website: ensureProtocol(data.website as string | undefined),
    thumbnail: data.thumbnail
      ? resolveAsset(slug, String(data.thumbnail))
      : undefined,
    logo: data.logo ? resolveAsset(slug, String(data.logo)) : undefined,
    images: Array.isArray(data.images)
      ? (data.images as string[]).map((f) => resolveAsset(slug, f))
      : [],
    stack: Array.isArray(data.stack)
      ? (data.stack as string[]).map((s) => String(s))
      : [],
    status: data.status ? (String(data.status) as ProjectStatus) : undefined,
    body: parsed.content,
    published: data.published !== false,
  };
};

export const getAllProjects = async (): Promise<Project[]> => {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const projects = await Promise.all(slugs.map(loadOne));
  return projects
    .filter((p): p is Project => p !== null && p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getProject = (slug: string) => loadOne(slug);
