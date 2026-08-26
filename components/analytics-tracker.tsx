"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

type EventProperties = Record<string, string | number | boolean | null | undefined>;

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

const anonymousId = (storage: Storage, key: string) => {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const created = crypto.randomUUID();
    storage.setItem(key, created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
};

const capturePostHog = (event: string, properties: EventProperties = {}) => {
  if (!posthogKey || typeof window === "undefined") return;

  const body = JSON.stringify({
    api_key: posthogKey,
    event,
    properties: {
      $process_person_profile: false,
      distinct_id: anonymousId(localStorage, "portfolio_visitor_id"),
      session_id: anonymousId(sessionStorage, "portfolio_session_id"),
      site: "portfolio",
      host: window.location.hostname,
      environment: process.env.NODE_ENV,
      ...properties,
    },
  });

  try {
    if (navigator.sendBeacon?.("/ingest/capture/", new Blob([body], { type: "application/json" }))) {
      return;
    }
    void fetch("/ingest/capture/", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    });
  } catch {
    // Analytics must never interrupt navigation or scrolling.
  }
};

const linkRole = (anchor: HTMLAnchorElement, path: string) => {
  const explicit = anchor.dataset.analyticsRole;
  if (explicit) return explicit;

  const description = `${anchor.title} ${anchor.getAttribute("aria-label") ?? ""}`.toLowerCase();
  if (description.includes("github") || description.includes("source")) {
    return "source";
  }
  if (description.includes("live site") || description.includes("live project")) {
    return "live";
  }

  const target = new URL(anchor.href, window.location.href);
  if (path.startsWith("/projects/") && target.origin !== window.location.origin) {
    return target.hostname.includes("github.com") ? "source" : "live";
  }
  return target.origin === window.location.origin ? "internal" : "outbound";
};

export const AnalyticsTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    capturePostHog("portfolio_pageview", {
      path: pathname,
      title: document.title,
      referrer: document.referrer || null,
    });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.dataset.analyticsIgnore !== undefined) return;

      const target = new URL(anchor.href, window.location.href);
      const href =
        target.protocol === "http:" || target.protocol === "https:"
          ? target.origin === window.location.origin
            ? `${target.pathname}${target.search}${target.hash}`
            : `${target.origin}${target.pathname}`
          : anchor.getAttribute("href") ?? anchor.href;
      const label =
        anchor.getAttribute("aria-label")?.trim() ||
        anchor.textContent?.replace(/\s+/g, " ").trim().slice(0, 120) ||
        href;
      const role = linkRole(anchor, pathname);

      window.umami?.track("link-click", {
        href,
        label,
        path: pathname,
        role,
      });
      capturePostHog("portfolio_link_click", {
        href,
        label,
        path: pathname,
        role,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    let distance = 0;
    let frame = 0;

    const sample = () => {
      const nextY = window.scrollY;
      const delta = Math.abs(nextY - lastY);
      distance += delta;
      lastY = nextY;
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sample);
    };

    const flush = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        sample();
      }
      if (distance > 0) {
        window.umami?.track("scroll-distance", {
          path: pathname,
          pixels: Math.round(distance),
        });
        capturePostHog("portfolio_scroll_distance", {
          path: pathname,
          pixels: Math.round(distance),
        });
        distance = 0;
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      flush();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pathname]);

  return null;
};
