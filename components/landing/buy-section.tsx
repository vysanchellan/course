export function BuySection() {
  return (
    <section id="buy" className="relative py-28 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-[#121110] to-dusk" />
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #C9A24B 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A24B 1px, transparent 1px), linear-gradient(90deg, #C9A24B 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="relative max-w-3xl mx-auto">
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
          {/* Basic */}
          <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col hover:border-gold/30 transition-all">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative">
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
                className="block w-full bg-white/10 backdrop-blur-sm text-parchment font-mono font-bold text-sm py-4 rounded-sm text-center border border-white/10 hover:bg-white/20 transition-all"
              >
                Get access
              </a>
            </div>
          </div>

          {/* Standard */}
          <div className="group relative bg-gradient-to-b from-gold/[0.06] to-transparent backdrop-blur-sm border border-gold/30 rounded-xl p-8 flex flex-col">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-goldsoft text-ink font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-gold/20">
              Popular
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.04] to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative">
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
                className="block w-full bg-gradient-to-r from-gold to-goldsoft text-ink font-mono font-bold text-sm py-4 rounded-sm text-center hover:shadow-lg hover:shadow-gold/20 transition-all"
              >
                Get access + support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
