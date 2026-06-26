import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fontHeading, fontBody, shadowCute, gradientText } from "../theme";
import { fadeUp, pop, fadeOutTail, rand } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { Wordmark } from "../components/BrandMark";
import { Chip } from "../components/Chip";

export const TIER_DUR = 660; // 22s

const TIERS = [
  { key: "S", color: "#FF6B8A" },
  { key: "A", color: "#FFA66B" },
  { key: "B", color: "#FFD56B" },
  { key: "C", color: "#9BE06B" },
  { key: "F", color: "#8AA0FF" },
];

type Card = { label: string; tier: string; at: number; emoji: string; special?: boolean };
const CARDS: Card[] = [
  { label: "Film a new one daily", tier: "F", at: 14, emoji: "😵" },
  { label: "Timeline till 3 AM", tier: "C", at: 40, emoji: "🥱" },
  { label: "Pay an editor $$$", tier: "B", at: 66, emoji: "💸" },
  { label: "Clip by hand in Canva", tier: "C", at: 92, emoji: "✂️" },
  { label: "Paste a link → VolfPack", tier: "S", at: 130, emoji: "⚡", special: true },
];

const TierBg: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg,#FBF8FF,#F2ECFA)" }} />
);

const CardChip: React.FC<{ card: Card; localFrame: number; fps: number }> = ({ card, localFrame, fps }) => {
  const t = localFrame - card.at;
  const s = spring({ frame: t, fps, config: card.special ? { damping: 10, mass: 0.8, stiffness: 140 } : { damping: 16 } });
  const x = interpolate(s, [0, 1], [220, 0]);
  const glow = card.special
    ? `0 0 0 4px rgba(255,107,138,0.5), 0 0 50px rgba(255,107,138,0.6), ${shadowCute}`
    : shadowCute;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: card.special ? "16px 28px" : "12px 22px",
        borderRadius: 18,
        background: card.special ? "#fff" : "#fff",
        border: card.special ? "3px solid #FF6B8A" : `1px solid ${theme.border}`,
        boxShadow: glow,
        fontFamily: fontHeading,
        fontWeight: 800,
        fontSize: card.special ? 34 : 28,
        color: theme.ink,
        opacity: s,
        transform: `translateX(${x}px) scale(${card.special ? interpolate(s, [0, 1], [0.6, 1]) : 1})`,
      }}
    >
      <span style={{ fontSize: card.special ? 40 : 30 }}>{card.emoji}</span>
      {card.special ? <span style={gradientText}>{card.label}</span> : card.label}
    </div>
  );
};

const TierList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dimOthers = interpolate(frame, [150, 180], [1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ padding: "120px 70px", justifyContent: "center", gap: 22, opacity: fadeOutTail(frame, 390) }}>
      <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 66, letterSpacing: -2, color: theme.ink, margin: "0 0 20px", textAlign: "center" }}>
        Ways to make shorts, <span style={gradientText}>ranked.</span>
      </h1>
      {TIERS.map((tier) => {
        const cards = CARDS.filter((c) => c.tier === tier.key && frame >= c.at);
        const isS = tier.key === "S";
        const sparkleOn = isS && frame > 130 && frame < 230;
        return (
          <div
            key={tier.key}
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 16,
              opacity: isS ? 1 : dimOthers,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 110,
                minHeight: 96,
                borderRadius: 18,
                background: tier.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fontHeading,
                fontWeight: 800,
                fontSize: 56,
                color: "#fff",
                boxShadow: isS ? `0 0 30px ${tier.color}aa` : "none",
              }}
            >
              {tier.key}
            </div>
            <div
              style={{
                flex: 1,
                minHeight: 96,
                borderRadius: 18,
                background: "rgba(255,255,255,0.6)",
                border: `1px solid ${theme.border}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "0 20px",
                flexWrap: "wrap",
              }}
            >
              {cards.map((c) => (
                <CardChip key={c.label} card={c} localFrame={frame} fps={fps} />
              ))}
            </div>
            {/* sparkles around S */}
            {sparkleOn
              ? Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${10 + rand(i) * 80}%`,
                      top: `${rand(i + 5) * 100}%`,
                      fontSize: 26,
                      opacity: 0.5 + 0.5 * Math.sin((frame + i * 7) / 6),
                    }}
                  >
                    ✨
                  </span>
                ))
              : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({ dur, children, gap = 46 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ padding: 90, alignItems: "center", justifyContent: "center", textAlign: "center", gap, opacity: fadeOutTail(frame, dur) }}>
      {children}
    </AbsoluteFill>
  );
};

const H: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 100, style }) => (
  <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: -2, color: theme.ink, margin: 0, maxWidth: 900, ...style }}>
    {children}
  </h1>
);

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90}>
      <div style={fadeUp(frame, fps, 0)}>
        <Chip dot="#f472b6">be honest 👀</Chip>
      </div>
      <H style={fadeUp(frame, fps, 8)}>
        Ways to make shorts in <span style={gradientText}>2026.</span>
      </H>
    </Shell>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={90} gap={48}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={124} />
      </div>
      <H size={92} style={fadeUp(frame, fps, 14)}>
        <span style={gradientText}>S-tier.</span> Obviously.
      </H>
      <div style={fadeUp(frame, fps, 26)}>
        <Chip dot="#A78BFA" style={{ fontSize: 36 }}>volfpack.online · Start free</Chip>
      </div>
    </Shell>
  );
};

export const TierAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [Intro, 90],
    [TierList, 390],
    [Outro, 180],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <TierBg />
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
