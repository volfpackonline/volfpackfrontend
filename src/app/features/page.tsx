import type { Metadata } from "next";
import {
  Captions,
  GitBranch,
  Layers,
  Mic2,
  RefreshCcw,
  Scissors,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore every step of the VolfPack pipeline: vertical crop, transcript, AI rewrite, TTS, word-level captions, human review editors, and channel analytics.",
};

const sections = [
  {
    icon: Scissors,
    color: "bg-violet-100 text-violet-500",
    title: "Full source-to-short pipeline",
    body: "Paste a YouTube URL (or upload a file) and VolfPack handles the rest: download with yt-dlp, crop landscape to 9:16, split at natural segment boundaries, clean frames, transcribe with Whisper, rewrite for shorts pacing, generate TTS audio, burn word-level captions, and assemble the final export — all in one durable async job.",
  },
  {
    icon: Layers,
    color: "bg-sky-100 text-sky-500",
    title: "Channel-level defaults",
    body: "Create a channel for each YouTube presence and lock in its crop strategy, voice, language, caption style, and LLM rewrite prompts. Every new project inherits those settings instantly — no per-clip setup.",
  },
  {
    icon: Mic2,
    color: "bg-pink-100 text-pink-500",
    title: "AI voice & animated captions",
    body: "Generate natural-sounding TTS with ElevenLabs (hosted) or Bark (local GPU). Word-level timestamps are aligned automatically so captions snap to the exact spoken word. Style them per channel — colour, size, highlight timing.",
  },
  {
    icon: GitBranch,
    color: "bg-emerald-100 text-emerald-500",
    title: "Provider-agnostic AI",
    body: "Every AI step — STT, LLM, TTS, OCR — runs through a swappable adapter. Use OpenAI today, switch to a local Whisper or LiteLLM-compatible model tomorrow. Bring your own API keys or use managed credits; the pipeline stays the same.",
  },
  {
    icon: RefreshCcw,
    color: "bg-amber-100 text-amber-500",
    title: "Human review at every step",
    body: "Four dedicated editors — crop, split timeline, script, captions — let you correct AI output before it moves to the next phase. Nothing exports without your approval. Retry individual phases without re-running the whole pipeline.",
  },
  {
    icon: TrendingUp,
    color: "bg-fuchsia-100 text-fuchsia-500",
    title: "Performance & analytics",
    body: "Import views, retention, and revenue data per exported short. Over time, VolfPack learns which hooks, caption styles, and segment types drive the best results on each channel and surfaces those patterns as recommended templates.",
  },
  {
    icon: Captions,
    color: "bg-rose-100 text-rose-500",
    title: "Self-host or hosted",
    body: "Run the full stack locally on a production PC via Docker Compose — your data and API keys never leave the machine. When your team grows, switch to the hosted tier for managed storage, a shared review queue, and team roles — same feature set, no migration.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Every tool your shorts operation needs
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          A complete pipeline from owned long-form content to publishable,
          monetization-ready clips — with human review built in at every step.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <Card
            key={s.title}
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-cute-lg"
          >
            <CardHeader>
              <div
                className={`grid size-12 place-items-center rounded-2xl ${s.color}`}
              >
                <s.icon className="size-6" />
              </div>
              <CardTitle className="mt-3 text-lg">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
