"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getLessonContent } from "@/lib/content";
import { lessons as staticLessons } from "@/lib/data";

function makeFallbackLesson(slug: string) {
  const meta = staticLessons.find((l) => l.id === slug);
  if (!meta) return null;
  return {
    id: slug,
    course_id: "static",
    chapter: meta.chapter,
    slug: meta.id,
    title: meta.title,
    description: meta.description,
    content: getLessonContent(slug),
    reading_time: meta.readingTime,
    estimated_minutes: meta.estimatedMinutes,
  };
}

function makeFallbackLessons() {
  return staticLessons.map((meta) => ({
    id: meta.id,
    course_id: "static",
    chapter: meta.chapter,
    slug: meta.id,
    title: meta.title,
    description: meta.description,
    content: undefined,
    reading_time: meta.readingTime,
    estimated_minutes: meta.estimatedMinutes,
  }));
}

export async function getLessonsWithProgress() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .order("chapter", { ascending: true });

  // Fall back to static data if DB is empty
  if (!lessons || lessons.length === 0) {
    const fallback = makeFallbackLessons();
    return fallback.map((lesson) => ({
      ...lesson,
      progress: null,
    }));
  }

  if (!user) {
    return lessons.map((lesson) => ({
      ...lesson,
      content: undefined,
      progress: null,
    }));
  }

  const { data: progress } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id);

  const progressMap = new Map(
    (progress || []).map((p: any) => [p.lesson_id, p])
  );

  return lessons.map((lesson: any) => ({
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

  // Fall back to static content if DB is empty
  const htmlContent = lesson ? lesson.content : getLessonContent(slug);
  const fallback = !lesson ? makeFallbackLesson(slug) : null;

  if (!lesson && !fallback) return null;

  const resolved = lesson || fallback;

  if (!user) {
    return { ...resolved, content: htmlContent, progress: null, bookmarked: false };
  }

  if (lesson) {
    const { data: progress } = await supabase
      .from("reading_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("lesson_id", lesson.id)
      .single();

    const { data: bookmark } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user.id)
      .eq("lesson_id", lesson.id)
      .maybeSingle();

    return {
      ...lesson,
      content: htmlContent,
      progress: progress || null,
      bookmarked: !!bookmark,
    };
  }

  return {
    ...resolved,
    content: htmlContent,
    progress: null,
    bookmarked: false,
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

  if (!user) {
    return {
      course: course || { id: "static", slug: "from-zero-to-deployed", title: "From Zero to Deployed", description: null, price_cents: 4999, published: true },
      lessons: makeFallbackLessons(),
      progress: {},
    };
  }

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, course_id, chapter, slug, title, description, reading_time, estimated_minutes")
    .eq("course_id", course?.id || "")
    .order("chapter", { ascending: true });

  const resolvedLessons = (lessons && lessons.length > 0) ? lessons : makeFallbackLessons();

  const { data: progress } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id);

  const progressMap: Record<string, any> = {};
  (progress || []).forEach((p: any) => {
    progressMap[p.lesson_id] = p;
  });

  return {
    course: course || { id: "static", slug: "from-zero-to-deployed", title: "From Zero to Deployed", description: null, price_cents: 4999, published: true },
    lessons: resolvedLessons,
    progress: progressMap,
  };
}
