import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how VolfPack turns a YouTube URL into a publish-ready short in eight automated pipeline phases — download, crop, split, transcribe, rewrite, TTS, captions, and assemble.",
};

const phases = [
  {
    step: "01",
    color: "bg-violet-100 text-violet-600",
    title: "Source selection & download",
    description:
      "Paste any YouTube URL (or upload a file). VolfPack fetches the video with yt-dlp, extracts audio, and stores technical metadata: resolution, FPS, duration, codec, and audio sample rate.",
  },
  {
    step: "02",
    color: "bg-pink-100 text-pink-600",
    title: "Vertical crop",
    description:
      "An AI crop strategy (face-tracking, podcast, or custom rectangle) converts the landscape source into a 9:16 vertical frame. Review and adjust the crop rectangle in the interactive editor before anything renders.",
  },
  {
    step: "03",
    color: "bg-sky-100 text-sky-600",
    title: "Segment splitting",
    description:
      "The transcript is analysed by an LLM to find natural segment boundaries within your configured min/max duration. Use the timeline editor to add, remove, or nudge split points.",
  },
  {
    step: "04",
    color: "bg-emerald-100 text-emerald-600",
    title: "Frame cleaning",
    description:
      "EasyOCR detects on-screen text (lower-thirds, watermarks) so the pipeline can flag or remove frames that would look wrong in the short.",
  },
  {
    step: "05",
    color: "bg-amber-100 text-amber-600",
    title: "Transcription",
    description:
      "Whisper (local) or a hosted STT provider transcribes the segment with word-level timestamps. The script editor lets you correct factual errors or adjust phrasing before the rewrite step.",
  },
  {
    step: "06",
    color: "bg-fuchsia-100 text-fuchsia-600",
    title: "AI script rewrite",
    description:
      "An LLM rewrites the transcript for shorts pacing: strong hook in the first three seconds, tight mid-section, clear close. The rewrite respects your channel's language, tone, and target duration.",
  },
  {
    step: "07",
    color: "bg-rose-100 text-rose-600",
    title: "TTS & caption alignment",
    description:
      "ElevenLabs (hosted) or Bark (local GPU) converts the script to audio. Word timestamps are aligned automatically, then styled into animated captions that snap to each spoken word.",
  },
  {
    step: "08",
    color: "bg-cyan-100 text-cyan-600",
    title: "Assembly & export",
    description:
      "FFmpeg composites the cropped video, TTS audio, and burned-in captions into a single export file. Approve the final short in the review queue, then download or schedule it for publishing.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          From URL to publishable short
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Eight automated phases, four human review editors, and one final
          approval gate — so nothing ships until you say so.
        </p>
      </div>

      <ol className="relative space-y-0">
        {phases.map((phase, i) => (
          <li key={phase.step} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${phase.color}`}
              >
                {phase.step}
              </div>
              {i < phases.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>
            <div className={`pb-10 ${i === phases.length - 1 ? "pb-0" : ""}`}>
              <h2 className="text-xl font-bold">{phase.title}</h2>
              <p className="mt-2 text-muted-foreground">{phase.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
