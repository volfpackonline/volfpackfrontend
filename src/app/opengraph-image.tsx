import {
  createOgImage,
  ogAlt,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

// Used by WhatsApp, Slack, Discord, LinkedIn, iMessage, Facebook, and any other
// OpenGraph-aware client.
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return createOgImage();
}
