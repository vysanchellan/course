export function BuySection() {
  return (
    <section id="buy" className="bg-dusk py-28 px-6 md:px-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-mono text-[13px] text-muteddark mb-2">
            <span className="text-gold">$</span> get-the-guide{" "}
            <span className="cursor-blink text-gold">▌</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-parchment mt-4">
            Choose your access.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-panel border border-panelborder rounded-md p-8 flex flex-col">
            <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-2">
              Basic
            </div>
            <div className="font-serif text-4xl font-medium text-parchment mb-4">
              $10
            </div>
            <ul className="font-mono text-xs text-[#c9c6bd]/80 space-y-2.5 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-diffadd mt-0.5">✓</span>
                Full course access on this website
              </li>
              <li className="flex items-start gap-2">
                <span className="text-diffadd mt-0.5">✓</span>
                All 18 lessons, toolkit, cheat sheet
              </li>
              <li className="flex items-start gap-2">
                <span className="text-diffadd mt-0.5">✓</span>
                Lifetime updates
              </li>
            </ul>
            <a
              href="#"
              className="block w-full bg-gold text-ink font-mono font-bold text-sm py-4 rounded-sm text-center hover:bg-goldsoft transition-colors"
            >
              Get access
            </a>
          </div>

          <div className="bg-panel border border-gold/40 rounded-md p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
              Popular
            </div>
            <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-2">
              Standard
            </div>
            <div className="font-serif text-4xl font-medium text-parchment mb-4">
              $14
            </div>
            <ul className="font-mono text-xs text-[#c9c6bd]/80 space-y-2.5 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <span className="text-diffadd mt-0.5">✓</span>
                Everything in Basic
              </li>
              <li className="flex items-start gap-2">
                <span className="text-diffadd mt-0.5">✓</span>
                Email support at{" "}
                <a href="mailto:chellanvysan@gmail.com" className="text-gold hover:underline">
                  chellanvysan@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-diffadd mt-0.5">✓</span>
                Priority responses within 24 hours
              </li>
            </ul>
            <a
              href="#"
              className="block w-full bg-gold text-ink font-mono font-bold text-sm py-4 rounded-sm text-center hover:bg-goldsoft transition-colors"
            >
              Get access + support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
