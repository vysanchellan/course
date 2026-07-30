import { notFound } from "next/navigation";
import { lessons, defaultProgress, getLessonContent } from "@/lib/data";
import { ReaderLayout } from "@/components/reader/reader-layout";

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return lessons.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    notFound();
  }

  const progress = defaultProgress[lesson.id] ?? {
    lessonId: lesson.id,
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  };

  const content = getLessonContent(lessonId);

  return (
    <ReaderLayout lesson={lesson} progress={progress} content={content} />
  );
}
