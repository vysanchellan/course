"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function saveProgress(data: {
  lessonId: string;
  progress: number;
  scrollPosition?: number;
  completed?: boolean;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("reading_progress").upsert(
    {
      user_id: user.id,
      lesson_id: data.lessonId,
      progress: Math.min(100, Math.max(0, data.progress)),
      scroll_position: data.scrollPosition ?? 0,
      completed: data.completed ?? data.progress >= 100,
      last_read_at: new Date().toISOString(),
    },
    { onConflict: "user_id, lesson_id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/course/[slug]");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getDashboardProgress() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title")
    .eq("published", true)
    .limit(1);

  const course = courses?.[0];
  if (!course) return null;

  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, chapter, slug, title, reading_time, estimated_minutes")
    .eq("course_id", course.id)
    .order("chapter", { ascending: true });

  const { data: progressData } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id);

  const totalLessons = allLessons?.length || 0;
  const completedLessons =
    progressData?.filter((p) => p.completed).length || 0;
  const progressMap = new Map(
    (progressData || []).map((p) => [p.lesson_id, p])
  );

  const lessonsWithProgress = (allLessons || []).map((lesson) => ({
    ...lesson,
    progress: progressMap.get(lesson.id) || null,
  }));

  const currentLesson = lessonsWithProgress.find(
    (l) => !l.progress?.completed
  );

  const lastRead = lessonsWithProgress
    .filter((l) => l.progress?.last_read_at)
    .sort(
      (a, b) =>
        new Date(b.progress!.last_read_at!).getTime() -
        new Date(a.progress!.last_read_at!).getTime()
    );

  const recentActivity = lastRead.slice(0, 5).map((l) => ({
    lessonId: l.slug,
    lessonTitle: l.title,
    chapter: l.chapter,
    action: l.progress!.completed
      ? ("completed" as const)
      : ("continued" as const),
    timestamp: l.progress!.last_read_at,
  }));

  const totalReadMinutes =
    progressData?.reduce((sum, p) => {
      const lesson = allLessons?.find((l) => l.id === p.lesson_id);
      return sum + (p.progress / 100) * (lesson?.estimated_minutes || 0);
    }, 0) || 0;

  return {
    totalLessons,
    completedLessons,
    currentLessonSlug: currentLesson?.slug || null,
    currentLessonTitle: currentLesson?.title || null,
    currentLessonChapter: currentLesson?.chapter || null,
    totalReadingTime: `${Math.round(totalReadMinutes / 60)}h ${Math.round(totalReadMinutes % 60)}min`,
    lastSessionDate: lastRead[0]?.progress?.last_read_at || null,
    streak: 0,
    lessons: lessonsWithProgress,
    recentActivity,
  };
}

export async function getDashboardStats() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, estimated_minutes");

  const { data: progressData } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", user.id);

  const totalLessons = allLessons?.length || 0;
  const completedLessons =
    progressData?.filter((p) => p.completed).length || 0;
  const percentage =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const totalEstimatedMinutes =
    allLessons?.reduce((sum, l) => sum + (l.estimated_minutes || 0), 0) || 0;
  const readMinutes =
    progressData?.reduce((sum, p) => {
      const lesson = allLessons?.find((l) => l.id === p.lesson_id);
      return sum + (p.progress / 100) * (lesson?.estimated_minutes || 0);
    }, 0) || 0;

  const remainingMinutes = Math.max(0, totalEstimatedMinutes - readMinutes);

  return {
    totalLessons,
    completedLessons,
    percentage,
    totalEstimatedMinutes,
    remainingMinutes,
  };
}
