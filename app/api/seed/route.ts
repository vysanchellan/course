import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getLessonContent } from "@/lib/content";
import { lessons } from "@/lib/data";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const courseSlug = "from-zero-to-deployed";

  const { data: existingCourse } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .single();

  let courseId: string;

  if (existingCourse) {
    courseId = existingCourse.id;
  } else {
    const { data: newCourse, error: courseError } = await supabase
      .from("courses")
      .insert({
        slug: courseSlug,
        title: "From Zero to Deployed",
        description:
          "Building Real Websites With AI — the exact stack, the exact workflow, and the part after the build nobody else teaches.",
        price_cents: 4999,
        published: true,
      })
      .select("id")
      .single();

    if (courseError) {
      return NextResponse.json({ error: courseError.message }, { status: 500 });
    }
    courseId = newCourse.id;
  }

  const results: { slug: string; status: string; error?: string }[] = [];

  for (const lesson of lessons) {
    const content = getLessonContent(lesson.id);

    const { error } = await supabase.from("lessons").upsert(
      {
        course_id: courseId,
        chapter: lesson.chapter,
        slug: lesson.id,
        title: lesson.title,
        description: lesson.description,
        content,
        reading_time: lesson.readingTime,
        estimated_minutes: lesson.estimatedMinutes,
      },
      {
        onConflict: "course_id, slug",
        ignoreDuplicates: false,
      }
    );

    if (error) {
      results.push({ slug: lesson.id, status: "error", error: error.message });
    } else {
      results.push({ slug: lesson.id, status: "ok" });
    }
  }

  return NextResponse.json({
    course: courseSlug,
    courseId,
    lessonsSeeded: results.filter((r) => r.status === "ok").length,
    errors: results.filter((r) => r.status === "error").length,
    details: results,
  });
}
