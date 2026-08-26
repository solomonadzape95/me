"use client";

/**
 * Location panel for the left rail. Uses a free CartoDB Positron raster
 * tile (no API key) for Lagos with a small vermillion pin overlaid at the
 * exact lat/lon position. A live local-time readout sits below the tile.
 */

import { LocationTime } from "./location-time";
import { MapPin } from "@phosphor-icons/react";

const LON = 3.3792;
const LAT = 6.5244;
const ZOOM = 11;

// Web Mercator math — tile coordinates at the given zoom + the fractional
// position of (LON, LAT) inside the tile, so the pin lands on the city.
const n = 2 ** ZOOM;
const tileXFrac = ((LON + 180) / 360) * n;
const tileYFrac =
  ((1 -
    Math.log(
      Math.tan((LAT * Math.PI) / 180) + 1 / Math.cos((LAT * Math.PI) / 180),
    ) /
      Math.PI) /
    2) *
  n;
const tileX = Math.floor(tileXFrac);
const tileY = Math.floor(tileYFrac);
const pinXPct = (tileXFrac - tileX) * 100;
const pinYPct = (tileYFrac - tileY) * 100;

const TILE_URL = `https://a.basemaps.cartocdn.com/light_all/${ZOOM}/${tileX}/${tileY}@2x.png`;

export const LocationMap = ({ className }: { className?: string }) => (
  <div className={className ?? ""}>
    <a
      href={`https://www.openstreetmap.org/#map=10/${LAT}/${LON}`}
      target="_blank"
      rel="noreferrer"
      className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3"
      aria-label="View Lagos on OpenStreetMap"
    >
      <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[10px] border border-(--color-rule) bg-[#e8e4d2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TILE_URL}
          alt="Map of Lagos"
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover contrast-[1.08] saturate-[0.9] opacity-90 transition-[filter,opacity] duration-200 group-hover:saturate-100 group-hover:opacity-100"
        />
        <MapPin
          aria-hidden="true"
          size={21}
          weight="fill"
          style={{ left: `${pinXPct}%`, top: `${pinYPct}%` }}
          className="absolute -translate-x-1/2 -translate-y-full text-(--color-accent) drop-shadow-sm"
        />
      </div>
      <div className="min-w-0">
        <div className="label-mono normal-case tracking-[0.04em] text-(--color-ink-soft) transition-colors group-hover:text-(--color-accent)">
          in lagos · utc+1
        </div>
        <LocationTime />
      </div>
    </a>
  </div>
);
