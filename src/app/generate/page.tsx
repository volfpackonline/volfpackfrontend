import type { Metadata } from "next";

import { Studio } from "@/components/studio/studio";

export const metadata: Metadata = {
  title: "Studio",
  description: "Generate video from text with VolfPack.",
};

export default function GeneratePage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="animate-float-soft pointer-events-none absolute right-[10%] top-0 -z-10 size-56 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The <span className="text-gradient-brand">Studio</span> 🎬
        </h1>
        <p className="mt-2 text-muted-foreground">
          Describe what you want to see and generate it. Tweak the style and
          re-roll until it&apos;s just right.
        </p>
      </div>

      <Studio />
    </div>
  );
}
