"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar } from "./avatar";
import { CommandHint } from "./command-hint";
import { LocationMap } from "./location-map";
import { NowPlaying } from "./now-playing";
import { ThemeToggle } from "./theme-toggle";

const NAV: { label: string; href: string }[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "videos", href: "/videos" },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/contact" },
  { label: "resume", href: "/resume" },
  { label: "changelog", href: "/changelog" },
  { label: "colophon", href: "/colophon" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export const SiteRail = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 font-mono text-[0.78rem] leading-relaxed">
      <div className="flex items-center gap-3 border-b border-(--color-rule) pb-4">
        <Avatar size={40} />
        <Link
          href="/"
          className="font-brand block lowercase text-(--color-ink) text-[2.5rem] leading-none tracking-[0.025em] hover:text-(--color-accent) transition-colors duration-150"
        >
          solenoid
        </Link>
      </div>

      <nav aria-label="primary" className="space-y-1 border-b border-(--color-rule) pb-4 text-[0.9rem]">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                "rail-link block py-0.5 transition-colors duration-150 " +
                (active
                  ? "text-(--color-accent) link-underline"
                  : "text-(--color-ink)")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <LocationMap />

      <NowPlaying />

      <div className="rule-top flex flex-col items-start gap-2 pt-3 label-mono">
        <ThemeToggle />
        <CommandHint />
        <div className="pt-1 text-[0.67rem] leading-relaxed text-(--color-ink-soft)">
          © {new Date().getFullYear()} SOLOMON ADZAPE
        </div>
      </div>
    </div>
  );
};
