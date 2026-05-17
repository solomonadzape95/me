# solenoid.me

Solomon Adzape's personal site.

Stack: Next.js 15 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript · pnpm. Content is flat markdown under `public/content/`. Design context lives in [`.impeccable.md`](./.impeccable.md).

## Development

```bash
pnpm install
pnpm dev
```

The dev server runs at <http://localhost:3000>. Theme follows the OS preference; a manual toggle is in the left rail.

## Scripts

```bash
pnpm dev         # local dev with Turbopack
pnpm build       # production build
pnpm start       # serve the production build
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
```

## Project layout

```
app/                routes (App Router, kebab-case)
components/         reused UI (rail, shell, theme toggle, cascade)
lib/projects.ts     markdown loader (gray-matter)
public/content/     project markdown + screenshots, resume PDF, OG image
.impeccable.md      design context for the impeccable skill
```

## Adding a project

1. Create `public/content/projects/<slug>/<slug>.md` with frontmatter:
   ```yaml
   ---
   published: true
   name: <name>
   description: <one-liner>
   logo: <filename, optional — falls back to a DiceBear identicon>
   thumbnail: <filename or absolute /content/... path>
   images: [<file or absolute path>, ...]
   stack: [<tag>, <tag>, ...]
   status: shipped | in-progress | scaffold
   github: <url, optional>
   website: <url, optional>
   date: YYYY-MM-DD
   ---
   ```
2. Drop screenshots into the same folder, or point `images` at paths under another project's folder if you're staging placeholders.
3. The index reads from the filesystem at request time — no rebuild needed in dev.

## Environment variables

All optional. Widgets gracefully no-op when their var is missing.

```bash
# .env.local
LASTFM_API_KEY=…              # https://www.last.fm/api/account/create
LASTFM_USERNAME=…             # your Last.fm username (pair Spotify→Last.fm once)
```

The Lagos map uses free CartoDB raster tiles (no key). The Now-Playing
widget pulls metadata from Last.fm and falls back to iTunes Search for
album art when Last.fm's image is empty or generic.

## Notable features

- **Command palette** — `⌘K` (or `Ctrl+K`) opens a fuzzy-search dialog covering pages, projects, and theme actions.
- **Hover-preview thumbnails** — hovering a row on `/projects` peeks the first screenshot near the cursor.
- **Force-directed site map** — all 12 project nodes are visible at `xl` viewports; nodes swim into new positions when you navigate.
- **Theme toggle** — uses the View Transitions API for a circular clip-path reveal anchored to the toggle button.
- **Nickname reveal** — hover the display name to see it morph from "Solomon Adzape" to "solenoid" (shared `Sol` prefix stays put).
- **Now playing** — pulls the most recent track scrobbled to Last.fm, polled every 30s.
