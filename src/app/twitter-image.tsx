import {
  createOgImage,
  ogAlt,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

// Used by Twitter/X (summary_large_image, 1200×630).
export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return createOgImage();
}
