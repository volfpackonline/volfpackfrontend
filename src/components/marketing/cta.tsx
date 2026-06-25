import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-violet-200 via-pink-200 to-sky-200 px-6 py-16 text-center text-violet-950 shadow-cute-lg sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" />
        <div className="animate-float-soft pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/40 blur-2xl" />
        <div className="relative">
          <span className="text-4xl">📹✂️</span>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Your back catalog is full of viral shorts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-violet-900/80">
            Stop letting great moments stay buried in long videos. Turn them
            into scroll-stopping clips and post all week — starting today, for
            free.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/generate">
                Make your first short
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-violet-400/60 px-8 text-base text-violet-950 hover:bg-white/40"
            >
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
