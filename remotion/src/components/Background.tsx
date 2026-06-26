import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

/** A single slow-floating blurred pastel blob. */
const Blob: React.FC<{
  color: string;
  size: number;
  x: number;
  y: number;
  phase: number;
}> = ({ color, size, x, y, phase }) => {
  const frame = useCurrentFrame();
  const dy = Math.sin((frame + phase) / 38) * 26;
  const dx = Math.cos((frame + phase) / 46) * 18;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "9999px",
        background: color,
        filter: "blur(70px)",
        opacity: 0.5,
        transform: `translate(${dx}px, ${dy}px)`,
      }}
    />
  );
};

/** Cream backdrop + floating pastel blobs + faint dotted texture. */
export const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: theme.cream, overflow: "hidden" }}>
      <Blob color={theme.lavender} size={560} x={-120} y={120} phase={0} />
      <Blob color={theme.pink} size={520} x={640} y={1180} phase={120} />
      <Blob color={theme.sky} size={600} x={520} y={-160} phase={240} />
      <Blob color={theme.mint} size={420} x={-160} y={1380} phase={360} />
      {/* dotted texture, masked to fade at edges */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(rgba(167,139,250,0.18) 2px, transparent 2px)`,
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse at center, black 55%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 55%, transparent 85%)",
          opacity: 0.7,
        }}
      />
    </AbsoluteFill>
  );
};
