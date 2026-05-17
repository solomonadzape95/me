"use client";

import { useEffect, useState } from "react";

const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  weekday: "short",
  month: "short",
  day: "numeric",
});

/**
 * Live local-time readout for the location panel. Updates once per minute
 * — the readout has no seconds precision, so anything finer is wasted work.
 * Renders empty on the server pass to avoid a hydration mismatch when the
 * server-local clock differs from the visitor's.
 */
export const LocationTime = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-[0.72rem] tabular-nums text-(--color-ink-soft) leading-snug">
      {now ? (
        <>
          <span className="text-(--color-ink)">{TIME_FMT.format(now)}</span>
          <span className="px-1.5 text-(--color-rule)">·</span>
          <span>{DATE_FMT.format(now)}</span>
        </>
      ) : (
        // Reserve the row's height during hydration.
        <span className="invisible">—</span>
      )}
    </div>
  );
};
