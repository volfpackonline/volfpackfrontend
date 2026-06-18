import { Clapperboard, Gauge, Layers, Sliders, Wand2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubIcon } from "@/components/icons";

const features = [
  {
    icon: Wand2,
    title: "Prompt to video",
    color: "bg-violet-100 text-violet-500",
    description:
      "Describe a scene in natural language and get a polished clip back. No timelines, no keyframes.",
  },
  {
    icon: Sliders,
    title: "Total creative control",
    color: "bg-pink-100 text-pink-500",
    description:
      "Dial in aspect ratio, style, and duration. Re-roll until it matches what's in your head.",
  },
  {
    icon: Clapperboard,
    title: "Cinematic styles",
    color: "bg-sky-100 text-sky-500",
    description:
      "From photorealistic to anime to claymation — pick a look and stay on-brand across clips.",
  },
  {
    icon: Gauge,
    title: "Fast generations",
    color: "bg-emerald-100 text-emerald-500",
    description:
      "Stream progress in real time and preview results the moment a render finishes.",
  },
  {
    icon: Layers,
    title: "Built to scale",
    color: "bg-amber-100 text-amber-500",
    description:
      "A clean Next.js frontend ready to plug into any inference backend or model provider.",
  },
  {
    icon: GitHubIcon,
    title: "Open source",
    color: "bg-fuchsia-100 text-fuchsia-500",
    description:
      "MIT licensed and community-driven. Fork it, self-host it, and ship your own video product.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to create
        </h2>
        <p className="mt-4 text-muted-foreground">
          A focused toolkit for going from idea to finished video — without the
          production overhead.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-cute-lg"
          >
            <CardHeader>
              <div
                className={`grid size-12 place-items-center rounded-2xl ${feature.color}`}
              >
                <feature.icon className="size-6" />
              </div>
              <CardTitle className="mt-3 text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
