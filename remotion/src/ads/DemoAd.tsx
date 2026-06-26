import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fontHeading, fontBody, shadowCute, gradientText } from "../theme";
import { fadeUp, pop, fadeOutTail, typewriter, counter } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { ShortCard } from "../components/ShortCard";
import { Wordmark } from "../components/BrandMark";
import { Chip } from "../components/Chip";

export const DEMO_DUR = 540; // 18s

const DemoBg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FBF9FF", overflow: "hidden" }}>
      {[
        { c: "#D9CBFA", x: -120, y: 120, s: 520 },
        { c: "#BFE3FF", x: 680, y: 1280, s: 520 },
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
            filter: "blur(90px)",
            opacity: 0.5,
            transform: `translateY(${Math.sin((frame + i * 80) / 44) * 18}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/** A browser/app window chrome wrapper. */
const AppWindow: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      width: 880,
      borderRadius: 28,
      background: "#fff",
      border: `1px solid ${theme.border}`,
      boxShadow: "0 40px 90px rgba(124,58,237,0.22)",
      overflow: "hidden",
      ...style,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px", borderBottom: `1px solid ${theme.border}` }}>
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
        <span key={c} style={{ width: 16, height: 16, borderRadius: 9999, background: c }} />
      ))}
      <div
        style={{
          marginLeft: 16,
          flex: 1,
          padding: "10px 22px",
          borderRadius: 9999,
          background: theme.muted,
          fontFamily: fontBody,
          fontSize: 24,
          color: theme.inkSoft,
        }}
      >
        🔒 volfpack.online/studio
      </div>
    </div>
    <div style={{ padding: 36 }}>{children}</div>
  </div>
);

const PHASES = [
  "Download source",
  "Crop to 9:16",
  "Find best moments",
  "Clean frames",
  "Transcribe",
  "Rewrite the hook",
  "Voice + captions",
  "Export",
];

const PipelineChecklist: React.FC<{ start: number; step?: number }> = ({ start, step = 11 }) => {
  const frame = useCurrentFrame();
  const done = Math.max(0, Math.floor((frame - start) / step));
  const pct = Math.min(100, (done / PHASES.length) * 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ height: 14, borderRadius: 9999, background: theme.muted, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 9999,
            background: "linear-gradient(90deg,#a78bfa,#f472b6,#38bdf8)",
          }}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {PHASES.map((p, i) => {
          const isDone = i < done;
          const isActive = i === done;
          return (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                borderRadius: 16,
                background: isActive ? "rgba(167,139,250,0.12)" : "transparent",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isDone ? theme.primary : isActive ? "rgba(167,139,250,0.25)" : theme.muted,
                  color: isDone ? "#fff" : theme.primary,
                  fontFamily: fontBody,
                  fontWeight: 800,
                  fontSize: 20,
                  transform: `rotate(${isActive ? (frame % 360) * 6 : 0}deg)`,
                }}
              >
                {isDone ? "✓" : isActive ? "◓" : i + 1}
              </span>
              <span
                style={{
                  fontFamily: fontBody,
                  fontWeight: 600,
                  fontSize: 26,
                  color: isDone || isActive ? theme.ink : theme.inkSoft,
                }}
              >
                {p}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({
  dur,
  children,
  gap = 44,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        padding: 90,
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
      lineHeight: 1.04,
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
  const url = "youtube.com/watch?v=your-podcast";
  const typed = typewriter(frame, url, 0.9, 12);
  return (
    <Shell dur={120} gap={50}>
      <H style={fadeUp(frame, fps, 0)}>
        Long video → <span style={gradientText}>8 shorts.</span> Watch.
      </H>
      <div style={pop(frame, fps, 8)}>
        <AppWindow>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                flex: 1,
                padding: "22px 26px",
                borderRadius: 18,
                background: theme.muted,
                fontFamily: fontBody,
                fontSize: 28,
                color: theme.ink,
                textAlign: "left",
              }}
            >
              🔗 {typed}
              <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
            </div>
            <div
              style={{
                padding: "22px 40px",
                borderRadius: 18,
                background: theme.primary,
                color: "#fff",
                fontFamily: fontHeading,
                fontWeight: 800,
                fontSize: 30,
              }}
            >
              Generate
            </div>
          </div>
        </AppWindow>
      </div>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={150} gap={40}>
      <H size={64} style={fadeUp(frame, fps, 0)}>
        Eight phases, <span style={gradientText}>fully automated.</span>
      </H>
      <div style={pop(frame, fps, 6)}>
        <AppWindow>
          <PipelineChecklist start={14} step={13} />
        </AppWindow>
      </div>
    </Shell>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = counter(frame, 0, 8, 10, 90);
  return (
    <Shell dur={180} gap={42}>
      <H size={84} style={fadeUp(frame, fps, 0)}>
        <span style={gradientText}>{n}</span> shorts ready.
      </H>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const s = pop(frame, fps, 10 + i * 9);
          const drop = interpolate(frame, [10 + i * 9, 26 + i * 9], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={i} style={{ opacity: s.opacity, transform: `translateY(${drop}px) ${s.transform ?? ""}` }}>
              <ShortCard index={i} width={150} approved={frame > 70 + i * 4} score={80 + ((i * 5) % 18)} />
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
    <Shell dur={90} gap={50}>
      <H size={78} style={fadeUp(frame, fps, 0)}>
        Post <span style={gradientText}>everywhere.</span>
      </H>
      <div style={{ display: "flex", gap: 18 }}>
        {[
          { label: "TikTok", dot: "#69C9D0" },
          { label: "Reels", dot: "#E1306C" },
          { label: "Shorts", dot: "#FF0000" },
        ].map((p, i) => (
          <div key={p.label} style={pop(frame, fps, 6 + i * 6)}>
            <Chip dot={p.dot}>{p.label}</Chip>
          </div>
        ))}
      </div>
    </Shell>
  );
};

const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={60} gap={44}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={118} />
      </div>
      <H size={88} style={fadeUp(frame, fps, 10)}>
        That <span style={gradientText}>fast.</span>
      </H>
      <div style={fadeUp(frame, fps, 20)}>
        <Chip dot="#A78BFA" style={{ fontSize: 34 }}>
          volfpack.online · Free to start
        </Chip>
      </div>
    </Shell>
  );
};

export const DemoAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 120],
    [S2, 150],
    [S3, 180],
    [S4, 90],
    [S5, 60],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <DemoBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.funkBreakbeat} volume={0.5} startFrom={300} />
    </AbsoluteFill>
  );
};
