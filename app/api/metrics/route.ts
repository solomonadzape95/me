import { NextResponse } from "next/server";

export async function GET() {
  const websiteId = process.env.WEBSITE_ID;
  const apiKey = process.env.UMAMI_API_KEY;

  if (!websiteId || !apiKey) {
    return NextResponse.json({ error: "Missing WEBSITE_ID or API_KEY" }, { status: 500 });
  }

  const endAt = Date.now();
  const startAt = endAt - 30 * 24 * 60 * 60 * 1000; // last 30 days
  const url = `https://api.umami.is/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-umami-api-key": apiKey,
        "content-type": "application/json",
      },
      // optional:
      // next: { revalidate: 300 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    const visitors = data.visitors
    return NextResponse.json(visitors, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}