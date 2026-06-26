import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { dark, fontHeading, fontBody } from "../theme";
import { fadeUp, pop, fadeOutTail, counter } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { BrandTile } from "../components/BrandMark";

export const MATH_DUR = 660; // 22s

const LAV = "#B9A4F7";
const SKY = "#7DD3FC";
const glow = (c: string): React.CSSProperties => ({
  color: c,
  textShadow: `0 0 24px ${c}88, 0 0 60px ${c}55`,
});

/** Dark dashboard backdrop: deep plum + grid + glow orbs. */
const DashBg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: dark.bgDeep, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {[
        { c: "#7C5CFF", x: -160, y: 120, s: 560, p: 0 },
        { c: "#2563EB", x: 640, y: 1320, s: 600, p: 120 },
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
            filter: "blur(110px)",
            opacity: 0.4,
            transform: `translateY(${Math.sin((frame + b.p) / 45) * 24}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const StatTile: React.FC<{ value: string; label: string; accent?: string; style?: React.CSSProperties }> = ({
  value,
  label,
  accent = LAV,
  style,
}) => (
  <div
    style={{
      background: dark.card,
      border: `1px solid ${dark.border}`,
      borderRadius: 28,
      padding: "30px 40px",
      minWidth: 230,
      boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
      ...style,
    }}
  >
    <div style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 80, ...glow(accent) }}>
      {value}
    </div>
    <div style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 26, color: dark.inkSoft }}>
      {label}
    </div>
  </div>
);

const BarChart: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const bars = [26, 40, 34, 58, 70, 86, 104];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 20, height: 320 }}>
      {bars.map((h, i) => {
        const grow = interpolate(frame - start, [i * 5, i * 5 + 24], [0, h], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              width: 64,
              height: grow * 2.6,
              borderRadius: 14,
              background: `linear-gradient(180deg, ${LAV}, #6D4FD6)`,
              boxShadow: `0 0 24px ${LAV}66`,
            }}
          />
        );
      })}
    </div>
  );
};

const LineChart: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const w = 720;
  const hgt = 300;
  const ys = [240, 250, 210, 200, 150, 120, 70, 40];
  const pts = ys.map((y, i) => [(i / (ys.length - 1)) * w, y] as const);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const L = 1400;
  const prog = interpolate(frame - start, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const di = Math.min(pts.length - 1, Math.floor(prog * (pts.length - 1)));
  return (
    <svg width={w} height={hgt} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="lc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={LAV} />
          <stop offset="100%" stopColor={SKY} />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill="none"
        stroke="url(#lc)"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={L}
        strokeDashoffset={L * (1 - prog)}
        style={{ filter: `drop-shadow(0 0 14px ${LAV}aa)` }}
      />
      <circle cx={pts[di][0]} cy={pts[di][1]} r={12} fill={SKY} style={{ filter: `drop-shadow(0 0 12px ${SKY})` }} />
    </svg>
  );
};

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({
  dur,
  children,
  gap = 50,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        padding: 100,
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
  size = 92,
  style,
}) => (
  <h1
    style={{
      fontFamily: fontHeading,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.05,
      letterSpacing: -2,
      color: dark.ink,
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
      <div style={{ ...pop(frame, fps, 0), fontFamily: fontHeading, fontWeight: 800, fontSize: 360, ...glow(LAV) }}>
        1
      </div>
      <H style={fadeUp(frame, fps, 16)}>video. Watch this.</H>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = counter(frame, 1, 8, 16, 56);
  return (
    <Shell dur={210} gap={64}>
      <div style={{ display: "flex", alignItems: "center", gap: 34, ...fadeUp(frame, fps, 0) }}>
        <StatTile value="1" label="long video" />
        <span style={{ fontFamily: fontHeading, fontSize: 90, color: dark.inkSoft }}>×</span>
        <StatTile value="8" label="clips inside" accent={SKY} />
      </div>
      <H size={110} style={pop(frame, fps, 18)}>
        = <span style={glow(LAV)}>{n}</span> shorts
      </H>
      <H size={48} style={{ ...fadeUp(frame, fps, 30), color: dark.inkSoft }}>
        from footage you already shot.
      </H>
    </Shell>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = counter(frame, 8, 56, 14, 70);
  return (
    <Shell dur={180} gap={50}>
      <H size={70} style={fadeUp(frame, fps, 0)}>
        × 7 days ={" "}
        <span style={glow(SKY)}>{n}</span> posts / month
      </H>
      <BarChart start={20} />
    </Shell>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90} gap={40}>
      <H size={84} style={fadeUp(frame, fps, 0)}>
        <span style={glow(LAV)}>8×</span> the reach.
      </H>
      <H size={44} style={{ ...fadeUp(frame, fps, 8), color: dark.inkSoft }}>
        Same footage.
      </H>
      <LineChart start={10} />
    </Shell>
  );
};

const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90} gap={46}>
      <div style={pop(frame, fps, 0)}>
        <BrandTile size={130} />
      </div>
      <H size={104} style={fadeUp(frame, fps, 12)}>
        Do the <span style={glow(LAV)}>math.</span>
      </H>
      <div
        style={{
          ...fadeUp(frame, fps, 24),
          padding: "16px 34px",
          borderRadius: 9999,
          background: dark.card,
          border: `1px solid ${dark.border}`,
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 36,
          color: dark.ink,
        }}
      >
        volfpack.online · Start free
      </div>
    </Shell>
  );
};

export const MathAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 90],
    [S2, 210],
    [S3, 180],
    [S4, 90],
    [S5, 90],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <DashBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.funkBreakbeat} volume={0.5} />
    </AbsoluteFill>
  );
};
