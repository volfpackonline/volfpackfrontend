"use client";

import { Download, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { VideoJob } from "@/lib/types";

export function ResultCard({ job }: { job: VideoJob }) {
  const isPending = job.status === "queued" || job.status === "processing";

  return (
    <Card className="overflow-hidden border-border/60 py-0">
      <div className="relative aspect-video bg-muted">
        {isPending && (
          <div className="absolute inset-0 grid place-items-center gap-3 text-muted-foreground">
            <Skeleton className="absolute inset-0 rounded-none" />
            <div className="relative flex flex-col items-center gap-2">
              <Loader2 className="size-6 animate-spin" />
              <span className="text-sm">Rendering your video…</span>
            </div>
          </div>
        )}

        {job.status === "succeeded" && job.videoUrl && (
          <video
            src={job.videoUrl}
            poster={job.posterUrl}
            controls
            playsInline
            className="size-full object-cover"
          />
        )}

        {job.status === "failed" && (
          <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-destructive">
            {job.error ?? "Generation failed."}
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {job.prompt}
          </p>
          <Badge
            variant={job.status === "succeeded" ? "default" : "secondary"}
            className="shrink-0 capitalize"
          >
            {job.status}
          </Badge>
        </div>

        {job.status === "succeeded" && job.videoUrl && (
          <Button asChild variant="outline" size="sm" className="w-full">
            <a href={job.videoUrl} download target="_blank" rel="noreferrer">
              <Download className="size-4" />
              Download
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
