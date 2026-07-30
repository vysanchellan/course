export function Stack() {
  const tags = [
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "GitHub",
    "Vercel",
    "Supabase",
    { label: "Claude Pro — the one paid tool", gold: true },
    "OpenCode",
  ];

  return (
    <section className="bg-parchment py-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          The Toolkit
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-10">
          One paid tool. Everything else is free.
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {tags.map((tag) => {
            const isGold = typeof tag === "object";
            const label = typeof tag === "string" ? tag : tag.label;
            return (
              <span
                key={label}
                className={`font-mono text-xs font-medium rounded-sm px-3.5 py-2 ${
                  isGold
                    ? "bg-ink text-gold"
                    : "bg-parchment2 border border-ink/15"
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
