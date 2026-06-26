import { Easing, interpolate, spring } from "remotion";

/** Calm fade + rise. Matches the brand's "gentle, never bouncy" motion. */
export const fadeUp = (
  frame: number,
  fps: number,
  delay = 0,
  distance = 50,
): React.CSSProperties => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`,
  };
};

/** Slightly springy pop for emphasis moments (kept tasteful, not aggressive). */
export const pop = (frame: number, fps: number, delay = 0): React.CSSProperties => {
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 130 },
  });
  return {
    opacity: interpolate(s, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
    transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`,
  };
};

/** Soft cross-fade out near the end of a sequence to avoid hard cuts. */
export const fadeOutTail = (
  frame: number,
  durationInFrames: number,
  tail = 12,
): number =>
  interpolate(frame, [durationInFrames - tail, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Typewriter — returns the slice of `text` revealed by `frame`. */
export const typewriter = (
  frame: number,
  text: string,
  charsPerFrame = 0.7,
  startAt = 0,
): string => text.slice(0, Math.max(0, Math.floor((frame - startAt) * charsPerFrame)));

/** Deterministic pseudo-random in [0,1) from an integer seed (no deps). */
export const rand = (seed: number): number => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Animated integer counter that eases to `to` between two frames. */
export const counter = (
  frame: number,
  from: number,
  to: number,
  start: number,
  end: number,
): number =>
  Math.round(
    interpolate(frame, [start, end], [from, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );
