import type { ReactNode } from "react";

/**
 * Pages used to wrap themselves in `<SiteShell>` to pick up the rail and
 * the route-animator. Both are now in `app/layout.tsx` so the rail
 * persists across navigations (NowPlaying stays mounted, no re-fetch on
 * route change). `SiteShell` therefore exists only as a pass-through so we
 * don't have to touch every page's wrapper.
 */
export const SiteShell = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

type SectionProps = {
  label: string;
  count?: number;
  children: ReactNode;
  id?: string;
};

export const Section = ({ label, count, children, id }: SectionProps) => (
  <section id={id} className="space-y-8">
    <header className="flex items-baseline justify-between border-b border-(--color-rule) pb-3">
      <h2 className="label-mono">{label}</h2>
      {count != null && (
        <span className="label-mono text-(--color-rule) tabular-nums">
          [{count}]
        </span>
      )}
    </header>
    <div className="space-y-6 pt-1 pb-6">{children}</div>
  </section>
);
