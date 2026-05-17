"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Slug = { slug: string; name: string };

type Props = {
  projects: Slug[];
};

const PAGES: { label: string; href: string }[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "contact", href: "/contact" },
  { label: "resume", href: "/resume" },
];

const applyTheme = (theme: "light" | "dark") => {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore */
  }
};

export const CommandPalette = ({ projects }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    // Defer so the dialog closes cleanly before we navigate.
    setTimeout(fn, 0);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      shouldFilter
      className="
        fixed inset-0 z-[60]
        data-[state=open]:animate-in
        data-[state=closed]:animate-out
      "
      overlayClassName="fixed inset-0 z-[59] bg-(--color-paper)/70 backdrop-blur-sm"
      contentClassName="
        fixed left-1/2 top-[20vh] z-[60] w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2
        border border-(--color-rule) bg-(--color-paper) shadow-2xl
        font-mono text-sm text-(--color-ink)
      "
    >
      <Command.Input
        autoFocus
        placeholder="search pages, projects, actions…"
        className="
          w-full bg-transparent border-b border-(--color-rule)
          px-4 py-3 outline-none
          placeholder:text-(--color-ink-soft)
        "
      />
      <Command.List className="max-h-[60vh] overflow-y-auto p-1">
        <Command.Empty className="px-4 py-6 text-(--color-ink-soft) text-center">
          nothing matches.
        </Command.Empty>

        <Command.Group
          heading="pages"
          className="
            [&_[cmdk-group-heading]]:label-mono
            [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2
          "
        >
          {PAGES.map((p) => (
            <Command.Item
              key={p.href}
              value={`page ${p.label}`}
              onSelect={() => run(() => router.push(p.href))}
              className="
                flex items-center justify-between
                px-3 py-2 cursor-pointer
                data-[selected=true]:bg-(--color-accent-soft)
                data-[selected=true]:text-(--color-accent)
              "
            >
              <span>{p.label}</span>
              <span className="label-mono normal-case tracking-[0.04em]">
                {p.href}
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="projects"
          className="
            [&_[cmdk-group-heading]]:label-mono
            [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2
          "
        >
          {projects.map((p) => (
            <Command.Item
              key={p.slug}
              value={`project ${p.slug} ${p.name}`}
              onSelect={() => run(() => router.push(`/projects/${p.slug}`))}
              className="
                flex items-center justify-between
                px-3 py-2 cursor-pointer
                data-[selected=true]:bg-(--color-accent-soft)
                data-[selected=true]:text-(--color-accent)
              "
            >
              <span>{p.name}</span>
              <span className="label-mono normal-case tracking-[0.04em]">
                /projects/{p.slug}
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="actions"
          className="
            [&_[cmdk-group-heading]]:label-mono
            [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2
          "
        >
          <Command.Item
            value="action theme light"
            onSelect={() => run(() => applyTheme("light"))}
            className="px-3 py-2 cursor-pointer data-[selected=true]:bg-(--color-accent-soft) data-[selected=true]:text-(--color-accent)"
          >
            theme — light
          </Command.Item>
          <Command.Item
            value="action theme dark"
            onSelect={() => run(() => applyTheme("dark"))}
            className="px-3 py-2 cursor-pointer data-[selected=true]:bg-(--color-accent-soft) data-[selected=true]:text-(--color-accent)"
          >
            theme — dark
          </Command.Item>
          <Command.Item
            value="action open github"
            onSelect={() =>
              run(() =>
                window.open(
                  "https://github.com/solomonadzape95",
                  "_blank",
                  "noreferrer",
                ),
              )
            }
            className="px-3 py-2 cursor-pointer data-[selected=true]:bg-(--color-accent-soft) data-[selected=true]:text-(--color-accent)"
          >
            open github
          </Command.Item>
          <Command.Item
            value="action email"
            onSelect={() =>
              run(() => {
                window.location.href = "mailto:contact@solenoid.me";
              })
            }
            className="px-3 py-2 cursor-pointer data-[selected=true]:bg-(--color-accent-soft) data-[selected=true]:text-(--color-accent)"
          >
            email me
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="border-t border-(--color-rule) px-3 py-2 flex items-center justify-between label-mono">
        <span>↑↓ navigate</span>
        <span>↵ open</span>
        <span>esc close</span>
      </div>
    </Command.Dialog>
  );
};
