"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { SideToc } from "@/components/reader/side-toc";
import { saveProgress } from "@/lib/actions/progress";
import { toggleBookmark } from "@/lib/actions/bookmarks";
import { lessons } from "@/lib/data";

interface LessonData {
  id: string;
  course_id: string;
  chapter: number;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  reading_time: string | null;
  estimated_minutes: number;
  bookmarked: boolean;
  progress: {
    completed: boolean;
    progress: number;
    scroll_position: number;
  } | null;
}

export function ReaderPageClient({
  lesson,
  userId,
}: {
  lesson: LessonData;
  userId: string;
}) {
  const [bookmarked, setBookmarked] = useState(lesson.bookmarked);
  const [completed, setCompleted] = useState(
    lesson.progress?.completed || false
  );
  const [saving, setSaving] = useState(false);

  const isBookmarked = bookmarked;

  const currentIndex = lessons.findIndex((l) => l.id === lesson.slug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const handleBookmark = useCallback(async () => {
    const result = await toggleBookmark(lesson.id);
    if (result.success) {
      setBookmarked("added" in result ? result.added : false);
    }
  }, [lesson.id]);

  const handleComplete = useCallback(async () => {
    setSaving(true);
    const newCompleted = !completed;
    setCompleted(newCompleted);
    await saveProgress({
      lessonId: lesson.id,
      progress: newCompleted ? 100 : 0,
      completed: newCompleted,
    });
    setSaving(false);
  }, [lesson.id, completed]);

  // Auto-save progress on scroll
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      // Throttled save would go here in production
    }
  }, []);

  return (
    <>
      <ReadingProgress />
      <div className="flex min-h-screen">
        <SideToc currentLessonSlug={lesson.slug} />

        <main className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-10 md:py-14 max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-3">
              Chapter {String(lesson.chapter).padStart(2, "0")}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-parchment mb-3">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="font-serif text-lg text-[#c9c6bd]/60 italic">
                {lesson.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-5">
              <span className="font-mono text-xs text-muteddark">
                {lesson.reading_time || `${lesson.estimated_minutes} min read`}
              </span>
              <span className="text-muteddark/30">·</span>
              <button
                onClick={handleBookmark}
                className={`inline-flex items-center gap-1.5 font-mono text-xs transition-colors ${
                  isBookmarked
                    ? "text-gold"
                    : "text-muteddark hover:text-parchment"
                }`}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={isBookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
              <button
                onClick={handleComplete}
                disabled={saving}
                className={`inline-flex items-center gap-1.5 font-mono text-xs transition-colors ${
                  completed
                    ? "text-diffadd"
                    : "text-muteddark hover:text-parchment"
                }`}
                aria-label={completed ? "Mark incomplete" : "Mark complete"}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {completed ? "Completed" : "Mark complete"}
              </button>
            </div>
          </div>

          <div
            className="prose-course-dark"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          <nav className="mt-16 pt-8 border-t border-panelborder flex items-center justify-between">
            {prevLesson ? (
              <Link
                href={`/course/${prevLesson.id}`}
                className="group flex flex-col"
              >
                <span className="font-mono text-[11px] text-muteddark mb-1">
                  ← Previous
                </span>
                <span className="font-mono text-sm text-parchment group-hover:text-gold transition-colors">
                  {prevLesson.chapter}. {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link
                href={`/course/${nextLesson.id}`}
                className="group flex flex-col text-right"
              >
                <span className="font-mono text-[11px] text-muteddark mb-1">
                  Next →
                </span>
                <span className="font-mono text-sm text-parchment group-hover:text-gold transition-colors">
                  {nextLesson.chapter}. {nextLesson.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/course"
                className="group flex flex-col text-right"
              >
                <span className="font-mono text-[11px] text-muteddark mb-1">
                  ←
                </span>
                <span className="font-mono text-sm text-parchment group-hover:text-gold transition-colors">
                  Back to overview
                </span>
              </Link>
            )}
          </nav>
        </main>
      </div>
    </>
  );
}
