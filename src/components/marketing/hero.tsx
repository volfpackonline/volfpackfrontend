import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-60" />
      <div className="animate-float-soft pointer-events-none absolute left-[8%] top-[12%] -z-10 size-64 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="animate-float-soft pointer-events-none absolute right-[6%] top-[22%] -z-10 size-72 rounded-full bg-sky-300/40 blur-3xl [animation-delay:-3s]" />
      <div className="animate-float-soft pointer-events-none absolute left-1/2 top-[-6%] -z-10 size-80 -translate-x-1/2 rounded-full bg-violet-300/40 blur-3xl [animation-delay:-6s]" />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm text-muted-foreground shadow-cute backdrop-blur transition-colors hover:text-foreground"
        >
          <Star className="size-3.5 fill-amber-300 text-amber-300" />
          100% open source — star us on GitHub ✨
        </Link>

        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          Turn your long-form library into a{" "}
          <span className="text-gradient-brand">shorts revenue machine</span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          {siteConfig.name} is the open-source AI shorts operating system.
          Paste a YouTube URL, let the pipeline do the heavy lifting — crop,
          transcript, rewrite, TTS, captions, assemble — and ship publishable
          shorts in minutes, not hours.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
    </section>
  );
}
