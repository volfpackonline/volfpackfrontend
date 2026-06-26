import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from "remotion";
import { DURATION_FRAMES, fontBody, theme } from "./theme";
import { Background } from "./components/Background";
import {
  SCENE_DUR,
  Scene01Problem,
  Scene02TimeSink,
  Scene03Feed,
  Scene04Question,
  Scene05Reveal,
  Scene06Magic,
  Scene07Approve,
  Scene08Logo,
} from "./scenes";

/**
 * Background music. Drop a track at `remotion/public/music/track.mp3`, then set
 * this to "music/track.mp3". Left null so the project renders silently out of
 * the box (rendering a missing staticFile would error). See README for sources.
 */
const MUSIC_FILE: string | null =
  "music/sigmamusicart-no-copyright-music-537751.mp3";

/** Soft fade-in over the first ~0.5s and fade-out over the last ~1.3s. */
const musicVolume = (f: number) =>
  interpolate(
    f,
    [0, 15, DURATION_FRAMES - 40, DURATION_FRAMES],
    [0, 0.55, 0.55, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

const SCENES = [
  Scene01Problem,
  Scene02TimeSink,
  Scene03Feed,
  Scene04Question,
  Scene05Reveal,
  Scene06Magic,
  Scene07Approve,
  Scene08Logo,
] as const;

const DURATIONS = [
  SCENE_DUR.problem,
  SCENE_DUR.timeSink,
  SCENE_DUR.feed,
  SCENE_DUR.question,
  SCENE_DUR.reveal,
  SCENE_DUR.magic,
  SCENE_DUR.approve,
  SCENE_DUR.logo,
];

export const VolfPackAd: React.FC = () => {
  let cursor = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.cream, fontFamily: fontBody }}>
      <Background />

      {SCENES.map((SceneComp, i) => {
        const from = cursor;
        cursor += DURATIONS[i];
        return (
          <Sequence key={i} from={from} durationInFrames={DURATIONS[i]}>
            <SceneComp />
          </Sequence>
        );
      })}

      {MUSIC_FILE ? (
        <Audio src={staticFile(MUSIC_FILE)} volume={musicVolume} />
      ) : null}
    </AbsoluteFill>
  );
};
