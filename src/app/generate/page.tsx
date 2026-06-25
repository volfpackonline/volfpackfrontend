import type { Metadata } from "next";

import { Studio } from "@/components/studio/studio";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Paste a long-form URL and watch the Video Enigma pipeline cut it into a publish-ready 9:16 short — crop, transcript, rewrite, voice, captions, assemble.",
};

export default function GeneratePage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="animate-float-soft pointer-events-none absolute right-[10%] top-0 -z-10 size-56 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The <span className="text-gradient-brand">Studio</span> 🎬
        </h1>
        <p className="mt-2 text-muted-foreground">
          Drop in a long-form video URL and watch the pipeline turn it into a
          reviewable short — crop, transcript, rewrite, voice, and captions, all
          automated.
        </p>
      </div>

      <Studio />
    </div>
  );
}
