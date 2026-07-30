"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
  tier: string;
}

export function CheckoutForm({ tier }: CheckoutFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setShowPayPal(true);
  }

  async function onPayPalApprove(data: { orderID: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderID, tier, email }),
      });
      const result = await res.json();
      if (result.success) {
        if (result.recoveryLink) {
          window.location.href = result.recoveryLink;
        } else {
          router.push("/login?access=granted");
        }
      } else {
        setError(result.error || "Payment capture failed");
      }
    } catch {
      setError("Payment capture failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {!showPayPal ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-mono text-xs text-muteddark uppercase tracking-wider mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-white/[0.05] border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <Button variant="gold" size="lg" className="w-full" type="submit">
            Continue to PayPal
          </Button>
          {error && (
            <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
              {error}
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-white/[0.03] border border-white/10 rounded-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3FB97E" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="font-mono text-xs text-parchment">{email}</span>
            <button
              type="button"
              onClick={() => setShowPayPal(false)}
              className="font-mono text-[10px] text-muteddark hover:text-parchment ml-auto"
            >
              Change
            </button>
          </div>
          {clientId ? (
            <PayPalScriptProvider
              options={{
                clientId,
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", shape: "rect", color: "gold" }}
                createOrder={async () => {
                  const res = await fetch("/api/payments/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tier }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error || "Failed to create order");
                  return data.id;
                }}
                onApprove={onPayPalApprove}
                onError={() => {
                  setError("PayPal error occurred");
                }}
              />
            </PayPalScriptProvider>
          ) : (
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await fetch("/api/payments/capture", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: "dev-simulated", tier, email }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    if (data.recoveryLink) {
                      window.location.href = data.recoveryLink;
                    } else {
                      router.push("/login?access=granted");
                    }
                  } else {
                    setError(data.error || "Payment failed");
                  }
                } catch {
                  setError("Payment failed");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading ? "Processing..." : `Complete purchase (dev mode) — $${tier === "premium" ? "13" : "10"}`}
            </Button>
          )}
          {loading && (
            <div className="font-mono text-xs text-muteddark text-center">
              Processing your payment...
            </div>
          )}
          {error && (
            <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
