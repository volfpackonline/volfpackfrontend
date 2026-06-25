"use client";

import { Clock, Download, Flame, Scissors } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ClipResult } from "@/lib/types";

export function ClipResultCard({ clip }: { clip: ClipResult }) {
  return (
    <Card className="animate-rise-in overflow-hidden border-border/60 py-0">
      <div className="flex flex-col sm:flex-row">
        {/* 9:16 short */}
        <div className="relative aspect-[9/16] w-full shrink-0 bg-foreground/90 sm:w-44">
          <video
            src={clip.videoUrl}
            poster={clip.posterUrl}
            controls
            playsInline
            className="size-full object-cover"
          />
          <div className="pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
            <Scissors className="size-3" />
            9:16
          </div>
        </div>

        {/* Metadata */}
        <CardContent className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cut from
            </p>
            <Badge className="shrink-0 gap-1 bg-emerald-100 text-emerald-600">
              <Flame className="size-3" />
              {clip.score}/100
            </Badge>
          </div>

          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {clip.sourceTitle}
          </p>

          <p className="font-heading text-base font-bold leading-snug">
            “{clip.hook}”
          </p>

          <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {clip.durationSec}s
            </span>
            <span>Review-ready</span>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <a
                href={clip.videoUrl}
                download
                target="_blank"
                rel="noreferrer"
              >
                <Download className="size-4" />
                Download
              </a>
            </Button>
            <Button size="sm" className="flex-1">
              Approve & export
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
