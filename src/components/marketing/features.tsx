import {
  Captions,
  Languages,
  Layers,
  Mic2,
  Scissors,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Feature = {
  icon: typeof Scissors;
  title: string;
  color: string;
  description: string;
  /** Tailwind column span on lg screens. */
  span?: string;
};

const features: Feature[] = [
  {
    icon: Scissors,
    title: "One video, a dozen clips",
    color: "bg-violet-100 text-violet-500",
    description:
      "Drop in a long video and get back its best moments — already cut and framed for vertical. No scrubbing through footage to find the gold.",
    span: "lg:col-span-2",
  },
  {
    icon: Mic2,
    title: "Captions & voiceovers that hook",
    color: "bg-pink-100 text-pink-500",
    description:
      "Word-by-word animated captions that keep viewers watching, plus natural-sounding voiceovers in the voice you choose.",
  },
  {
    icon: Languages,
    title: "Reach a global audience",
    color: "bg-emerald-100 text-emerald-500",
    description:
      "Turn one clip into shorts for every market — auto-translate and revoice your videos in the languages your fans speak.",
  },
  {
    icon: Layers,
    title: "Set your style once",
    color: "bg-sky-100 text-sky-500",
    description:
      "Pick your crop, voice, and caption look per channel. Every new short matches your brand automatically.",
  },
  {
    icon: Captions,
    title: "You always have the final say",
    color: "bg-amber-100 text-amber-500",
    description:
      "Tweak the framing, wording, and captions before anything goes out. Post only the clips you actually love.",
    span: "lg:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "See what's working",
    color: "bg-fuchsia-100 text-fuchsia-500",
    description:
      "Track views and watch-time on every clip, then lean into the hooks and styles your audience keeps coming back for.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to post more and edit less
        </h2>
        <p className="mt-4 text-muted-foreground">
          From one upload to a queue of ready-to-post shorts — captions,
          framing, voiceovers, and hooks all handled for you, with you in
          control of the final cut.
        </p>
      </div>

      <div className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className={cn(
              "group/feature relative transition-all duration-200 hover:-translate-y-1 hover:shadow-cute-lg",
              feature.span,
            )}
          >
            <CardContent className="flex h-full flex-col gap-3 pt-6">
              <div
                className={cn(
                  "grid size-12 place-items-center rounded-2xl transition-transform duration-200 group-hover/feature:scale-105",
                  feature.color,
                )}
              >
                <feature.icon className="size-6" />
              </div>
              <h3 className="mt-1 font-heading text-lg font-bold">
                {feature.title}
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
