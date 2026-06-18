"use client";

import * as React from "react";
import { Film } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { PromptForm } from "@/components/studio/prompt-form";
import { ResultCard } from "@/components/studio/result-card";
import { generateVideo } from "@/lib/api";
import type { GenerateRequest, VideoJob } from "@/lib/types";

export function Studio() {
  const [jobs, setJobs] = React.useState<VideoJob[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);

  async function handleGenerate(input: GenerateRequest) {
    setIsGenerating(true);

    const pendingId = crypto.randomUUID();
    const pending: VideoJob = {
      id: pendingId,
      prompt: input.prompt,
      status: "processing",
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    setJobs((prev) => [pending, ...prev]);

    try {
      const job = await generateVideo(input);
      setJobs((prev) => prev.map((j) => (j.id === pendingId ? job : j)));
      toast.success("Your video is ready!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setJobs((prev) =>
        prev.map((j) =>
          j.id === pendingId
            ? { ...j, status: "failed", error: message }
            : j,
        ),
      );
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Card className="border-border/60">
          <CardContent className="pt-6">
            <PromptForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <EmptyState />
        ) : (
          jobs.map((job) => <ResultCard key={job.id} job={job} />)
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
        <h3 className="text-lg font-bold">Your videos will appear here</h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Write a prompt, choose a style, and hit generate. Results show up in
          this panel.
        </p>
      </CardContent>
    </Card>
  );
}
