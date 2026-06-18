const steps = [
  {
    step: "1",
    emoji: "✍️",
    color: "bg-violet-100 text-violet-500",
    title: "Write a prompt",
    description:
      "Describe your scene — the subject, the mood, the camera move. The more vivid, the better.",
  },
  {
    step: "2",
    emoji: "🎨",
    color: "bg-pink-100 text-pink-500",
    title: "Choose your look",
    description:
      "Pick an aspect ratio, a visual style, and a duration that fit where the video is going.",
  },
  {
    step: "3",
    emoji: "🎬",
    color: "bg-sky-100 text-sky-500",
    title: "Generate & download",
    description:
      "Watch it render in real time, preview the result, and export your clip in one click.",
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
            From idea to video in three steps
          </h2>
          <p className="mt-4 text-muted-foreground">
            No editing experience required. If you can describe it, you can
            create it.
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
