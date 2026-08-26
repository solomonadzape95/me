export const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ??
  "3dfb6e94-990c-4af7-9f13-9fdd1098082f";

export type RankedMetric = {
  label: string;
  value: number;
};

export type AnalyticsSnapshot = {
  state: "ready" | "unconfigured" | "error";
  path: string;
  generatedAt: string;
  visitors: number | null;
  pageviews: number | null;
  visits: number | null;
  activeVisitors: number | null;
  averageVisitSeconds: number | null;
  bounceRate: number | null;
  virtualKilometres: number | null;
  topLink: RankedMetric | null;
  currentPageTopLink: RankedMetric | null;
  topProject: RankedMetric | null;
  projectPageviews: number | null;
  liveClicks: number | null;
  sourceClicks: number | null;
  projectClickThroughRate: number | null;
  topPages: RankedMetric[];
  message?: string;
};

export const formatAnalyticsNumber = (value: number | null | undefined) =>
  value == null ? "—" : new Intl.NumberFormat("en").format(value);

export const formatAnalyticsKilometres = (value: number | null | undefined) =>
  value == null
    ? "—"
    : `${value.toLocaleString("en", { maximumFractionDigits: 3 })} km`;

export const formatAnalyticsLink = (value: string | undefined) => {
  if (!value) return "—";
  try {
    const url = new URL(value, "https://www.thesolenoid.space");
    return url.origin === "https://www.thesolenoid.space"
      ? `${url.pathname}${url.search}`
      : `${url.hostname.replace(/^www\./, "")}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return value;
  }
};

export const emptyAnalyticsSnapshot = (
  path: string,
  state: AnalyticsSnapshot["state"] = "unconfigured",
  message?: string,
): AnalyticsSnapshot => ({
  state,
  path,
  generatedAt: new Date().toISOString(),
  visitors: null,
  pageviews: null,
  visits: null,
  activeVisitors: null,
  averageVisitSeconds: null,
  bounceRate: null,
  virtualKilometres: null,
  topLink: null,
  currentPageTopLink: null,
  topProject: null,
  projectPageviews: null,
  liveClicks: null,
  sourceClicks: null,
  projectClickThroughRate: null,
  topPages: [],
  message,
});
