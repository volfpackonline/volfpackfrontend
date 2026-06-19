import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Video Enigma is MIT-licensed and fully self-hostable. Read about the open-core model, how to contribute, and why we build in public.",
};

export default function OpenSourcePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 grid size-20 place-items-center rounded-3xl bg-muted">
          <GitHubIcon className="size-10 text-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Open source at the core
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          The full pipeline — download, crop, split, transcribe, rewrite, TTS,
          captions, assemble — is MIT licensed and free to self-host forever.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10 text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl font-bold text-foreground">Why open source?</h2>
          <p>
            The biggest barrier to adopting AI tooling for video is trust — trust
            that your content stays private, your API keys are not leaked, and the
            pipeline does what it says. Open source solves that: every line of code
            that processes your videos is auditable. Self-hosted operators keep full
            control.
          </p>
          <p>
            It also forces us to build something genuinely useful rather than hiding
            mediocre output behind a paywall. If the community can run it locally and
            find it valuable, the hosted tier earns its place.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">What is open vs. paid?</h2>
          <p>
            <strong className="text-foreground">Open (MIT):</strong> the entire
            processing pipeline, all provider adapters, the React/Next frontend, the
            FastAPI backend, Docker Compose setup, and all editor interfaces.
          </p>
          <p>
            <strong className="text-foreground">Paid (hosted tiers):</strong> managed
            cloud hosting, shared object storage, team approval queues, agency
            workspaces, managed AI credits, and SLA support. You are paying for
            convenience and operational work — not for features locked away from
            self-hosters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">Self-hosting in five minutes</h2>
          <p>
            Install Docker, clone the repo, copy <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">.env.example</code> to{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">.env</code>, add your API keys, and run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">docker compose up</code>. The
            full stack — API, workers, frontend, Postgres, Redis — starts locally.
            No cloud account needed.
          </p>
          <p>
            For local-only processing (no external API calls), configure Whisper for
            STT and Bark for TTS. FFmpeg handles all media operations in-process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground">Contributing</h2>
          <p>
            Bug reports, provider adapters, and editor improvements are all
            welcome. Open an issue to discuss before submitting a large pull
            request. The most valuable contributions right now are additional STT
            and TTS provider adapters, and fixture corpora for FFmpeg edge cases.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <a href={siteConfig.github} target="_blank" rel="noreferrer">
            <GitHubIcon className="size-5" />
            View on GitHub
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
          <Link href="/how-it-works">See how the pipeline works</Link>
        </Button>
      </div>
    </div>
  );
}
