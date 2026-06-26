import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, dark, fontHeading, fontBody, shadowCute } from "../theme";
import { fadeUp, pop, fadeOutTail, rand } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { PhoneMock } from "../components/PhoneMock";
import { Wordmark } from "../components/BrandMark";

export const EDITOR_DUR = 660; // 22s
const TRANSITION = 300; // global frame where dark → light

const grad = "linear-gradient(90deg, #a78bfa, #f472b6, #38bdf8)";
const gradText: React.CSSProperties = {
  backgroundImage: grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/** Background that morphs from deep plum (editor) to cream (VolfPack). */
const MorphBg: React.FC = () => {
  const frame = useCurrentFrame();
  const bg = interpolateColors(
    frame,
    [TRANSITION - 10, TRANSITION + 30],
    ["#171022", "#FFFDF9"],
  );
  const lightOpacity = interpolate(frame, [TRANSITION + 10, TRANSITION + 60], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      {[
        { c: "#C9B8F5", x: -120, y: 120, s: 540 },
        { c: "#BFE3FF", x: 660, y: 1320, s: 540 },
        { c: "#FFC9E2", x: 520, y: -120, s: 520 },
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
            opacity: lightOpacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/** An intentionally busy, intimidating non-linear video editor. */
const FakeTimelineEditor: React.FC<{ scale?: number; blur?: number; opacity?: number }> = ({
  scale = 1,
  blur = 0,
  opacity = 1,
}) => {
  const trackColors = ["#7C5CFF", "#EC4899", "#22D3EE", "#F59E0B"];
  return (
    <div
      style={{
        width: 880,
        borderRadius: 24,
        background: "#0F0A18",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
        overflow: "hidden",
        transform: `scale(${scale})`,
        filter: blur ? `blur(${blur}px)` : "none",
        opacity,
      }}
    >
      {/* toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", background: "#1A1226" }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <span key={c} style={{ width: 16, height: 16, borderRadius: 9999, background: c }} />
        ))}
        <div style={{ display: "flex", gap: 22, marginLeft: 24, fontFamily: fontBody, fontSize: 20, color: "#9b8fb5" }}>
          {["File", "Edit", "Clip", "Sequence", "Effects", "Color", "Export"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
      {/* preview + scopes */}
      <div style={{ display: "flex", gap: 12, padding: 16 }}>
        <div
          style={{
            flex: 1,
            height: 220,
            borderRadius: 12,
            background: "linear-gradient(140deg,#3b2f57,#26203a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b6088",
            fontSize: 40,
          }}
        >
          ▣
        </div>
        <div style={{ width: 150, display: "flex", flexDirection: "column", gap: 10 }}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ height: 64, borderRadius: 10, background: "#1d1530", border: "1px solid rgba(255,255,255,0.08)" }} />
          ))}
        </div>
      </div>
      {/* timeline tracks */}
      <div style={{ padding: 16, paddingTop: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {trackColors.map((tc, t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", height: 56, gap: 8 }}>
            <div style={{ width: 70, fontFamily: fontBody, fontSize: 16, color: "#6b6088" }}>V{t + 1}</div>
            <div style={{ flex: 1, display: "flex", gap: 8 }}>
              {Array.from({ length: 5 }).map((_, b) => (
                <div
                  key={b}
                  style={{
                    flex: rand(t * 9 + b) + 0.5,
                    height: 48,
                    borderRadius: 8,
                    background: `${tc}33`,
                    border: `1.5px solid ${tc}`,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 2,
                    padding: 4,
                    overflow: "hidden",
                  }}
                >
                  {/* waveform */}
                  {Array.from({ length: 14 }).map((_, w) => (
                    <span
                      key={w}
                      style={{
                        width: 3,
                        height: 6 + rand(t * 99 + b * 7 + w) * 32,
                        background: `${tc}cc`,
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* playhead */}
        <div style={{ position: "relative", height: 0 }}>
          <div style={{ position: "absolute", left: 260, top: -250, width: 2, height: 250, background: "#fff" }} />
        </div>
      </div>
    </div>
  );
};

const CrossOutText: React.FC<{ children: React.ReactNode; on: boolean; delay: number }> = ({
  children,
  on,
  delay,
}) => {
  const frame = useCurrentFrame();
  const w = on
    ? interpolate(frame, [delay, delay + 14], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  return (
    <div
      style={{
        position: "relative",
        fontFamily: fontHeading,
        fontWeight: 800,
        fontSize: 64,
        color: w > 50 ? "#8b7fa6" : dark.ink,
        padding: "4px 10px",
        opacity: fadeUp(frame, 30, delay - 10).opacity,
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "52%",
          height: 7,
          width: `${w}%`,
          background: "#EC4899",
          borderRadius: 9999,
          boxShadow: "0 0 16px #EC4899aa",
        }}
      />
    </div>
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

const H: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children,
  size = 92,
  color = theme.ink,
  style,
}) => (
  <h1
    style={{
      fontFamily: fontHeading,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.05,
      letterSpacing: -2,
      color,
      margin: 0,
      maxWidth: 920,
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
    <Shell dur={120} gap={60}>
      <H color={dark.ink} style={fadeUp(frame, fps, 0)}>
        You think you need <span style={gradText}>all this.</span>
      </H>
      <div style={pop(frame, fps, 10)}>
        <FakeTimelineEditor />
      </div>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={180} gap={30}>
      <div style={{ opacity: 0.32, transform: "scale(0.86)", ...fadeUp(frame, fps, 0) }}>
        <FakeTimelineEditor />
      </div>
      <div style={{ position: "absolute", display: "flex", flexDirection: "column", gap: 18 }}>
        <CrossOutText on delay={6}>Timelines</CrossOutText>
        <CrossOutText on delay={24}>Keyframes</CrossOutText>
        <CrossOutText on delay={42}>Render settings</CrossOutText>
        <CrossOutText on delay={60}>2-hour tutorials</CrossOutText>
      </div>
    </Shell>
  );
};

const S3Dissolve: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 30], [0.86, 1.4], { extrapolateRight: "clamp" });
  const blur = interpolate(frame, [0, 30], [0, 24], { extrapolateRight: "clamp" });
  const op = interpolate(frame, [0, 30], [1, 0], { extrapolateRight: "clamp" });
  const flash = interpolate(frame, [18, 30, 46], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <FakeTimelineEditor scale={scale} blur={blur} opacity={op} />
      <AbsoluteFill style={{ background: "#fff", opacity: flash }} />
    </AbsoluteFill>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const url = "youtube.com/watch?v=your-video";
  const typed = url.slice(0, Math.max(0, Math.floor((frame - 8) / 1.4)));
  const done = frame > 70;
  return (
    <Shell dur={210} gap={56}>
      <H style={fadeUp(frame, fps, 0)}>
        Just <span style={gradText}>paste a link.</span>
      </H>
      <div
        style={{
          ...fadeUp(frame, fps, 8),
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "24px 32px",
          borderRadius: 9999,
          background: "#fff",
          border: `2px solid ${theme.border}`,
          boxShadow: shadowCute,
          fontFamily: fontBody,
          fontSize: 34,
          color: done ? theme.primary : theme.inkSoft,
          minWidth: 720,
        }}
      >
        {done ? "✨ 8 shorts ready to review" : `🔗 ${typed}|`}
      </div>
      <div style={pop(frame, fps, 30)}>
        <PhoneMock words={["No", "editing", "needed"]} width={360} />
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
      <H size={80} style={fadeUp(frame, fps, 14)}>
        You approve. <span style={gradText}>That&apos;s the job.</span>
      </H>
      <div
        style={{
          ...fadeUp(frame, fps, 26),
          padding: "16px 34px",
          borderRadius: 9999,
          background: "#fff",
          border: `1px solid ${theme.border}`,
          boxShadow: shadowCute,
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 36,
          color: theme.ink,
        }}
      >
        volfpack.online · Start free
      </div>
    </Shell>
  );
};

export const EditorAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 120],
    [S2, 180],
    [S3Dissolve, 60],
    [S4, 210],
    [S5, 90],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <MorphBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.sigma} volume={0.5} />
    </AbsoluteFill>
  );
};
