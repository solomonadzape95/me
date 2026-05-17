"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** Pixels per second. Lower = slower scroll. */
  speed?: number;
  /** Gap (px) between the two text copies in the loop. */
  gap?: number;
};

/**
 * Single-line text that auto-loops horizontally when the rendered string is
 * wider than the available space, so long song titles eventually show in
 * full. When the text fits, it sits still (no animation overhead). Hover
 * pauses the loop so a visitor can read at their own pace; reduced-motion
 * users get a static, truncated version.
 */
export const ScrollingText = ({
  text,
  className,
  speed = 28,
  gap = 28,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const recompute = () => {
      const cw = container.clientWidth;
      const tw = measure.scrollWidth;
      setTextWidth(tw);
      setOverflow(tw > cw + 1);
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    ro.observe(measure);
    return () => ro.disconnect();
  }, [text]);

  const duration = Math.max(6, (textWidth + gap) / speed);

  return (
    <div
      ref={containerRef}
      className={"relative overflow-hidden whitespace-nowrap " + (className ?? "")}
    >
      {/* Off-screen measurement node — always mounted so the ResizeObserver
          has a stable target and we can react to font-load reflows. */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute left-0 top-0 pointer-events-none"
      >
        {text}
      </span>

      {overflow ? (
        <span
          className="marquee-strip inline-flex will-change-transform"
          style={
            {
              animation: `marquee-loop ${duration}s linear infinite`,
              ["--marquee-shift" as string]: `${textWidth + gap}px`,
            } as React.CSSProperties
          }
        >
          <span style={{ paddingRight: `${gap}px` }}>{text}</span>
          <span aria-hidden="true">{text}</span>
        </span>
      ) : (
        <span className="inline-block">{text}</span>
      )}
    </div>
  );
};
