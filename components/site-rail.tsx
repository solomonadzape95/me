"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar } from "./avatar";
import { LocationMap } from "./location-map";
import { NowPlaying } from "./now-playing";
import { ThemeToggle } from "./theme-toggle";

const NAV: { label: string; href: string }[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "contact", href: "/contact" },
  { label: "resume", href: "/resume" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export const SiteRail = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-10 font-mono text-[0.78rem] leading-relaxed">
      <div className="flex items-center gap-3">
        <Avatar size={40} />
        <Link
          href="/"
          className="block font-display text-(--color-ink) text-xl leading-tight tracking-tight hover:text-(--color-accent) transition-colors duration-150"
        >
          Solomon
          <br />
          Adzape
        </Link>
      </div>

      <nav aria-label="primary" className="space-y-1.5 text-[0.92rem]">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                "block py-0.5 transition-colors duration-150 " +
                (active
                  ? "text-(--color-accent) link-underline"
                  : "text-(--color-ink) hover:text-(--color-accent)")
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <LocationMap />

      <NowPlaying />

      <div className="rule-top pt-4 flex items-center justify-between label-mono">
        <ThemeToggle />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};
