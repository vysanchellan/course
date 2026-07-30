import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActivityItem {
  lessonId: string;
  lessonTitle: string;
  chapter: number;
  action: "started" | "continued" | "completed";
  timestamp: string;
}

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

export function RecentLessons({
  activities,
}: {
  activities: ActivityItem[];
}) {
  if (activities.length === 0) {
    return (
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-3">
          Recent Activity
        </div>
        <p className="font-mono text-xs text-muteddark">
          No activity yet. Start reading to track your progress.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all">
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-4">
        Recent Activity
      </div>
      <div className="space-y-0">
        {activities.map((activity, i) => (
          <Link
            key={`${activity.lessonId}-${i}`}
            href={`/course/${activity.lessonId}`}
            className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0 hover:bg-white/[0.03] -mx-6 px-6 transition-colors"
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
              <div className="font-mono text-xs text-parchment truncate">
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
