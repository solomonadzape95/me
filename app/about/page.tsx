import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import accavePng from "@/assets/accave.png";
import borrandsPng from "@/assets/borrands.png";
import listaccPng from "@/assets/listacc.png";
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
  logo: StaticImageData | string;
  href?: string;
  bigLogo?: boolean;
  darkBackdrop?: boolean;
};

const JOBS: Job[] = [
  {
    company: "Listacc Limited",
    role: "Software engineer",
    start: "2025",
    end: "now",
    blurb:
      "Teaching blockchain development at an IT firm in Nsukka and shipping client web projects alongside the team.",
    logo: listaccPng,
    href: "https://academy.listacc.com",
    bigLogo: true,
    darkBackdrop: true,
  },
  {
    company: "Borrands",
    role: "Software engineer",
    start: "2024",
    end: "2025",
    blurb:
      "Led and contributed to Borrands' MVP — an ecommerce platform — collaborating closely with the engineering team.",
    logo: borrandsPng,
    href: "https://www.borrands.com.ng/",
    bigLogo: true,
  },
  {
    company: "Accave",
    role: "Creative technologist",
    start: "2023",
    end: "2025",
    blurb:
      "Produced educational content and infographics that improved engagement and learning on the Accave platform.",
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
      "Node.js",
      "Express",
      "FastAPI",
      "Tailwind",
      "Git",
      "Vercel",
    ],
  },
  { label: "db", items: ["PostgreSQL", "MongoDB", "Firestore"] },
  { label: "niche", items: ["Frontend", "Backend", "Web3", "Motion design"] },
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
          <CascadeName text="A student. I build things." />
        </h1>
      </header>

      <Section label="bio">
        <div className="space-y-4 leading-relaxed mb-4">
          <p>
            My interests are computer science, engineering, and sports. I focus
            on web development, and enjoy working with AI tools, data, and the
            blockchain.
          </p>
          <p>
            I like understanding how things work — so I enjoy planning and
            building scalable systems. I also enjoy solving puzzles and
            tackling problems that resist easy solutions.
          </p>
          <p>
            This site is the proof, not the pitch. Selected work lives on{" "}
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
                <Image
                  src={job.logo}
                  alt=""
                  width={96}
                  height={96}
                  className="block h-full w-full object-contain"
                />
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
