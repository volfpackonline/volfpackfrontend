import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how VolfPack turns one long video into ready-to-post shorts in eight simple steps — framing, best moments, captions, voiceover, and hooks all handled, with you approving the final cut.",
  alternates: { canonical: "/how-it-works" },
};

const phases = [
  {
    step: "01",
    color: "bg-violet-100 text-violet-600",
    title: "Add your video",
    description:
      "Paste a YouTube link or upload your podcast, vlog, or stream. That's all we need — VolfPack takes it from there.",
  },
  {
    step: "02",
    color: "bg-pink-100 text-pink-600",
    title: "Frame it vertical",
    description:
      "Your wide video is reframed to fill a vertical screen, keeping the speaker or the action front and center. Prefer a different crop? Nudge it yourself in a couple of taps.",
  },
  {
    step: "03",
    color: "bg-sky-100 text-sky-600",
    title: "Find the best moments",
    description:
      "VolfPack watches the whole video and pulls out the clip-worthy bits — the stories, hot takes, and punchlines worth posting. Add or drop moments however you like.",
  },
  {
    step: "04",
    color: "bg-emerald-100 text-emerald-600",
    title: "Clean up the screen",
    description:
      "Distracting on-screen text, old subtitles, and watermarks get spotted and cleared, so each short looks clean and made for vertical from the first frame.",
  },
  {
    step: "05",
    color: "bg-amber-100 text-amber-600",
    title: "Get the words right",
    description:
      "Every word is captured with perfect timing. Skim the auto-written transcript and fix any names or phrasing before your captions are made.",
  },
  {
    step: "06",
    color: "bg-fuchsia-100 text-fuchsia-600",
    title: "Sharpen the hook",
    description:
      "VolfPack tightens each clip for short-form: a scroll-stopping hook in the first three seconds, a punchy middle, and a clean payoff — all in your language and tone.",
  },
  {
    step: "07",
    color: "bg-rose-100 text-rose-600",
    title: "Add voice & captions",
    description:
      "Drop in an optional natural-sounding voiceover, plus animated captions that highlight each word as it's spoken to keep viewers watching to the end.",
  },
  {
    step: "08",
    color: "bg-cyan-100 text-cyan-600",
    title: "Review & post",
    description:
      "Your finished short lands in a review queue. Watch it, approve it, and download or schedule it for TikTok, Reels, and YouTube Shorts.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          From one upload to ready-to-post
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Eight simple steps, fully handled for you — with the chance to tweak
          anything along the way. Nothing posts until you approve it.
        </p>
      </div>

      <ol className="relative space-y-0">
        {phases.map((phase, i) => (
          <li key={phase.step} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${phase.color}`}
              >
                {phase.step}
              </div>
              {i < phases.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>
            <div className={`pb-10 ${i === phases.length - 1 ? "pb-0" : ""}`}>
              <h2 className="text-xl font-bold">{phase.title}</h2>
              <p className="mt-2 text-muted-foreground">{phase.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
