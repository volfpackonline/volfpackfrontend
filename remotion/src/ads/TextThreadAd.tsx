import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fontHeading, fontBody, shadowCute, gradientText } from "../theme";
import { fadeUp, pop, fadeOutTail } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { ShortCard } from "../components/ShortCard";
import { Wordmark } from "../components/BrandMark";

export const TEXT_DUR = 660; // 22s

const ThreadBg: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(180deg,#EDE7F6,#DCD2F0)" }} />
);

const TypingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 12, padding: "26px 30px", background: "#E9E9EB", borderRadius: 30, borderBottomLeftRadius: 8, width: "fit-content" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: "#9a96a3",
            transform: `translateY(${Math.sin((frame + i * 5) / 4) * 6}px)`,
          }}
        />
      ))}
    </div>
  );
};

const Bubble: React.FC<{ side: "l" | "r"; at: number; children: React.ReactNode; link?: boolean }> = ({
  side,
  at,
  children,
  link,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 14, mass: 0.6 } });
  const right = side === "r";
  return (
    <div style={{ display: "flex", justifyContent: right ? "flex-end" : "flex-start", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})` }}>
      <div
        style={{
          maxWidth: 560,
          padding: "26px 34px",
          fontFamily: fontBody,
          fontWeight: 600,
          fontSize: 38,
          lineHeight: 1.25,
          borderRadius: 36,
          ...(right
            ? { background: "linear-gradient(135deg,#8b5cf6,#ec4899)", color: "#fff", borderBottomRightRadius: 10 }
            : { background: "#E9E9EB", color: "#1c1c1e", borderBottomLeftRadius: 10 }),
          ...(link ? { background: "#fff", color: theme.primary, border: `2px solid ${theme.border}`, boxShadow: shadowCute } : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: 150,
      transform: "translateX(-50%)",
      width: 820,
      height: 1620,
      borderRadius: 70,
      background: "#0e0a16",
      padding: 18,
      boxShadow: "0 50px 100px rgba(0,0,0,0.4)",
    }}
  >
    <div style={{ position: "absolute", inset: 18, borderRadius: 54, overflow: "hidden", background: "#fff" }}>
      {/* header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "30px 0 18px", background: "rgba(245,242,250,0.95)", borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ width: 84, height: 84, borderRadius: 9999, background: "linear-gradient(135deg,#a78bfa,#f472b6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🎬</div>
        <div style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 32, color: theme.ink }}>Maya</div>
      </div>
      {children}
    </div>
  </div>
);

const VideoExpand: React.FC<{ at: number; dur: number }> = ({ at, dur }) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < 0 || t > dur) return null;
  const open = interpolate(t, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const close = interpolate(t, [dur - 18, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const k = open * close;
  const n = Math.min(8, Math.max(0, Math.floor((t - 30) / 9)));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        top: 200,
        background: "linear-gradient(180deg,#FBF9FF,#F2ECFA)",
        opacity: k,
        transform: `scale(${interpolate(k, [0, 1], [0.6, 1])})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        padding: 40,
      }}
    >
      <div style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 56, color: theme.ink, textAlign: "center" }}>
        1 video → <span style={gradientText}>{n} shorts</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ opacity: i < n ? 1 : 0.15, transform: i < n ? "scale(1)" : "scale(0.8)" }}>
            <ShortCard index={i} width={120} score={80 + ((i * 5) % 18)} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: fadeOutTail(frame, 540) }}>
      <Phone>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, display: "flex", flexDirection: "column", gap: 20, padding: "0 34px" }}>
          <Bubble side="l" at={20}>ok HOW are you posting 5× a day 😭</Bubble>
          {frame >= 70 && frame < 110 ? (
            <div style={{ opacity: interpolate(frame, [70, 78, 104, 110], [0, 1, 1, 0]) }}>
              <TypingDots />
            </div>
          ) : null}
          <Bubble side="r" at={112}>lol watch 👇</Bubble>
          <Bubble side="r" at={140}>📹 my last podcast.mp4</Bubble>
          {frame >= 372 && frame < 404 ? (
            <div style={{ opacity: interpolate(frame, [372, 380, 398, 404], [0, 1, 1, 0]) }}>
              <TypingDots />
            </div>
          ) : null}
          <Bubble side="l" at={406}>wait. that&apos;s it???</Bubble>
          <Bubble side="r" at={446}>1 video → a week of shorts 🤯</Bubble>
          <Bubble side="r" at={486} link>
            🔗 volfpack.online
          </Bubble>
        </div>
      </Phone>
      <VideoExpand at={175} dur={185} />
    </AbsoluteFill>
  );
};

const End: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 48, opacity: fadeOutTail(frame, 120) }}>
      <div style={pop(frame, fps, 0)}>
        <Wordmark size={124} />
      </div>
      <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: 88, letterSpacing: -2, color: theme.ink, margin: 0, textAlign: "center", maxWidth: 880 }}>
        Send it to the friend who <span style={gradientText}>posts too much.</span>
      </h1>
      <div style={{ ...fadeUp(frame, fps, 24), fontFamily: fontBody, fontWeight: 600, fontSize: 40, color: theme.inkSoft }}>
        volfpack.online · Start free
      </div>
    </AbsoluteFill>
  );
};

export const TextThreadAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <ThreadBg />
      <Sequence from={0} durationInFrames={540}>
        <Chat />
      </Sequence>
      <Sequence from={540} durationInFrames={120}>
        <End />
      </Sequence>
      <Soundtrack file={TRACKS.sigma} volume={0.45} />
    </AbsoluteFill>
  );
};
