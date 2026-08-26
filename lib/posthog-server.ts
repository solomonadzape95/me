import "server-only";

import {
  type AnalyticsSnapshot,
  emptyAnalyticsSnapshot,
  type RankedMetric,
} from "./analytics";

const HOST = process.env.POSTHOG_HOST ?? "https://us.posthog.com";
const CSS_PIXELS_PER_KILOMETRE = (96 / 0.0254) * 1000;
const ENVIRONMENT_FILTER =
  process.env.NODE_ENV === "production"
    ? "AND properties.environment = 'production'"
    : "";

type SummaryRow = [number, number, number, number, number, number, number];
type SessionRow = [number | null, number | null];
type LinkRow = [string | null, string | null, string | null, number];
type PathRow = [string | null, number];

const credentials = () => {
  const key = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  return key && projectId ? { key, projectId } : null;
};

const hogql = async <T extends unknown[]>(query: string): Promise<T[]> => {
  const auth = credentials();
  if (!auth) throw new Error("PostHog read credentials are not configured");

  const response = await fetch(`${HOST}/api/projects/${auth.projectId}/query/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query: `/* portfolio-stats-v3 */\n${query}` },
    }),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 600);
    throw new Error(`PostHog query failed with ${response.status}: ${detail}`);
  }

  const body = (await response.json()) as { results?: T[] };
  return body.results ?? [];
};

const ranked = (label: string | null | undefined, value: number): RankedMetric | null =>
  label ? { label, value } : null;

export const getAnalyticsSnapshot = async (
  currentPath: string,
): Promise<AnalyticsSnapshot> => {
  if (!credentials()) {
    return emptyAnalyticsSnapshot(
      currentPath,
      "unconfigured",
      "Connect PostHog read credentials to load live stats.",
    );
  }

  try {
    const [summaryRows, sessionRows, linkRows, pathRows] = await Promise.all([
      hogql<SummaryRow>(`
        SELECT
          countDistinctIf(distinct_id, event = 'portfolio_pageview') AS visitors,
          countIf(event = 'portfolio_pageview') AS pageviews,
          countDistinctIf(properties.session_id, event = 'portfolio_pageview') AS visits,
          countDistinctIf(distinct_id, event = 'portfolio_pageview' AND timestamp > now() - INTERVAL 5 MINUTE) AS active,
          sumIf(toFloat(properties.pixels), event = 'portfolio_scroll_distance') AS pixels,
          countIf(event = 'portfolio_link_click' AND properties.role = 'live') AS live_clicks,
          countIf(event = 'portfolio_link_click' AND properties.role = 'source') AS source_clicks
        FROM events
        WHERE event IN ('portfolio_pageview', 'portfolio_link_click', 'portfolio_scroll_distance')
          ${ENVIRONMENT_FILTER}
      `),
      hogql<SessionRow>(`
        SELECT
          round(avg(duration_seconds)),
          round(100 * countIf(pageviews = 1) / greatest(count(), 1), 1)
        FROM (
          SELECT
            properties.session_id AS session_id,
            dateDiff('second', min(timestamp), max(timestamp)) AS duration_seconds,
            countIf(event = 'portfolio_pageview') AS pageviews
          FROM events
          WHERE event IN ('portfolio_pageview', 'portfolio_link_click', 'portfolio_scroll_distance')
            AND notEmpty(toString(properties.session_id))
            ${ENVIRONMENT_FILTER}
          GROUP BY session_id
        )
      `),
      hogql<LinkRow>(`
        SELECT
          toString(properties.href) AS href,
          toString(properties.path) AS path,
          toString(properties.role) AS role,
          count() AS clicks
        FROM events
        WHERE event = 'portfolio_link_click'
          ${ENVIRONMENT_FILTER}
        GROUP BY href, path, role
        ORDER BY clicks DESC
        LIMIT 500
      `),
      hogql<PathRow>(`
        SELECT toString(properties.path) AS path, count() AS views
        FROM events
        WHERE event = 'portfolio_pageview'
          ${ENVIRONMENT_FILTER}
        GROUP BY path
        ORDER BY views DESC
        LIMIT 200
      `),
    ]);

    const [visitors, pageviews, visits, activeVisitors, totalPixels, liveClicks, sourceClicks] =
      summaryRows[0] ?? [0, 0, 0, 0, 0, 0, 0];
    const averageVisitSeconds = Number(sessionRows[0]?.[0] ?? 0);
    const bounceRate = Number(sessionRows[0]?.[1] ?? 0);

    const linkTotals = new Map<string, number>();
    const currentLinkTotals = new Map<string, number>();
    for (const [href, path, , clicks] of linkRows) {
      if (!href) continue;
      linkTotals.set(href, (linkTotals.get(href) ?? 0) + clicks);
      if (path === currentPath) {
        currentLinkTotals.set(href, (currentLinkTotals.get(href) ?? 0) + clicks);
      }
    }

    const topFrom = (values: Map<string, number>) => {
      const entry = [...values.entries()].sort((a, b) => b[1] - a[1])[0];
      return entry ? ranked(entry[0], entry[1]) : null;
    };

    const pages = pathRows
      .filter((row): row is [string, number] => Boolean(row[0]))
      .map(([label, value]) => ({ label, value }));
    const projects = pages.filter(({ label }) => /^\/projects\/[^/]+$/.test(label));
    const projectPageviews = projects.reduce((total, project) => total + project.value, 0);
    const projectClicks = liveClicks + sourceClicks;

    return {
      state: "ready",
      path: currentPath,
      generatedAt: new Date().toISOString(),
      visitors,
      pageviews,
      visits,
      activeVisitors,
      averageVisitSeconds,
      bounceRate,
      virtualKilometres: Number((totalPixels / CSS_PIXELS_PER_KILOMETRE).toFixed(3)),
      topLink: topFrom(linkTotals),
      currentPageTopLink: topFrom(currentLinkTotals),
      topProject: projects[0] ?? null,
      projectPageviews,
      liveClicks,
      sourceClicks,
      projectClickThroughRate:
        projectPageviews > 0
          ? Number(((projectClicks / projectPageviews) * 100).toFixed(1))
          : 0,
      topPages: pages.slice(0, 6),
    };
  } catch (cause) {
    console.warn(
      `PostHog stats query failed: ${cause instanceof Error ? cause.message : "unknown error"}`,
    );
    return emptyAnalyticsSnapshot(
      currentPath,
      "error",
      "Analytics are temporarily unavailable.",
    );
  }
};
