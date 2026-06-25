const stats = [
  { value: "6–10", label: "Shorts per video", hint: "from one upload" },
  { value: "10×", label: "More posts", hint: "same effort" },
  { value: "45s", label: "To review a clip", hint: "then post" },
  { value: "0", label: "Editing skills needed", hint: "really" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 shadow-cute lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 bg-card px-4 py-8 text-center"
          >
            <span className="font-heading text-4xl font-bold text-gradient-brand">
              {stat.value}
            </span>
            <span className="text-sm font-semibold">{stat.label}</span>
            <span className="text-xs text-muted-foreground">{stat.hint}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
