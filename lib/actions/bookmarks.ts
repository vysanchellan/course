"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getBookmarks() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // Try with UUID join first, fall back to direct read
  const { data: joined } = await supabase
    .from("bookmarks")
    .select("*, lessons!inner(slug, title, chapter)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (joined && joined.length > 0) {
    return joined.map((b) => ({
      id: b.id,
      lessonId: b.lesson_id,
      lessonSlug: (b.lessons as unknown as { slug: string }).slug,
      lessonTitle: (b.lessons as unknown as { title: string }).title,
      chapter: (b.lessons as unknown as { chapter: number }).chapter,
      excerpt: b.excerpt,
      timestamp: b.created_at,
    }));
  }

  // Fallback: bookmarks without a matching UUID lesson (static data mode)
  const { data: orphaned } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (!orphaned || orphaned.length === 0) return [];

  const { lessons: staticLessons } = await import("@/lib/data");
  return orphaned.map((b) => {
    const meta = staticLessons.find((l) => l.id === b.lesson_id);
    return {
      id: b.id,
      lessonId: b.lesson_id,
      lessonSlug: b.lesson_id,
      lessonTitle: meta?.title || b.lesson_id,
      chapter: meta?.chapter ?? 0,
      excerpt: b.excerpt,
      timestamp: b.created_at,
    };
  });
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

  // Resolve slug to UUID if needed
  let resolvedId = lessonId;
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lessonId);
  if (!isUUID) {
    const { data: lesson } = await supabase
      .from("lessons")
      .select("id")
      .eq("slug", lessonId)
      .maybeSingle();
    if (lesson) {
      resolvedId = lesson.id;
    } else {
      return { error: "Lesson not found in database" };
    }
  }

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("lesson_id", resolvedId)
    .maybeSingle();

  if (existing) {
    return removeBookmark(resolvedId);
  }

  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    lesson_id: resolvedId,
    excerpt: excerpt || null,
  });

  if (error) return { error: error.message };

  revalidatePath("/course/[slug]");
  revalidatePath("/bookmarks");
  return { success: true, added: true };
}
