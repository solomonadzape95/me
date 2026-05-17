"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ScrollingText } from "./scrolling-text";

export type NowPlayingData = {
  playing: boolean;
  title?: string;
  artist?: string;
  album?: string;
  art?: string;
  url?: string;
};

const POLL_MS = 30_000;

const NowPlayingContext = createContext<NowPlayingData | null>(null);

export const useNowPlaying = () => useContext(NowPlayingContext);

/**
 * Mounted once at the root so every consumer (rail widget, mobile floating
 * button, mobile drawer) shares a single Last.fm poll. Without this, each
 * mount would fire its own 30s interval and route changes would refetch.
 */
export const NowPlayingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      try {
        const r = await fetch("/api/now-playing", { cache: "no-store" });
        if (!r.ok) return;
        const json = (await r.json()) as NowPlayingData;
        if (!cancelled) setData(json);
      } catch {
        /* widget stays idle on failure */
      }
    };
    tick();
    const id = setInterval(tick, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const value = useMemo(() => data, [data]);
  return (
    <NowPlayingContext.Provider value={value}>
      {children}
    </NowPlayingContext.Provider>
  );
};

export const NowPlaying = () => {
  const data = useNowPlaying();
  const playing = data?.playing ?? false;
  const art = playing ? data?.art : undefined;

  const body = (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 items-center">
      {art ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={art}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          className="block h-14 w-14 border border-(--color-rule) object-cover shrink-0"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex h-14 w-14 items-center justify-center border border-(--color-rule) shrink-0"
        >
          <span
            className={
              "inline-block h-2 w-2 rounded-full " +
              (playing
                ? "bg-(--color-accent) animate-pulse"
                : "bg-(--color-rule)")
            }
          />
        </span>
      )}
      <div className="min-w-0">
        <div className="label-mono">{playing ? "now playing" : "now"}</div>
        {playing && data ? (
          <>
            <ScrollingText
              text={data.title ?? ""}
              className="text-(--color-ink) text-[0.8rem]"
            />
            <ScrollingText
              text={data.artist ?? ""}
              className="text-(--color-ink-soft) text-[0.74rem]"
              speed={22}
            />
          </>
        ) : (
          <div className="text-(--color-ink-soft) text-[0.78rem]">idle</div>
        )}
      </div>
    </div>
  );

  if (playing && data?.url) {
    return (
      <a
        href={data.url}
        target="_blank"
        rel="noreferrer"
        className="block hover:opacity-80 transition-opacity duration-150"
      >
        {body}
      </a>
    );
  }
  return body;
};
