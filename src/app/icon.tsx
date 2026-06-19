import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* scissor-notch strip along the top — film-strip detail */}
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 4,
            right: 4,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.25)",
            display: "flex",
          }}
        />
        {/* VE monogram */}
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 14,
            color: "white",
            letterSpacing: "-0.5px",
            lineHeight: 1,
            marginTop: 3,
          }}
        >
          VE
        </span>
      </div>
    ),
    { ...size },
  );
}
