import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/payments/provider";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId, tier: requestTier } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const capture = await capturePayPalOrder(orderId);

    if (capture.status !== "COMPLETED") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const tier = requestTier || "standard";
    const paypalId = capture.id;

    // Create purchase record and set metadata
    const adminSupabase = createAdminSupabaseClient();

    const { error: purchaseError } = await supabase.from("purchases").upsert(
      {
        user_id: user.id,
        course_id: process.env.COURSE_ID || "00000000-0000-0000-0000-000000000000",
        tier,
        status: "completed",
        payment_provider: "paypal",
        payment_id: paypalId,
      },
      { onConflict: "user_id, course_id" }
    );

    if (purchaseError) {
      return NextResponse.json({ error: purchaseError.message }, { status: 500 });
    }

    await adminSupabase.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...user.user_metadata,
        has_active_purchase: true,
      },
    });

    return NextResponse.json({ success: true, tier });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
