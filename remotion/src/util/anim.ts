import { interpolate, spring } from "remotion";

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
