"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CaptionPhoneProps {
  /** Words rendered as the karaoke caption line. */
  words?: string[];
  /** Optional real clip to play behind the captions. */
  videoUrl?: string;
  /** Small label in the top status chip. */
  label?: string;
  className?: string;
}

const DEFAULT_WORDS = [
  "Nobody",
  "tells",
  "you",
  "this",
  "about",
  "your",
  "first",
  "1,000",
  "users",
];

/**
 * A 9:16 device mock with an animated subject-tracking crop bracket and a
 * karaoke caption that highlights word-by-word — a visual proof of the
 * crop + caption output the pipeline produces.
 */
export function CaptionPhone({
  words = DEFAULT_WORDS,
  videoUrl,
  label = "9:16 · auto-crop",
  className,
}: CaptionPhoneProps) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % (words.length + 3));
    }, 360);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <div
      className={cn(
        "relative aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-[2.2rem] border-[6px] border-foreground/85 bg-foreground/90 shadow-cute-lg",
        className,
      )}
    >
      {/* Screen */}
      <div className="absolute inset-0 overflow-hidden rounded-[1.7rem]">
        {videoUrl ? (
          <video
            src={videoUrl}
            muted
            loop
            autoPlay
            playsInline
            className="size-full object-cover"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-violet-300 via-pink-200 to-sky-300">
            <div className="bg-dots size-full opacity-40" />
          </div>
        )}

        {/* Tint for caption legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

        {/* Notch */}
        <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/50" />

        {/* Status chip */}
        <div className="absolute left-3 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-red-400" />
          {label}
        </div>

        {/* Subject-tracking crop bracket */}
        <div className="animate-scan-y pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2">
          <div className="relative aspect-square w-full">
            {(["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"] as const).map(
              (pos, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "absolute size-5 border-white/90",
                    pos,
                    idx === 0 && "rounded-tl-md border-l-2 border-t-2",
                    idx === 1 && "rounded-tr-md border-r-2 border-t-2",
                    idx === 2 && "rounded-bl-md border-b-2 border-l-2",
                    idx === 3 && "rounded-br-md border-b-2 border-r-2",
                  )}
                />
              ),
            )}
          </div>
        </div>

        {/* Karaoke caption */}
        <div className="absolute inset-x-0 bottom-7 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 px-4 text-center">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={cn(
                "rounded-md px-1.5 py-0.5 font-heading text-sm font-extrabold uppercase tracking-tight transition-all duration-150",
                i === active
                  ? "scale-110 bg-primary text-primary-foreground shadow-cute"
                  : "text-white",
              )}
              style={{ textShadow: i === active ? undefined : "0 1px 6px rgba(0,0,0,0.6)" }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-3 mx-4 h-1 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white/90 transition-all duration-300"
            style={{ width: `${Math.min(100, (active / words.length) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
