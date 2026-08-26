import { NextRequest, NextResponse } from "next/server";

import { type AnalyticsSnapshot } from "@/lib/analytics";
import { getAnalyticsSnapshot } from "@/lib/posthog-server";
import { hasStatsAccess, STATS_AUTH_COOKIE } from "@/lib/stats-auth";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const detailed = request.nextUrl.searchParams.get("detail") === "1";
  const safePath = path.startsWith("/") ? path : "/";

  if (detailed) {
    const authenticated = hasStatsAccess(
      request.cookies.get(STATS_AUTH_COOKIE)?.value,
    );
    if (!authenticated) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401, headers: { "Cache-Control": "private, no-store" } },
      );
    }
  }

  const snapshot = await getAnalyticsSnapshot(safePath.slice(0, 240));

  if (detailed) {
    return NextResponse.json(snapshot, {
      headers: { "Cache-Control": "private, no-store" },
    });
  }

  const publicSnapshot: AnalyticsSnapshot = {
    ...snapshot,
    topLink: null,
    currentPageTopLink: null,
    topProject: null,
    topPages: [],
  };

  return NextResponse.json(publicSnapshot, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
};
