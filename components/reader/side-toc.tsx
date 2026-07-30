"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { lessons } from "@/lib/data";

interface SideTocProps {
  currentLessonSlug: string;
}

export function SideToc({ currentLessonSlug }: SideTocProps) {
  return (
    <aside className="hidden xl:flex flex-col w-56 border-r border-panelborder bg-panel shrink-0">
      <div className="p-3 border-b border-panelborder">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-2 py-1.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] transition-colors font-mono text-[11px] text-[#c9c6bd]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Dashboard
        </Link>
      </div>
      <div className="p-4 border-b border-panelborder">
        <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider">
          Course
        </div>
        <div className="font-mono text-[11px] text-muteddark mt-1">
          {lessons.length} lessons
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson) => {
          const isActive = lesson.id === currentLessonSlug;
          return (
            <Link
              key={lesson.id}
              href={`/course/${lesson.id}`}
              className={cn(
                "flex items-center gap-2 px-4 py-2 transition-colors border-l-2",
                isActive
                  ? "bg-panelborder/30 border-gold text-parchment"
                  : "border-transparent text-muteddark hover:text-parchment hover:bg-panelborder/20"
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
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
