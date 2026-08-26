"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  isStatsPassword,
  STATS_AUTH_COOKIE,
  statsAuthToken,
} from "@/lib/stats-auth";

export const authenticateStats = async (formData: FormData) => {
  const password = String(formData.get("password") ?? "");

  if (!isStatsPassword(password)) {
    redirect("/asdfg/stats?error=1");
  }

  const store = await cookies();
  store.set(STATS_AUTH_COOKIE, statsAuthToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/asdfg/stats");
};
