import { theme, fontHeading } from "../theme";

/** The "VP" gradient app-tile, matching the site icon/OG monogram. */
export const BrandTile: React.FC<{ size?: number }> = ({ size = 120 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: fontHeading,
        fontWeight: 800,
        fontSize: size * 0.42,
        letterSpacing: -2,
        boxShadow: "0 20px 50px rgba(124,58,237,0.35)",
      }}
    >
      VP
    </div>
  );
};

/** Full wordmark: tile + "VolfPack". */
export const Wordmark: React.FC<{ size?: number }> = ({ size = 110 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <BrandTile size={size} />
      <span
        style={{
          fontFamily: fontHeading,
          fontWeight: 800,
          fontSize: size * 0.86,
          letterSpacing: -2,
          color: theme.ink,
        }}
      >
        VolfPack
      </span>
    </div>
  );
};
