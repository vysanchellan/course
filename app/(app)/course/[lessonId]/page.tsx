import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth";
import { getLessonWithProgress } from "@/lib/actions/lessons";
import { hasAccess } from "@/lib/actions/purchases";
import { ReaderPageClient } from "./reader-client";

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?redirect=/course/${lessonId}`);
  }

  const hasCourseAccess = await hasAccess();
  if (!hasCourseAccess) redirect("/pricing");

  const lesson = await getLessonWithProgress(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <ReaderPageClient
      lesson={lesson}
      userId={user.id}
    />
  );
}
