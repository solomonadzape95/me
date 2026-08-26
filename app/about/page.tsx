import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import accavePng from "@/assets/accave.png";
import linternSvg from "@/assets/lintern.svg";
import vendeorPng from "@/assets/logo.png";
import { Section, SiteShell } from "@/components/site-shell";
import { SolenoidName } from "@/components/solenoid-name";
import { ToolChipGrid } from "@/components/tool-chip-grid";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Solomon Adzape: software engineer and product builder working across web, desktop, AI, fintech, and onchain systems.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

type Job = {
  company: string;
  role: string;
  start: string;
  end: string;
  blurb: string;
  logo?: StaticImageData | string;
  href?: string;
  color: string;
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
    logo: vendeorPng,
    color: "#2e4663",
  },
  {
    company: "Lintern",
    role: "Software engineer",
    start: "Mar 2023",
    end: "May 2024",
    blurb:
      "Co-led the frontend of a Web3 learning platform, building interactive React interfaces, dashboards, and onchain certificate and reward flows.",
    logo: linternSvg,
    color: "#6a3f49",
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
    color: "#76503b",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">a little about me.</h1>
      </header>

      <Section label="bio">
        <div className="space-y-4 leading-relaxed mb-4">
          <p>
            hey, i&apos;m solomon. i&apos;m a software engineer and computer science
            student at the university of nigeria, nsukka. online, i usually go
            by <SolenoidName />.
          </p>
          <p>
            i&apos;ve spent the last four years making products for the{" "}
            <Link href="/projects?type=web" className="link-underline">
              web
            </Link>{" "}
            and{" "}
            <Link href="/projects?type=desktop" className="link-underline">
              desktop
            </Link>
            , with a few browser{" "}
            <Link href="/projects?type=extension" className="link-underline">
              extensions
            </Link>{" "}
            and{" "}
            <Link href="/projects?type=onchain" className="link-underline">
              onchain
            </Link>{" "}
            systems along the way. i work mostly with typescript, react,
            next.js, and node.js.
          </p>
          <p>
            i like taking a product from a rough idea to something people can
            actually use. that includes the interface, api, database,
            deployment, and the awkward bits between them. you can see some of
            that work in{" "}
            <Link href="/projects" className="link-underline">
              /projects
            </Link>
            . if you&apos;d like to talk, email me at{" "}
            <a
              href="mailto:adzapesolomon@gmail.com"
              className="link-underline break-all"
            >
              adzapesolomon@gmail.com
            </a>
            .
          </p>
        </div>
      </Section>

      <Section label="currently">
        <dl className="space-y-5">
          <div className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <dt className="label-mono normal-case tracking-[0.04em] text-(--color-ink-soft)">
              learning
            </dt>
            <dd>system design, motion design</dd>
          </div>
          <div className="grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <dt className="label-mono normal-case tracking-[0.04em] text-(--color-ink-soft)">
              building
            </dt>
            <dd>shell</dd>
          </div>
        </dl>
      </Section>

      <Section label="work">
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {JOBS.map((job, index) => (
            <li
              key={job.company}
              style={{ "--experience-color": job.color } as React.CSSProperties}
              className="experience-card flex min-h-[23rem] flex-col rounded-[14px] border border-(--color-rule) p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[0.73rem] uppercase tracking-[0.055em] text-white/65 tabular-nums">
                  {job.start} — {job.end}
                </span>
                <span className="font-mono text-[0.72rem] text-white/55">
                  0{index + 1}
                </span>
              </div>

              <span className="mx-auto my-5 inline-flex h-[8.5rem] w-[8.5rem] items-center justify-center p-1">
                {job.logo ? (
                  <Image
                    src={job.logo}
                    alt=""
                    width={160}
                    height={160}
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
              <div className="mt-auto space-y-3">
                <h3 className="font-display text-[1.45rem] text-white leading-tight tracking-[-0.02em]">
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
                </h3>
                <p className="text-[0.75rem] uppercase tracking-[0.055em] text-white/65">
                  {job.role}
                </p>
                <p className="text-[0.9rem] text-white/75 leading-relaxed">
                  {job.blurb}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="tools">
        <ToolChipGrid />
      </Section>
    </SiteShell>
  );
}
