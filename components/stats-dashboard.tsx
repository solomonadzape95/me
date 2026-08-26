"use client";

import {
  ArrowSquareOut,
  Clock,
  CursorClick,
  Eye,
  GithubLogo,
  LinkSimple,
  MouseScroll,
  Pulse,
  UsersThree,
} from "@phosphor-icons/react";
import {
  emptyAnalyticsSnapshot,
  formatAnalyticsKilometres,
  formatAnalyticsLink,
  formatAnalyticsNumber,
} from "@/lib/analytics";

import { Section } from "./site-shell";
import { StatsSummaryPanel } from "./stats-summary-panel";
import { useAnalyticsSnapshot } from "./use-analytics-snapshot";

const formatDuration = (seconds: number | null) => {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}m ${remainder}s`;
};

const Metric = ({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  note?: string;
}) => (
  <div className="min-h-36 rounded-[14px] bg-(--color-accent-soft) p-5 sm:p-6">
    <Icon size={22} weight="duotone" className="text-(--color-accent)" aria-hidden="true" />
    <div className="mt-6 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-(--color-ink)">
      {value}
    </div>
    <div className="mt-3 text-[0.78rem] uppercase tracking-[0.065em] text-(--color-ink-soft)">
      {label}
    </div>
    {note && <p className="mt-2 text-[0.76rem] leading-relaxed text-(--color-ink-soft)">{note}</p>}
  </div>
);

export const StatsDashboard = () => {
  const data =
    useAnalyticsSnapshot("/asdfg/stats", true, true) ??
    emptyAnalyticsSnapshot("/asdfg/stats", "unconfigured", "loading stats…");

  return (
    <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-10">
      <div className="min-w-0 space-y-16">
        {data.state !== "ready" && (
          <p className="border-l-2 border-(--color-accent) pl-4 text-[0.88rem] leading-relaxed text-(--color-ink-soft)">
            {data.message}
          </p>
        )}

        <Section label="overview">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Metric icon={UsersThree} label="visitors" value={formatAnalyticsNumber(data.visitors)} />
            <Metric icon={Eye} label="pageviews" value={formatAnalyticsNumber(data.pageviews)} />
            <Metric icon={Pulse} label="visits" value={formatAnalyticsNumber(data.visits)} />
            <Metric icon={UsersThree} label="active now" value={formatAnalyticsNumber(data.activeVisitors)} />
            <Metric icon={Clock} label="average visit" value={formatDuration(data.averageVisitSeconds)} />
            <Metric
              icon={CursorClick}
              label="bounce rate"
              value={data.bounceRate == null ? "—" : `${data.bounceRate}%`}
            />
          </div>
        </Section>

        <Section label="engagement">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Metric
              icon={MouseScroll}
              label="virtual distance"
              value={formatAnalyticsKilometres(data.virtualKilometres)}
            />
            <Metric
              icon={LinkSimple}
              label="top link · site"
              value={formatAnalyticsLink(data.topLink?.label)}
              note={data.topLink ? `${formatAnalyticsNumber(data.topLink.value)} clicks` : undefined}
            />
            <Metric
              icon={LinkSimple}
              label="top link · this page"
              value={formatAnalyticsLink(data.currentPageTopLink?.label)}
              note={
                data.currentPageTopLink
                  ? `${formatAnalyticsNumber(data.currentPageTopLink.value)} clicks`
                  : undefined
              }
            />
          </div>
        </Section>

        <Section label="projects">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Metric
              icon={Eye}
              label="top project"
              value={data.topProject?.label.replace("/projects/", "") ?? "—"}
              note={data.topProject ? `${formatAnalyticsNumber(data.topProject.value)} views` : undefined}
            />
            <Metric icon={Eye} label="project views" value={formatAnalyticsNumber(data.projectPageviews)} />
            <Metric icon={ArrowSquareOut} label="live clicks" value={formatAnalyticsNumber(data.liveClicks)} />
            <Metric icon={GithubLogo} label="source clicks" value={formatAnalyticsNumber(data.sourceClicks)} />
            <Metric
              icon={CursorClick}
              label="project click-through"
              value={
                data.projectClickThroughRate == null
                  ? "—"
                  : `${data.projectClickThroughRate}%`
              }
              note="live and source clicks ÷ project views"
            />
          </div>
        </Section>

        <Section label="popular pages">
          {data.topPages.length > 0 ? (
            <ol className="grid gap-3 sm:grid-cols-2">
              {data.topPages.map((page, index) => (
                <li
                  key={page.label}
                  className="grid grid-cols-[2ch_minmax(0,1fr)_auto] items-baseline gap-3 rounded-[10px] bg-(--color-accent-soft) px-4 py-4"
                >
                  <span className="text-[0.72rem] text-(--color-ink-soft)">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-[0.9rem] text-(--color-ink)">{page.label}</span>
                  <span className="text-[0.78rem] text-(--color-ink-soft)">{formatAnalyticsNumber(page.value)}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-[0.9rem] text-(--color-ink-soft)">No page rankings yet.</p>
          )}
        </Section>
      </div>

      <div className="xl:sticky xl:top-6">
        <StatsSummaryPanel data={data} />
      </div>
    </div>
  );
};
