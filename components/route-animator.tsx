"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Route-tree directional transitions: every route has an (x, y) position in
 * a small conceptual map. When the visitor navigates, the new page enters
 * from the direction `newPos − prevPos`, so deeper pages slide in from
 * below, sibling pages slide in horizontally, etc. The map is hand-tuned
 * for the small route surface here — projects sit under their parent at
 * (-0.5, 2) so they descend toward the left-bottom from the /projects hub.
 */

const POSITIONS: Record<string, [number, number]> = {
  "/": [0, 0],
  "/about": [-1.5, 1],
  "/projects": [-0.5, 1],
  "/contact": [0.5, 1],
  "/resume": [1.5, 1],
};

const positionOf = (path: string): [number, number] => {
  if (POSITIONS[path]) return POSITIONS[path];
  if (path.startsWith("/projects/")) return [-0.5, 2];
  return [0, 0];
};

const MAG = 1.25; // rem multiplier for the slide-in distance

export const RouteAnimator = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const dir = useRef<[number, number]>([0, 0]);

  if (prev.current !== pathname) {
    const [px, py] = positionOf(prev.current);
    const [cx, cy] = positionOf(pathname);
    dir.current = [cx - px, cy - py];
    prev.current = pathname;
  }

  // Keep ref in sync if the effect needs to handle subsequent updates.
  useEffect(() => {
    prev.current = pathname;
  }, [pathname]);

  const [dx, dy] = dir.current;

  return (
    <div
      key={pathname}
      className="route-in"
      style={
        {
          "--rdx": `${dx * MAG}rem`,
          "--rdy": `${dy * MAG}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
