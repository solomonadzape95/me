import type { Metadata } from "next";

import { Section, SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Videos",
  description: "Videos and visual explanations by Solomon Adzape.",
  alternates: { canonical: "/videos" },
  openGraph: { url: "/videos" },
};

export default function VideosPage() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">videos.</h1>
        <p className="max-w-[58ch] text-[1.05rem] leading-relaxed text-(--color-ink-soft)">
          walkthroughs, explainers, and the occasional visual experiment.
        </p>
      </header>

      <Section label="videos">
        <div className="py-4">
          <p className="label-mono">content coming soon.</p>
        </div>
      </Section>
    </SiteShell>
  );
}
