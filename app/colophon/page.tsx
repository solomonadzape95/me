import type { Metadata } from "next";

import { Section, SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Colophon",
  description: "Fonts, tools, libraries, and services used to make this site.",
  alternates: { canonical: "/colophon" },
  openGraph: { url: "/colophon" },
};

type Credit = {
  name: string;
  note: string;
  href?: string;
};

const GROUPS: { label: string; items: Credit[] }[] = [
  {
    label: "type",
    items: [
      {
        name: "Maple Mono",
        note: "body, labels, and page headings",
        href: "https://github.com/subframe7536/maple-font",
      },
      {
        name: "Selera Regular",
        note: "the solenoid wordmark and nickname",
        href: "https://befonts.com/selera-regular-ttf.charmap",
      },
      {
        name: "Selera license",
        note: "font licensing information",
        href: "https://befonts.com/licenses",
      },
    ],
  },
  {
    label: "build",
    items: [
      { name: "Next.js", note: "application framework", href: "https://nextjs.org/" },
      { name: "React", note: "interface components", href: "https://react.dev/" },
      { name: "TypeScript", note: "application code", href: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS", note: "layout and styling", href: "https://tailwindcss.com/" },
    ],
  },
  {
    label: "icons",
    items: [
      { name: "Phosphor Icons", note: "interface icons", href: "https://phosphoricons.com/" },
      { name: "React Icons", note: "technology brand marks from Simple Icons", href: "https://react-icons.github.io/react-icons/" },
      { name: "Adobe", note: "After Effects and Illustrator product marks", href: "https://www.adobe.com/creativecloud.html" },
      { name: "Cavalry", note: "official product mark", href: "https://cavalry.studio/" },
    ],
  },
  {
    label: "services",
    items: [
      { name: "Last.fm", note: "now-playing data", href: "https://www.last.fm/api" },
      { name: "OpenStreetMap", note: "Lagos map data", href: "https://www.openstreetmap.org/copyright" },
      { name: "CARTO", note: "map tiles and cartography", href: "https://carto.com/attributions" },
      { name: "Umami", note: "privacy-minded analytics", href: "https://umami.is/" },
    ],
  },
];

export default function ColophonPage() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">colophon.</h1>
        <p className="max-w-[58ch] text-[1.05rem] leading-relaxed text-(--color-ink-soft)">
          the short version of how this site was designed, written, and put
          together.
        </p>
      </header>

      <Section label="made with">
        <div className="space-y-10">
          {GROUPS.map((group) => (
            <section key={group.label} className="space-y-3">
              <h2 className="label-mono">{group.label}</h2>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-1 py-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="text-(--color-ink)">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline"
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </span>
                    <span className="text-[0.94rem] text-(--color-ink-soft)">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>

      <Section label="notes">
        <p className="max-w-[64ch] leading-relaxed text-(--color-ink-soft)">
          the site is intentionally small, mostly text, and built without a
          large design system. project writing lives in markdown, while the
          interface is made from a handful of reusable react components.
        </p>
      </Section>
    </SiteShell>
  );
}
