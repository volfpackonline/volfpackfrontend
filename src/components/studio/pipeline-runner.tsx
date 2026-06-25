"use client";

import { Check, Loader2, X } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PIPELINE_PHASES, type PhaseStatus } from "@/lib/types";

interface PipelineRunnerProps {
  /** Index of the active phase, or PIPELINE_PHASES.length when complete. */
  activeIndex: number;
  failedIndex: number | null;
}

export function PipelineRunner({ activeIndex, failedIndex }: PipelineRunnerProps) {
  const total = PIPELINE_PHASES.length;
  const done = Math.min(activeIndex, total);
  const pct = Math.round((done / total) * 100);

  return (
    <Card className="border-border/60">
      <CardContent className="space-y-5 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-lg font-bold">Processing your short</p>
            <p className="text-sm text-muted-foreground">
              {failedIndex !== null
                ? "A phase failed — retry it from the editor."
                : "Eight phases, fully automated."}
            </p>
          </div>
          <div className="text-right">
            <p className="font-heading text-2xl font-bold tabular-nums text-primary">
              {pct}%
            </p>
            <p className="text-xs text-muted-foreground">
              {done}/{total} phases
            </p>
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-sky-400 transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ol className="space-y-1">
          {PIPELINE_PHASES.map((phase, i) => {
            const status: PhaseStatus =
              failedIndex === i
                ? "failed"
                : i < activeIndex
                  ? "done"
                  : i === activeIndex
                    ? "active"
                    : "pending";

            return (
              <li
                key={phase.id}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors",
                  status === "active" && "animate-shimmer bg-primary/8",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors",
                    status === "done" && "bg-primary text-primary-foreground",
                    status === "active" && "bg-primary/15 text-primary",
                    status === "pending" && "bg-muted text-muted-foreground",
                    status === "failed" && "bg-destructive/15 text-destructive",
                  )}
                >
                  {status === "done" ? (
                    <Check className="size-4" />
                  ) : status === "active" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : status === "failed" ? (
                    <X className="size-4" />
                  ) : (
                    String(i + 1)
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "truncate text-sm font-semibold",
                        status === "pending" && "text-muted-foreground",
                      )}
                    >
                      {phase.label}
                    </p>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {phase.engine}
                    </span>
                  </div>
                  {status === "active" && (
                    <p className="truncate text-xs text-muted-foreground">
                      {phase.detail}…
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
