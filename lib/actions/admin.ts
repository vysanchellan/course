"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function isAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  // Check if user has admin role in user_metadata
  return user.user_metadata?.role === "admin";
}

export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) throw new Error("Unauthorized");
  return true;
}

export async function getAdminLessons() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("lessons")
    .select("*")
    .order("chapter", { ascending: true });

  return data || [];
}

export async function updateLesson(formData: FormData) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const readingTime = formData.get("readingTime") as string;
  const estimatedMinutes = parseInt(formData.get("estimatedMinutes") as string) || 5;

  const { error } = await supabase
    .from("lessons")
    .update({
      title,
      description,
      reading_time: readingTime,
      estimated_minutes: estimatedMinutes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/lessons");
  return { success: true };
}

export async function getAdminUsers() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: purchases } = await supabase
    .from("purchases")
    .select("user_id, course_id, status, created_at");

  const purchaseMap = new Map<string, typeof purchases>();
  (purchases || []).forEach((p) => {
    const existing = purchaseMap.get(p.user_id) || [];
    existing.push(p);
    purchaseMap.set(p.user_id, existing);
  });

  return (profiles || []).map((profile) => ({
    ...profile,
    purchases: purchaseMap.get(profile.id) || [],
  }));
}

export async function getAdminPurchases() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("purchases")
    .select("*, profiles(name), courses(title)")
    .order("created_at", { ascending: false });

  return (data || []).map((p) => ({
    id: p.id,
    userName: (p.profiles as unknown as { name: string })?.name || "Unknown",
    courseTitle: (p.courses as unknown as { title: string })?.title || "Unknown",
    status: p.status,
    createdAt: p.created_at,
  }));
}

export async function grantAccess(formData: FormData) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  const userId = formData.get("userId") as string;
  const courseId = formData.get("courseId") as string;

  const tier = (formData.get("tier") as string) || "standard";

  const { error } = await supabase.from("purchases").upsert(
    {
      user_id: userId,
      course_id: courseId,
      tier,
      status: "completed",
    },
    { onConflict: "user_id, course_id" }
  );

  if (error) return { error: error.message };

  // Set has_active_purchase in user_metadata
  const adminSupabase = createAdminSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await adminSupabase.auth.admin.updateUserById(userId, {
      user_metadata: { has_active_purchase: true },
    });
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin/purchases");
  return { success: true };
}

export async function setAdminProgress(state: "none" | "partial" | "complete") {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No user" };

  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id")
    .order("chapter", { ascending: true });

  const lessonIds = allLessons?.map((l) => l.id) || [];
  if (lessonIds.length === 0) return { error: "No lessons in DB" };

  if (state === "none") {
    await supabase.from("reading_progress").delete().eq("user_id", user.id);
  } else if (state === "complete") {
    const rows = lessonIds.map((id) => ({
      user_id: user.id,
      lesson_id: id,
      progress: 100,
      completed: true,
      last_read_at: new Date().toISOString(),
    }));
    await supabase.from("reading_progress").upsert(rows, {
      onConflict: "user_id, lesson_id",
      ignoreDuplicates: false,
    });
  } else {
    // partial: complete first half
    const mid = Math.floor(lessonIds.length / 2);
    const rows = lessonIds.map((id, i) => ({
      user_id: user.id,
      lesson_id: id,
      progress: i < mid ? 100 : i === mid ? 45 : 0,
      completed: i < mid,
      last_read_at: new Date().toISOString(),
    }));
    await supabase.from("reading_progress").upsert(rows, {
      onConflict: "user_id, lesson_id",
      ignoreDuplicates: false,
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/course");
  revalidatePath("/admin");
  return { success: true };
}
