export default function AboutPage() {
  return (
    <div className="bg-parchment">
      <div className="max-w-2xl mx-auto px-6 md:px-16 py-24">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          About
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-8 leading-tight">
          Why this guide exists.
        </h1>
        <div className="font-serif text-lg leading-relaxed text-ink/80 space-y-5">
          <p>
            I&rsquo;ve spent the last two years building websites with AI. Not
            as a novelty, not as a trick — as a real, repeatable process for
            delivering client work.
          </p>
          <p>
            The problem I kept running into was that most of the content about
            &ldquo;building with AI&rdquo; was surface-level. It showed you how
            to generate a landing page and stopped there. Nobody talked about
            what happened after the demo.
          </p>
          <p>
            This guide is the resource I wish I had when I started. It covers
            the entire process, from the first prompt to the final invoice, with
            nothing glossed over and nothing exaggerated.
          </p>
          <p>
            The tools change. The principles don&rsquo;t. This guide focuses on
            the principles while giving you the exact, step-by-step process
            using the best tools available right now.
          </p>
        </div>
      </div>
    </div>
  );
}
