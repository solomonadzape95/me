import type { Metadata } from "next";
import { cookies } from "next/headers";

import { StatsDashboard } from "@/components/stats-dashboard";
import { SiteShell } from "@/components/site-shell";
import { hasStatsAccess, STATS_AUTH_COOKIE } from "@/lib/stats-auth";

import { authenticateStats } from "./actions";

export const metadata: Metadata = {
  title: "Stats",
  robots: { index: false, follow: false },
};

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [store, params] = await Promise.all([cookies(), searchParams]);
  const authenticated = hasStatsAccess(
    store.get(STATS_AUTH_COOKIE)?.value,
  );

  if (!authenticated) {
    return (
      <SiteShell>
        <div className="mx-auto flex min-h-[60vh] w-full max-w-sm items-center">
          <form action={authenticateStats} className="w-full space-y-5">
            <div className="space-y-2">
              <h1 className="page-title">stats</h1>
              <p className="text-[0.92rem] text-(--color-ink-soft)">
                enter the password to continue.
              </p>
            </div>
            <label className="block space-y-2">
              <span className="label-mono">password</span>
              <input
                required
                autoFocus
                type="password"
                name="password"
                autoComplete="current-password"
                className="w-full border border-(--color-rule) bg-transparent px-4 py-3 text-(--color-ink) outline-none transition-colors focus:border-(--color-accent)"
              />
            </label>
            {params.error && (
              <p className="text-[0.82rem] text-(--color-accent)">
                that password is not correct.
              </p>
            )}
            <button
              type="submit"
              className="cursor-pointer bg-(--color-ink) px-5 py-3 text-[0.84rem] text-(--color-paper) transition-opacity hover:opacity-80"
            >
              open stats
            </button>
          </form>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <header className="space-y-5">
        <h1 className="page-title">stats</h1>
        <p className="max-w-[66ch] text-[1.02rem] leading-relaxed text-(--color-ink-soft)">
          a closer look at how people use this site.
        </p>
      </header>
      <StatsDashboard />
    </SiteShell>
  );
}
