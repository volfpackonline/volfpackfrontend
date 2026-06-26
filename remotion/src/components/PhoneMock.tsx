import { useCurrentFrame } from "remotion";
import { theme, fontHeading, fontBody, shadowCute } from "../theme";

interface PhoneMockProps {
  words: string[];
  /** Frames each word stays highlighted. */
  hold?: number;
  label?: string;
  width?: number;
}

/**
 * 9:16 device mock with a subject-tracking crop bracket and a karaoke caption
 * that highlights word-by-word — the same "crop + caption" proof the site's
 * CaptionPhone shows, rebuilt frame-driven for Remotion.
 */
export const PhoneMock: React.FC<PhoneMockProps> = ({
  words,
  hold = 9,
  label = "9:16 · auto-crop",
  width = 460,
}) => {
  const frame = useCurrentFrame();
  const height = (width / 9) * 16;
  const active = Math.floor(frame / hold) % (words.length + 2);
  const progress = Math.min(100, ((active + 1) / words.length) * 100);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 56,
        background: theme.ink,
        padding: 14,
        boxShadow: shadowCute,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 14,
          borderRadius: 44,
          overflow: "hidden",
          background:
            "linear-gradient(150deg, #c4b5fd 0%, #f9a8d4 55%, #7dd3fc 100%)",
        }}
      >
        {/* legibility tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5), transparent 45%, rgba(0,0,0,0.18))",
          }}
        />
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 12,
            borderRadius: 9999,
            background: "rgba(0,0,0,0.45)",
          }}
        />
        {/* status chip */}
        <div
          style={{
            position: "absolute",
            top: 38,
            left: 26,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 18px",
            borderRadius: 9999,
            background: "rgba(0,0,0,0.4)",
            color: "#fff",
            fontFamily: fontBody,
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#f87171",
            }}
          />
          {label}
        </div>

        {/* crop brackets */}
        {(
          [
            { top: "32%", left: "16%", b: "TL" },
            { top: "32%", right: "16%", b: "TR" },
            { bottom: "30%", left: "16%", b: "BL" },
            { bottom: "30%", right: "16%", b: "BR" },
          ] as const
        ).map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "top" in p ? p.top : undefined,
              bottom: "bottom" in p ? p.bottom : undefined,
              left: "left" in p ? p.left : undefined,
              right: "right" in p ? p.right : undefined,
              width: 44,
              height: 44,
              borderTop: p.b.startsWith("T")
                ? "5px solid rgba(255,255,255,0.92)"
                : undefined,
              borderBottom: p.b.startsWith("B")
                ? "5px solid rgba(255,255,255,0.92)"
                : undefined,
              borderLeft: p.b.endsWith("L")
                ? "5px solid rgba(255,255,255,0.92)"
                : undefined,
              borderRight: p.b.endsWith("R")
                ? "5px solid rgba(255,255,255,0.92)"
                : undefined,
              borderRadius: 8,
            }}
          />
        ))}

        {/* karaoke caption */}
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 92,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                padding: "6px 16px",
                borderRadius: 12,
                fontFamily: fontHeading,
                fontWeight: 800,
                fontSize: 40,
                textTransform: "uppercase",
                letterSpacing: -1,
                lineHeight: 1.1,
                background: i === active ? theme.primary : "transparent",
                color: "#fff",
                transform: i === active ? "scale(1.08)" : "scale(1)",
                boxShadow: i === active ? shadowCute : undefined,
                textShadow: i === active ? "none" : "0 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* progress bar */}
        <div
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 56,
            height: 8,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.28)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.95)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
