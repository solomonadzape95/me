/**
 * Location panel for the left rail. Uses a free CartoDB Positron raster
 * tile (no API key) for Lagos with a small vermillion pin overlaid at the
 * exact lat/lon position. A live local-time readout sits below the tile.
 */

import { LocationTime } from "./location-time";

const LON = 3.3792;
const LAT = 6.5244;
const ZOOM = 8;

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
  <div className={"space-y-2 " + (className ?? "")}>
    <a
      href={`https://www.openstreetmap.org/#map=10/${LAT}/${LON}`}
      target="_blank"
      rel="noreferrer"
      className="group block"
      aria-label="View Lagos on OpenStreetMap"
    >
      <div className="relative w-full aspect-square border border-(--color-rule) overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TILE_URL}
          alt="Lagos"
          loading="lazy"
          decoding="async"
          className="block w-full h-full object-cover grayscale opacity-80 transition-[filter,opacity] duration-200 group-hover:grayscale-0 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          style={{ left: `${pinXPct}%`, top: `${pinYPct}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 block w-2.5 h-2.5 rounded-full bg-(--color-accent) ring-2 ring-(--color-accent)/30"
        />
      </div>
    </a>
    <div className="label-mono normal-case tracking-[0.04em]">
      lagos · UTC+1
    </div>
    <LocationTime />
  </div>
);
