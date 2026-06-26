import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fontHeading, fontBody, shadowCute, gradientText } from "../theme";
import { fadeUp, pop, fadeOutTail } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { BrandTile } from "../components/BrandMark";

export const ODDLY_DUR = 540; // 18s

const TILE_GRAD = [
  "linear-gradient(150deg,#c4b5fd,#f9a8d4)",
  "linear-gradient(150deg,#a8e6cf,#7dd3fc)",
  "linear-gradient(150deg,#ffd9b3,#ffb3d1)",
  "linear-gradient(150deg,#bfe3ff,#c9b8f5)",
  "linear-gradient(150deg,#f9a8d4,#c4b5fd)",
  "linear-gradient(150deg,#7dd3fc,#a8e6cf)",
  "linear-gradient(150deg,#ffb3d1,#ffd9b3)",
  "linear-gradient(150deg,#c9b8f5,#bfe3ff)",
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Stage: React.FC = () => {
  const frame = useCurrentFrame();
  const N = 8;
  // bar geometry
  const barW = 880;
  const barH = 220;
  const cx0 = 540;
  const cy0 = 760;
  const barLeft = cx0 - barW / 2;
  const segW = barW / N;
  // grid geometry (4 cols x 2 rows of vertical tiles)
  const cols = 4;
  const tileW = 168;
  const tileH = 298;
  const gx = 36;
  const gy = 40;
  const gridW = cols * tileW + (cols - 1) * gx;
  const gridLeft = cx0 - gridW / 2;
  const gridTop = 560;

  const bladeX = interpolate(frame, [10, 118], [barLeft - 10, barLeft + barW + 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bladeOp = interpolate(frame, [6, 14, 118, 134], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let arrived = 0;

  return (
    <AbsoluteFill>
      {Array.from({ length: N }).map((_, i) => {
        const oCx = barLeft + i * segW + segW / 2;
        const oCy = cy0;
        const row = Math.floor(i / cols);
        const col = i % cols;
        const tCx = gridLeft + col * (tileW + gx) + tileW / 2;
        const tCy = gridTop + row * (tileH + gy) + tileH / 2;

        const p = interpolate(frame, [140 + i * 7, 300], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.cubic),
        });
        if (p > 0.92) arrived++;

        const cx = lerp(oCx, tCx, p);
        const cy = lerp(oCy, tCy, p);
        const w = lerp(segW - p * 2, tileW, p);
        const h = lerp(barH, tileH, p);
        const radius = lerp(2, 26, p);
        const gap = p > 0.05 ? 3 : 0;

        // cut line reveal as blade passes (during slicing)
        const cutShown = bladeX > oCx + segW / 2 - 2 && p < 0.05;

        // ripple caption after arrival
        const capProg = interpolate(frame, [310 + i * 4, 360 + i * 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - w / 2 + gap,
              top: cy - h / 2,
              width: w - gap * 2,
              height: h,
              borderRadius: radius,
              background: TILE_GRAD[i],
              boxShadow: p > 0.1 ? shadowCute : "none",
              overflow: "hidden",
            }}
          >
            {cutShown ? (
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 3, background: "rgba(0,0,0,0.25)" }} />
            ) : null}
            {/* ripple caption bar */}
            {p > 0.85 ? (
              <div
                style={{
                  position: "absolute",
                  left: "12%",
                  right: "12%",
                  bottom: 28,
                  height: 16,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.95)",
                  transform: `scaleX(${capProg})`,
                  transformOrigin: "left",
                }}
              />
            ) : null}
          </div>
        );
      })}

      {/* blade */}
      <div
        style={{
          position: "absolute",
          left: bladeX,
          top: cy0 - barH / 2 - 30,
          width: 6,
          height: barH + 60,
          background: "linear-gradient(180deg,#fff,#e9d8ff)",
          borderRadius: 9999,
          boxShadow: "0 0 24px rgba(167,139,250,0.9)",
          opacity: bladeOp,
        }}
      />

      {/* counter */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [150, 200, 470, 500], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 200, ...gradientText }}>
          {arrived}
        </span>
      </div>
    </AbsoluteFill>
  );
};

const End: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40, opacity: fadeOutTail(frame, 90) }}>
      <div style={pop(frame, fps, 0)}>
        <BrandTile size={150} />
      </div>
      <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 130, margin: 0, letterSpacing: -2, color: theme.ink }}>
        1 <span style={gradientText}>→</span> 8
      </h1>
      <div
        style={{
          ...fadeUp(frame, fps, 16),
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 40,
          color: theme.inkSoft,
        }}
      >
        volfpack.online
      </div>
    </AbsoluteFill>
  );
};

const OddlyBg: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg,#FFFDF9,#F6F1FA)" }} />
);

export const OddlyAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <OddlyBg />
      <Sequence from={0} durationInFrames={450}>
        <Stage />
      </Sequence>
      <Sequence from={450} durationInFrames={90}>
        <End />
      </Sequence>
      <Soundtrack file={TRACKS.honeyKisses} volume={0.42} />
    </AbsoluteFill>
  );
};
