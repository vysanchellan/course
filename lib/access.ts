import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AccessLevel = "none" | "standard" | "premium" | "admin";

export async function getAccessLevel(): Promise<AccessLevel> {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return "none";
  if (user.user_metadata?.role === "admin") return "admin";

  const { data: purchase } = await supabase
    .from("purchases")
    .select("tier")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!purchase) return "none";
  return purchase.tier === "premium" ? "premium" : "standard";
}
