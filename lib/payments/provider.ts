/**
 * Payment abstraction layer.
 *
 * Swap the implementation below without changing any calling code.
 * Currently implements a mock/placeholder provider.
 * To use Stripe: uncomment the Stripe implementation and comment out the mock.
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

// ── Mock provider (default, for development) ──
class MockProvider implements PaymentProvider {
  async createCheckoutSession(config: PaymentConfig): Promise<PaymentResult> {
    // Simulate a checkout session
    return {
      success: true,
      sessionUrl: config.successUrl,
      sessionId: `mock_${Date.now()}`,
    };
  }

  async verifyWebhook(
    _payload: string,
    _signature: string
  ): Promise<{ sessionId: string; event: string } | null> {
    return null;
  }
}

// ── Stripe provider (swap in by uncommenting) ──
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

// Export the active provider — swap MockProvider ↔ StripeProvider here
export const paymentProvider: PaymentProvider = new MockProvider();
