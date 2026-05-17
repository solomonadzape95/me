import { CascadeName } from "@/components/cascade-name";
import { Section, SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "Contact",
};

type Link = { label: string; value: string; href: string };

const LINKS: Link[] = [
  {
    label: "email",
    value: "contact@solenoid.me",
    href: "mailto:contact@solenoid.me",
  },
  {
    label: "github",
    value: "github.com/solomonadzape95",
    href: "https://github.com/solomonadzape95",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/solomon-adzape",
    href: "https://www.linkedin.com/in/solomon-adzape/",
  },
  { label: "x", value: "x.com/solenoid", href: "https://x.com/solenoid" },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <header className="space-y-5 mb-4">
        <h1 className="font-display font-light leading-[1.05] tracking-tight text-(--color-ink) text-[clamp(2rem,5vw,3.25rem)]">
          <CascadeName text="Open to talk." />
        </h1>
        <p className="text-(--color-ink-soft) leading-relaxed">
          Best reached by email. Replies usually arrive within a working day.
        </p>
      </header>

      <Section label="reach">
        <dl className="space-y-4">
          {LINKS.map((link) => (
            <div
              key={link.label}
              className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-6 items-baseline"
            >
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-(--color-ink-soft)">
                {link.label}
              </dt>
              <dd className="font-mono text-[0.95rem] text-(--color-ink) break-words">
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="link-underline"
                >
                  {link.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </SiteShell>
  );
}
