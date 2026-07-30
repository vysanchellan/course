"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { lessons, defaultProgress, courseState } from "@/lib/data";

interface SideTocProps {
  currentLessonId: string;
}

export function SideToc({ currentLessonId }: SideTocProps) {
  return (
    <aside className="hidden xl:flex flex-col w-56 border-r border-ink/10 bg-parchment/50 shrink-0">
      <div className="p-4 border-b border-ink/10">
        <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider">
          Course
        </div>
        <div className="font-mono text-[11px] text-muteddark mt-1">
          {courseState.completedLessons}/{courseState.totalLessons} complete
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson) => {
          const prog = defaultProgress[lesson.id];
          const isActive = lesson.id === currentLessonId;
          return (
            <Link
              key={lesson.id}
              href={`/course/${lesson.id}`}
              className={cn(
                "flex items-center gap-2 px-4 py-2 transition-colors border-l-2",
                isActive
                  ? "bg-ink/5 border-gold text-ink"
                  : "border-transparent text-muteddark hover:text-ink hover:bg-ink/[0.02]"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] shrink-0 w-4 text-right",
                  isActive ? "text-gold" : "text-muteddark"
                )}
              >
                {lesson.chapter}
              </span>
              <span className="font-mono text-[11px] leading-snug flex-1 line-clamp-2">
                {lesson.title}
              </span>
              {prog?.completed && (
                <span className="text-diffadd shrink-0">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
