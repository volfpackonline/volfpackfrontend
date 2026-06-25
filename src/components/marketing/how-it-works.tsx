const steps = [
  {
    step: "1",
    emoji: "🔗",
    color: "bg-violet-100 text-violet-500",
    title: "Drop in your video",
    description:
      "Paste a YouTube link or upload your podcast, vlog, or stream. That's the only step that needs you.",
  },
  {
    step: "2",
    emoji: "✂️",
    color: "bg-pink-100 text-pink-500",
    title: "We find & cut the best bits",
    description:
      "VolfPack picks your most clip-worthy moments, frames them vertical, sharpens the hook, and adds captions and voiceover.",
  },
  {
    step: "3",
    emoji: "✅",
    color: "bg-sky-100 text-sky-500",
    title: "Review & post",
    description:
      "Skim the clips, tweak anything you want, and download ready-to-post shorts for TikTok, Reels, and YouTube Shorts.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border/60 bg-secondary/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From long video to ready-to-post in three steps
          </h2>
          <p className="mt-4 text-muted-foreground">
            One link in. A pile of post-ready shorts out — no timeline, no
            editing software, no late nights.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          {/* Pipeline connector */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-16 hidden h-0.5 bg-gradient-to-r from-violet-300 via-pink-300 to-sky-300 md:block" />

          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-3xl border border-border/60 bg-card p-7 text-center shadow-cute transition-all duration-200 hover:-translate-y-1 hover:shadow-cute-lg"
            >
              <div
                className={`mx-auto grid size-16 place-items-center rounded-2xl text-3xl ${item.color}`}
              >
                {item.emoji}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
