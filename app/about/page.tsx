import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import accavePng from "@/assets/accave.png";
import { CascadeName } from "@/components/cascade-name";
import { Section, SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "About",
};

type Job = {
  company: string;
  role: string;
  start: string;
  end: string;
  blurb: string;
  logo?: StaticImageData | string;
  href?: string;
  bigLogo?: boolean;
  darkBackdrop?: boolean;
};

const JOBS: Job[] = [
  {
    company: "Vendeor",
    role: "Founding engineer",
    start: "Aug 2024",
    end: "Apr 2025",
    blurb:
      "Shipped a responsive storefront and reusable component system, then owned Paystack checkout, ordering, and admin analytics across the frontend and REST APIs.",
  },
  {
    company: "Lumina",
    role: "Software engineer",
    start: "Mar 2023",
    end: "May 2024",
    blurb:
      "Co-led the frontend of a Web3 learning platform, building interactive React interfaces, dashboards, and onchain certificate and reward flows.",
  },
  {
    company: "Accave",
    role: "Software engineer & creative technologist",
    start: "Jun 2022",
    end: "Jul 2024",
    blurb:
      "Built cross-device learning experiences and dashboards while also producing educational media for complex technical subjects.",
    logo: accavePng,
    href: "https://accave.com",
  },
];

type Skill = { label: string; items: string[] };

const SKILLS: Skill[] = [
  {
    label: "lang",
    items: ["HTML", "CSS / SCSS", "JS / TS", "Python", "Solidity", "Bash", "SQL"],
  },
  {
    label: "frame",
    items: [
      "React",
      "Next.js",
      "Tauri",
      "Node.js",
      "Express",
      "FastAPI",
      "Tailwind",
      "Git",
      "Vercel",
    ],
  },
  { label: "db", items: ["PostgreSQL", "MongoDB", "Firestore"] },
  {
    label: "focus",
    items: ["Product engineering", "AI agents", "Desktop", "Fintech"],
  },
  {
    label: "tools",
    items: [
      "VS Code",
      "Cursor",
      "Remix",
      "Postman",
      "Linux",
      "After Effects",
      "Illustrator",
    ],
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <header className="space-y-5 mb-4">
        <h1 className="font-display font-light leading-[1.05] tracking-tight text-(--color-ink) text-[clamp(2rem,5vw,3.25rem)]">
          <CascadeName text="Software engineer. Product builder." />
        </h1>
      </header>

      <Section label="bio">
        <div className="space-y-4 leading-relaxed mb-4">
          <p>
            I&apos;m a software engineer with more than four years of experience
            building responsive products across web applications, desktop
            software, browser extensions, and onchain systems.
          </p>
          <p>
            I work mainly with React, Next.js, TypeScript, and Node.js, but I&apos;m
            comfortable owning a product beyond its interface—across APIs,
            databases, AI integrations, native bridges, and deployment.
          </p>
          <p>
            I&apos;m currently completing a B.Sc. in Computer Science at the
            University of Nigeria, Nsukka. Selected work lives on{" "}
            <Link href="/projects" className="link-underline">
              /projects
            </Link>
            , and if you&apos;d like to chat, the address is{" "}
            <a href="mailto:contact@solenoid.me" className="link-underline">
              contact@solenoid.me
            </a>
            .
          </p>
        </div>
      </Section>

      <Section label="work">
        <ol className="space-y-10">
          {JOBS.map((job) => (
            <li
              key={job.company}
              className="group grid gap-x-8 gap-y-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-center"
            >
              <span
                className={
                  "inline-flex items-center justify-center grayscale opacity-80 transition-[filter,opacity] duration-200 group-hover:grayscale-0 group-hover:opacity-100 " +
                  (job.bigLogo ? "h-24 w-24 p-1.5 " : "h-16 w-16 ") +
                  (job.darkBackdrop ? "logo-on-dark " : "")
                }
              >
                {job.logo ? (
                  <Image
                    src={job.logo}
                    alt=""
                    width={96}
                    height={96}
                    className="block h-full w-full object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl text-(--color-ink-soft)"
                  >
                    {job.company.slice(0, 1)}
                  </span>
                )}
              </span>
              <div className="space-y-2 max-w-[60ch]">
                <div className="font-mono text-[0.78rem] uppercase tracking-[0.06em] text-(--color-ink-soft) tabular-nums">
                  {job.start} — {job.end}
                </div>
                <h3 className="font-display text-2xl text-(--color-ink) leading-tight">
                  {job.href ? (
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}{" "}
                  <span className="text-(--color-ink-soft) font-body text-base italic">
                    · {job.role}
                  </span>
                </h3>
                <p className="text-(--color-ink-soft) leading-relaxed">
                  {job.blurb}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="tools">
        <dl className="space-y-4 max-w-[64ch]">
          {SKILLS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 sm:grid-cols-[5rem_minmax(0,1fr)] gap-x-6 gap-y-1.5 items-baseline"
            >
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-(--color-ink-soft)">
                {row.label}
              </dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-(--color-ink)">
                {row.items.map((it, i) => (
                  <span key={it} className="inline-flex items-baseline gap-3">
                    <span>{it}</span>
                    {i < row.items.length - 1 && (
                      <span aria-hidden="true" className="text-(--color-rule)">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </SiteShell>
  );
}
