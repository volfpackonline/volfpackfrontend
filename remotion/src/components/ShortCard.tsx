import { theme, fontHeading, fontBody, shadowCute } from "../theme";

const SCREENS = [
  "linear-gradient(150deg, #c4b5fd, #f9a8d4)",
  "linear-gradient(150deg, #a8e6cf, #7dd3fc)",
  "linear-gradient(150deg, #ffd9b3, #ffb3d1)",
  "linear-gradient(150deg, #bfe3ff, #c9b8f5)",
];

/** A mini 9:16 "finished short" card with caption lines, a score + optional ✓. */
export const ShortCard: React.FC<{
  index: number;
  width?: number;
  approved?: boolean;
  score?: number;
  style?: React.CSSProperties;
}> = ({ index, width = 150, approved = false, score, style }) => {
  const height = (width / 9) * 16;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        background: theme.card,
        padding: 8,
        boxShadow: shadowCute,
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 8,
          borderRadius: 16,
          background: SCREENS[index % SCREENS.length],
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent 55%)",
          }}
        />
        {/* fake caption lines */}
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 30,
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "center",
          }}
        >
          {[34, 22, 40, 18].map((w, i) => (
            <span
              key={i}
              style={{
                width: w,
                height: 10,
                borderRadius: 4,
                background: i === 2 ? theme.primary : "rgba(255,255,255,0.92)",
              }}
            />
          ))}
        </div>
        {/* progress */}
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 16,
            height: 4,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.35)",
          }}
        >
          <div
            style={{
              width: "62%",
              height: "100%",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.95)",
            }}
          />
        </div>
      </div>

      {typeof score === "number" ? (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            padding: "4px 10px",
            borderRadius: 9999,
            background: theme.card,
            boxShadow: shadowCute,
            fontFamily: fontHeading,
            fontWeight: 800,
            fontSize: 18,
            color: "#10b981",
          }}
        >
          {score}
        </div>
      ) : null}

      {approved ? (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            width: 34,
            height: 34,
            borderRadius: 9999,
            background: theme.primary,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fontBody,
            fontWeight: 800,
            fontSize: 22,
            boxShadow: shadowCute,
          }}
        >
          ✓
        </div>
      ) : null}
    </div>
  );
};
