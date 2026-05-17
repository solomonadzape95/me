import Link from "next/link";

import { Section, SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <p className="label-mono">404 · not found</p>
        <h1 className="font-display font-light leading-[1.0] tracking-tight text-(--color-ink) text-[clamp(2.5rem,6vw,4rem)]">
          This page does not exist.
        </h1>
      </header>

      <Section label="elsewhere">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 font-mono text-[0.86rem]">
          <li>
            <Link href="/" className="link-underline">
              home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="link-underline">
              projects
            </Link>
          </li>
          <li>
            <Link href="/about" className="link-underline">
              about
            </Link>
          </li>
          <li>
            <Link href="/contact" className="link-underline">
              contact
            </Link>
          </li>
        </ul>
      </Section>
    </SiteShell>
  );
}
