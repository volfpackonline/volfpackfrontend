import { loadFont as loadBaloo } from "@remotion/google-fonts/Baloo2";
import { loadFont as loadQuicksand } from "@remotion/google-fonts/Quicksand";

/**
 * VolfPack brand tokens, mirrored from design.md / src/app/globals.css so the
 * ad matches the site exactly. Soft Pastel: cream + lavender + pastel accents,
 * rounded everything, warm ink text (never pure black/white).
 */

export const FPS = 30;
export const DURATION_FRAMES = 900; // 30s

const baloo = loadBaloo();
const quicksand = loadQuicksand();

export const fontHeading = baloo.fontFamily; // Baloo 2 — chunky, rounded
export const fontBody = quicksand.fontFamily; // Quicksand — rounded sans

export const theme = {
  cream: "#FFFDF9", // --background
  ink: "#4A4458", // --foreground (warm, never pure black)
  inkSoft: "#7C7A8A", // muted-foreground-ish
  card: "#FFFFFF",
  muted: "#F6F1FA",
  primary: "#A78BFA", // lavender
  accentPink: "#FFD6E8",
  border: "#EFE7F2",
  // Pastel accent set (use in pairs/trios as soft gradients)
  lavender: "#C9B8F5",
  pink: "#FFB3D1",
  mint: "#A8E6CF",
  peach: "#FFD9B3",
  sky: "#BFE3FF",
  // Brand headline gradient (violet-400 → pink-400 → sky-400)
  gradient: "linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #38bdf8 100%)",
} as const;

// Signature soft, faintly-lavender lifted shadow (.shadow-cute).
export const shadowCute = "0 2px 6px rgba(124,58,237,0.08), 0 18px 48px rgba(124,58,237,0.16)";

// Helper: brand text-gradient style.
export const gradientText: React.CSSProperties = {
  backgroundImage: theme.gradient,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
