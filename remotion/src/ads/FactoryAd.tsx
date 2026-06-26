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
import { ShortCard } from "../components/ShortCard";
import { Wordmark } from "../components/BrandMark";
import { Chip } from "../components/Chip";

export const FACTORY_DUR = 720; // 24s

const STATIONS = [
  { label: "Crop", color: "#8b5cf6" },
  { label: "Cut", color: "#f472b6" },
  { label: "Clean", color: "#34d399" },
  { label: "Caption", color: "#38bdf8" },
  { label: "Voice", color: "#fbbf24" },
  { label: "Export", color: "#fb7185" },
];

const FactoryBg: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#F3F6FF", overflow: "hidden" }}>
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(124,92,255,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(124,92,255,0.06) 2px, transparent 2px)",
        backgroundSize: "60px 60px",
      }}
    />
    {[
      { c: "#D9CBFA", x: -120, y: 80, s: 480 },
      { c: "#BFE3FF", x: 700, y: 1280, s: 520 },
    ].map((b, i) => (
      <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: 9999, background: b.c, filter: "blur(90px)", opacity: 0.5 }} />
    ))}
  </AbsoluteFill>
);

/** A scrolling conveyor belt. */
const Conveyor: React.FC<{ y: number; width?: number }> = ({ y, width = 980 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: y,
        transform: "translateX(-50%)",
        width,
        height: 46,
        borderRadius: 12,
        background: "#3a2f57",
        overflow: "hidden",
        boxShadow: "0 14px 30px rgba(58,47,87,0.35)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 18px, transparent 18px 40px)",
          transform: `translateX(${-(frame * 8) % 40}px)`,
        }}
      />
    </div>
  );
};

const MachineStation: React.FC<{ label: string; color: string; active: boolean }> = ({
  label,
  color,
  active,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div
      style={{
        width: 132,
        height: 96,
        borderRadius: 18,
        background: "#fff",
        border: `2px solid ${active ? color : theme.border}`,
        boxShadow: active ? `0 0 0 4px ${color}33, ${shadowCute}` : shadowCute,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transform: active ? "translateY(-4px)" : "none",
      }}
    >
      <span style={{ width: 16, height: 16, borderRadius: 9999, background: active ? color : theme.muted, boxShadow: active ? `0 0 14px ${color}` : "none" }} />
      {/* arm down to belt */}
      <div style={{ position: "absolute", bottom: -22, width: 8, height: 22, background: active ? color : theme.border }} />
    </div>
    <div style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 26, color: active ? color : theme.inkSoft }}>
      {label}
    </div>
  </div>
);

const ShippingBox: React.FC<{ label: string; filled: boolean }> = ({ label, filled }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
    <div
      style={{
        width: 150,
        height: 120,
        borderRadius: 14,
        background: "linear-gradient(180deg,#f5d6a8,#e3b277)",
        border: "3px solid #cf9a55",
        boxShadow: shadowCute,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 44,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {filled ? "📦" : ""}
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 4, background: "rgba(0,0,0,0.12)" }} />
    </div>
    <Chip dot="#A78BFA" style={{ fontSize: 24, padding: "8px 18px" }}>{label}</Chip>
  </div>
);

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({ dur, children, gap = 46 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: 90, alignItems: "center", justifyContent: "center", textAlign: "center", gap, opacity: fadeOutTail(frame, dur) }}>
      {children}
    </AbsoluteFill>
  );
};

const H: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 96, style }) => (
  <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: -2, color: theme.ink, margin: 0, maxWidth: 900, ...style }}>
    {children}
  </h1>
);

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90}>
      <div style={fadeUp(frame, fps, 0)}>
        <Chip dot="#f472b6">Now hiring: 0 editors 🛠️</Chip>
      </div>
      <H style={fadeUp(frame, fps, 8)}>
        Your <span style={gradientText}>shorts factory.</span>
      </H>
      <div style={{ ...pop(frame, fps, 22), fontSize: 120 }}>🏭</div>
    </Shell>
  );
};

const S2Line: React.FC = () => {
  const frame = useCurrentFrame();
  const beltY = 980;
  // log travels left→right
  const logX = interpolate(frame, [10, 300], [-120, 1080], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cropped = logX > 360; // becomes 9:16 after passing first station
  return (
    <AbsoluteFill style={{ opacity: fadeOutTail(frame, 360) }}>
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center" }}>
        <H size={64}>One video goes down the line…</H>
      </div>
      {/* stations row */}
      <div style={{ position: "absolute", top: 760, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 28 }}>
        {STATIONS.map((s, i) => {
          const stationX = 110 + i * 165; // approx screen x of each station center
          const active = Math.abs(logX - stationX) < 90;
          return <MachineStation key={s.label} label={s.label} color={s.color} active={active} />;
        })}
      </div>
      <Conveyor y={beltY} />
      {/* the log / clip on the belt */}
      <div
        style={{
          position: "absolute",
          top: beltY - (cropped ? 150 : 64),
          left: logX,
          width: cropped ? 86 : 150,
          height: cropped ? 150 : 64,
          borderRadius: 12,
          background: "linear-gradient(140deg,#c4b5fd,#7dd3fc)",
          boxShadow: shadowCute,
          border: "3px solid #fff",
        }}
      />
      {/* puff when crossing a station */}
      {STATIONS.map((s, i) => {
        const stationX = 110 + i * 165;
        const near = Math.abs(logX - stationX) < 40;
        if (!near) return null;
        return (
          <div key={i} style={{ position: "absolute", top: beltY - 40, left: stationX - 10, fontSize: 40, opacity: 0.8 }}>
            💨
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const S3Boxes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stamp = interpolate(frame, [40, 52, 64], [3, 0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampOp = interpolate(frame, [40, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Shell dur={150} gap={40}>
      <H size={70} style={fadeUp(frame, fps, 0)}>Packed &amp; <span style={gradientText}>shipped.</span></H>
      <div style={{ display: "flex", gap: 36 }}>
        {[
          { l: "TikTok", d: 6 },
          { l: "Reels", d: 14 },
          { l: "Shorts", d: 22 },
        ].map((b, i) => (
          <div key={b.l} style={pop(frame, fps, b.d)}>
            <ShippingBox label={b.l} filled={frame > b.d + 8} />
          </div>
        ))}
      </div>
      <div
        style={{
          opacity: stampOp,
          transform: `rotate(-8deg) scale(${stamp})`,
          border: "8px solid #fb7185",
          color: "#fb7185",
          borderRadius: 18,
          padding: "10px 34px",
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: 72,
          letterSpacing: 2,
        }}
      >
        READY
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
      <H size={80} style={fadeUp(frame, fps, 14)}>
        Raw footage in. <span style={gradientText}>Shorts out.</span>
      </H>
      <div style={fadeUp(frame, fps, 26)}>
        <Chip dot="#A78BFA" style={{ fontSize: 36 }}>volfpack.online · Start free</Chip>
      </div>
    </Shell>
  );
};

export const FactoryAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 90],
    [S2Line, 360],
    [S3Boxes, 150],
    [S4, 120],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <FactoryBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.joyfulFunk} volume={0.5} />
    </AbsoluteFill>
  );
};
