"use client";

import { X } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  className?: string;
};

export const SolenoidName = ({ className = "" }: Props) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 16 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const positionStory = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    const width = Math.min(432, window.innerWidth - 32);
    setPosition({
      top: (rect?.bottom ?? 120) + 10,
      left: Math.max(
        16,
        Math.min(rect?.left ?? 16, window.innerWidth - width - 16),
      ),
    });
  }, []);

  const openStory = useCallback(() => {
    positionStory();
    setOpen(true);
  }, [positionStory]);

  useEffect(() => {
    window.addEventListener("open-solenoid-story", openStory);
    return () => window.removeEventListener("open-solenoid-story", openStory);
  }, [openStory]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", positionStory);
    window.addEventListener("scroll", positionStory, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", positionStory);
      window.removeEventListener("scroll", positionStory, true);
    };
  }, [open, positionStory]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openStory}
        className={`font-brand mx-1 inline-block translate-y-[0.08em] text-[1.75rem] leading-none tracking-[0.025em] text-(--color-ink) transition-colors hover:text-(--color-accent) ${className}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        solenoid
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] bg-black/20 backdrop-blur-[2px]"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="solenoid-title"
              style={{
                top: position.top,
                left: position.left,
                maxHeight: `calc(100dvh - ${position.top}px - 1rem)`,
              }}
              className="fixed w-[min(27rem,calc(100vw-2rem))] overflow-y-auto rounded-[14px] border border-(--color-rule) bg-(--color-paper) p-5 shadow-2xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="label-mono mb-2">the name</p>
                  <h2
                    id="solenoid-title"
                    className="font-brand text-[3rem] lowercase leading-none tracking-[0.025em]"
                  >
                    solenoid
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="close"
                  className="display-toggle shrink-0"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>
              <div className="mt-6 space-y-4 text-[0.96rem] leading-relaxed text-(--color-ink-soft)">
                <p>
                  it started with a mispronunciation of “solomon.” “solenoid”
                  came out instead, and the name stuck.
                </p>
                <p>
                  a solenoid is a coil of wire that creates a magnetic field
                  when electricity passes through it.
                </p>
                <a
                  href="https://en.wikipedia.org/wiki/Solenoid"
                  className="text-(--color-ink) link-underline"
                >
                  read about solenoids on wikipedia
                </a>
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
};
