import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/payments/provider";

export async function POST(request: NextRequest) {
  try {
    const { tier } = await request.json();

    if (!tier || !["standard", "premium"].includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const priceCents = tier === "premium" ? 1300 : 1000;
    const order = await createPayPalOrder(priceCents, tier);

    return NextResponse.json({ id: order.id });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
