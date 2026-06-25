"use client";

import * as React from "react";
import { Link2, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CAPTION_STYLES,
  CROP_STRATEGIES,
  LANGUAGES,
  VOICES,
  type CaptionStyle,
  type CropStrategy,
  type IngestRequest,
  type Language,
  type Voice,
} from "@/lib/types";

const SAMPLE_URLS = [
  { label: "Founder Q&A", url: "https://youtube.com/watch?v=founder-qa" },
  { label: "Pricing deep-dive", url: "https://youtube.com/watch?v=pricing-101" },
  { label: "Launch recap", url: "https://youtube.com/watch?v=launch-recap" },
];

interface IngestFormProps {
  onSubmit: (input: IngestRequest) => void;
  isRunning: boolean;
}

export function IngestForm({ onSubmit, isRunning }: IngestFormProps) {
  const [url, setUrl] = React.useState("");
  const [cropStrategy, setCropStrategy] =
    React.useState<CropStrategy>("face-track");
  const [voice, setVoice] = React.useState<Voice>("ava");
  const [language, setLanguage] = React.useState<Language>("en");
  const [captionStyle, setCaptionStyle] = React.useState<CaptionStyle>("pop");

  const isUrlValid = /^https?:\/\/\S+$/.test(url.trim());
  const canSubmit = isUrlValid && !isRunning;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({ url: url.trim(), cropStrategy, voice, language, captionStyle });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="url">Source video URL</Label>
        <div className="relative">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=…"
            className="h-11 pl-9 text-base"
            inputMode="url"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-wrap gap-2 pt-0.5">
          {SAMPLE_URLS.map((sample) => (
            <button
              key={sample.url}
              type="button"
              onClick={() => setUrl(sample.url)}
              className="rounded-full border border-border/70 bg-accent/60 px-3 py-1 text-xs text-accent-foreground transition-colors hover:bg-accent"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Crop strategy">
          <Select
            value={cropStrategy}
            onValueChange={(v) => setCropStrategy(v as CropStrategy)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CROP_STRATEGIES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Voice">
          <Select value={voice} onValueChange={(v) => setVoice(v as Voice)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VOICES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Language">
          <Select
            value={language}
            onValueChange={(v) => setLanguage(v as Language)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Caption style">
          <Select
            value={captionStyle}
            onValueChange={(v) => setCaptionStyle(v as CaptionStyle)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CAPTION_STYLES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={!canSubmit}
        className="h-12 w-full text-base"
      >
        {isRunning ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Running pipeline…
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Run the pipeline
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Channel defaults are applied automatically. You can correct every step
        in the review editors before export.
      </p>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
