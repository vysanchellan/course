export function WhoFor() {
  return (
    <section className="bg-parchment2 py-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-parchment border border-ink/10 rounded-md p-7">
          <div className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-3">
            Get this if
          </div>
          <p className="font-serif text-base leading-relaxed text-ink/80">
            You want a real, repeatable process for building and shipping sites
            with AI, not one flashy demo. You&rsquo;re working with limited resources
            and want to know exactly what&rsquo;s free and what isn&rsquo;t.
          </p>
        </div>
        <div className="bg-parchment border border-ink/10 rounded-md p-7">
          <div className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-3">
            Skip this if
          </div>
          <p className="font-serif text-base leading-relaxed text-ink/80">
            You&rsquo;re after a magic trick, or content that skips past
            deployment, security, and pricing. This guide stays honest about
            what still takes real thought.
          </p>
        </div>
      </div>
    </section>
  );
}
