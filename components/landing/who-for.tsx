import { Reveal } from "./reveal";

export function WhoFor() {
  return (
    <section className="relative py-28 px-6 md:px-16 overflow-hidden">
      <Reveal>
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-[#0f0e10] to-dusk" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, #C9A24B 0%, transparent 50%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:border-gold/20 transition-colors">
          <div className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-3">
            Get this if
          </div>
          <p className="font-serif text-base leading-relaxed text-[#c9c6bd]/80">
            You want a real, repeatable process for building and shipping sites
            with AI, not one flashy demo. You&rsquo;re working with limited resources
            and want to know exactly what&rsquo;s free and what isn&rsquo;t.
          </p>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-7 hover:border-gold/20 transition-colors">
          <div className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-3">
            Skip this if
          </div>
          <p className="font-serif text-base leading-relaxed text-[#c9c6bd]/80">
            You&rsquo;re after a magic trick, or content that skips past
            deployment, security, and pricing. This guide stays honest about
            what still takes real thought.
          </p>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
