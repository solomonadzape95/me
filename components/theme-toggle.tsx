"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const readTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
};

const applyTheme = (next: Theme) => {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* ignore */
  }
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="label-mono inline-flex items-center gap-2 hover:text-(--color-accent) transition-colors duration-150"
    >
      <span aria-hidden="true">{theme === "dark" ? "◐" : "◑"}</span>
      <span>{theme === "dark" ? "light" : "dark"}</span>
    </button>
  );
};
