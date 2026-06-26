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
import { ShortCard } from "../components/ShortCard";
import { PhoneMock } from "../components/PhoneMock";
import { Wordmark } from "../components/BrandMark";

export const FREEDOM_DUR = 840; // 28s
const grad = "linear-gradient(90deg, #f59e0b, #f472b6, #a78bfa)";
const gradText: React.CSSProperties = {
  backgroundImage: grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/** One continuous sky that goes from 1 AM to morning, with stars / moon / sun. */
const DayBreak: React.FC = () => {
  const frame = useCurrentFrame();
  const top = interpolateColors(
    frame,
    [0, 300, 430, 500],
    ["#0E0A1A", "#2A1B3D", "#FFD9B3", "#FFF6E9"],
  );
  const bottom = interpolateColors(
    frame,
    [0, 300, 430, 500],
    ["#241B33", "#5B3A66", "#FFC29A", "#FFFDF9"],
  );
  const starsOp = interpolate(frame, [280, 410], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moonY = interpolate(frame, [0, 430], [220, 700], { extrapolateRight: "clamp" });
  const moonOp = interpolate(frame, [300, 410], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sunY = interpolate(frame, [360, 520], [1900, 430], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sunOp = interpolate(frame, [380, 470], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${top}, ${bottom})`, overflow: "hidden" }}>
      {/* stars */}
      <AbsoluteFill style={{ opacity: starsOp }}>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = rand(i) * 1080;
          const y = rand(i + 50) * 1100;
          const tw = 0.4 + 0.6 * Math.abs(Math.sin((frame + i * 9) / 16));
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 4 + rand(i + 7) * 4,
                height: 4 + rand(i + 7) * 4,
                borderRadius: 9999,
                background: "#fff",
                opacity: tw,
              }}
            />
          );
        })}
      </AbsoluteFill>
      {/* moon */}
      <div
        style={{
          position: "absolute",
          right: 140,
          top: moonY,
          width: 130,
          height: 130,
          borderRadius: 9999,
          background: "radial-gradient(circle at 38% 38%, #fdf6e3, #e6d8b8)",
          boxShadow: "0 0 60px rgba(253,246,227,0.6)",
          opacity: moonOp,
        }}
      />
      {/* sun */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: sunY,
          transform: "translateX(-50%)",
          width: 220,
          height: 220,
          borderRadius: 9999,
          background: "radial-gradient(circle at 50% 50%, #FFE9A8, #FFB169)",
          boxShadow: "0 0 120px rgba(255,177,105,0.7)",
          opacity: sunOp,
        }}
      />
    </AbsoluteFill>
  );
};

/** Burden chips stacking onto a creator, sinking them down. */
const WeightStack: React.FC = () => {
  const frame = useCurrentFrame();
  const items = ["Shoot", "Cut", "Caption", "Schedule", "Post"];
  const shown = Math.min(items.length, Math.max(0, Math.floor((frame - 10) / 14)));
  const sink = Math.min(60, shown * 12);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, transform: `translateY(${sink}px)` }}>
      {items.map((it, i) => {
        const on = i < shown;
        const drop = on
          ? interpolate(frame, [10 + i * 14, 10 + i * 14 + 10], [-60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
          : -60;
        return (
          <div
            key={it}
            style={{
              opacity: on ? 1 : 0,
              transform: `translateY(${drop}px)`,
              padding: "16px 40px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
              fontFamily: fontHeading,
              fontWeight: 800,
              fontSize: 40,
              backdropFilter: "blur(4px)",
            }}
          >
            {it}
          </div>
        );
      })}
      <div style={{ fontSize: 90, marginTop: 6 }}>🥵</div>
    </div>
  );
};

const ClockSpin: React.FC<{ size?: number }> = ({ size = 150 }) => {
  const frame = useCurrentFrame();
  const min = frame * 9;
  const hr = frame * 0.75;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#fff" stroke={theme.border} strokeWidth="3" />
      <line x1="50" y1="50" x2={50 + 26 * Math.sin((hr * Math.PI) / 180)} y2={50 - 26 * Math.cos((hr * Math.PI) / 180)} stroke={theme.ink} strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="50" x2={50 + 36 * Math.sin((min * Math.PI) / 180)} y2={50 - 36 * Math.cos((min * Math.PI) / 180)} stroke={theme.primary} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" fill={theme.primary} />
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

const H: React.FC<{ children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children,
  size = 90,
  color = "#fff",
  style,
}) => (
  <h1
    style={{
      fontFamily: fontHeading,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.06,
      letterSpacing: -2,
      color,
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
    <Shell dur={120}>
      <div
        style={{
          ...pop(frame, fps, 0),
          padding: "12px 34px",
          borderRadius: 9999,
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: 46,
        }}
      >
        🌙 1:00 AM
      </div>
      <H style={fadeUp(frame, fps, 10)}>
        Making shorts shouldn&apos;t cost you your <span style={gradText}>nights.</span>
      </H>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={180} gap={30}>
      <WeightStack />
      <H size={56} style={{ ...fadeUp(frame, fps, 70), color: "#fff" }}>
        Every. single. day.
      </H>
    </Shell>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={150}>
      <div style={{ ...pop(frame, fps, 0), fontSize: 90 }}>😮‍💨</div>
      <H size={104} style={fadeUp(frame, fps, 10)}>
        What if <span style={gradText}>one upload</span> did it all?
      </H>
    </Shell>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={240} gap={48}>
      <H size={78} color={theme.ink} style={fadeUp(frame, fps, 0)}>
        It does. <span style={gradText}>While you live your life.</span>
      </H>
      <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
        <div style={pop(frame, fps, 8)}>
          <PhoneMock words={["Made", "while", "you", "slept"]} width={360} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={pop(frame, fps, 24 + i * 8)}>
              <ShortCard index={i} width={128} score={80 + ((i * 5) % 18)} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, ...fadeUp(frame, fps, 30) }}>
        <ClockSpin size={120} />
        <span style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 36, color: theme.inkSoft }}>
          done by morning
        </span>
      </div>
    </Shell>
  );
};

const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={150} gap={50}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={124} />
      </div>
      <H size={96} color={theme.ink} style={fadeUp(frame, fps, 14)}>
        Get your <span style={gradText}>time back.</span>
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

export const FreedomAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 120],
    [S2, 180],
    [S3, 150],
    [S4, 240],
    [S5, 150],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <DayBreak />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.honeyKisses} volume={0.5} />
    </AbsoluteFill>
  );
};
