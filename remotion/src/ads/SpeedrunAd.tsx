import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontHeading, fontBody } from "../theme";
import { fadeUp, pop, fadeOutTail, rand } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { BrandTile } from "../components/BrandMark";

export const SPEEDRUN_DUR = 600; // 20s

const CYAN = "#22D3EE";
const MAG = "#FF2E97";
const LIME = "#B6FF3C";
const START = 40;
const STOP = 430;

const fmt = (sec: number) => {
  const s = Math.floor(sec);
  const cs = Math.floor((sec - s) * 10);
  return `0:${String(s).padStart(2, "0")}.${cs}`;
};

const SpeedrunBg: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#08060E", overflow: "hidden" }}>
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,151,0.07) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
        maskImage: "radial-gradient(ellipse at center, black 35%, transparent 82%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 82%)",
      }}
    />
    {/* scanlines */}
    <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 2px, transparent 2px 5px)", opacity: 0.5 }} />
  </AbsoluteFill>
);

const GlitchText: React.FC<{ children: React.ReactNode; size: number; color?: string }> = ({
  children,
  size,
  color = "#fff",
}) => {
  const frame = useCurrentFrame();
  const jx = (rand(Math.floor(frame / 2)) - 0.5) * 8;
  const split = 4 + Math.sin(frame / 3) * 3;
  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    fontFamily: fontHeading,
    fontWeight: 800,
    fontSize: size,
    letterSpacing: -1,
    textAlign: "center",
  };
  return (
    <div style={{ position: "relative", height: size * 1.2, transform: `translateX(${jx}px)` }}>
      <div style={{ ...base, color: CYAN, transform: `translateX(${-split}px)`, opacity: 0.8 }}>{children}</div>
      <div style={{ ...base, color: MAG, transform: `translateX(${split}px)`, opacity: 0.8 }}>{children}</div>
      <div style={{ ...base, color }}>{children}</div>
    </div>
  );
};

const Timer: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > 505) return null;
  const elapsed = Math.max(0, (Math.min(frame, STOP) - START) / 30);
  const live = frame < STOP;
  return (
    <div style={{ position: "absolute", top: 90, left: 0, right: 0, textAlign: "center" }}>
      <div style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 28, letterSpacing: 8, color: live ? LIME : "#fff", opacity: 0.8 }}>
        {live ? "● RUNNING" : "✔ FINISHED"}
      </div>
      <div
        style={{
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: 150,
          color: "#fff",
          fontVariantNumeric: "tabular-nums",
          textShadow: `0 0 30px ${live ? CYAN : LIME}cc`,
        }}
      >
        {fmt(elapsed)}
      </div>
    </div>
  );
};

const SPLITS = [
  { label: "Download", t: "0:01.6", d: "-0.3" },
  { label: "Crop 9:16", t: "0:03.4", d: "-0.5" },
  { label: "Find moments", t: "0:05.9", d: "-1.1" },
  { label: "Transcribe", t: "0:07.8", d: "-0.4" },
  { label: "Rewrite hook", t: "0:09.7", d: "-0.8" },
  { label: "Voice + caps", t: "0:11.6", d: "-0.6" },
  { label: "Export ×8", t: "0:13.0", d: "-2.2" },
];

const Run: React.FC = () => {
  const frame = useCurrentFrame();
  const shown = Math.min(SPLITS.length, Math.max(0, Math.floor((frame - 20) / 42)));
  return (
    <AbsoluteFill style={{ paddingTop: 470, alignItems: "center", opacity: fadeOutTail(frame, 330) }}>
      <div style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: CYAN, marginBottom: 24 }}>
        LONG-FORM → 10 SHORTS · any%
      </div>
      <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 12 }}>
        {SPLITS.map((sp, i) => {
          const on = i < shown;
          return (
            <div
              key={sp.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 28px",
                borderRadius: 14,
                background: i === shown - 1 ? "rgba(34,211,238,0.12)" : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                opacity: on ? 1 : 0.12,
                transform: on ? "translateX(0)" : "translateX(40px)",
              }}
            >
              <span style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 34, color: "#fff" }}>
                <span style={{ color: LIME, marginRight: 14 }}>{on ? "✔" : "•"}</span>
                {sp.label}
              </span>
              <span style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
                <span style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 34, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{sp.t}</span>
                <span style={{ fontFamily: fontBody, fontWeight: 800, fontSize: 28, color: LIME }}>{sp.d}</span>
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 40, opacity: fadeOutTail(frame, 100) }}>
      <div style={pop(frame, fps, 0)}>
        <div style={{ width: 740 }}>
          <GlitchText size={92}>SHORTS SPEEDRUN</GlitchText>
        </div>
      </div>
      <div style={{ ...fadeUp(frame, fps, 12), fontFamily: fontBody, fontWeight: 700, fontSize: 40, color: LIME, letterSpacing: 4 }}>
        any% · no editing
      </div>
    </AbsoluteFill>
  );
};

const Finish: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 6, 22], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 360, opacity: fadeOutTail(frame, 80) }}>
      <div style={{ width: 820 }}>
        <GlitchText size={120} color={LIME}>NEW RECORD!</GlitchText>
      </div>
      {/* pixel confetti */}
      {Array.from({ length: 40 }).map((_, i) => {
        const y = interpolate(frame, [0, 60], [600, 600 + rand(i) * 900]);
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${rand(i) * 100}%`,
              top: y,
              width: 14,
              height: 14,
              background: [CYAN, MAG, LIME, "#fff"][i % 4],
              transform: `rotate(${frame * 6 + i}deg)`,
              opacity: interpolate(frame, [0, 10, 70], [0, 1, 0]),
            }}
          />
        );
      })}
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 44, opacity: fadeOutTail(frame, 90) }}>
      <div style={pop(frame, fps, 0)}>
        <BrandTile size={140} />
      </div>
      <div style={{ width: 820 }}>
        <GlitchText size={86}>SPEEDRUN YOUR CONTENT</GlitchText>
      </div>
      <div style={{ ...fadeUp(frame, fps, 20), fontFamily: fontBody, fontWeight: 700, fontSize: 40, color: CYAN }}>
        volfpack.online
      </div>
    </AbsoluteFill>
  );
};

export const SpeedrunAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [Intro, 100],
    [Run, 330],
    [Finish, 80],
    [Outro, 90],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <SpeedrunBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Timer />
      <Soundtrack file={TRACKS.funkBreakbeat} volume={0.5} startFrom={150} />
    </AbsoluteFill>
  );
};
