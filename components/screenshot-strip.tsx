"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  name: string;
};

/**
 * Horizontal scrolling gallery for a project's screenshots. The strip
 * extends past the parent column's right edge (using `width: calc(100vw -
 * --rail-and-pad)`) so it spills into the gutter the map used to occupy.
 * Mouse wheel scrolls horizontally; drag-to-scroll works for mouse users
 * too; prev/next buttons advance by ~85% of the visible width.
 */
export const ScreenshotStrip = ({ images, name }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const recompute = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    recompute();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", recompute, { passive: true });
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", recompute);
      ro.disconnect();
    };
  }, [recompute]);

  const advance = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    // If the user is scrolling vertically, translate to horizontal.
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const dragState = useRef<{ x: number; sl: number; active: boolean }>({
    x: 0,
    sl: 0,
    active: false,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    dragState.current = { x: e.clientX, sl: el.scrollLeft, active: true };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !dragState.current.active) return;
    el.scrollLeft = dragState.current.sl - (e.clientX - dragState.current.x);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    dragState.current.active = false;
    el?.releasePointerCapture(e.pointerId);
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-baseline justify-end gap-3 label-mono">
        <button
          type="button"
          onClick={() => advance(-1)}
          disabled={!canLeft}
          aria-label="scroll left"
          className="px-2 py-1 border border-(--color-rule) hover:border-(--color-accent) hover:text-(--color-accent) disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <CaretLeft size={17} weight="bold" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => advance(1)}
          disabled={!canRight}
          aria-label="scroll right"
          className="px-2 py-1 border border-(--color-rule) hover:border-(--color-accent) hover:text-(--color-accent) disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <CaretRight size={17} weight="bold" aria-hidden="true" />
        </button>
      </div>
      <div
        ref={ref}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="scroll-strip overflow-x-auto"
      >
        <ul className="flex gap-4 pb-3 pr-12 sm:gap-5">
          {images.map((src, i) => (
            <li
              key={src}
              className="aspect-[16/10] w-[calc(100vw-3rem)] max-w-[46rem] shrink-0 lg:w-[min(64rem,calc(100vw-25rem))] lg:max-w-none"
            >
              <figure className="h-full w-full overflow-hidden">
                <Image
                  src={src}
                  alt={`${name} screenshot ${i + 1}`}
                  width={2400}
                  height={1500}
                  draggable={false}
                  sizes="(min-width: 1024px) min(64rem, calc(100vw - 25rem)), (min-width: 640px) min(46rem, calc(100vw - 3rem)), calc(100vw - 3rem)"
                  className="block h-full w-full object-contain select-none"
                  priority={i === 0}
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
