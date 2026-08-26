"use client";

import { useEffect, useState } from "react";

import {
  type AnalyticsSnapshot,
  emptyAnalyticsSnapshot,
} from "@/lib/analytics";

export const useAnalyticsSnapshot = (
  path: string,
  enabled = true,
  detailed = false,
) => {
  const [data, setData] = useState<AnalyticsSnapshot | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    setData(null);

    const detail = detailed ? "&detail=1" : "";
    fetch(`/api/stats?path=${encodeURIComponent(path)}${detail}`, {
      signal: controller.signal,
    })
      .then((response) => response.json() as Promise<AnalyticsSnapshot>)
      .then(setData)
      .catch(() => {
        if (!controller.signal.aborted) {
          setData(
            emptyAnalyticsSnapshot(
              path,
              "error",
              "Analytics are temporarily unavailable.",
            ),
          );
        }
      });

    return () => controller.abort();
  }, [detailed, enabled, path]);

  return data;
};
