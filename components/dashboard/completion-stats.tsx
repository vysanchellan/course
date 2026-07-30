import { courseState } from "@/lib/data";
import { ProgressRing } from "@/components/ui/progress-ring";

export function CompletionStats() {
  const percentage = Math.round(
    (courseState.completedLessons / courseState.totalLessons) * 100
  );

  return (
    <div className="bg-parchment border border-ink/10 rounded-md p-6">
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-5">
        Your Progress
      </div>
      <div className="flex items-center gap-6">
        <ProgressRing progress={percentage} size={96} strokeWidth={5} />
        <div>
          <div className="font-serif text-3xl font-medium">
            {percentage}%
          </div>
          <div className="font-mono text-xs text-muteddark mt-1">
            {courseState.completedLessons} of {courseState.totalLessons} lessons
          </div>
          <div className="font-mono text-xs text-muteddark mt-0.5">
            {courseState.totalReadingTime} total
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-ink/10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muteddark">Streak</span>
          <span className="font-mono text-sm font-medium flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="2"
            >
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            {courseState.streak} days
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-mono text-xs text-muteddark">Last session</span>
          <span className="font-mono text-xs text-ink">
            {new Date(courseState.lastSessionDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
