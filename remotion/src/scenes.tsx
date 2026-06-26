import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fontHeading, fontBody, gradientText } from "./theme";
import { fadeUp, pop, fadeOutTail } from "./util/anim";
import { Chip } from "./components/Chip";
import { PhoneMock } from "./components/PhoneMock";
import { ShortCard } from "./components/ShortCard";
import { Wordmark, BrandTile } from "./components/BrandMark";

// Per-scene durations (frames @30fps). Sum must equal DURATION_FRAMES (900).
export const SCENE_DUR = {
  problem: 90,
  timeSink: 90,
  feed: 120,
  question: 60,
  reveal: 90,
  magic: 210,
  approve: 120,
  logo: 120,
} as const;

/** Centered scene shell with a gentle fade-out tail (no hard cuts). */
const Scene: React.FC<{ dur: number; children: React.ReactNode; gap?: number }> = ({
  dur,
  children,
  gap = 44,
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

const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, size = 104, style }) => (
  <h1
    style={{
      fontFamily: fontHeading,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.04,
      letterSpacing: -2,
      color: theme.ink,
      margin: 0,
      maxWidth: 880,
      ...style,
    }}
  >
    {children}
  </h1>
);

const Sub: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <p
    style={{
      fontFamily: fontBody,
      fontWeight: 600,
      fontSize: 42,
      color: theme.inkSoft,
      margin: 0,
      maxWidth: 760,
      ...style,
    }}
  >
    {children}
  </p>
);

/* ───────────────────────── 1 · The problem ───────────────────────── */
export const Scene01Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={SCENE_DUR.problem}>
      <div style={fadeUp(frame, fps, 0)}>
        <Chip dot="#f472b6" background={theme.accentPink}>
          POV: it&apos;s 1&nbsp;AM again 🌙
        </Chip>
      </div>
      <Headline style={fadeUp(frame, fps, 8)}>
        You shot a <span style={gradientText}>2-hour</span> podcast today.
      </Headline>
      <div style={{ ...pop(frame, fps, 22), fontSize: 120 }}>😮‍💨</div>
    </Scene>
  );
};

/* ─────────────────────── 2 · Long-form = all day ─────────────────── */
export const Scene02TimeSink: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const emojis = ["🎥", "🎙️", "💡", "☕"];
  return (
    <Scene dur={SCENE_DUR.timeSink}>
      <div style={{ display: "flex", gap: 40 }}>
        {emojis.map((e, i) => (
          <div
            key={e}
            style={{
              ...pop(frame, fps, 4 + i * 6),
              fontSize: 96,
              transform: `${pop(frame, fps, 4 + i * 6).transform} translateY(${
                Math.sin((frame + i * 12) / 14) * 10
              }px)`,
            }}
          >
            {e}
          </div>
        ))}
      </div>
      <Headline style={fadeUp(frame, fps, 16)}>
        Lights. Mic. Re-takes.
      </Headline>
      <Sub style={fadeUp(frame, fps, 26)}>Long-form takes all&nbsp;day.</Sub>
    </Scene>
  );
};

/* ───────────────────── 3 · The feed wants shorts ─────────────────── */
export const Scene03Feed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Two rows of short-cards drifting in opposite directions.
  const drift = (dir: number) =>
    interpolate(frame, [0, SCENE_DUR.feed], [0, dir * 260]);
  return (
    <Scene dur={SCENE_DUR.feed} gap={56}>
      <Headline style={{ ...fadeUp(frame, fps, 0), maxWidth: 920 }}>
        But the algorithm only wants{" "}
        <span style={gradientText}>shorts.</span>
      </Headline>

      <div style={{ position: "relative", width: 1000, height: 360, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            display: "flex",
            gap: 28,
            transform: `translateX(${-120 + drift(-1)}px)`,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <ShortCard key={i} index={i} width={150} score={80 + ((i * 7) % 18)} />
          ))}
        </div>
      </div>

      <Sub style={fadeUp(frame, fps, 14)}>
        Every. single. <span style={{ color: theme.primary, fontWeight: 800 }}>day.</span>
      </Sub>
    </Scene>
  );
};

/* ──────────────────────── 4 · The question ───────────────────────── */
export const Scene04Question: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const blink = Math.floor(frame / 15) % 2 === 0 ? 1 : 0.1;
  return (
    <Scene dur={SCENE_DUR.question}>
      <Headline size={116} style={fadeUp(frame, fps, 0)}>
        So when do you make{" "}
        <span style={gradientText}>those</span>
        <span style={{ opacity: blink, color: theme.primary }}>?</span>
      </Headline>
    </Scene>
  );
};

/* ───────────────────────── 5 · The reveal ────────────────────────── */
export const Scene05Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const url = "youtube.com/watch?v=your-podcast";
  const typed = url.slice(0, Math.max(0, Math.floor((frame - 10) / 1.4)));
  const generating = frame > 70;
  return (
    <Scene dur={SCENE_DUR.reveal}>
      <div style={pop(frame, fps, 0)}>
        <BrandTile size={130} />
      </div>

      {/* fake paste-a-URL input */}
      <div
        style={{
          ...fadeUp(frame, fps, 10),
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "26px 34px",
          borderRadius: 9999,
          background: theme.card,
          border: `2px solid ${theme.border}`,
          boxShadow: "0 18px 48px rgba(124,58,237,0.16)",
          fontFamily: fontBody,
          fontSize: 36,
          color: theme.ink,
          minWidth: 760,
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: generating ? theme.primary : theme.inkSoft }}>
          {generating ? "✨ Generating your shorts…" : `🔗 ${typed}|`}
        </span>
        {!generating ? (
          <span
            style={{
              padding: "12px 28px",
              borderRadius: 9999,
              background: theme.primary,
              color: "#fff",
              fontWeight: 700,
              fontSize: 30,
            }}
          >
            Paste
          </span>
        ) : null}
      </div>

      <Headline style={fadeUp(frame, fps, 40)}>
        You already{" "}
        <span style={gradientText}>did.</span>
      </Headline>
    </Scene>
  );
};

/* ───────────────────────── 6 · The magic ─────────────────────────── */
export const Scene06Magic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.min(8, Math.max(0, Math.floor((frame - 30) / 8)));
  return (
    <Scene dur={SCENE_DUR.magic} gap={40}>
      <Headline style={{ ...fadeUp(frame, fps, 0), maxWidth: 900 }}>
        One video → a <span style={gradientText}>week of shorts.</span>
      </Headline>

      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        <div style={pop(frame, fps, 8)}>
          <PhoneMock
            words={["You", "already", "shot", "this", "short"]}
            width={430}
          />
        </div>

        {/* grid of generated shorts popping in */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 22,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={pop(frame, fps, 30 + i * 8)}>
              <ShortCard index={i} width={138} score={78 + ((i * 5) % 20)} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            ...pop(frame, fps, 30),
            fontFamily: fontHeading,
            fontWeight: 800,
            fontSize: 56,
            color: theme.primary,
          }}
        >
          {count} shorts ready
        </div>
      </div>

      <div style={{ display: "flex", gap: 18, ...fadeUp(frame, fps, 96) }}>
        {[
          { label: "Auto-crop", dot: "#8b5cf6" },
          { label: "Captions", dot: "#38bdf8" },
          { label: "Hooks", dot: "#f472b6" },
          { label: "Voiceover", dot: "#34d399" },
        ].map((c) => (
          <Chip key={c.label} dot={c.dot} style={{ fontSize: 28, padding: "12px 22px" }}>
            {c.label}
          </Chip>
        ))}
      </div>
    </Scene>
  );
};

/* ──────────────────────── 7 · Review & post ──────────────────────── */
export const Scene07Approve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = (i: number) =>
    interpolate(frame, [20 + i * 6, 60 + i * 6], [0, -40], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  return (
    <Scene dur={SCENE_DUR.approve} gap={50}>
      <Headline style={fadeUp(frame, fps, 0)}>
        You just <span style={gradientText}>review &amp; post.</span>
      </Headline>

      <div style={{ display: "flex", gap: 26 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{ ...pop(frame, fps, 10 + i * 6), transform: `translateY(${lift(i)}px)` }}
          >
            <ShortCard index={i} width={150} approved={frame > 30 + i * 6} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 18, ...fadeUp(frame, fps, 48) }}>
        {[
          { label: "TikTok", dot: "#69C9D0" },
          { label: "Reels", dot: "#E1306C" },
          { label: "Shorts", dot: "#FF0000" },
        ].map((p) => (
          <Chip key={p.label} dot={p.dot}>
            {p.label}
          </Chip>
        ))}
      </div>

      <Sub style={fadeUp(frame, fps, 58)}>No editing. No all-nighter.</Sub>
    </Scene>
  );
};

/* ───────────────────────── 8 · Logo lockup ───────────────────────── */
export const Scene08Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Scene dur={SCENE_DUR.logo} gap={50}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={130} />
      </div>
      <Headline size={96} style={{ ...fadeUp(frame, fps, 14), ...gradientText }}>
        Shoot once. Post all week.
      </Headline>
      <div style={fadeUp(frame, fps, 28)}>
        <Chip dot="#A78BFA" style={{ fontSize: 38 }}>
          volfpack.online · Free to start
        </Chip>
      </div>
    </Scene>
  );
};
