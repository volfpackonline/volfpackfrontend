import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          gap: 0,
        }}
      >
        {/* film-strip notch row */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 24,
            right: 24,
            height: 18,
            borderRadius: 6,
            background: "rgba(255,255,255,0.2)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 24,
            right: 24,
            height: 18,
            borderRadius: 6,
            background: "rgba(255,255,255,0.2)",
            display: "flex",
          }}
        />
        {/* VE monogram */}
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 72,
            color: "white",
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          VE
        </span>
        {/* sub-label */}
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 18,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.5px",
            marginTop: 4,
          }}
        >
          Video Enigma
        </span>
      </div>
    ),
    { ...size },
  );
}
