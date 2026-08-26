# Design QA

## Evidence

- Source visual truth:
  - `/var/folders/7l/k5zrsk890wg214m1d2fz1z2c0000gn/T/codex-clipboard-3b7d0321-d61b-49f9-a05a-731886c62c48.png` (location-tile direction, 1828 × 1294 px)
  - `/var/folders/7l/k5zrsk890wg214m1d2fz1z2c0000gn/T/codex-clipboard-d68ba3ad-eec6-40be-8f1a-cf31b8bf0a1f.png` (project-card direction, 1586 × 720 px)
  - `/var/folders/7l/k5zrsk890wg214m1d2fz1z2c0000gn/T/codex-clipboard-5bca86a9-7d02-412a-a502-0a0852bb56ba.png` (dark tool-chip direction, 2896 × 268 px)
- Browser-rendered implementation: `design-qa-projects-refined.png` (1265 × 712 px)
- Full-view comparison: `design-qa-projects-refined-comparison.png`
- Focused location comparison: `design-qa-location-comparison.png`
- CSS viewports: 1265 × 720 desktop and 390 × 844 mobile; device density 1x.
- Normalization: sources and implementation were scaled to a common 730 px comparison height without changing aspect ratio. The location comparison uses a 300 × 712 crop of the implementation rail.
- State: light theme, project-colour cards, square map tile, latest listening state.

## Required Fidelity Surfaces

- Fonts and typography: Maple Mono is the only supporting family. The Selera `solenoid` lockup is optically and mechanically 40 px high beside a 40 px avatar. Project titles, statuses, descriptions, and stack labels retain a clear hierarchy at desktop and mobile widths.
- Spacing and layout rhythm: cards reproduce the reference's large centered mark, top-right status, bottom-anchored copy, rounded rectangular container, and regular grid. The persistent rail remains fully reachable at the default desktop viewport in both location states.
- Colors and visual tokens: distinct logo-complementary project surfaces preserve the existing bone/black/coral system in both themes.
- Image quality and asset fidelity: real project logos are used when available. Envelope and Gauntlet now use marks recovered from their public repositories; Jotter uses a coloured Phosphor pen, Echo a larger fingerprint, and projects without a usable source mark use a Phosphor stack. Rizzlr's face artwork has an opaque skin-tone backing so all facial features remain complete. The location tile uses the real Lagos map raster and a Phosphor map pin.
- Copy and content: cards use real project names and complete descriptions without line clamping. Tool lists were intentionally removed. GitHub and live-site actions appear only when their corresponding URLs exist. The listening module uses real Last.fm recent-track data and labels it `now playing` or `last played` based on playback state.
- About experience: three equal-height editorial cards use real company marks at full colour in every state, with dates, sequence numbers, roles, and complete descriptions. Their blue-slate, muted-plum, and warm-umber surfaces complement the orange, blue/yellow, and blue logos without white plates or shadows.
- About tools: the supplied dense, dark chip treatment is retained with real technology marks. After Effects and Illustrator use Adobe assets, and Cavalry uses its official mark.
- Navigation separation: profile identity and primary links each end with their own rule and spacing break; the fixed desktop rail measures 16–705 px at the 720 px QA viewport and remains at that position after scrolling to 900 px.
- Rail modules: location uses the same media + text grid as listening status, including a real Lagos map tile, Lagos time, and `utc+1`. One theme button toggles between light and dark, and a clickable `⌘ k / ctrl k` command hint fits within the fixed rail.
- Contact: the standalone page uses icon-led, full-width contact rows with working email and external links, including Instagram and Discord. The homepage block uses the same expanded set of accounts.
- Voice and headers: all primary routes share the same 52 px / 300-weight lowercase page-title treatment at the desktop QA viewport. Copy was shortened and grounded in Solomon's actual work and studies after reviewing the concise personal style of `refact0r.dev` and `iamrob.in`.
- Intro story: the larger Selera `solenoid` word opens the same accessible, dismissible modal on Home and About. The link now navigates directly to Wikipedia's canonical `/wiki/Solenoid` article in the current tab, and the portalled modal remains fully inside a 390 × 844 viewport.
- Intro story placement: the modal is portalled to the document body but positioned from the trigger's viewport bounds, so it opens 10 px below the `solenoid` word. Browser measurement confirms the first homepage section remains at 390.67 px before and after opening (zero layout shift).
- Projects search: the project index filters names, descriptions, statuses, and years as the visitor types, offers clear/reset behavior, and renders a useful zero-result state. Searching `stellar` returns Nebula and Crypt with no horizontal overflow.
- Command palette: includes every route plus project search and filters, the solenoid story, light/dark themes, and direct GitHub, Instagram, Discord, and email actions.
- Site documentation: `/changelog` records dated site changes; `/colophon` links Maple Mono, Next.js, React, TypeScript, Tailwind CSS, Phosphor, React Icons, Last.fm, OpenStreetMap, CARTO, and Umami. Both routes appear in desktop/mobile navigation, command search, sitemap, and route animation mapping.
- Rail coherence: location and listening now share 72 px rounded media, matching two-column alignment, and compact labels. The higher-zoom Lagos tile loads at 512 px source resolution, and the complete nine-link rail still ends at approximately 693 px in a 720 px viewport.
- Experience logos: all logo wrappers compute to transparent backgrounds with no box or drop shadow. Card colours provide the contrast instead.
- Content separators: rules are limited to the capitalized section headers. Repeated content rows and coming-soon blocks use spacing rather than divider lines.
- Project details: the screenshot gallery now leads each page and spans the available content width before the project name. The title row carries the project mark plus larger live/source actions, metadata uses the same status wording as the cards, and project notes keep a readable 72-character measure.
- Responsive pass: Home, About, Projects, project details, Contact, experience cards, the project grid, modal, and mobile navigation were checked at 390 × 844, 768 × 900, 1024 × 768, and the default desktop viewport. Experience cards step from one to two to three columns; project actions collapse to icon-only controls on phones; long contact handles use compact mobile labels.
- Project filters: the About-page `web` and `desktop` links open the Projects index with a working platform filter and clear action. The same filtered views are available from the command palette.
- Extended project filters: `extensions` and `onchain` in the About copy open working filtered indexes; both filters are also available from the command palette.
- Desktop rail rhythm: identity, navigation, location, listening, and controls now use the more open mobile-menu grouping rhythm while the complete rail still fits a 1280 × 720 viewport.
- Experience marks: company logos render at approximately 1.7× their previous size without adding plates, shadows, or changing the card grid.
- Font credit: the colophon links Selera Regular to the supplied character map and includes the supplied BeFonts license page as a separate credit.
- Project media: responsive screenshot frames no longer add a background plate or rounded container. Media stays within the viewport from phone through desktop sizes.
- Social cards: Open Graph and Twitter both render the same verified 1200 × 630 dark-mode profile lockup using the real avatar, Selera wordmark, Maple Mono supporting text, and sidebar theme tokens.

## Interaction Coverage

- Fixed Lagos map tile and logo-complementary project-card colours.
- Light/dark theme switching.
- Desktop home and full `/projects` grid.
- Mobile 390 × 844 layout and navigation drawer.
- Blog and Videos routes, sidebar links, command-palette links, metadata, and coming-soon states.
- Now-playing link and artwork state.
- Fresh browser console checked: no errors.

## Comparison History

1. P1 — Phosphor was imported by a server component, producing a client-context runtime error.
   - Fix: made `ProjectCard` a client component.
   - Post-fix evidence: home and projects routes render; fresh browser console has no errors.
2. P2 — the initial full-width map tile pushed display controls below the desktop viewport.
   - Fix: reduced the tile to a compact 9.5 rem square and tightened rail section spacing.
   - Post-fix evidence: `design-qa-location-comparison.png`; all controls remain visible and interactive.
3. P2 — projects without supplied logos could produce an empty-looking center.
   - Fix: added a Phosphor stack fallback at the same optical scale as supplied project marks, then replaced Envelope and Gauntlet with marks recovered from their repositories.
   - Post-fix evidence: browser QA of the home and projects grids.
4. P2 — the initial card refinement truncated descriptions, used weak outlined status badges, and rendered smaller cards on the homepage than on `/projects`.
   - Fix: removed line clamping and tool labels, reduced status to plain borderless/backgroundless text, standardized both grids to three columns, and fixed all card rows to the shared component minimum with equal-height stretching. Added conditional GitHub/live actions.
   - Post-fix evidence: `design-qa-projects-refined.png` and `design-qa-projects-refined-comparison.png`. Home and `/projects` cards both measure approximately 278 × 416 px at the desktop QA viewport; mobile has no horizontal overflow and no truncated descriptions.
5. P2 — the first About tools pass used generic category icons rather than the real technology marks.
   - Fix: installed React Icons and replaced all 16 marks with their Simple Icons equivalents; checked every exported icon before use.
   - Post-fix evidence: browser inspection finds 16 SVG marks in the tool grid; the production build and TypeScript checks pass.
6. P2 — per-character heading animation allowed line breaks inside words at intermediate widths.
   - Fix: grouped animated characters into non-breaking word wrappers while preserving stagger order and reduced-motion support.
   - Post-fix evidence: About and Contact headings wrap only at spaces at the desktop QA viewport.
7. P2 — sticky positioning let the desktop rail move with document scroll and newly added routes risked clipping its controls.
   - Fix: changed the rail to fixed positioning, reduced the optional map tile to 7 rem, tightened internal spacing, and added visual rules between identity, navigation, and utilities.
   - Post-fix evidence: the rail remains at 16 px from the viewport top at scrollY 0 and scrollY 900; its lower edge is within the 720 px viewport.
8. P2 — the first shared page-title QA loaded a stale Turbopack stylesheet and rendered the new class at body size.
   - Fix: stopped the long-running preview, moved the generated `.next` cache to `/private/tmp/portfolio-next-cache.oreSt6/.next`, and restarted from a clean cache.
   - Post-fix evidence: all seven primary route headers compute to 52 px, weight 300, lowercase; production verification is run against the clean build.

## Findings

- No remaining P0, P1, or P2 issues.
- P3: the live Carto map is naturally quieter and less illustrative than the stylized source tiles. This is acceptable for the current iteration because it preserves a real, legible Lagos map and the requested square-tile composition.

## Implementation Checklist

- [x] Lock supporting typography to Maple Mono.
- [x] Match profile wordmark height to avatar.
- [x] Add Phosphor icon controls and fallbacks.
- [x] Use a fixed map location state without an extra display control.
- [x] Support now-playing and last-played labels.
- [x] Rebuild project cards from the supplied reference.
- [x] Use logo-complementary project-card surfaces.
- [x] Verify desktop, mobile, and theme states.
- [x] Use actual brand icons in the About tools grid.
- [x] Rebuild experience as full-colour, equal-height cards.
- [x] Keep the desktop rail fixed and visually sectional.
- [x] Add Blog and Videos navigation and coming-soon pages.
- [x] Upgrade only the standalone Contact page.
- [x] Add coloured experience-card surfaces with consistent contrast.
- [x] Align location and listening modules.
- [x] Add live project search and command-palette access.
- [x] Normalize and shorten route headers and personal copy.
- [x] Add the responsive solenoid-name modal and verified reference link.
- [x] Add changelog and linked colophon pages.
- [x] Anchor the solenoid explanation without layout shift.
- [x] Remove experience-logo plates while preserving logo contrast.
- [x] Match location and listening media at 72 px.
- [x] Add Lagos timezone, a one-button theme toggle, and the all-caps copyright name.
- [x] Add the About `currently` section and Adobe/Cavalry tool marks.
- [x] Restore complete Rizzlr artwork and enlarge Echo's fingerprint mark.
- [x] Reserve divider rules for capitalized section headers.
- [x] Move project media above the title, enlarge it, and align live/source actions with the project name.
- [x] Rewrite the older project notes into shorter overview, rationale, implementation, and current-state sections.
- [x] Reuse the solenoid story on About and verify the canonical Wikipedia navigation end to end.
- [x] Add working web/desktop project filters and command-palette entries.
- [x] Add working browser-extension/onchain filters and command-palette entries.
- [x] Enlarge experience logos and mirror mobile grouping space in the fixed desktop rail.
- [x] Add the supplied Selera character-map and license references.
- [x] Remove responsive screenshot plates and verify phone, tablet, compact-desktop, and desktop layouts.
- [x] Replace the generic social preview with matching Open Graph and Twitter profile cards.
- [x] Add Instagram and Discord to Home, Contact, structured data, and the command palette.
- [x] Highlight the active desktop and mobile navigation link with the accent colour.
- [x] Remove location-view and project-surface toggles while retaining the map and colour cards.
- [x] Place the command-palette shortcut directly beneath the theme control and enlarge project-card action icons.
- [x] Add the year to every project card alongside its status.
- [x] Place the slightly counter-rotated profile image immediately before Solomon's name in the Home heading.

final result: passed
