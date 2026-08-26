"use client";

import { ChartBar } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { emptyAnalyticsSnapshot } from "@/lib/analytics";

import { StatsSummaryPanel } from "./stats-summary-panel";
import { useAnalyticsSnapshot } from "./use-analytics-snapshot";

export const StatsPeek = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isPrivateStats = pathname === "/asdfg/stats";
  const data = useAnalyticsSnapshot(pathname, open && !isPrivateStats);

  if (isPrivateStats) return null;

  return (
    <div className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6">
      <div
        className={`relative origin-top-right overflow-hidden bg-[#2c2c2c] font-mono text-[#f2f1ed] shadow-[0_12px_36px_rgba(0,0,0,0.22)] will-change-[width,height,border-radius] transition-[width,height,border-radius,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open
            ? "h-[16.5rem] w-[min(20rem,calc(100vw-2rem))] rounded-[26px] shadow-[0_18px_52px_rgba(0,0,0,0.3)]"
            : "h-11 w-[5.5rem] rounded-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="open main stats"
          aria-expanded={open}
          className={`absolute inset-0 inline-flex cursor-pointer items-center justify-center gap-2 border-0 bg-transparent text-[0.76rem] transition-opacity duration-150 ${
            open ? "pointer-events-none opacity-0" : "opacity-100 delay-150"
          }`}
        >
          <ChartBar size={18} weight="duotone" aria-hidden="true" />
          stats
        </button>

        <div
          className={`h-full origin-top-right transition-[opacity,transform] duration-300 ${
            open
              ? "scale-100 opacity-100 delay-150"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <StatsSummaryPanel
            embedded
            data={
              data ??
              emptyAnalyticsSnapshot(pathname, "unconfigured", "loading stats…")
            }
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};
