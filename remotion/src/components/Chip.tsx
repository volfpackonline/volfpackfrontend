import { theme, fontBody, shadowCute } from "../theme";

/** Pill chip — pastel fill, rounded-full, warm ink text. */
export const Chip: React.FC<{
  children: React.ReactNode;
  dot?: string;
  background?: string;
  style?: React.CSSProperties;
}> = ({ children, dot, background = theme.card, style }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 30px",
        borderRadius: 9999,
        background,
        border: `1px solid ${theme.border}`,
        boxShadow: shadowCute,
        fontFamily: fontBody,
        fontWeight: 600,
        fontSize: 34,
        color: theme.ink,
        ...style,
      }}
    >
      {dot ? (
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: 9999,
            background: dot,
          }}
        />
      ) : null}
      {children}
    </div>
  );
};
