import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="bg-parchment">
      <div className="max-w-2xl mx-auto px-6 md:px-16 py-24">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          Pricing
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4 leading-tight">
          One price. Full access.
        </h1>
        <p className="font-serif text-lg text-ink/60 leading-relaxed mb-12">
          Pay once, get the complete guide and all future updates.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-dusk rounded-md p-8 border border-panelborder">
            <div className="font-mono text-[11px] text-gold uppercase tracking-wider mb-2">
              Standard
            </div>
            <div className="font-serif text-5xl font-medium text-parchment mb-1">
              $10
            </div>
            <div className="font-mono text-xs text-muteddark mb-6">
              One-time payment
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Full 13-chapter guide",
                "Code examples and templates",
                "All future updates",
                "PDF download",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#c9c6bd] font-mono">
                  <span className="text-diffadd">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {/* TODO: Replace with actual payment flow in Phase 2 */}
            <Link
              href="/register"
              className="block w-full bg-gold text-ink font-mono font-bold text-sm py-3.5 rounded-sm hover:bg-goldsoft transition-colors text-center"
            >
              Get access
            </Link>
          </div>

          <div className="bg-dusk rounded-md p-8 border border-panelborder">
            <div className="font-mono text-[11px] text-gold uppercase tracking-wider mb-2">
              Premium
            </div>
            <div className="font-serif text-5xl font-medium text-parchment mb-1">
              $13
            </div>
            <div className="font-mono text-xs text-muteddark mb-6">
              One-time payment
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Standard",
                "Personal project walkthrough",
                "Direct access for questions",
                "Priority support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#c9c6bd] font-mono">
                  <span className="text-diffadd">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {/* TODO: Replace with actual payment flow in Phase 2 */}
            <Link
              href="/register"
              className="block w-full bg-gold text-ink font-mono font-bold text-sm py-3.5 rounded-sm hover:bg-goldsoft transition-colors text-center"
            >
              Get access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
