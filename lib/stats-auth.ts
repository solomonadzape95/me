import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

export const STATS_AUTH_COOKIE = "portfolio_stats_auth";

const statsPassword = () => process.env.STATS_PASSWORD ?? "admin_password";

const digest = (value: string) =>
  createHash("sha256").update(value).digest();

export const isStatsPassword = (candidate: string) =>
  timingSafeEqual(digest(candidate), digest(statsPassword()));

export const statsAuthToken = () =>
  createHash("sha256")
    .update(`portfolio-stats:${statsPassword()}`)
    .digest("hex");

export const hasStatsAccess = (cookieValue: string | undefined) =>
  cookieValue === statsAuthToken();
