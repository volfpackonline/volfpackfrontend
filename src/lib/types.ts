/**
 * Domain model for the Video Enigma pipeline: a long-form source URL is ingested
 * and run through eight phases to produce a publish-ready 9:16 short. These types
 * back both the Studio UI and the mocked /api/generate route.
 */

export type CropStrategy = "face-track" | "podcast" | "center" | "custom";
export type Voice = "ava" | "atlas" | "nova" | "bark-local";
export type Language = "en" | "es" | "hi" | "fr" | "de";
export type CaptionStyle = "pop" | "karaoke" | "minimal" | "bold-box";

export interface IngestRequest {
  url: string;
  cropStrategy: CropStrategy;
  voice: Voice;
  language: Language;
  captionStyle: CaptionStyle;
}

/** A single produced short. */
export interface ClipResult {
  id: string;
  /** Title of the source the clip was cut from. */
  sourceTitle: string;
  /** AI-written hook shown in the first seconds. */
  hook: string;
  /** Length of the produced short, in seconds. */
  durationSec: number;
  /** Repurposability score the ingest step assigned, 0–100. */
  score: number;
  videoUrl: string;
  posterUrl?: string;
  createdAt: string;
}

export type PhaseStatus = "pending" | "active" | "done" | "failed";

export interface PhaseDef {
  id: string;
  label: string;
  /** Shown under the label while the phase is active. */
  detail: string;
  /** Engine/provider tag rendered as a chip. */
  engine: string;
}

/** The eight pipeline phases, in execution order. */
export const PIPELINE_PHASES: PhaseDef[] = [
  { id: "download", label: "Download source", detail: "Fetching video & extracting audio", engine: "yt-dlp" },
  { id: "crop", label: "Vertical crop", detail: "Tracking subject into a 9:16 frame", engine: "OpenCV" },
  { id: "split", label: "Segment split", detail: "Finding the highest-retention moment", engine: "LLM" },
  { id: "clean", label: "Frame clean", detail: "Removing lower-thirds & watermarks", engine: "EasyOCR" },
  { id: "transcribe", label: "Transcribe", detail: "Word-level timestamps", engine: "Whisper" },
  { id: "rewrite", label: "Script rewrite", detail: "Tightening the hook & pacing", engine: "LLM" },
  { id: "voice", label: "Voice & captions", detail: "Synthesizing audio, aligning words", engine: "ElevenLabs" },
  { id: "assemble", label: "Assemble & export", detail: "Compositing the final MP4", engine: "FFmpeg" },
];

export const CROP_STRATEGIES: { value: CropStrategy; label: string }[] = [
  { value: "face-track", label: "Face tracking" },
  { value: "podcast", label: "Podcast (split frame)" },
  { value: "center", label: "Center cut" },
  { value: "custom", label: "Custom rectangle" },
];

export const VOICES: { value: Voice; label: string }[] = [
  { value: "ava", label: "Ava — warm" },
  { value: "atlas", label: "Atlas — deep" },
  { value: "nova", label: "Nova — bright" },
  { value: "bark-local", label: "Bark (local GPU)" },
];

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "hi", label: "Hindi" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

export const CAPTION_STYLES: { value: CaptionStyle; label: string }[] = [
  { value: "pop", label: "Pop — word bounce" },
  { value: "karaoke", label: "Karaoke highlight" },
  { value: "minimal", label: "Minimal" },
  { value: "bold-box", label: "Bold box" },
];
