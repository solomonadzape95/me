import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

type ProjectMeta = {
  name?: string;
  title?: string;
  description?: string;
  tagline?: string;
  images?: string[];
  thumbnail?: string;
  date?: string;
  published?: boolean;
};

export default function Projects() {
  const baseDir = path.join(process.cwd(), "public", "content", "projects");
  let items: { slug: string; title: string; description: string; image?: string; date?: string }[] = [];
  try {
    const slugs = fs.readdirSync(baseDir);
    items = slugs.flatMap((slug) => {
      const mdPath = path.join(baseDir, slug, `${slug}.md`);
      if (!fs.existsSync(mdPath)) return [];
      const src = fs.readFileSync(mdPath, "utf8");
      const { data } = matter(src);
      const meta = (data ?? {}) as ProjectMeta;
      if (meta.published === false) return [];
      const resolveImg = (v: string) => (v?.startsWith("/content/") ? v : `/content/projects/${slug}/${v}`);
      const images = Array.isArray(meta.images) ? meta.images.map(resolveImg) : [];
      const thumb = meta.thumbnail ? resolveImg(meta.thumbnail) : images[0];
      return [{
        slug,
        title: meta.name || meta.title || slug,
        description: meta.description || meta.tagline || "",
        image: thumb,
        date: meta.date,
      }];
    });
    items.sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : 0;
      const db = b.date ? Date.parse(b.date) : 0;
      return db - da;
    });
  } catch (_) {
    items = [];
  }

  return (
    <main className="w-11/12 mx-auto py-12">
      <h1 className="text-3xl lg:text-4xl font-mono text-gray-200 mb-8">projects</h1>
      {items.length === 0 ? (
        <div className="text-gray-500">no projects yet.</div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {items.map(({ slug, title, description, image, date }) => (
            <Link key={slug} href={`/projects/${slug}`} className="group block">
              <div className="relative w-full aspect-[16/10] overflow-hidden border border-gray-50/20">
                {image ? (
                  <Image src={image} alt={title} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-gray-500">no image</div>
                )}
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-mono text-gray-200 flex items-center gap-2">
                  {title}
                  <ArrowLongRightIcon className="w-4  h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </h2>
                {date && <p className="text-xs text-gray-500 mt-1">{new Date(date).toLocaleDateString()}</p>}
                <p className="text-sm text-gray-400 mt-2">{description}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
