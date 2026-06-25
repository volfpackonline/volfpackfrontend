import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CaptionPhone } from "@/components/caption-phone";
import { PIPELINE_PHASES } from "@/lib/types";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-60" />
      <div className="animate-float-soft pointer-events-none absolute left-[8%] top-[12%] -z-10 size-64 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="animate-float-soft pointer-events-none absolute right-[6%] top-[22%] -z-10 size-72 rounded-full bg-sky-300/40 blur-3xl [animation-delay:-3s]" />
      <div className="animate-float-soft pointer-events-none absolute left-1/2 top-[-6%] -z-10 size-80 -translate-x-1/2 rounded-full bg-violet-300/40 blur-3xl [animation-delay:-6s]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="flex flex-col items-start text-left">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm text-muted-foreground shadow-cute backdrop-blur transition-colors hover:text-foreground"
          >
            <Star className="size-3.5 fill-amber-300 text-amber-300" />
            100% open source — star us on GitHub ✨
          </Link>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Turn your long-form library into a{" "}
            <span className="text-gradient-brand">shorts revenue machine</span>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
            Paste a YouTube URL and the open-source pipeline does the heavy
            lifting — crop, transcript, rewrite, TTS, captions, assemble — and
            ships publishable shorts in minutes, not hours.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base">
              <Link href="/generate">
                <Play className="size-4" />
                Process your first video
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base"
            >
              <Link href="/#how-it-works">
                See how it works
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Free to self-host · BYO API keys · No vendor lock-in
          </p>
        </div>

        {/* Animated product showcase */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="animate-float-soft pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-violet-300/30 via-pink-300/30 to-sky-300/30 blur-2xl" />

          {/* Landscape → vertical conversion hint */}
          <div className="absolute -left-2 top-6 hidden rounded-2xl border border-border/60 bg-card/80 p-2 shadow-cute backdrop-blur sm:block lg:-left-6">
            <div className="grid h-12 w-20 place-items-center rounded-lg bg-gradient-to-br from-violet-200 to-sky-200 text-[10px] font-bold text-violet-700">
              16:9
            </div>
            <div className="mt-1 text-center text-[10px] font-semibold text-muted-foreground">
              source
            </div>
          </div>

          <CaptionPhone />

          {/* Live score chip */}
          <div className="absolute -right-2 bottom-16 rounded-2xl border border-border/60 bg-card/90 px-3 py-2 shadow-cute backdrop-blur lg:-right-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Retention score
            </p>
            <p className="font-heading text-xl font-bold text-emerald-500">
              94<span className="text-sm text-muted-foreground">/100</span>
            </p>
          </div>
        </div>
      </div>

      {/* Pipeline ticker */}
      <div className="relative border-y border-border/60 bg-secondary/40 py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-3 pr-3">
            {[...PIPELINE_PHASES, ...PIPELINE_PHASES].map((phase, i) => (
              <span
                key={`${phase.id}-${i}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-primary/70" />
                {phase.label}
                <span className="font-mono text-[10px] text-muted-foreground/70">
                  {phase.engine}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
