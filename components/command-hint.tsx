"use client";

export const CommandHint = () => (
  <button
    type="button"
    onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
    className="label-mono normal-case tracking-[0.035em] transition-colors hover:text-(--color-accent)"
    aria-label="open command palette"
  >
    ⌘ k <span className="text-(--color-rule)">/</span> ctrl k
  </button>
);
