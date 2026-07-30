import Link from "next/link";

export function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dusk via-dusk to-[#1a1510]" />
      <div className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, #C9A24B 0%, transparent 50%), radial-gradient(circle at 75% 50%, #C9A24B 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#C9A24B 1px, transparent 1px), linear-gradient(90deg, #C9A24B 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative grid md:grid-cols-2 min-h-screen">
        {/* Left: content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 order-2 md:order-1">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5">
              A Practical Guide &middot; 2026
            </div>
            <h1 className="font-serif text-[2.75rem] md:text-6xl leading-[1.05] font-medium mb-8 text-parchment">
              From Zero
              <br />
              <span className="bg-gradient-to-r from-gold to-goldsoft bg-clip-text text-transparent">
                to&nbsp;Deployed
              </span>
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-[#c9c6bd]/80 leading-relaxed mb-10">
              Building real websites with AI, the right way — the exact stack, the
              exact workflow, and the part after the build that nobody else
              teaches.
            </p>
            <Link
              href="/#buy"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-goldsoft text-ink font-mono text-sm font-bold px-6 py-3.5 rounded-sm hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              Get the guide — $10+
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right: glass terminal card */}
        <div className="flex flex-col justify-center px-6 md:px-14 py-20 order-1 md:order-2 relative">
          <div className="relative max-w-md w-full mx-auto">
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 to-goldsoft/10 blur-2xl rounded-3xl" />
            {/* Glass card */}
            <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e05555]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#e0b955]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#59c46b]" />
                <span className="font-mono text-[11px] text-muteddark ml-3">
                  deploy.log
                </span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-[1.85] text-[#c9c6bd]">
                <div>
                  <span className="text-gold">$</span>{" "}
                  <span className="type-line inline-block">git push origin main</span>
                </div>
                <div className="mt-2 text-muteddark">Deploying to Vercel…</div>
                <div className="text-diffadd">+ build succeeded in 24s</div>
                <div className="text-diffadd">+ environment variables verified</div>
                <div className="text-diffadd">+ database connection: ok</div>
                <div className="mt-2 text-muteddark">Assigning domain…</div>
                <div className="text-goldsoft">✓ live at yourclient.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
