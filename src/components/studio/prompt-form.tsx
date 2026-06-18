"use client";

import * as React from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ASPECT_RATIOS,
  DURATIONS,
  STYLES,
  type AspectRatio,
  type GenerateRequest,
  type VideoDuration,
  type VideoStyle,
} from "@/lib/types";

const PROMPT_MAX = 600;

const SAMPLE_PROMPTS = [
  "A neon-lit Tokyo street in the rain, reflections shimmering, slow cinematic dolly shot",
  "An astronaut floating above Earth at sunrise, golden light, ultra-detailed, IMAX style",
  "A cozy cabin in a snowy forest at night, smoke from the chimney, warm window glow",
];

interface PromptFormProps {
  onGenerate: (input: GenerateRequest) => void;
  isGenerating: boolean;
}

export function PromptForm({ onGenerate, isGenerating }: PromptFormProps) {
  const [prompt, setPrompt] = React.useState("");
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio>("16:9");
  const [style, setStyle] = React.useState<VideoStyle>("cinematic");
  const [duration, setDuration] = React.useState<VideoDuration>(8);

  const canSubmit = prompt.trim().length > 0 && !isGenerating;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    onGenerate({ prompt: prompt.trim(), aspectRatio, style, duration });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="prompt">Describe your video</Label>
          <span className="text-xs text-muted-foreground">
            {prompt.length}/{PROMPT_MAX}
          </span>
        </div>
        <Textarea
          id="prompt"
          value={prompt}
          maxLength={PROMPT_MAX}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A golden retriever puppy running through a field of sunflowers at sunset, slow motion, cinematic..."
          className="min-h-32 resize-none text-base"
        />
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setPrompt(sample)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-accent/60 px-3 py-1 text-xs text-accent-foreground transition-colors hover:bg-accent"
            >
              <Wand2 className="size-3" />
              {sample.length > 42 ? `${sample.slice(0, 42)}…` : sample}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Aspect ratio</Label>
          <Select
            value={aspectRatio}
            onValueChange={(v) => setAspectRatio(v as AspectRatio)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ASPECT_RATIOS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Style</Label>
          <Select value={style} onValueChange={(v) => setStyle(v as VideoStyle)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STYLES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Duration</Label>
          <Select
            value={String(duration)}
            onValueChange={(v) => setDuration(Number(v) as VideoDuration)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={!canSubmit}
        className="h-12 w-full text-base"
      >
        {isGenerating ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Generate video
          </>
        )}
      </Button>
    </form>
  );
}
