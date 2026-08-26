"use client";

import {
  ChartLineUp,
  MouseScroll,
  UsersThree,
  X,
} from "@phosphor-icons/react";

import {
  type AnalyticsSnapshot,
  formatAnalyticsKilometres,
  formatAnalyticsNumber,
} from "@/lib/analytics";

type Props = {
  data: AnalyticsSnapshot | null;
  embedded?: boolean;
  onClose?: () => void;
};

const Row = ({
  icon: Icon,
  label,
  value,
  title,
}: {
  icon: typeof UsersThree;
  label: string;
  value: string;
  title?: string;
}) => (
  <div className="grid grid-cols-[1.4rem_minmax(0,1fr)] gap-x-3 py-2.5">
    <Icon size={20} weight="duotone" className="mt-0.5 text-[#d8d8d4]" aria-hidden="true" />
    <div className="min-w-0">
      <div className="text-[0.7rem] uppercase tracking-[0.07em] text-[#989895]">
        {label}
      </div>
      <div className="mt-0.5 truncate text-[0.9rem] text-[#f2f1ed]" title={title ?? value}>
        {value}
      </div>
    </div>
  </div>
);

export const StatsSummaryPanel = ({
  data,
  embedded = false,
  onClose,
}: Props) => {
  const state = data?.state ?? "unconfigured";

  return (
    <section
      data-testid="stats-summary-panel"
      className={`overflow-hidden px-5 py-5 font-mono text-[#f2f1ed] sm:px-6 sm:py-6 ${
        embedded
          ? "h-full bg-transparent"
          : "rounded-[26px] border border-white/10 bg-[#2c2c2c] shadow-[0_16px_48px_rgba(0,0,0,0.22)]"
      }`}
    >
      <header className="mb-2 flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 text-[1rem] text-[#aaa9a5]">
          <ChartLineUp size={20} weight="duotone" aria-hidden="true" />
          main stats
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="close stats"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-[#aaa9a5] transition-colors hover:bg-white/8 hover:text-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </header>

      <div className="space-y-0.5">
        <Row icon={UsersThree} label="visitors" value={formatAnalyticsNumber(data?.visitors)} />
        <Row
          icon={MouseScroll}
          label="virtual distance"
          value={formatAnalyticsKilometres(data?.virtualKilometres)}
        />
      </div>

      <div className="mt-3 text-[0.68rem] leading-relaxed text-[#898986]">
        {state === "ready"
          ? "all time · updated every 5 minutes"
          : data?.message || "waiting for analytics"}
      </div>
    </section>
  );
};
