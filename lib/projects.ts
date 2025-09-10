export type Project = {
  slug: string;
  title: string;
  tagline: string;
  image: string; // public path or remote
  site?: string;
  repo?: string;
  content: {
    idea?: string;
    implementation?: string;
    thoughts?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "forklift",
    title: "forklift",
    tagline: "your ai-powered shortcut to open source",
    image: "/assets/image-a.jpg",
    site: "https://example.com",
    repo: "https://github.com/example/forklift",
    content: {
      idea:
        "help people discover repos, understand codebases, and start contributing with AI assistance.",
      implementation:
        "react + node prototype evolving into a refined frontend. oauth, caching, and summaries handled by services.",
      thoughts:
        "clean interface with a real use case; lots of iteration and polish to land the experience.",
    },
  },
  {
    slug: "restart",
    title: "re-start",
    tagline: "a tui‑style browser startpage",
    image: "/assets/image-b.jpg",
    site: "https://example.com",
    repo: "https://github.com/example/re-start",
    content: {
      idea: "minimal keyboard‑first dashboard with weather, time, and links.",
      implementation:
        "built with next.js and tailwind; data widgets composed as small client components.",
      thoughts:
        "simple building blocks made it fun to extend without adding complexity.",
    },
  },
  {
    slug: "system24",
    title: "system24",
    tagline: "a tui‑style discord theme.",
    image: "/assets/purple-white.png",
    repo: "https://github.com/example/system24",
    content: {
      idea: "tasteful retro aesthetics for modern apps.",
      implementation: "theme tokens + css variables; responsive and accessible.",
      thoughts: "constraints drove the design; less is more.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}


