import type { Metadata } from "next";

import { ContactLinks } from "@/components/contact-links";
import { Section, SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Solomon Adzape for software engineering, product development, and collaboration opportunities.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">let&apos;s talk.</h1>
        <p className="max-w-[58ch] text-[1.05rem] text-(--color-ink-soft) leading-relaxed">
          email is the quickest way to reach me. i&apos;m happy to talk about a
          role, a project, or an interesting problem.
        </p>
      </header>

      <Section label="reach">
        <ContactLinks />
      </Section>
    </SiteShell>
  );
}
