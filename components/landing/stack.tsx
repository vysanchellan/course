import { Reveal } from "./reveal";

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
    <section className="relative py-28 px-6 md:px-16 overflow-hidden">
      <Reveal>
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-[#121110] to-dusk" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A24B 1px, transparent 1px), linear-gradient(90deg, #C9A24B 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-xl p-8 md:p-10">
          <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
            The Toolkit
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-10 text-parchment">
            One paid tool. Everything else is free.
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag) => {
              const isGold = typeof tag === "object";
              const label = typeof tag === "string" ? tag : tag.label;
              return (
                <span
                  key={label}
                  className={`font-mono text-xs font-medium rounded-sm px-3.5 py-2 border transition-all ${
                    isGold
                      ? "bg-gradient-to-r from-gold/20 to-gold/10 border-gold/30 text-gold"
                      : "bg-white/[0.05] border-white/5 text-[#c9c6bd]"
                  }`}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
