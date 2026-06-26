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
import { ShortCard } from "../components/ShortCard";
import { Wordmark } from "../components/BrandMark";
import { Chip } from "../components/Chip";

export const SECRET_DUR = 720; // 24s

const grad = "linear-gradient(90deg, #a78bfa, #f472b6, #38bdf8)";
const gradText: React.CSSProperties = {
  backgroundImage: grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const SecretBg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FBF8FF", overflow: "hidden" }}>
      {[
        { c: "#D9CBFA", x: -140, y: 100, s: 540, p: 0 },
        { c: "#BFE3FF", x: 680, y: 1280, s: 520, p: 120 },
        { c: "#FFC9E2", x: 520, y: -140, s: 560, p: 220 },
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
            opacity: 0.5,
            transform: `translateY(${Math.cos((frame + b.p) / 42) * 20}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/** Small square social-post tile. */
const PostTile: React.FC<{ seed: number; size?: number }> = ({ seed, size = 132 }) => {
  const hue = Math.floor(rand(seed) * 360);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 18,
        background: `linear-gradient(140deg, hsl(${hue} 75% 80%), hsl(${
          (hue + 40) % 360
        } 75% 72%))`,
        boxShadow: shadowCute,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 8,
          color: "rgba(255,255,255,0.95)",
          fontFamily: fontBody,
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        ♥ {2 + (seed % 9)}.{seed % 10}k
      </div>
    </div>
  );
};

const fmt = (n: number) => n.toLocaleString("en-US");

const FollowerCounter: React.FC<{ from: number; to: number; label: string }> = ({
  from,
  to,
  label,
}) => {
  const frame = useCurrentFrame();
  const n = counter(frame, from, to, 10, 90);
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: 64,
          color: theme.ink,
          letterSpacing: -1,
        }}
      >
        {fmt(n)}
      </div>
      <div
        style={{
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 26,
          color: "#10b981",
        }}
      >
        ▲ {label}
      </div>
    </div>
  );
};

const Panel: React.FC<{
  side: "left" | "right";
  label: string;
  dim?: boolean;
  children: React.ReactNode;
}> = ({ side, label, dim, children }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: side === "left" ? 0 : 540,
      width: 540,
      padding: "200px 40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28,
      background:
        side === "left"
          ? "rgba(120,110,140,0.06)"
          : "linear-gradient(160deg, rgba(167,139,250,0.12), rgba(56,189,248,0.10))",
      filter: dim ? "grayscale(0.5) opacity(0.8)" : "none",
    }}
  >
    <div
      style={{
        padding: "8px 26px",
        borderRadius: 9999,
        background: side === "left" ? theme.muted : theme.primary,
        color: side === "left" ? theme.inkSoft : "#fff",
        fontFamily: fontHeading,
        fontWeight: 800,
        fontSize: 34,
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

const Shell: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({
  dur,
  children,
  gap = 46,
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
  size = 96,
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
  return (
    <Shell dur={90}>
      <div style={fadeUp(frame, fps, 0)}>
        <Chip dot="#f472b6">Be honest… 👀</Chip>
      </div>
      <H style={fadeUp(frame, fps, 8)}>
        How does <span style={gradText}>she</span> post 5× a day?
      </H>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.min(15, Math.max(0, Math.floor((frame - 20) / 5)));
  return (
    <AbsoluteFill style={{ opacity: fadeOutTail(frame, 240) }}>
      {/* You */}
      <Panel side="left" label="You" dim>
        <PostTile seed={1} size={150} />
        <div
          style={{
            fontFamily: fontBody,
            fontSize: 70,
          }}
        >
          😮‍💨
        </div>
        <FollowerCounter from={1180} to={1240} label="this week" />
      </Panel>
      {/* Her */}
      <Panel side="right" label="Her">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            width: "100%",
          }}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              style={{
                opacity: i < count ? 1 : 0,
                transform: i < count ? "scale(1)" : "scale(0.6)",
                transition: "none",
              }}
            >
              <PostTile seed={i + 5} size={132} />
            </div>
          ))}
        </div>
        <FollowerCounter from={1200} to={84000} label="this week" />
      </Panel>
      {/* divider + VS */}
      <div style={{ position: "absolute", left: 538, top: 0, bottom: 0, width: 4, background: theme.border }} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 96,
          height: 96,
          borderRadius: 9999,
          background: "#fff",
          boxShadow: shadowCute,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: 40,
          color: theme.primary,
        }}
      >
        VS
      </div>
    </AbsoluteFill>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={120}>
      <div style={{ ...pop(frame, fps, 0), fontSize: 90 }}>🤫</div>
      <H size={120} style={fadeUp(frame, fps, 8)}>
        She films <span style={gradText}>once.</span>
      </H>
      <div
        style={{
          ...fadeUp(frame, fps, 20),
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 40,
          color: theme.inkSoft,
        }}
      >
        That&apos;s the whole trick.
      </div>
    </Shell>
  );
};

const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // fan-out arc of short cards
  return (
    <Shell dur={180} gap={70}>
      <H size={78} style={fadeUp(frame, fps, 0)}>
        One video → a <span style={gradText}>week of shorts.</span>
      </H>
      <div style={{ position: "relative", width: 760, height: 420 }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const mid = 3;
          const ang = (i - mid) * 13;
          const s = pop(frame, fps, 14 + i * 6);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                bottom: 0,
                transformOrigin: "bottom center",
                transform: `translateX(-50%) rotate(${ang}deg) translateY(${
                  -Math.abs(i - mid) * 6
                }px) ${s.transform ?? ""}`,
                opacity: s.opacity,
              }}
            >
              <ShortCard index={i} width={150} score={80 + ((i * 6) % 18)} />
            </div>
          );
        })}
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
      <H size={84} style={fadeUp(frame, fps, 14)}>
        Now it&apos;s <span style={gradText}>your</span> secret too.
      </H>
      <div style={fadeUp(frame, fps, 26)}>
        <Chip dot="#A78BFA" style={{ fontSize: 36 }}>
          volfpack.online · Start free
        </Chip>
      </div>
    </Shell>
  );
};

export const SecretAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 90],
    [S2, 240],
    [S3, 120],
    [S4, 180],
    [S5, 90],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <SecretBg />
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
