import type { Metadata } from "next";

import { Section, SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Changelog",
  description: "A dated record of meaningful updates to Solomon's portfolio.",
  alternates: { canonical: "/changelog" },
  openGraph: { url: "/changelog" },
};

const CHANGES = [
  {
    date: "2026-08-26",
    title: "a new shape for the site",
    items: [
      "moved the site to maple mono, with selera for the solenoid wordmark",
      "rebuilt project and experience cards",
      "added light and dark themes, display controls, and command search",
      "added live listening, a lagos map, project search, blog, and videos",
      "rewrote the introduction and added the story behind solenoid",
      "added this changelog and a colophon",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">changelog.</h1>
        <p className="max-w-[58ch] text-[1.05rem] leading-relaxed text-(--color-ink-soft)">
          a dated note of what changed on this site and why it may feel
          different from the last visit.
        </p>
      </header>

      <Section label="updates">
        <ol className="space-y-8">
          {CHANGES.map((change) => (
            <li
              key={change.date}
              className="grid gap-5 md:grid-cols-[9rem_minmax(0,1fr)]"
            >
              <time
                dateTime={change.date}
                className="label-mono normal-case tracking-[0.04em] tabular-nums"
              >
                26 aug 2026
              </time>
              <div className="space-y-4">
                <h2 className="font-display text-[1.45rem] tracking-[-0.02em] text-(--color-ink)">
                  {change.title}
                </h2>
                <ul className="space-y-2 text-[0.96rem] leading-relaxed text-(--color-ink-soft)">
                  {change.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="text-(--color-accent)">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </SiteShell>
  );
}
