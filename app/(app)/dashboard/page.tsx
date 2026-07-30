import { ContinueReading } from "@/components/dashboard/continue-reading";
import { CompletionStats } from "@/components/dashboard/completion-stats";
import { RecentLessons } from "@/components/dashboard/recent-lessons";
import { BookmarksWidget } from "@/components/dashboard/bookmarks-widget";
import { CourseProgressList } from "@/components/dashboard/course-progress-list";

export default function DashboardPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
          Dashboard
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment">
          Welcome back.
        </h1>
        <p className="font-mono text-sm text-muteddark mt-1">
          Pick up where you left off.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <ContinueReading />
        </div>
        <CompletionStats />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <RecentLessons />
        <BookmarksWidget />
      </div>

      <CourseProgressList />
    </div>
  );
}
