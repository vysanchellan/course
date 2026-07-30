import Link from "next/link";

export function Hero() {
  return (
    <header className="relative px-6 md:px-12 py-16 md:py-20 overflow-hidden bg-dusk"
      style={{background: "radial-gradient(ellipse 900px 500px at 10% -20%, rgba(201,162,75,0.12), transparent 60%), #0B0B0D"}}
    >
      <div className="absolute rounded-full pointer-events-none"
        style={{width:600,height:600,top:-250,left:"20%",background:"radial-gradient(circle, rgba(201,162,75,0.30), transparent 70%)",filter:"blur(70px)"}}
      />

      <div className="max-w-[640px] mx-auto mb-10 rounded-xl overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full" style={{background:"#e05555"}} />
          <span className="w-2.5 h-2.5 rounded-full" style={{background:"#e0b955"}} />
          <span className="w-2.5 h-2.5 rounded-full" style={{background:"#59c46b"}} />
          <span className="font-mono text-[11px] text-muteddark ml-2">reality_check.log</span>
        </div>
        <div className="p-5 font-mono text-[12.5px] leading-[1.9] text-[#c9c6bd]">
          <div><span className="text-gold">$</span> ./ai_website_builder --prompt &ldquo;landing page&rdquo;</div>
          <div className="text-diffadd">✓ done in 40 seconds. looks incredible.</div>
          <div className="mt-2"><span className="text-gold">$</span> ./get_paid_for_it</div>
          <div className="text-[#c9564f]">✗ command not found</div>
          <div className="text-[#c9c6bd]">✗ no domain, no database, no deploy, no client, no invoice</div>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-gold uppercase mb-5 border border-gold/30 px-3.5 py-1.5 rounded-sm">
          // a practical guide &middot; 2026
        </div>
        <h1 className="font-serif font-semibold text-[2.75rem] md:text-[3.2rem] leading-[1.08] mb-5 text-parchment">
          You can{" "}
          <span className="text-[#7d7b74] line-through decoration-[#c9564f] decoration-[3px]">vibe-code</span>{" "}
          a homepage.<br />
          Can you <span className="text-gold">ship</span> one?
        </h1>
        <p className="font-mono text-[15px] text-[#c9c6bd] leading-[1.8] max-w-[34rem] mx-auto mb-9">
          The build is the easy 20%. This is the other 80% &mdash;{" "}
          <b className="text-parchment">deploy it, connect a real database, buy the domain, price the work, and don&rsquo;t fold the first time something breaks in front of a paying client.</b>
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/checkout?tier=standard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-goldsoft text-[#171310] font-mono font-bold text-[14px] px-7 py-3.5 rounded-sm no-underline shadow-[0_10px_30px_-10px_rgba(201,162,75,0.5)] hover:shadow-[0_10px_30px_-5px_rgba(201,162,75,0.6)] transition-shadow"
          >
            GET THE GUIDE &mdash; $10 &rarr;
          </Link>
          <span className="font-mono text-[12px] text-muteddark">one-time &middot; no subscription &middot; lifetime access</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-px max-w-[820px] mx-auto mt-16 rounded-xl overflow-hidden bg-white/10">
        {[
          { num: "14", lbl: "chapters" },
          { num: "$0", lbl: "tool cost (bar one)" },
          { num: "1", lbl: "stack, no fluff" },
          { num: "0", lbl: "\u201Ctrust me bro\u201D moments" },
        ].map((s) => (
          <div key={s.lbl} className="bg-panel text-center py-6 px-4">
            <div className="font-serif text-[2rem] text-gold font-semibold">{s.num}</div>
            <div className="font-mono text-[10.5px] text-muteddark uppercase tracking-[0.1em] mt-1.5">{s.lbl}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
