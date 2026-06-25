"use client";

import * as React from "react";
import { Film } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { IngestForm } from "@/components/studio/ingest-form";
import { PipelineRunner } from "@/components/studio/pipeline-runner";
import { ClipResultCard } from "@/components/studio/clip-result";
import { ingestVideo } from "@/lib/api";
import { PIPELINE_PHASES, type ClipResult, type IngestRequest } from "@/lib/types";

const TOTAL_PHASES = PIPELINE_PHASES.length;
const PHASE_MS = 620;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Studio() {
  const [clips, setClips] = React.useState<ClipResult[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [failedIndex, setFailedIndex] = React.useState<number | null>(null);
  const [isRunning, setIsRunning] = React.useState(false);

  // Guards against state updates after unmount during the async pipeline.
  const mounted = React.useRef(true);
  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  async function handleSubmit(input: IngestRequest) {
    setIsRunning(true);
    setFailedIndex(null);
    setActiveIndex(0);

    // Kick off the real request and the visual phase walk in parallel; the
    // result is only shown once both the request resolves and the phases land.
    const request = ingestVideo(input);

    try {
      for (let i = 0; i < TOTAL_PHASES; i++) {
        if (!mounted.current) return;
        setActiveIndex(i);
        await sleep(PHASE_MS);
      }

      const clip = await request;
      if (!mounted.current) return;

      setActiveIndex(TOTAL_PHASES);
      setClips((prev) => [clip, ...prev]);
      toast.success("Your short is ready to review!");
    } catch (error) {
      if (!mounted.current) return;
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setFailedIndex((idx) => (idx === null ? activeIndex : idx));
      toast.error(message);
    } finally {
      if (mounted.current) setIsRunning(false);
    }
  }

  const showRunner = isRunning || failedIndex !== null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Card className="border-border/60">
          <CardContent className="pt-6">
            <IngestForm onSubmit={handleSubmit} isRunning={isRunning} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {showRunner && (
          <PipelineRunner activeIndex={activeIndex} failedIndex={failedIndex} />
        )}

        {clips.length === 0 && !showRunner ? (
          <EmptyState />
        ) : (
          clips.map((clip) => <ClipResultCard key={clip.id} clip={clip} />)
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="border-2 border-dashed border-border bg-card/60 shadow-none">
      <CardContent className="flex min-h-80 flex-col items-center justify-center gap-3 text-center">
        <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 via-pink-100 to-sky-100 text-violet-500">
          <Film className="size-7" />
        </div>
        <h3 className="font-heading text-lg font-bold">
          Your shorts will appear here
        </h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Paste a long-form URL, pick your channel defaults, and run the
          pipeline. Each reviewable short lands in this panel.
        </p>
      </CardContent>
    </Card>
  );
}
