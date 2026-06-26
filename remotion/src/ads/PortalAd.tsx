import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { dark, fontHeading, fontBody, shadowCute } from "../theme";
import { fadeUp, pop, fadeOutTail, rand } from "../util/anim";
import { Soundtrack } from "../util/music";
import { TRACKS } from "../tracks";
import { BrandTile } from "../components/BrandMark";

export const PORTAL_DUR = 600; // 20s

const CYAN = "#22D3EE";
const MAG = "#C13BFF";
const grad = "linear-gradient(90deg,#22D3EE,#C13BFF,#7DD3FC)";
const gradText: React.CSSProperties = {
  backgroundImage: grad,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const PortalBg: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#070512", overflow: "hidden" }}>
      {Array.from({ length: 70 }).map((_, i) => (
        <span key={i} style={{ position: "absolute", left: rand(i) * 1080, top: rand(i + 40) * 1920, width: 3 + rand(i + 9) * 3, height: 3 + rand(i + 9) * 3, borderRadius: 9999, background: "#fff", opacity: 0.3 + 0.5 * Math.abs(Math.sin((frame + i * 11) / 18)) }} />
      ))}
      {[
        { c: "#3B1E6B", x: -160, y: 200, s: 600 },
        { c: "#0E4D6B", x: 660, y: 1300, s: 600 },
      ].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: 9999, background: b.c, filter: "blur(120px)", opacity: 0.5 }} />
      ))}
    </AbsoluteFill>
  );
};

const Portal: React.FC<{ size?: number; pulse?: number }> = ({ size = 420, pulse = 0 }) => {
  const frame = useCurrentFrame();
  const p = 1 + Math.sin(frame / 8) * 0.03 + pulse;
  return (
    <div style={{ position: "relative", width: size, height: size, transform: `scale(${p})` }}>
      {/* glow */}
      <div style={{ position: "absolute", inset: -40, borderRadius: 9999, background: "radial-gradient(circle, rgba(193,59,255,0.5), transparent 70%)", filter: "blur(20px)" }} />
      {/* rotating ring */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 9999, background: `conic-gradient(from ${frame * 4}deg, ${CYAN}, ${MAG}, #7DD3FC, ${CYAN})`, transform: `rotate(${frame * 1.5}deg)`, boxShadow: `0 0 60px ${MAG}aa` }} />
      {/* inner hole with swirl */}
      <div style={{ position: "absolute", inset: size * 0.09, borderRadius: 9999, background: `conic-gradient(from ${-frame * 6}deg, #0a0820, #2a1248, #0a0820)`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(34,211,238,0.35), transparent 65%)" }} />
      </div>
    </div>
  );
};

const Clone: React.FC<{ index: number; x: number; y: number; size?: number; op?: number }> = ({ index, x, y, size = 130, op = 1 }) => {
  const grads = ["#22D3EE,#7DD3FC", "#C13BFF,#7DD3FC", "#7DD3FC,#C13BFF", "#22D3EE,#C13BFF"];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: size, height: (size / 9) * 16, borderRadius: 18, background: `linear-gradient(150deg,${grads[index % 4]})`, boxShadow: `0 0 26px rgba(34,211,238,0.5)`, opacity: op, border: "2px solid rgba(255,255,255,0.6)" }} />
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

const H: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({ children, size = 86, style }) => (
  <h1 style={{ fontFamily: fontHeading, fontWeight: 800, fontSize: size, lineHeight: 1.05, letterSpacing: -2, color: dark.ink, margin: 0, maxWidth: 900, ...style }}>
    {children}
  </h1>
);

const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // file walks toward portal (centered) and shrinks in
  const enter = interpolate(frame, [40, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fileX = interpolate(enter, [0, 1], [120, 440]);
  const fileScale = interpolate(enter, [0.6, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Shell dur={150}>
      <H style={{ ...fadeUp(frame, fps, 0), position: "absolute", top: 220 }}>
        One video walks <span style={gradText}>in…</span>
      </H>
      <div style={{ position: "relative", width: 900, height: 600 }}>
        <div style={{ position: "absolute", left: 480, top: 90, ...pop(frame, fps, 4) }}>
          <Portal size={380} />
        </div>
        <div style={{ position: "absolute", left: fileX, top: 240, width: 220, height: 140, borderRadius: 18, background: "linear-gradient(140deg,#c4b5fd,#7dd3fc)", boxShadow: shadowCute, transform: `scale(${fileScale})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontBody, fontWeight: 700, fontSize: 22, color: "#fff" }}>
          podcast.mp4
        </div>
      </div>
    </Shell>
  );
};

const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.min(8, Math.max(0, Math.floor((frame - 30) / 18)));
  return (
    <Shell dur={270} gap={20}>
      <H style={{ ...fadeUp(frame, fps, 0), position: "absolute", top: 150 }}>
        …a week of shorts walks <span style={gradText}>out.</span>
      </H>
      <div style={{ position: "relative", width: 1000, height: 1100 }}>
        <div style={{ position: "absolute", left: 290, top: 0 }}>
          <Portal size={380} />
        </div>
        {Array.from({ length: 8 }).map((_, i) => {
          const appear = frame - (30 + i * 18);
          if (appear < 0) return null;
          const prog = interpolate(appear, [0, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const col = i % 4;
          const row = Math.floor(i / 4);
          const targetX = 130 + col * 190;
          const targetY = 520 + row * 300;
          const x = interpolate(prog, [0, 1], [400, targetX]);
          const y = interpolate(prog, [0, 1], [160, targetY]);
          const op = interpolate(prog, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
          return <Clone key={i} index={i} x={x} y={y} size={150} op={op} />;
        })}
        <div style={{ position: "absolute", left: 0, right: 0, top: 430, textAlign: "center", fontFamily: fontHeading, fontWeight: 800, fontSize: 70, ...gradText }}>
          ×{count}
        </div>
      </div>
    </Shell>
  );
};

const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Shell dur={120} gap={44}>
      <H size={130} style={pop(frame, fps, 0)}>
        1 in. <span style={gradText}>8 out.</span>
      </H>
      <div style={{ display: "flex", gap: 18, ...fadeUp(frame, fps, 16) }}>
        {["TikTok", "Reels", "Shorts"].map((p, i) => (
          <div key={p} style={{ padding: "16px 30px", borderRadius: 9999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: dark.ink, fontFamily: fontHeading, fontWeight: 800, fontSize: 34 }}>
            {p}
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
    <Shell dur={60} gap={40}>
      <div style={pop(frame, fps, 0)}>
        <BrandTile size={140} />
      </div>
      <H size={76} style={fadeUp(frame, fps, 10)}>
        One upload. <span style={gradText}>Infinite shorts.</span>
      </H>
      <div style={{ ...fadeUp(frame, fps, 20), fontFamily: fontBody, fontWeight: 700, fontSize: 40, color: CYAN }}>
        volfpack.online
      </div>
    </Shell>
  );
};

export const PortalAd: React.FC = () => {
  let c = 0;
  const seq: [React.FC, number][] = [
    [S1, 150],
    [S2, 270],
    [S3, 120],
    [S4, 60],
  ];
  return (
    <AbsoluteFill style={{ fontFamily: fontBody }}>
      <PortalBg />
      {seq.map(([C, d], i) => {
        const from = c;
        c += d;
        return (
          <Sequence key={i} from={from} durationInFrames={d}>
            <C />
          </Sequence>
        );
      })}
      <Soundtrack file={TRACKS.funkBreakbeat} volume={0.5} startFrom={60} />
    </AbsoluteFill>
  );
};
