import type { Metadata } from "next";
import { Building2, Clapperboard, User, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "See how solo channel operators, creator teams, and agencies use VolfPack to turn their long-form libraries into a consistent short-form revenue pipeline.",
};

const useCases = [
  {
    icon: User,
    color: "bg-violet-100 text-violet-500",
    persona: "Solo channel operator",
    headline: "Repurpose your entire back-catalogue without hiring an editor",
    story:
      "You run two or three YouTube channels. Every long-form video is a gold mine of clip material, but cutting it manually takes hours you do not have. VolfPack processes each video overnight: crops, splits, rewrites, voices, and captions — so you wake up to a queue of reviewable shorts ready to approve and post.",
    outcomes: [
      "Process a 45-minute video into 6–10 short candidates while you sleep",
      "Channel-level voice and caption style means every clip is on-brand automatically",
      "BYO API keys — you control costs, no vendor lock-in",
    ],
  },
  {
    icon: Users,
    color: "bg-pink-100 text-pink-500",
    persona: "Small creator team",
    headline: "Give your editor a review queue instead of a raw timeline",
    story:
      "Your team produces weekly long-form content. The bottleneck is converting it to shorts — an editor spends two days per video on something that should take twenty minutes. With VolfPack, the pipeline handles the mechanical work and drops each segment into a script and caption editor. Your editor corrects and approves; the system exports.",
    outcomes: [
      "Reduce shorts turnaround from days to under an hour of human review",
      "Script editor flags factual risks and TTS pronunciation issues before audio renders",
      "Shared review queue so multiple team members can approve in parallel",
    ],
  },
  {
    icon: Building2,
    color: "bg-sky-100 text-sky-500",
    persona: "Content agency",
    headline: "Run shorts production for every client from one workspace",
    story:
      "You manage short-form content for a roster of clients, each with their own channel style, language, and approval workflow. VolfPack's agency tier gives every client a workspace with isolated channels, defaults, and exports — and lets you hand them an approval link without sharing your internal tools.",
    outcomes: [
      "Multi-client workspaces with per-channel crop, voice, and language settings",
      "Client approval links that do not expose your internal pipeline",
      "Usage reporting per workspace for transparent billing",
    ],
  },
  {
    icon: Clapperboard,
    color: "bg-emerald-100 text-emerald-500",
    persona: "Privacy-first operator",
    headline: "Run the full pipeline on your own hardware — data never leaves",
    story:
      "You work with sensitive content or simply do not want your video archive on third-party servers. VolfPack's self-hosted Docker Compose setup runs the entire pipeline locally — Whisper for transcription, Bark for TTS, FFmpeg for assembly — with external API calls only for the providers you explicitly configure.",
    outcomes: [
      "Full pipeline runs entirely on a local GPU machine",
      "API keys stay in your .env file, never sent to a cloud service",
      "Upgrade to hosted tier later without changing your workflow",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Built for creators who ship content at scale
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Whether you run one channel or a full agency, the pipeline adapts to
          how you work.
        </p>
      </div>

      <div className="space-y-8">
        {useCases.map((uc) => (
          <Card key={uc.persona} className="overflow-hidden">
            <CardHeader className="flex flex-row items-start gap-4">
              <div
                className={`mt-1 grid size-12 shrink-0 place-items-center rounded-2xl ${uc.color}`}
              >
                <uc.icon className="size-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {uc.persona}
                </p>
                <CardTitle className="mt-1 text-xl">{uc.headline}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{uc.story}</p>
              <ul className="space-y-1.5">
                {uc.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {o}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <Link href="/generate">Start processing your first video</Link>
        </Button>
      </div>
    </div>
  );
}
