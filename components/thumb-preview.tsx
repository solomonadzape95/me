"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export type Preview = {
  slug: string;
  src: string;
  x: number;
  y: number;
};

type Props = {
  preview: Preview | null;
};

/**
 * Floating image preview attached to the cursor. Rendered to document.body
 * via a portal so it sits above the grid and won't be clipped by `min-w-0`
 * grids. Hidden on touch / narrow viewports — the parent decides whether
 * to feed it preview data.
 */
export const ThumbPreview = ({ preview }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const visible = preview != null;
  const x = preview?.x ?? 0;
  const y = preview?.y ?? 0;

  // Clamp to viewport so the preview never escapes the right/bottom edge.
  const W = 560;
  const H = 360;
  const pad = 32;
  const ox =
    typeof window === "undefined"
      ? 0
      : Math.min(window.innerWidth - W - pad, x + 24);
  const oy =
    typeof window === "undefined"
      ? 0
      : Math.min(window.innerHeight - H - pad, y + 16);

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-50 transition-opacity duration-150"
      style={{
        left: ox,
        top: oy,
        opacity: visible ? 1 : 0,
        width: W,
      }}
    >
      {preview && (
        <div className="border border-(--color-rule) bg-(--color-paper) overflow-hidden shadow-xl">
          <Image
            key={preview.src}
            src={preview.src}
            alt=""
            width={1600}
            height={1000}
            sizes="560px"
            className="block w-full h-auto"
          />
        </div>
      )}
    </div>,
    document.body,
  );
};
