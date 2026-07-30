import Link from "next/link";
import { CheckoutForm } from "./form";

interface CheckoutPageProps {
  searchParams: Promise<{ tier?: string; message?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { tier, message } = await searchParams;
  const validTier = tier === "premium" ? "premium" : "standard";
  const price = validTier === "premium" ? "$13" : "$10";

  return (
    <div className="min-h-screen bg-dusk flex items-center justify-center px-6">
      <div className="fixed top-6 left-6 z-10">
        <Link href="/" className="font-mono text-sm">
          <span className="text-gold">~</span>
          <span className="text-parchment">/course</span>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 to-goldsoft/10 blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
              Checkout
            </div>
            <h1 className="font-serif text-2xl font-medium text-parchment mb-2">
              {validTier === "premium" ? "Premium access." : "Course access."}
            </h1>
            <p className="font-mono text-xs text-muteddark mb-6">
              One-time payment &middot; lifetime access &middot; all future updates
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-parchment">
                  From Zero to Deployed — {validTier === "premium" ? "Premium" : "Standard"}
                </span>
                <span className="font-mono text-sm text-gold">{price}</span>
              </div>
              {validTier === "premium" && (
                <div className="font-mono text-[10px] text-gold/70 mt-2 pt-2 border-t border-white/10">
                  Includes direct email support
                </div>
              )}
            </div>

            {message && (
              <div className="font-mono text-xs text-diffadd bg-diffadd/10 border border-diffadd/20 rounded-sm px-3 py-2 mb-4">
                {message}
              </div>
            )}

            <CheckoutForm tier={validTier} />
          </div>
        </div>
      </div>
    </div>
  );
}
