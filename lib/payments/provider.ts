/**
 * Payment abstraction layer.
 *
 * Swap the implementation below without changing any calling code.
 * Currently implements PayPal. Stripe is available as a second option.
 */

export interface PaymentConfig {
  priceCents: number;
  courseId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentResult {
  success: boolean;
  sessionUrl?: string;
  sessionId?: string;
  error?: string;
}

export interface PaymentProvider {
  createCheckoutSession(config: PaymentConfig): Promise<PaymentResult>;
  verifyWebhook(payload: string, signature: string): Promise<{ sessionId: string; event: string } | null>;
}

// ── PayPal provider (default) ──
const PAYPAL_API = process.env.PAYPAL_ENV === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}

export async function createPayPalOrder(priceCents: number, tier: string): Promise<{ id: string }> {
  const accessToken = await getPayPalAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (priceCents / 100).toFixed(2),
          },
          description: `From Zero to Deployed — ${tier === "premium" ? "Premium" : "Standard"} tier`,
          custom_id: tier,
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create PayPal order");
  }

  return res.json();
}

interface PayPalCaptureResponse {
  id: string;
  status: string;
  purchase_units?: {
    payments?: {
      captures?: { custom_id?: string }[];
    };
  }[];
}

export async function capturePayPalOrder(orderId: string): Promise<PayPalCaptureResponse> {
  const accessToken = await getPayPalAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to capture PayPal order");
  }

  return res.json();
}

class PayPalProvider implements PaymentProvider {
  async createCheckoutSession(config: PaymentConfig): Promise<PaymentResult> {
    try {
      const order = await createPayPalOrder(config.priceCents, "standard");
      return {
        success: true,
        sessionId: order.id,
      };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }

  async verifyWebhook(
    _payload: string,
    _signature: string
  ): Promise<{ sessionId: string; event: string } | null> {
    // PayPal webhook verification can be added here
    return null;
  }
}

// ── Stripe provider (swap in for US/EU entity) ──
// class StripeProvider implements PaymentProvider {
//   private stripe: Stripe;
//
//   constructor() {
//     this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//       apiVersion: "2025-02-24.acacia",
//     });
//   }
//
//   async createCheckoutSession(config: PaymentConfig): Promise<PaymentResult> {
//     try {
//       const session = await this.stripe.checkout.sessions.create({
//         mode: "payment",
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: "From Zero to Deployed",
//                 description: "Full course access",
//               },
//               unit_amount: config.priceCents,
//             },
//             quantity: 1,
//           },
//         ],
//         customer_email: config.userEmail,
//         client_reference_id: config.userId,
//         metadata: { courseId: config.courseId },
//         success_url: config.successUrl,
//         cancel_url: config.cancelUrl,
//       });
//
//       return {
//         success: true,
//         sessionUrl: session.url!,
//         sessionId: session.id,
//       };
//     } catch (err) {
//       return { success: false, error: (err as Error).message };
//     }
//   }
//
//   async verifyWebhook(
//     payload: string,
//     signature: string
//   ): Promise<{ sessionId: string; event: string } | null> {
//     try {
//       const event = this.stripe.webhooks.constructEvent(
//         payload,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );
//
//       if (event.type === "checkout.session.completed") {
//         const session = event.data.object as Stripe.Checkout.Session;
//         return { sessionId: session.id, event: event.type };
//       }
//       return null;
//     } catch {
//       return null;
//     }
//   }
// }

// Export the active provider — swap PayPalProvider ↔ StripeProvider here
export const paymentProvider: PaymentProvider = new PayPalProvider();
