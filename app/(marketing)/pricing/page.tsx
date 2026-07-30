import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      tier: "standard",
      price: "$10",
      features: [
        "Full 14-chapter guide",
        "Code examples and templates",
        "All future updates",
        "PDF download",
      ],
      href: "/checkout?tier=standard",
    },
    {
      tier: "premium",
      price: "$13",
      features: [
        "Everything in Standard",
        "Personal project walkthrough",
        "Direct access for questions",
        "Priority support",
      ],
      href: "/checkout?tier=premium",
      popular: true,
    },
  ];

  return (
    <div className="bg-dusk min-h-screen">
      <div className="max-w-[52rem] mx-auto px-6 md:px-16 py-24">
        <div className="text-center mb-14">
          <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-4">
            // pricing
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-parchment">
            One price. Full access. No monthly bullshit.
          </h1>
          <p className="font-mono text-sm text-muteddark">
            Pay once, get the complete guide and all future updates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`relative bg-white/[0.04] backdrop-blur-xl border rounded-xl p-8 ${
                plan.popular ? "border-gold/30" : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-goldsoft text-ink font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-gold/20">
                  Popular
                </div>
              )}
              <div className="font-mono text-[11px] text-gold uppercase tracking-wider mb-2">
                {plan.tier}
              </div>
              <div className="font-serif text-4xl font-medium text-parchment mb-1">
                {plan.price}
              </div>
              <div className="font-mono text-xs text-muteddark mb-6">
                One-time payment
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((item) => (
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
              <Link
                href={plan.href}
                className={`block w-full font-mono font-bold text-sm py-3.5 rounded-sm text-center transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-gold to-goldsoft text-ink hover:shadow-lg hover:shadow-gold/20"
                    : "bg-white/10 backdrop-blur-sm text-parchment border border-white/10 hover:bg-white/20"
                }`}
              >
                Get access &mdash; {plan.price}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
