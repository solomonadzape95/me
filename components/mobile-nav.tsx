"use client";

import { List } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar } from "./avatar";
import { CommandHint } from "./command-hint";
import { LocationMap } from "./location-map";
import { NowPlaying, useNowPlaying } from "./now-playing";
import { ThemeToggle } from "./theme-toggle";

type Sheet = "nav" | "now" | null;

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

/**
 * Compact nav for viewports below `lg`. Two square floating buttons sit at
 * the bottom-right and stay clear of the iOS home indicator. The left one
 * opens the full rail as a slide-in sheet; the right one shows the current
 * track's album art and, when tapped, surfaces only the now-playing card.
 */
export const MobileNav = () => {
  const pathname = usePathname();
  const data = useNowPlaying();
  const [sheet, setSheet] = useState<Sheet>(null);

  // Auto-close the sheet whenever the route changes so a nav tap doesn't
  // leave the overlay covering the new page.
  useEffect(() => {
    setSheet(null);
  }, [pathname]);

  // Esc dismisses any open sheet.
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheet]);

  // Lock scroll while a sheet is open.
  useEffect(() => {
    if (sheet) {
      const previousOverflow = document.body.style.overflow;
      const previousPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const bodyPaddingRight =
        Number.parseFloat(
          window.getComputedStyle(document.body).paddingRight,
        ) || 0;

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
      }
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
        document.body.style.paddingRight = previousPaddingRight;
      };
    }
  }, [sheet]);

  const playing = data?.playing ?? false;
  const art = data?.art;

  return (
    <div className="lg:hidden">
      {/* Floating button cluster */}
      <div
        className="fixed z-40 flex items-center gap-2 right-4 bottom-4"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <button
          type="button"
          aria-label="open menu"
          aria-expanded={sheet === "nav"}
          onClick={() => setSheet(sheet === "nav" ? null : "nav")}
          className="h-12 w-12 grid place-items-center bg-(--color-paper) border border-(--color-rule) text-(--color-ink) hover:text-(--color-accent) hover:border-(--color-accent) transition-colors duration-150 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
        >
          <List size={20} weight="bold" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={
            playing
              ? `now playing — ${data?.title ?? ""}`
              : data?.title
                ? `last played — ${data.title}`
                : "listening status"
          }
          aria-expanded={sheet === "now"}
          onClick={() => setSheet(sheet === "now" ? null : "now")}
          className="relative h-12 w-12 overflow-hidden bg-(--color-paper) border border-(--color-rule) hover:border-(--color-accent) transition-colors duration-150 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
        >
          {art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={art}
              alt=""
              className="block h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center">
              <span
                className={
                  "inline-block h-2 w-2 rounded-full " +
                  (playing
                    ? "bg-(--color-accent) animate-pulse"
                    : "bg-(--color-rule)")
                }
              />
            </span>
          )}
        </button>
      </div>

      {/* Backdrop */}
      {sheet && (
        <button
          type="button"
          aria-label="close"
          onClick={() => setSheet(null)}
          className="fixed inset-0 z-40 bg-(--color-ink)/30 backdrop-blur-[2px] animate-[fade-in_180ms_ease-out_both]"
        />
      )}

      {/* Nav sheet — slides in from the left, includes everything from the rail */}
      <aside
        aria-hidden={sheet !== "nav"}
        className={
          "fixed inset-y-0 left-0 z-50 w-[min(20rem,86vw)] bg-(--color-paper) border-r border-(--color-rule) overflow-y-auto " +
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
          (sheet === "nav" ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="px-6 pt-8 pb-12 space-y-10 font-mono text-[0.86rem] leading-relaxed">
          <div className="flex items-center gap-3 border-b border-(--color-rule) pb-6">
            <Avatar size={40} />
            <Link
              href="/"
              onClick={() => setSheet(null)}
              className="font-brand block lowercase text-(--color-ink) text-[2.5rem] leading-none tracking-[0.025em] hover:text-(--color-accent) transition-colors duration-150"
            >
              solenoid
            </Link>
          </div>

          <nav aria-label="primary" className="space-y-1.5 border-b border-(--color-rule) pb-6 text-[0.94rem]">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setSheet(null)}
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

          <div className="rule-top flex flex-col items-start gap-2 pt-4 label-mono">
            <ThemeToggle />
            <CommandHint />
            <div className="pt-1 text-[0.7rem] leading-relaxed text-(--color-ink-soft)">
              © {new Date().getFullYear()} SOLOMON ADZAPE
            </div>
          </div>
        </div>
      </aside>

      {/* Now-playing sheet — small card anchored above the button cluster */}
      <div
        aria-hidden={sheet !== "now"}
        className={
          "fixed z-50 right-4 bg-(--color-paper) border border-(--color-rule) shadow-[0_8px_32px_rgba(0,0,0,0.12)] " +
          "transition-[transform,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] " +
          (sheet === "now"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none")
        }
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 4.5rem)",
          width: "min(22rem, calc(100vw - 2rem))",
        }}
      >
        <div className="p-4">
          <NowPlaying />
        </div>
      </div>
    </div>
  );
};
