import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/payments/provider";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const COURSE_ID = process.env.COURSE_ID || "00000000-0000-0000-0000-000000000000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const { orderId, tier: requestTier, email } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const tier = requestTier || "standard";
    const adminSupabase = createAdminSupabaseClient();

    // Capture PayPal order
    const capture = await capturePayPalOrder(orderId);
    if (capture.status !== "COMPLETED") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    // Look up existing user by email
    const { data: { users } } = await adminSupabase.auth.admin.listUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      // Existing user — update or create purchase record
      const { error: purchaseError } = await adminSupabase.from("purchases").upsert(
        {
          user_id: existingUser.id,
          course_id: COURSE_ID,
          tier,
          status: "completed",
          payment_provider: "paypal",
          payment_id: capture.id,
        },
        { onConflict: "user_id, course_id" }
      );

      if (purchaseError) {
        return NextResponse.json({ error: purchaseError.message }, { status: 500 });
      }

      await adminSupabase.auth.admin.updateUserById(existingUser.id, {
        user_metadata: {
          ...existingUser.user_metadata,
          has_active_purchase: true,
          tier,
        },
      });

      return NextResponse.json({ success: true });
    }

    // New user — create account with has_active_purchase pre-set
    const { data: newUser, error: createError } = await adminSupabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        has_active_purchase: true,
        tier,
        name: email.split("@")[0],
      },
    });

    if (createError || !newUser.user) {
      return NextResponse.json({ error: createError?.message || "Failed to create user" }, { status: 500 });
    }

    // Create purchase record
    const { error: purchaseError } = await adminSupabase.from("purchases").upsert(
      {
        user_id: newUser.user.id,
        course_id: COURSE_ID,
        tier,
        status: "completed",
        payment_provider: "paypal",
        payment_id: capture.id,
      },
      { onConflict: "user_id, course_id" }
    );

    if (purchaseError) {
      return NextResponse.json({ error: purchaseError.message }, { status: 500 });
    }

    // Generate recovery link so user can set a password
    const { data: linkData, error: linkError } = await adminSupabase.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `${SITE_URL}/auth/set-password`,
      },
    });

    if (linkError || !linkData) {
      return NextResponse.json({ error: linkError?.message || "Failed to generate link" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      recoveryLink: linkData.properties.action_link,
      newUser: true,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
