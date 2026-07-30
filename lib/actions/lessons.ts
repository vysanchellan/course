"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getLessonContent } from "@/lib/content";

export async function getLessonsWithProgress() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .order("chapter", { ascending: true });

  if (!lessons || !user) {
    return lessons || [];
  }

  const { data: progress } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id);

  const progressMap = new Map(
    (progress || []).map((p) => [p.lesson_id, p])
  );

  return lessons.map((lesson) => ({
    ...lesson,
    content: undefined,
    progress: progressMap.get(lesson.id) || null,
  }));
}

export async function getLessonWithProgress(slug: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!lesson) return null;

  const htmlContent = getLessonContent(slug);

  if (!user) {
    return { ...lesson, content: htmlContent, progress: null };
  }

  const { data: progress } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", lesson.id)
    .single();

  return {
    ...lesson,
    content: htmlContent,
    progress: progress || null,
  };
}

export async function getCourseOverview() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("published", true)
    .limit(1);

  const course = courses?.[0] || null;
  if (!course) return null;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, course_id, chapter, slug, title, description, reading_time, estimated_minutes")
    .eq("course_id", course.id)
    .order("chapter", { ascending: true });

  if (!user) {
    return { course, lessons: lessons || [], progress: {} };
  }

  const { data: progress } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id);

  const progressMap: Record<string, any> = {};
  (progress || []).forEach((p) => {
    progressMap[p.lesson_id] = p;
  });

  return { course, lessons: lessons || [], progress: progressMap };
}
