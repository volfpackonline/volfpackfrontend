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
import { Wordmark } from "../components/BrandMark";
import { Chip } from "../components/Chip";

export const RECIPE_DUR = 660; // 22s

const RecipeBg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF6EA", overflow: "hidden" }}>
      {[
        { c: "#FFE2B0", x: -120, y: 120, s: 520 },
        { c: "#FFD0E4", x: 700, y: 1300, s: 500 },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: 9999, background: b.c, filter: "blur(85px)", opacity: 0.5, transform: `translateY(${Math.sin((frame + i * 80) / 44) * 16}px)` }} />
      ))}
    </AbsoluteFill>
  );
};

const RecipeCard: React.FC<{ title: string; emoji: string; children: React.ReactNode }> = ({ title, emoji, children }) => (
  <div style={{ width: 820, borderRadius: 30, background: "#fff", boxShadow: shadowCute, overflow: "hidden", border: `1px solid ${theme.border}` }}>
    <div style={{ background: "linear-gradient(135deg,#f5b544,#f472b6)", padding: "30px 40px", display: "flex", alignItems: "center", gap: 18 }}>
      <span style={{ fontSize: 56 }}>{emoji}</span>
      <span style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 52, color: "#fff" }}>{title}</span>
    </div>
    <div
      style={{
        padding: "36px 46px",
        backgroundImage: "repeating-linear-gradient(180deg, transparent 0 63px, rgba(167,139,250,0.12) 63px 65px)",
      }}
    >
      {children}
    </div>
  </div>
);

const Row: React.FC<{ at: number; children: React.ReactNode; num?: number }> = ({ at, children, num }) => {
  const frame = useCurrentFrame();
  const on = frame >= at;
  const tick = interpolate(frame, [at, at + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, height: 88, opacity: on ? 1 : 0.25, transform: on ? "translateX(0)" : "translateX(20px)" }}>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: num ? 14 : 9999,
          background: tick > 0.4 ? theme.primary : theme.muted,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: 30,
          flexShrink: 0,
        }}
      >
        {num ? num : tick > 0.4 ? "✓" : ""}
      </div>
      <span style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 40, color: theme.ink }}>{children}</span>
    </div>
  );
};

const PlatedShort: React.FC<{ index: number; w?: number }> = ({ index, w = 150 }) => {
  const grads = ["#c4b5fd,#f9a8d4", "#a8e6cf,#7dd3fc", "#ffd9b3,#ffb3d1", "#bfe3ff,#c9b8f5"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* clip */}
      <div style={{ width: w, height: (w / 9) * 16, borderRadius: 16, background: `linear-gradient(150deg,${grads[index % 4]})`, boxShadow: shadowCute, position: "relative", overflow: "hidden" }}>
        {/* sprinkle captions */}
        <div style={{ position: "absolute", left: 10, right: 10, bottom: 16, display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
          {[30, 20, 36].map((bw, i) => (
            <span key={i} style={{ width: bw, height: 8, borderRadius: 4, background: i === 1 ? theme.primary : "rgba(255,255,255,0.95)" }} />
          ))}
        </div>
      </div>
      {/* plate */}
      <div style={{ width: w * 1.5, height: 34, borderRadius: "0 0 9999px 9999px", background: "radial-gradient(ellipse at center top, #ffffff, #ece6f2)", boxShadow: "0 16px 26px rgba(124,58,237,0.16)", marginTop: -6 }} />
    </div>
  );
};

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({ dur, children, gap = 44 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: 80, alignItems: "center", justifyContent: "center", textAlign: "center", gap, opacity: fadeOutTail(frame, dur) }}>
      {children}
    </AbsoluteFill>
  );
};

const H: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 80, style }) => (
  <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: size, lineHeight: 1.05, letterSpacing: -2, color: theme.ink, margin: 0, maxWidth: 900, ...style }}>
    {children}
  </h1>
);

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={180} gap={40}>
      <div style={fadeUp(frame, fps, 0)}>
        <Chip dot="#f5b544" background="#FFF1D6">Today&apos;s recipe 👩‍🍳</Chip>
      </div>
      <div style={pop(frame, fps, 6)}>
        <RecipeCard title="A week of shorts" emoji="🍳">
          <div style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 36, color: theme.inkSoft, marginBottom: 6 }}>Ingredients</div>
          <Row at={30}>1 long video</Row>
          <Row at={60}>0 editing skills</Row>
          <Row at={90}>5 minutes</Row>
        </RecipeCard>
      </div>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={210} gap={36}>
      <div style={pop(frame, fps, 0)}>
        <RecipeCard title="Method" emoji="📋">
          <Row at={20} num={1}>Paste the link</Row>
          <Row at={60} num={2}>Pick your flavor — crop, voice, captions</Row>
          <Row at={100} num={3}>Let it cook 🔥</Row>
        </RecipeCard>
      </div>
    </Shell>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={180} gap={50}>
      <H size={76} style={fadeUp(frame, fps, 0)}>
        Served fresh — <span style={gradientText}>8 shorts.</span>
      </H>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 30, justifyItems: "center" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={pop(frame, fps, 10 + i * 7)}>
            <PlatedShort index={i} w={138} />
          </div>
        ))}
      </div>
    </Shell>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90} gap={46}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={122} />
      </div>
      <H size={86} style={fadeUp(frame, fps, 14)}>
        Cook once. <span style={gradientText}>Serve all week.</span>
      </H>
      <div style={fadeUp(frame, fps, 26)}>
        <Chip dot="#A78BFA" style={{ fontSize: 36 }}>volfpack.online · Start free</Chip>
      </div>
    </Shell>
  );
};

export const RecipeAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 180],
    [S2, 210],
    [S3, 180],
    [S4, 90],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <RecipeBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.acousticSpring} volume={0.5} startFrom={400} />
    </AbsoluteFill>
  );
};
