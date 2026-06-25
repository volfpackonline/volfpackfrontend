const stats = [
  { value: "8", label: "Automated phases", hint: "URL → export" },
  { value: "45s", label: "Avg. review time", hint: "per short" },
  { value: "6–10", label: "Shorts per video", hint: "from one source" },
  { value: "0", label: "Vendor lock-in", hint: "BYO keys, MIT" },
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
