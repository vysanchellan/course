"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getBookmarks() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("bookmarks")
    .select("*, lessons!inner(slug, title, chapter)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data || []).map((b) => ({
    id: b.id,
    lessonId: b.lesson_id,
    lessonSlug: (b.lessons as unknown as { slug: string }).slug,
    lessonTitle: (b.lessons as unknown as { title: string }).title,
    chapter: (b.lessons as unknown as { chapter: number }).chapter,
    excerpt: b.excerpt,
    timestamp: b.created_at,
  }));
}

export async function addBookmark(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const lessonId = formData.get("lessonId") as string;
  const excerpt = formData.get("excerpt") as string;

  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    lesson_id: lessonId,
    excerpt,
  });

  if (error) {
    if (error.code === "23505") return { error: "Already bookmarked" };
    return { error: error.message };
  }

  revalidatePath("/course/[slug]");
  revalidatePath("/bookmarks");
  return { success: true };
}

export async function removeBookmark(lessonId: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId);

  if (error) return { error: error.message };

  revalidatePath("/course/[slug]");
  revalidatePath("/bookmarks");
  return { success: true };
}

export async function toggleBookmark(lessonId: string, excerpt?: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (existing) {
    return removeBookmark(lessonId);
  }

  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    lesson_id: lessonId,
    excerpt: excerpt || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/course/[slug]");
  revalidatePath("/bookmarks");
  return { success: true, added: true };
}
