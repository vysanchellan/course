"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { lessons, defaultProgress, courseState } from "@/lib/data";

export function CourseProgressList() {
  const pathname = usePathname();

  return (
    <div className="bg-parchment border border-ink/10 rounded-md p-6">
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-4">
        All Lessons
      </div>
      <div className="space-y-0">
        {lessons.map((lesson) => {
          const prog = defaultProgress[lesson.id];
          const isActive = pathname === `/course/${lesson.id}`;
          return (
            <Link
              key={lesson.id}
              href={`/course/${lesson.id}`}
              className={cn(
                "flex items-center gap-3 py-3 px-3 -mx-3 rounded-sm transition-colors",
                isActive
                  ? "bg-ink/5"
                  : "hover:bg-ink/[0.02]"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full border text-[11px] font-mono shrink-0",
                  prog?.completed
                    ? "bg-diffadd/10 border-diffadd/30 text-diffadd"
                    : isActive
                      ? "border-gold text-gold"
                      : "border-ink/20 text-muteddark"
                )}
              >
                {prog?.completed ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  lesson.chapter
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-xs text-ink truncate">
                  {lesson.title}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[10px] text-muteddark">
                    {lesson.readingTime}
                  </span>
                  {prog && !prog.completed && prog.progress > 0 && (
                    <>
                      <span className="text-muteddark/30">·</span>
                      <span className="font-mono text-[10px] text-gold">
                        {prog.progress}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              {prog?.completed ? (
                <span className="font-mono text-[10px] text-diffadd shrink-0">
                  done
                </span>
              ) : isActive ? (
                <span className="font-mono text-[10px] text-gold shrink-0">
                  current
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
