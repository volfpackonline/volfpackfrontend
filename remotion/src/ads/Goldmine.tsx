import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fontHeading, fontBody, shadowCute } from "../theme";
import { fadeUp, pop, fadeOutTail, rand, counter } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { PhoneMock } from "../components/PhoneMock";
import { Wordmark } from "../components/BrandMark";
import { Chip } from "../components/Chip";

export const GOLDMINE_DUR = 720; // 24s

const GOLD = "#F5B544";
const goldGradient = "linear-gradient(90deg, #f5b544 0%, #f472b6 55%, #a78bfa 100%)";
const goldText: React.CSSProperties = {
  backgroundImage: goldGradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/** Warm cream backdrop with peach/amber treasure blobs. */
const GoldmineBg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFBF2", overflow: "hidden" }}>
      {[
        { c: "#FFE2B0", x: -120, y: 80, s: 560, p: 0 },
        { c: "#FFD0E4", x: 700, y: 1240, s: 520, p: 90 },
        { c: "#E9DCFB", x: 560, y: -120, s: 600, p: 200 },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            borderRadius: 9999,
            background: b.c,
            filter: "blur(80px)",
            opacity: 0.55,
            transform: `translateY(${Math.sin((frame + b.p) / 40) * 22}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/** A 16:9 "old video" thumbnail; greys out unless `lit`. */
const Thumb: React.FC<{ seed: number; lit?: boolean; style?: React.CSSProperties }> = ({
  seed,
  lit,
  style,
}) => {
  const hue = Math.floor(rand(seed) * 360);
  return (
    <div
      style={{
        width: 196,
        height: 110,
        borderRadius: 16,
        background: `linear-gradient(140deg, hsl(${hue} 70% 78%), hsl(${
          (hue + 50) % 360
        } 70% 70%))`,
        filter: lit ? "none" : "grayscale(1) brightness(0.92) contrast(0.95)",
        boxShadow: lit ? "0 0 0 5px rgba(245,181,68,0.9), 0 24px 50px rgba(245,181,68,0.45)" : shadowCute,
        position: "relative",
        transform: lit ? "scale(1.12)" : "scale(1)",
        opacity: lit ? 1 : 0.85,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.9)",
          fontSize: 30,
        }}
      >
        ▶
      </div>
      <div
        style={{
          position: "absolute",
          right: 8,
          bottom: 8,
          padding: "2px 8px",
          borderRadius: 6,
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          fontFamily: fontBody,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {20 + (seed % 40)}:0{seed % 6}
      </div>
    </div>
  );
};

/** Sparkles + coins bursting outward from a point. */
const SparkleBurst: React.FC<{ start: number; count?: number }> = ({ start, count = 22 }) => {
  const frame = useCurrentFrame();
  const t = frame - start;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const ang = rand(i) * Math.PI * 2;
        const dist = interpolate(t, [0, 50], [0, 260 + rand(i + 9) * 240], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const op = interpolate(t, [0, 8, 40, 60], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const glyph = i % 3 === 0 ? "🪙" : "✨";
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "46%",
              fontSize: 22 + rand(i + 3) * 26,
              opacity: op,
              transform: `translate(${Math.cos(ang) * dist}px, ${
                Math.sin(ang) * dist
              }px) rotate(${t * 4}deg)`,
            }}
          >
            {glyph}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({
  dur,
  children,
  gap = 46,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        padding: 110,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap,
        opacity: fadeOutTail(frame, dur),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const H: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = 100,
  style,
}) => (
  <h1
    style={{
      fontFamily: fontHeading,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.03,
      letterSpacing: -2,
      color: theme.ink,
      margin: 0,
      maxWidth: 900,
      ...style,
    }}
  >
    {children}
  </h1>
);

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90}>
      <div style={fadeUp(frame, fps, 0)}>
        <Chip dot={GOLD} background="#FFF1D6">
          Hey, creator 👋
        </Chip>
      </div>
      <H style={fadeUp(frame, fps, 8)}>
        You&apos;re sitting on a <span style={goldText}>goldmine.</span>
      </H>
      <div style={{ ...pop(frame, fps, 22), fontSize: 130 }}>💰</div>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // spotlight scans, then one card lights up
  const litIndex = 7;
  const lit = frame > 70;
  return (
    <Shell dur={210} gap={64}>
      <H size={76} style={fadeUp(frame, fps, 0)}>
        Every long video you&apos;ve ever posted…
      </H>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 196px)",
          gap: 26,
          position: "relative",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={pop(frame, fps, 6 + i * 3)}>
            <Thumb seed={i + 2} lit={lit && i === litIndex} />
          </div>
        ))}
      </div>
    </Shell>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = counter(frame, 0, 12, 20, 70);
  return (
    <Shell dur={210} gap={50}>
      <SparkleBurst start={6} />
      <div
        style={{
          ...pop(frame, fps, 0),
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: 180,
          ...goldText,
        }}
      >
        {n}
      </div>
      <H size={80} style={fadeUp(frame, fps, 18)}>
        shorts hiding in <span style={goldText}>one</span> video.
      </H>
      <p
        style={{
          ...fadeUp(frame, fps, 30),
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 40,
          color: theme.inkSoft,
          margin: 0,
        }}
      >
        You never cut a single one.
      </p>
    </Shell>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={120} gap={48}>
      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        <div style={pop(frame, fps, 4)}>
          <PhoneMock words={["Dig", "out", "every", "clip"]} width={380} />
        </div>
        <H size={84} style={{ ...fadeUp(frame, fps, 12), textAlign: "left", maxWidth: 460 }}>
          VolfPack digs them <span style={goldText}>all out.</span>
        </H>
      </div>
    </Shell>
  );
};

const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90} gap={50}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={120} />
      </div>
      <H size={70} style={fadeUp(frame, fps, 14)}>
        Your archive is a <span style={goldText}>content library.</span>
      </H>
      <div style={fadeUp(frame, fps, 26)}>
        <Chip dot={GOLD} style={{ fontSize: 36 }}>
          volfpack.online · Start free
        </Chip>
      </div>
    </Shell>
  );
};

export const GoldmineAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 90],
    [S2, 210],
    [S3, 210],
    [S4, 120],
    [S5, 90],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <GoldmineBg />
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
