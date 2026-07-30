export function BuySection() {
  return (
    <section id="buy" className="bg-dusk py-28 px-6 md:px-16">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-panel border border-panelborder rounded-md p-9">
          <div className="font-mono text-[13px] text-muteddark mb-1">
            <span className="text-gold">$</span> get-the-guide{" "}
            <span className="cursor-blink text-gold">▌</span>
          </div>
          <div className="font-serif text-5xl font-medium text-parchment my-6">
            $10
          </div>
          {/* TODO: Replace with actual payment flow in Phase 2 */}
          <a
            href="#"
            className="block w-full bg-gold text-ink font-mono font-bold text-sm py-4 rounded-sm hover:bg-goldsoft transition-colors"
          >
            Get the PDF
          </a>
          <p className="font-mono text-[11.5px] text-muteddark mt-6 leading-relaxed">
            Want it applied directly to your own project? A personal walkthrough
            is available separately for $3 after purchase.
          </p>
        </div>
      </div>
    </section>
  );
}
