import Link from "next/link";

export function Hero() {
  return (
    <header className="grid md:grid-cols-2 min-h-screen">
      <div className="grain flex flex-col justify-center px-8 md:px-16 py-20 bg-parchment order-2 md:order-1">
        <div className="max-w-md">
          <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-8">
            A Practical Guide &middot; 2026
          </div>
          <h1 className="font-serif text-[2.75rem] md:text-6xl leading-[1.05] font-medium mb-8">
            From Zero
            <br />
            to&nbsp;Deployed
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-ink/70 leading-relaxed mb-10">
            Building real websites with AI, the right way — the exact stack, the
            exact workflow, and the part after the build that nobody else
            teaches.
          </p>
          <Link
            href="/#buy"
            className="inline-flex items-center gap-2 bg-ink text-parchment font-mono text-sm font-medium px-6 py-3.5 rounded-sm hover:bg-ink/85 transition-colors"
          >
            Get the guide — $10+
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="bg-dusk flex flex-col justify-center px-6 md:px-14 py-20 order-1 md:order-2 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#C9A24B 1px, transparent 1px), linear-gradient(90deg, #C9A24B 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="relative bg-panel border border-panelborder rounded-md shadow-2xl overflow-hidden max-w-md w-full mx-auto">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-panelborder">
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
    </header>
  );
}
