"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { lessons, courseState } from "@/lib/data";
import type { AccessLevel } from "@/lib/access";

interface SidebarLessonProgress {
  id: string;
  chapter: number;
  slug: string;
  title: string;
  progress: {
    completed: boolean;
    progress: number;
  } | null;
}

interface SidebarProgress {
  totalLessons: number;
  completedLessons: number;
  lessons: SidebarLessonProgress[];
}

interface AppSidebarProps {
  accessLevel?: AccessLevel;
  progress?: SidebarProgress | null;
}

export function AppSidebar({ accessLevel, progress }: AppSidebarProps) {
  const pathname = usePathname();
  const showSupport = accessLevel === "premium" || accessLevel === "admin";

  const total = progress?.totalLessons ?? courseState.totalLessons;
  const completed = progress?.completedLessons ?? courseState.completedLessons;
  const progressMap = new Map(
    (progress?.lessons || []).map((l) => [l.slug, l.progress])
  );
  const fpUnlocked = total > 0 && completed >= total;

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
              strokeDasharray={`${total > 0 ? (completed / total) * 94.2 : 0} 94.2`}
              strokeLinecap="round"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <div>
            <div className="font-mono text-sm text-parchment">
              {completed}/{total}
            </div>
            <div className="font-mono text-[11px] text-muteddark">lessons</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {lessons.map((lesson) => {
          const prog = progressMap.get(lesson.id);
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
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 transition-colors border-l-2",
            fpUnlocked
              ? "border-gold text-parchment hover:bg-panelborder/20"
              : "border-transparent text-muteddark hover:text-[#c9c6bd]"
          )}
        >
          <span className="font-mono text-[11px] shrink-0 w-5 text-center">
            {fpUnlocked ? "◆" : "🔒"}
          </span>
          <span className="font-mono text-xs flex-1 truncate">
            Final Project
          </span>
        </Link>
      </nav>
    </aside>
  );
}
