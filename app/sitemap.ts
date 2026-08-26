import type { MetadataRoute } from "next";

import { getAllProjects } from "@/lib/projects";

const BASE_URL = "https://www.thesolenoid.space";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const updated = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: updated, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/videos`, lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/resume`, lastModified: updated, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/changelog`, lastModified: updated, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/colophon`, lastModified: updated, changeFrequency: "yearly", priority: 0.5 },
  ];

  return [
    ...pages,
    ...projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
