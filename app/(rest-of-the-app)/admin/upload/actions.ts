"use server";
import fs from "fs/promises";
import path from "path";

export async function uploadProjectAction(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const site = String(formData.get("site") || "").trim();
  const repo = String(formData.get("repo") || "").trim();
  const date = String(formData.get("date") || new Date().toISOString().slice(0,10));
  const content = String(formData.get("content") || "").trim();

  if (!slug) throw new Error("slug is required");

  const baseDir = path.join(process.cwd(), "public", "content", "projects", slug);
  await fs.mkdir(baseDir, { recursive: true });

  const images: string[] = [];
  const files = formData.getAll("images") as File[];
  for (const file of files) {
    if (!file || typeof file.arrayBuffer !== "function") continue;
    const bytes = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const fullPath = path.join(baseDir, safeName);
    await fs.writeFile(fullPath, bytes);
    images.push(`/content/projects/${slug}/${safeName}`);
  }

  const imagesFilenames = images.map((u) => u.split(`/`).pop()).filter(Boolean).join(", ");

  const mdFrontMatter = [
    `---`,
    `published: true`,
    `name: ${title || slug}`,
    `description: ${description || ""}`,
    `thumbnail: ${images[0] ? images[0].split(`/`).pop() : ""}`,
    `images: [${imagesFilenames}]`,
    `github: ${repo || ""}`,
    `website: ${site || ""}`,
    `date: ${date}`,
    `---`,
    ``,
  ].join("\n");

  const mdPath = path.join(baseDir, `${slug}.md`);
  await fs.writeFile(mdPath, mdFrontMatter + content + "\n");

  return { ok: true, slug, mdPath };
}


