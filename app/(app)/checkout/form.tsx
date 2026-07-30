"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
  tier: string;
  userEmail: string;
}

export function CheckoutForm({ tier, userEmail }: CheckoutFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  if (!clientId) {
    return (
      <div className="space-y-4">
        <p className="font-mono text-xs text-muteddark">
          Payment not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID.
        </p>
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
                body: JSON.stringify({ orderId: "mock", tier }),
              });
              const data = await res.json();
              if (data.success) {
                router.push("/dashboard");
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
          {loading ? "Processing..." : "Complete order (dev mode)"}
        </Button>
        {error && (
          <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
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
        onApprove={async (data) => {
          setLoading(true);
          try {
            const res = await fetch("/api/payments/capture", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID, tier }),
            });
            const result = await res.json();
            if (result.success) {
              router.push("/dashboard");
            } else {
              setError(result.error || "Payment capture failed");
            }
          } catch {
            setError("Payment capture failed");
          } finally {
            setLoading(false);
          }
        }}
        onError={() => {
          setError("PayPal error occurred");
        }}
      />
      {error && (
        <div className="mt-4 font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
          {error}
        </div>
      )}
      {loading && (
        <div className="mt-4 font-mono text-xs text-muteddark text-center">
          Processing your payment...
        </div>
      )}
    </PayPalScriptProvider>
  );
}
