export type AspectRatio = "16:9" | "9:16" | "1:1";

export type VideoStyle =
  | "cinematic"
  | "anime"
  | "3d"
  | "claymation"
  | "realistic";

export type VideoDuration = 4 | 8 | 16;

export interface GenerateRequest {
  prompt: string;
  aspectRatio: AspectRatio;
  style: VideoStyle;
  duration: VideoDuration;
}

export type JobStatus = "queued" | "processing" | "succeeded" | "failed";

export interface VideoJob {
  id: string;
  prompt: string;
  status: JobStatus;
  /** 0–100 */
  progress: number;
  videoUrl?: string;
  posterUrl?: string;
  createdAt: string;
  error?: string;
}

export const ASPECT_RATIOS: { value: AspectRatio; label: string }[] = [
  { value: "16:9", label: "16:9 — Landscape" },
  { value: "9:16", label: "9:16 — Vertical" },
  { value: "1:1", label: "1:1 — Square" },
];

export const STYLES: { value: VideoStyle; label: string }[] = [
  { value: "cinematic", label: "Cinematic" },
  { value: "realistic", label: "Realistic" },
  { value: "anime", label: "Anime" },
  { value: "3d", label: "3D Render" },
  { value: "claymation", label: "Claymation" },
];

export const DURATIONS: { value: VideoDuration; label: string }[] = [
  { value: 4, label: "4 seconds" },
  { value: 8, label: "8 seconds" },
  { value: 16, label: "16 seconds" },
];
