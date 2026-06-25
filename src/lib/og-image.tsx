import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

/**
 * Shared 1200×630 social card used by both the OpenGraph image (WhatsApp, Slack,
 * Discord, LinkedIn, iMessage, Facebook…) and the Twitter/X image. Rendered with
 * Satori via next/og, so only the flexbox subset of CSS is available and colors
 * are plain hex (no oklch).
 */

export const ogAlt = `${siteConfig.name} — turn one long video into ready-to-post shorts`;
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const INK = "#3f3a52";
const MUTED = "#7c7a8a";
const CREAM = "#fbfaf6";
const BRAND_GRADIENT = "linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #38bdf8 100%)";

const CHIPS = [
  { label: "Auto-clip", dot: "#8b5cf6" },
  { label: "Captions", dot: "#38bdf8" },
  { label: "Voiceover", dot: "#34d399" },
  { label: "Hooks", dot: "#f472b6" },
  { label: "Translate", dot: "#fbbf24" },
];

const CAPTION_WORDS = ["Nobody", "tells", "you", "this", "about", "your", "first", "1,000"];
const ACTIVE_WORD = 7;

export function createOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: CREAM,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          padding: 64,
          overflow: "hidden",
        }}
      >
        {/* Soft pastel blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: 9999,
            background: "rgba(167,139,250,0.22)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: 240,
            width: 320,
            height: 320,
            borderRadius: 9999,
            background: "rgba(244,114,182,0.18)",
            display: "flex",
          }}
        />

        {/* Left column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              padding: "8px 18px",
              borderRadius: 9999,
              border: "1px solid #e7e3ee",
              background: "#ffffff",
              color: "#6b6880",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ display: "flex" }}>
              <path
                d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
                fill="#fbbf24"
              />
            </svg>
            100% open source
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 800,
                color: INK,
                letterSpacing: "-1.5px",
                lineHeight: 1.05,
              }}
            >
              Turn one long video into
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
                backgroundImage: BRAND_GRADIENT,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              scroll-stopping shorts
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 25,
              color: MUTED,
              lineHeight: 1.4,
              maxWidth: 560,
            }}
          >
            Paste a link to your podcast, vlog, or stream — get back
            ready-to-post shorts with captions, framing, and hooks done for you.
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
            {CHIPS.map((chip) => (
              <div
                key={chip.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 15px",
                  borderRadius: 9999,
                  border: "1px solid #e7e3ee",
                  background: "#ffffff",
                  color: "#6b6880",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 9999,
                    background: chip.dot,
                    display: "flex",
                  }}
                />
                {chip.label}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              VP
            </div>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: INK }}>
              {siteConfig.name}
            </div>
            <div style={{ display: "flex", fontSize: 22, color: MUTED }}>
              · volfpack.online
            </div>
          </div>
        </div>

        {/* Right column — 9:16 phone mock */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 360,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 278,
              height: 494,
              borderRadius: 42,
              background: "#2a2438",
              padding: 12,
              boxShadow: "0 30px 60px rgba(124,58,237,0.28)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                flex: 1,
                borderRadius: 30,
                background: "linear-gradient(150deg, #c4b5fd 0%, #f9a8d4 55%, #7dd3fc 100%)",
                position: "relative",
                padding: 16,
                overflow: "hidden",
              }}
            >
              {/* status chip */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "5px 11px",
                  borderRadius: 9999,
                  background: "rgba(0,0,0,0.38)",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#f87171", display: "flex" }} />
                9:16 · auto-crop
              </div>

              {/* crop brackets */}
              <div style={{ position: "absolute", top: 150, left: 54, width: 28, height: 28, borderTop: "3px solid rgba(255,255,255,0.9)", borderLeft: "3px solid rgba(255,255,255,0.9)", borderTopLeftRadius: 6, display: "flex" }} />
              <div style={{ position: "absolute", top: 150, right: 54, width: 28, height: 28, borderTop: "3px solid rgba(255,255,255,0.9)", borderRight: "3px solid rgba(255,255,255,0.9)", borderTopRightRadius: 6, display: "flex" }} />
              <div style={{ position: "absolute", top: 270, left: 54, width: 28, height: 28, borderBottom: "3px solid rgba(255,255,255,0.9)", borderLeft: "3px solid rgba(255,255,255,0.9)", borderBottomLeftRadius: 6, display: "flex" }} />
              <div style={{ position: "absolute", top: 270, right: 54, width: 28, height: 28, borderBottom: "3px solid rgba(255,255,255,0.9)", borderRight: "3px solid rgba(255,255,255,0.9)", borderBottomRightRadius: 6, display: "flex" }} />

              {/* caption */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                {CAPTION_WORDS.map((word, i) => (
                  <div
                    key={`${word}-${i}`}
                    style={{
                      display: "flex",
                      padding: "3px 8px",
                      borderRadius: 7,
                      fontSize: 17,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "-0.3px",
                      background: i === ACTIVE_WORD ? "#8b5cf6" : "transparent",
                      color: "#ffffff",
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* floating score badge */}
          <div
            style={{
              position: "absolute",
              right: 6,
              bottom: 70,
              display: "flex",
              flexDirection: "column",
              padding: "12px 16px",
              borderRadius: 18,
              background: "#ffffff",
              border: "1px solid #e7e3ee",
              boxShadow: "0 16px 32px rgba(124,58,237,0.18)",
            }}
          >
            <div style={{ display: "flex", fontSize: 13, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.4px" }}>
              Retention
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: "#10b981" }}>94</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: MUTED, marginBottom: 4 }}>/100</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
