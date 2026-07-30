import Link from "next/link";
import { cn } from "@/lib/utils";
import { recentActivity } from "@/lib/data";

const actionLabels: Record<string, string> = {
  started: "Started",
  continued: "Continued",
  completed: "Completed",
};

const actionColors: Record<string, string> = {
  started: "text-muteddark",
  continued: "text-gold",
  completed: "text-diffadd",
};

export function RecentLessons() {
  return (
    <div className="bg-parchment border border-ink/10 rounded-md p-6">
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-4">
        Recent Activity
      </div>
      <div className="space-y-0">
        {recentActivity.map((activity, i) => (
          <Link
            key={`${activity.lessonId}-${i}`}
            href={`/course/${activity.lessonId}`}
            className="flex items-center gap-3 py-3 border-b border-ink/5 last:border-0 hover:bg-ink/[0.02] -mx-6 px-6 transition-colors"
          >
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider shrink-0 w-16",
                actionColors[activity.action]
              )}
            >
              {actionLabels[activity.action]}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs text-ink truncate">
                {activity.lessonTitle}
              </div>
              <div className="font-mono text-[10px] text-muteddark mt-0.5">
                Chapter {String(activity.chapter).padStart(2, "0")}
              </div>
            </div>
            <span className="font-mono text-[10px] text-muteddark shrink-0">
              {new Date(activity.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
