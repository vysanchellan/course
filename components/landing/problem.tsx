import { Reveal } from "./reveal";

export function Problem() {
  return (
    <section className="relative py-28 px-6 md:px-16 overflow-hidden">
      <Reveal>
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-[#121110] to-dusk" />
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #C9A24B 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-xl p-8 md:p-10">
          <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
            The Problem
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight text-parchment">
            The build is the easy 20%.
          </h2>
          <p className="font-serif text-lg leading-relaxed text-[#c9c6bd]/80 mb-5">
            Most &ldquo;build a website with AI&rdquo; content stops the moment something
            appears on screen. That&rsquo;s the easy part.
          </p>
          <p className="font-serif text-lg leading-relaxed text-[#c9c6bd]/80">
            The other 80% is deploying it properly, securing your environment
            variables, connecting a real database, buying and linking a domain,
            pricing the work, and knowing what to do the moment something breaks
            and a real client is depending on it. This guide covers all of it, end
            to end, with one paid tool and a stack that otherwise costs nothing.
          </p>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
