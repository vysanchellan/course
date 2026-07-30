import { ProgressRing } from "@/components/ui/progress-ring";

interface CompletionStatsCardProps {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  totalReadingTime: string;
  lastSessionDate: string | null;
  streak: number;
}

export function CompletionStatsCard({
  totalLessons,
  completedLessons,
  percentage,
  totalReadingTime,
  lastSessionDate,
  streak,
}: CompletionStatsCardProps) {
  return (
    <div className="bg-panel border border-panelborder rounded-md p-6">
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-5">
        Your Progress
      </div>
      <div className="flex items-center gap-6">
        <ProgressRing progress={percentage} size={96} strokeWidth={5} />
        <div>
          <div className="font-serif text-3xl font-medium text-parchment">
            {percentage}%
          </div>
          <div className="font-mono text-xs text-muteddark mt-1">
            {completedLessons} of {totalLessons} lessons
          </div>
          <div className="font-mono text-xs text-muteddark mt-0.5">
            {totalReadingTime} total
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-panelborder">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muteddark">Streak</span>
          <span className="font-mono text-sm font-medium text-parchment flex items-center gap-1.5">
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
            {streak} days
          </span>
        </div>
        {lastSessionDate && (
          <div className="flex items-center justify-between mt-2">
            <span className="font-mono text-xs text-muteddark">Last session</span>
            <span className="font-mono text-xs text-[#c9c6bd]">
              {new Date(lastSessionDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
