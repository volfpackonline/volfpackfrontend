const steps = [
  {
    step: "1",
    emoji: "🔗",
    color: "bg-violet-100 text-violet-500",
    title: "Paste a video URL",
    description:
      "Drop in a YouTube link (or upload a file). Video Enigma downloads the source, extracts audio, and scores it for repurposability.",
  },
  {
    step: "2",
    emoji: "✂️",
    color: "bg-pink-100 text-pink-500",
    title: "Pipeline does the work",
    description:
      "AI crops landscape to vertical, finds the best moments, rewrites scripts for shorts pacing, generates TTS audio, and burns captions.",
  },
  {
    step: "3",
    emoji: "✅",
    color: "bg-sky-100 text-sky-500",
    title: "Review, approve & export",
    description:
      "Correct anything in the crop, split, script, or caption editors. Approve the final short and export a publish-ready file.",
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
            From long-form to publishable short in three steps
          </h2>
          <p className="mt-4 text-muted-foreground">
            One URL. A full editing pipeline. A reviewable short — without
            touching a timeline by hand.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-3xl border border-border/60 bg-card p-7 text-center shadow-cute"
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
