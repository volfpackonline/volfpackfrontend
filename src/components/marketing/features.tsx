import {
  Captions,
  GitBranch,
  Layers,
  Mic2,
  Scissors,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Scissors,
    title: "Source-to-short pipeline",
    color: "bg-violet-100 text-violet-500",
    description:
      "Download, crop to vertical, split into segments, clean frames, transcribe, rewrite, and assemble — all from a single URL.",
  },
  {
    icon: Mic2,
    title: "AI voice & captions",
    color: "bg-pink-100 text-pink-500",
    description:
      "Generate TTS audio with ElevenLabs or local Bark, then burn word-level animated captions directly into the final export.",
  },
  {
    icon: Layers,
    title: "Channel-level defaults",
    color: "bg-sky-100 text-sky-500",
    description:
      "Configure crop strategy, voice, language, and caption style per channel. Every new project inherits them instantly.",
  },
  {
    icon: GitBranch,
    title: "Provider-agnostic AI",
    color: "bg-emerald-100 text-emerald-500",
    description:
      "Swap STT, LLM, TTS, and OCR providers without rewriting the pipeline. BYO keys or use managed credits — your choice.",
  },
  {
    icon: Captions,
    title: "Human review editors",
    color: "bg-amber-100 text-amber-500",
    description:
      "Correct crop rectangles, split points, scripts, and caption tokens in dedicated editors before anything exports.",
  },
  {
    icon: TrendingUp,
    title: "Performance analytics",
    color: "bg-fuchsia-100 text-fuchsia-500",
    description:
      "Track views, retention, and revenue per exported short. Learn which hooks and caption styles win on each channel.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything your shorts operation needs
        </h2>
        <p className="mt-4 text-muted-foreground">
          A complete pipeline from owned long-form content to publishable,
          monetization-ready shorts — with human review built in at every step.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-cute-lg"
          >
            <CardHeader>
              <div
                className={`grid size-12 place-items-center rounded-2xl ${feature.color}`}
              >
                <feature.icon className="size-6" />
              </div>
              <CardTitle className="mt-3 text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
