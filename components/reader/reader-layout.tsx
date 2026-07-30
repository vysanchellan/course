"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { lessons, defaultProgress, type Lesson, type LessonProgress } from "@/lib/data";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { SideToc } from "@/components/reader/side-toc";

interface ReaderLayoutProps {
  lesson: Lesson;
  progress: LessonProgress;
  content: string;
  children?: React.ReactNode;
}

export function ReaderLayout({
  lesson,
  progress,
  content,
}: ReaderLayoutProps) {
  const [bookmarked, setBookmarked] = useState(progress.bookmarked);
  const [completed, setCompleted] = useState(progress.completed);

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  function toggleBookmark() {
    // TODO: Persist bookmark state to backend in Phase 2
    setBookmarked(!bookmarked);
  }

  function toggleComplete() {
    // TODO: Persist completion state to backend in Phase 2
    setCompleted(!completed);
  }

  return (
    <>
      <ReadingProgress />

      <div className="flex min-h-screen">
        <SideToc currentLessonSlug={lesson.id} />

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-10 md:py-14 max-w-4xl mx-auto">
          {/* Lesson header */}
          <div className="mb-10">
            <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-3">
              Chapter {String(lesson.chapter).padStart(2, "0")}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-3">
              {lesson.title}
            </h1>
            <p className="font-serif text-lg text-ink/60 italic">
              {lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-5">
              <span className="font-mono text-xs text-muteddark">
                {lesson.readingTime}
              </span>
              <span className="text-muteddark/30">·</span>
              <button
                onClick={toggleBookmark}
                className={cn(
                  "inline-flex items-center gap-1.5 font-mono text-xs transition-colors",
                  bookmarked
                    ? "text-gold"
                    : "text-muteddark hover:text-ink"
                )}
                aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={bookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </button>
              <button
                onClick={toggleComplete}
                className={cn(
                  "inline-flex items-center gap-1.5 font-mono text-xs transition-colors",
                  completed
                    ? "text-diffadd"
                    : "text-muteddark hover:text-ink"
                )}
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

          {/* Content */}
          <div
            className="prose-course"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Navigation */}
          <nav className="mt-16 pt-8 border-t border-ink/10 flex items-center justify-between">
            {prevLesson ? (
              <Link
                href={`/course/${prevLesson.id}`}
                className="group flex flex-col"
              >
                <span className="font-mono text-[11px] text-muteddark mb-1">
                  ← Previous
                </span>
                <span className="font-mono text-sm text-ink group-hover:text-gold transition-colors">
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
                <span className="font-mono text-sm text-ink group-hover:text-gold transition-colors">
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
                <span className="font-mono text-sm text-ink group-hover:text-gold transition-colors">
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
