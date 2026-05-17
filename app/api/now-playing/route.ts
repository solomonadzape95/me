import { NextResponse } from "next/server";

export const revalidate = 30;

type LastfmTrack = {
  artist: { "#text": string };
  album: { "#text": string };
  name: string;
  url: string;
  image: { "#text": string; size: string }[];
  "@attr"?: { nowplaying?: "true" };
};

type Resp = {
  playing: boolean;
  title?: string;
  artist?: string;
  album?: string;
  art?: string;
  url?: string;
};

const idle: Resp = { playing: false };

// Last.fm's "no album art" placeholder lives at this hash. When the API
// returns this URL we treat it as missing and ask iTunes instead.
const PLACEHOLDER_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

const isReal = (url: string | undefined) =>
  !!url && url.length > 0 && !url.includes(PLACEHOLDER_HASH);

const fetchItunesArt = async (
  artist: string,
  title: string,
): Promise<string | undefined> => {
  try {
    const term = encodeURIComponent(`${artist} ${title}`.trim());
    const url = `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`;
    const r = await fetch(url, {
      next: { revalidate: 600 },
      headers: { Accept: "application/json" },
    });
    if (!r.ok) return undefined;
    const data = (await r.json()) as {
      results?: { artworkUrl100?: string }[];
    };
    const art = data?.results?.[0]?.artworkUrl100;
    if (!art) return undefined;
    // iTunes serves 100×100 by default; swap for a higher-res variant.
    return art.replace("100x100bb", "600x600bb");
  } catch {
    return undefined;
  }
};

export const GET = async () => {
  const key = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USERNAME;
  if (!key || !user) return NextResponse.json(idle);

  const url =
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
    `&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(key)}` +
    `&format=json&limit=1`;

  try {
    const r = await fetch(url, { next: { revalidate: 30 } });
    if (!r.ok) return NextResponse.json(idle);
    const data = (await r.json()) as {
      recenttracks?: { track?: LastfmTrack[] | LastfmTrack };
    };
    const tracks = data?.recenttracks?.track;
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    if (!track) return NextResponse.json(idle);

    const playing = track["@attr"]?.nowplaying === "true";
    const title = track.name;
    const artist = track.artist?.["#text"];
    const album = track.album?.["#text"];

    // Prefer Last.fm's large/extralarge image; if missing or the generic
    // placeholder, fall through to iTunes — which is reliable for any
    // mainstream catalogue and doesn't need an API key.
    const lastfmArt = track.image?.find((i) =>
      ["large", "extralarge"].includes(i.size),
    )?.["#text"];
    let art = isReal(lastfmArt) ? lastfmArt : undefined;
    if (!art && title && artist) {
      art = await fetchItunesArt(artist, title);
    }

    return NextResponse.json({
      playing,
      title,
      artist,
      album,
      art,
      url: track.url,
    } satisfies Resp);
  } catch {
    return NextResponse.json(idle);
  }
};
