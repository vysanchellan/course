"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { lessons, defaultProgress, courseState } from "@/lib/data";
import type { AccessLevel } from "@/lib/access";

interface AppSidebarProps {
  accessLevel?: AccessLevel;
}

export function AppSidebar({ accessLevel }: AppSidebarProps) {
  const pathname = usePathname();
  const showSupport = accessLevel === "premium" || accessLevel === "admin";

  // Hide sidebar on lesson reader pages (they have their own SideToc)
  if (pathname.startsWith("/course/") && pathname !== "/course") {
    return null;
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-panelborder bg-panel overflow-y-auto">
      <div className="p-4 border-b border-panelborder">
        <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-1">
          Progress
        </div>
        <div className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 36 36" className="shrink-0">
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#28262B"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="3"
              strokeDasharray={`${(courseState.completedLessons / courseState.totalLessons) * 94.2} 94.2`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div>
            <div className="font-mono text-sm text-parchment">
              {courseState.completedLessons}/{courseState.totalLessons}
            </div>
            <div className="font-mono text-[11px] text-muteddark">lessons</div>
          </div>
        </div>
      </div>

      {showSupport && (
        <Link
          href="/support"
          className="flex items-center gap-2 px-4 py-2.5 border-b border-panelborder text-muteddark hover:text-parchment hover:bg-panelborder/20 transition-colors font-mono text-xs"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Support
        </Link>
      )}

      <nav className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson) => {
          const prog = defaultProgress[lesson.id];
          const isActive = pathname === `/course/${lesson.id}`;
          return (
            <Link
              key={lesson.id}
              href={`/course/${lesson.id}`}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 transition-colors border-l-2",
                isActive
                  ? "bg-panelborder/30 border-gold text-parchment"
                  : "border-transparent text-muteddark hover:text-parchment hover:bg-panelborder/20"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[11px] shrink-0 w-5 text-center",
                  isActive ? "text-gold" : "text-muteddark"
                )}
              >
                {lesson.id === "my-first-website" ? "★" : String(lesson.chapter).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs flex-1 truncate">
                {lesson.title}
              </span>
              {prog?.completed && (
                <span className="text-diffadd shrink-0">
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
                </span>
              )}
              {prog && !prog.completed && prog.progress > 0 && (
                <span className="font-mono text-[10px] text-muteddark shrink-0">
                  {prog.progress}%
                </span>
              )}
            </Link>
          );
        })}
        <div className="border-t border-panelborder my-2 mx-4" />
        <Link
          href="/course/final-project"
          className="flex items-center gap-2 px-4 py-2.5 transition-colors border-l-2 border-transparent text-gold hover:bg-panelborder/20"
        >
          <span className="font-mono text-[11px] shrink-0 w-5 text-center">◆</span>
          <span className="font-mono text-xs flex-1 truncate">Final Project</span>
        </Link>
      </nav>
    </aside>
  );
}
