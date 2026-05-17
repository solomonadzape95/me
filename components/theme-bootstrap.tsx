/**
 * Inline blocking script. Runs before paint, reads localStorage, falls back
 * to prefers-color-scheme, and sets `data-theme` on <html>. Keeping this in a
 * dedicated component so the layout stays readable.
 */
const SCRIPT = `(() => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } catch (_) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();`;

export const ThemeBootstrap = () => (
  <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
);
