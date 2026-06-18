import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-violet-200 via-pink-200 to-sky-200 px-6 py-16 text-center text-violet-950 shadow-cute-lg sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" />
        <div className="animate-float-soft pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/40 blur-2xl" />
        <div className="relative">
          <span className="text-4xl">🎬✨</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Your next video is one sentence away
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-violet-900/80">
            Start creating for free. Open the studio, write a prompt, and
            generate something worth sharing.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 px-8 text-base"
          >
            <Link href="/generate">
              <Sparkles className="size-4" />
              Open the studio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
