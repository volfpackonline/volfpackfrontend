import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fontHeading, fontBody, shadowCute, gradientText } from "../theme";
import { fadeUp, pop, fadeOutTail } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { Wordmark, BrandTile } from "../components/BrandMark";
import { Chip } from "../components/Chip";

export const FOOTAGE_DUR = 600; // 20s

const FootageBg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF7EF", overflow: "hidden" }}>
      {[
        { c: "#FFE2B0", x: -120, y: 100, s: 520 },
        { c: "#FFD0E4", x: 700, y: 1300, s: 520 },
        { c: "#D9CBFA", x: 540, y: -120, s: 520 },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: 9999, background: b.c, filter: "blur(85px)", opacity: 0.5, transform: `translateY(${Math.sin((frame + i * 70) / 42) * 18}px)` }} />
      ))}
    </AbsoluteFill>
  );
};

/** Two cute eyes that blink and glance around. */
const Eyes: React.FC<{ r?: number; blinkAt?: number; mood?: "sad" | "happy" }> = ({ r = 26, blinkAt = 80, mood = "sad" }) => {
  const frame = useCurrentFrame();
  const blink = frame % blinkAt < 4 ? 0.12 : 1;
  const look = Math.sin(frame / 22) * (r * 0.3);
  const Eye = () => (
    <div style={{ width: r * 2, height: r * 2, borderRadius: 9999, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", transform: `scaleY(${blink})`, boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.1)" }}>
      <div style={{ width: r * 0.9, height: r * 0.9, borderRadius: 9999, background: "#2c2440", transform: `translateX(${look}px) translateY(${mood === "happy" ? -2 : 2}px)` }} />
    </div>
  );
  return (
    <div style={{ display: "flex", gap: r * 0.9 }}>
      <Eye />
      <Eye />
    </div>
  );
};

const SpeechSign: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ padding: "16px 30px", borderRadius: 18, background: "#fff", border: `2px solid ${theme.border}`, boxShadow: shadowCute, fontFamily: fontHeading, fontWeight: 800, fontSize: 34, color: theme.ink }}>
      {children}
    </div>
    <div style={{ width: 10, height: 40, background: "#cf9a55" }} />
  </div>
);

/** The long-video file, with a face. */
const FileGuy: React.FC<{ mood?: "sad" | "happy"; style?: React.CSSProperties }> = ({ mood = "sad", style }) => (
  <div
    style={{
      width: 420,
      height: 270,
      borderRadius: 26,
      background: "linear-gradient(140deg,#c4b5fd,#7dd3fc)",
      boxShadow: shadowCute,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
      ...style,
    }}
  >
    {/* film perforations */}
    {[10, 410 - 28].map((x) => (
      <div key={x} style={{ position: "absolute", left: x === 10 ? 8 : undefined, right: x !== 10 ? 8 : undefined, top: 12, bottom: 12, width: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} style={{ width: 18, height: 18, borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />
        ))}
      </div>
    ))}
    <Eyes r={30} mood={mood} />
    <div style={{ width: mood === "happy" ? 70 : 90, height: mood === "happy" ? 40 : 10, borderRadius: mood === "happy" ? "0 0 60px 60px" : 9999, background: "#2c2440" }} />
    <div style={{ position: "absolute", bottom: 14, fontFamily: fontBody, fontWeight: 700, fontSize: 22, color: "rgba(255,255,255,0.9)" }}>my-podcast.mp4 · 2:14:08</div>
  </div>
);

/** Little vertical clip with a happy face, can walk. */
const ClipChar: React.FC<{ index: number; x: number; y: number; size?: number }> = ({ index, x, y, size = 130 }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin((frame + index * 8) / 6) * 6;
  const grads = ["#c4b5fd,#f9a8d4", "#a8e6cf,#7dd3fc", "#ffd9b3,#ffb3d1", "#bfe3ff,#c9b8f5"];
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: size, height: (size / 9) * 16, borderRadius: 18, background: `linear-gradient(150deg,${grads[index % grads.length]})`, boxShadow: shadowCute, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Eyes r={14} mood="happy" blinkAt={70 + index * 5} />
    </div>
  );
};

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({ dur, children, gap = 40 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: 90, alignItems: "center", justifyContent: "center", textAlign: "center", gap, opacity: fadeOutTail(frame, dur) }}>
      {children}
    </AbsoluteFill>
  );
};

const H: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 84, style }) => (
  <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: size, lineHeight: 1.05, letterSpacing: -2, color: theme.ink, margin: 0, maxWidth: 900, ...style }}>
    {children}
  </h1>
);

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={120} gap={36}>
      <H size={70} style={fadeUp(frame, fps, 0)}>
        Your footage is trying to <span style={gradientText}>tell you something.</span>
      </H>
      <div style={pop(frame, fps, 10)}>
        <FileGuy mood="sad" />
      </div>
      <div style={pop(frame, fps, 26)}>
        <SpeechSign>8 shorts inside… plz 🥺</SpeechSign>
      </div>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const burst = frame > 30;
  return (
    <Shell dur={180} gap={30}>
      <H size={72} style={fadeUp(frame, fps, 0)}>
        So we <span style={gradientText}>let them out.</span>
      </H>
      <div style={{ position: "relative", width: 760, height: 560 }}>
        <div style={{ position: "absolute", left: "50%", top: 150, transform: "translateX(-50%)", opacity: burst ? 0.25 : 1 }}>
          <FileGuy mood="happy" />
        </div>
        <div style={{ position: "absolute", left: "50%", top: 30, transform: "translateX(-50%)", ...pop(frame, fps, 2) }}>
          <BrandTile size={90} />
        </div>
        {burst &&
          Array.from({ length: 8 }).map((_, i) => {
            const ang = (i / 8) * Math.PI * 2;
            const dist = interpolate(frame, [30, 90], [0, 260], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const x = 380 + Math.cos(ang) * dist - 65;
            const y = 280 + Math.sin(ang) * dist * 0.7 - 115;
            return <ClipChar key={i} index={i} x={x} y={y} size={120} />;
          })}
      </div>
    </Shell>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const doors = [
    { l: "TikTok", x: 150 },
    { l: "Reels", x: 460 },
    { l: "Shorts", x: 770 },
  ];
  return (
    <Shell dur={180} gap={20}>
      <H size={66} style={fadeUp(frame, fps, 0)}>
        They just needed a <span style={gradientText}>way out.</span>
      </H>
      <div style={{ position: "relative", width: 1000, height: 620 }}>
        {/* doors */}
        {doors.map((d) => (
          <div key={d.l} style={{ position: "absolute", left: d.x, top: 430 }}>
            <div style={{ width: 160, height: 180, borderRadius: "18px 18px 0 0", background: "linear-gradient(180deg,#fff,#f1ebfb)", border: `2px solid ${theme.border}`, boxShadow: shadowCute }} />
            <Chip dot="#A78BFA" style={{ fontSize: 24, padding: "8px 16px", marginTop: 12 }}>{d.l}</Chip>
          </div>
        ))}
        {/* clip chars walking to doors then jumping in */}
        {Array.from({ length: 6 }).map((_, i) => {
          const door = doors[i % 3];
          const startX = 120 + i * 130;
          const walk = interpolate(frame, [10 + i * 6, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = interpolate(walk, [0, 1], [startX, door.x + 18]);
          const y = interpolate(walk, [0, 0.8, 1], [120, 120, 440]);
          const op = interpolate(walk, [0.85, 1], [1, 0], { extrapolateLeft: "clamp" });
          return (
            <div key={i} style={{ opacity: op }}>
              <ClipChar index={i} x={x} y={y} size={118} />
            </div>
          );
        })}
      </div>
    </Shell>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={120} gap={48}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={124} />
      </div>
      <H size={92} style={fadeUp(frame, fps, 14)}>
        Set your shorts <span style={gradientText}>free.</span>
      </H>
      <div style={fadeUp(frame, fps, 26)}>
        <Chip dot="#A78BFA" style={{ fontSize: 36 }}>volfpack.online · Start free</Chip>
      </div>
    </Shell>
  );
};

export const FootageAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 120],
    [S2, 180],
    [S3, 180],
    [S4, 120],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <FootageBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.acousticSpring} volume={0.5} />
    </AbsoluteFill>
  );
};
