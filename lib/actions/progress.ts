"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { lessons as staticLessons } from "@/lib/data";

function toUtcDay(dateStr: string): number {
  const d = new Date(dateStr);
  return Math.floor(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000
  );
}

function calculateStreak(
  progressData: { last_read_at: string | null }[]
): number {
  const days = new Set<number>();
  for (const p of progressData) {
    if (p.last_read_at) days.add(toUtcDay(p.last_read_at));
  }
  if (days.size === 0) return 0;

  const today = toUtcDay(new Date().toISOString());
  const sorted = [...days].sort((a, b) => b - a);
  const mostRecent = sorted[0];

  // Most recent activity 2+ days ago means the streak is dead
  if (mostRecent < today - 1) return 0;

  let streak = 0;
  let expected = mostRecent;
  for (const day of sorted) {
    if (day === expected) {
      streak++;
      expected--;
    } else if (day < expected) {
      break;
    }
  }
  return streak;
}

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

  // Resolve slug to UUID if needed
  let lessonId = data.lessonId;
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lessonId);
  if (!isUUID) {
    const { data: lesson } = await supabase
      .from("lessons")
      .select("id")
      .eq("slug", lessonId)
      .maybeSingle();
    if (lesson) {
      lessonId = lesson.id;
    } else {
      return { error: "Lesson not found in database" };
    }
  }

  const payload: Record<string, unknown> = {
    user_id: user.id,
    lesson_id: lessonId,
    progress: Math.min(100, Math.max(0, data.progress)),
    scroll_position: data.scrollPosition ?? 0,
    last_read_at: new Date().toISOString(),
  };
  if (data.completed !== undefined) {
    payload.completed = data.completed === true;
  }

  const { error } = await supabase.from("reading_progress").upsert(
    payload,
    { onConflict: "user_id, lesson_id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/course/[slug]");
  revalidatePath("/dashboard");
  revalidatePath("/course");
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

  // Try DB first, fall back to static data
  if (course) {
    const { data: allLessons } = await supabase
      .from("lessons")
      .select("id, chapter, slug, title, reading_time, estimated_minutes")
      .eq("course_id", course.id)
      .order("chapter", { ascending: true });

    if (allLessons && allLessons.length > 0) {
      const { data: progressData } = await supabase
        .from("reading_progress")
        .select("*")
        .eq("user_id", user.id);

      const totalLessons = allLessons.length;
      const completedLessons =
        progressData?.filter((p) => p.completed).length || 0;
      const progressMap = new Map(
        (progressData || []).map((p) => [p.lesson_id, p])
      );

      const lessonsWithProgress = allLessons.map((lesson) => ({
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
          const lesson = allLessons.find((l) => l.id === p.lesson_id);
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
        streak: calculateStreak(progressData || []),
        lessons: lessonsWithProgress,
        recentActivity,
      };
    }
  }

  // Fallback: use static data with zero progress
  const totalLessons = staticLessons.length;
  const lessonsWithProgress = staticLessons.map((l) => ({
    id: l.id,
    chapter: l.chapter,
    slug: l.id,
    title: l.title,
    reading_time: l.readingTime,
    estimated_minutes: l.estimatedMinutes,
    progress: null,
  }));

  return {
    totalLessons,
    completedLessons: 0,
    currentLessonSlug: staticLessons[0].id,
    currentLessonTitle: staticLessons[0].title,
    currentLessonChapter: staticLessons[0].chapter,
    totalReadingTime: "0h 0min",
    lastSessionDate: null,
    streak: 0,
    lessons: lessonsWithProgress,
    recentActivity: [],
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
    streak: calculateStreak(progressData || []),
  };
}
