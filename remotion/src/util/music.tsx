import { Audio, interpolate, staticFile, useVideoConfig } from "remotion";

/** Drop-in soundtrack with a soft fade-in and fade-out so it never cuts harshly. */
export const Soundtrack: React.FC<{
  file: string;
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
  startFrom?: number;
}> = ({ file, volume = 0.5, fadeIn = 14, fadeOut = 36, startFrom }) => {
  const { durationInFrames } = useVideoConfig();
  return (
    <Audio
      src={staticFile(file)}
      startFrom={startFrom}
      volume={(f) =>
        interpolate(
          f,
          [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
          [0, volume, volume, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      }
    />
  );
};
