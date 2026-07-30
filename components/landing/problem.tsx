import { Reveal } from "./reveal";

export function Problem() {
  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden bg-dusk">
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-[#121110] to-dusk" />
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #C9A24B 0%, transparent 60%)",
        }}
      />
      <Reveal>
        <div className="relative max-w-[56rem] mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4">
              // is this for you
            </div>
            <h2 className="font-serif font-semibold text-[2.2rem] leading-[1.25] text-parchment max-w-[34rem] mx-auto">
              Built for people actually shipping this. Not for a demo.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-8"
              style={{borderTop:"2px solid #C9A24B"}}>
              <div className="font-mono text-[11px] tracking-[0.15em] text-gold uppercase mb-3">
                get_this_if
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-[rgba(243,238,225,0.82)]">
                You want a real, repeatable process for building and shipping client sites with AI. You&rsquo;ve got limited resources and want to know exactly what&rsquo;s actually free &mdash; and what still costs you real thought.
              </p>
            </div>
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-8"
              style={{borderTop:"2px solid #c9564f"}}>
              <div className="font-mono text-[11px] tracking-[0.15em] text-[#c9564f] uppercase mb-3">
                skip_this_if
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-[rgba(243,238,225,0.82)]">
                You&rsquo;re after a magic trick, or content that hand-waves past deployment, security, and pricing. Nobody&rsquo;s holding your hand past chapter one here &mdash; you&rsquo;ll actually have to read it.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
