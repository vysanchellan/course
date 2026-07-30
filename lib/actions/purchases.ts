"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function hasAccess(courseId?: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;
  if (user.user_metadata?.role === "admin") return true;

  if (!courseId) {
    const { data } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .limit(1);

    return (data?.length || 0) > 0;
  }

  const { data } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .eq("status", "completed")
    .single();

  return !!data;
}

export async function getUserPurchases() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("purchases")
    .select("*, courses(title)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data || []).map((p) => ({
    id: p.id,
    courseId: p.course_id,
    courseTitle: (p.courses as unknown as { title: string })?.title || "Unknown",
    tier: p.tier || "standard",
    status: p.status,
    createdAt: p.created_at,
  }));
}

export async function createPurchaseRecord(courseId: string, tier: string = "standard") {
  const supabase = await createServerSupabaseClient();
  const adminSupabase = createAdminSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("purchases").upsert(
    {
      user_id: user.id,
      course_id: courseId,
      tier,
      status: "completed",
    },
    { onConflict: "user_id, course_id" }
  );

  if (error) return { error: error.message };

  // Set has_active_purchase in user_metadata for middleware check
  await adminSupabase.auth.admin.updateUserById(user.id, {
    user_metadata: {
      ...user.user_metadata,
      has_active_purchase: true,
    },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function getUserTier() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  if (user.user_metadata?.role === "admin") return "admin";

  const { data } = await supabase
    .from("purchases")
    .select("tier")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.tier || null;
}
