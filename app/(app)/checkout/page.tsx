import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth";
import { CheckoutForm } from "./form";

interface CheckoutPageProps {
  searchParams: Promise<{ tier?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/checkout");

  const { tier } = await searchParams;
  const validTier = tier === "premium" ? "premium" : "standard";
  const price = validTier === "premium" ? "$13" : "$10";

  return (
    <div className="min-h-screen bg-dusk flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-panel border border-panelborder rounded-md p-8">
          <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
            Checkout
          </div>
          <h1 className="font-serif text-2xl font-medium text-parchment mb-2">
            Complete your purchase.
          </h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            {validTier === "premium" ? "Premium tier" : "Standard tier"} &middot; {price} &middot; One-time payment
          </p>

          <div className="bg-dusk border border-panelborder rounded-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-parchment">
                From Zero to Deployed — {validTier === "premium" ? "Premium" : "Standard"}
              </span>
              <span className="font-mono text-sm text-gold">{price}</span>
            </div>
          </div>

          <CheckoutForm tier={validTier} userEmail={user.email || ""} />
        </div>
      </div>
    </div>
  );
}
