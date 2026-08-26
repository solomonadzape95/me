import type { Metadata } from "next";

import { Section, SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on software, products, systems, and the work around them.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

export default function BlogPage() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">notes.</h1>
        <p className="max-w-[58ch] text-[1.05rem] leading-relaxed text-(--color-ink-soft)">
          writing about software, things i&apos;m learning, and work in progress.
        </p>
      </header>

      <Section label="blog">
        <div className="py-4">
          <p className="label-mono">content coming soon.</p>
        </div>
      </Section>
    </SiteShell>
  );
}
