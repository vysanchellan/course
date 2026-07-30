import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth";
import { getDashboardProgress } from "@/lib/actions/progress";
import { getBookmarks } from "@/lib/actions/bookmarks";
import { ContinueReadingCard } from "@/components/dashboard/continue-reading";
import { CompletionStatsCard } from "@/components/dashboard/completion-stats";
import { RecentLessons } from "@/components/dashboard/recent-lessons";
import { BookmarksWidget } from "@/components/dashboard/bookmarks-widget";
import { CourseProgressList } from "@/components/dashboard/course-progress-list";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [dashboard, bookmarks] = await Promise.all([
    getDashboardProgress(),
    getBookmarks(),
  ]);

  if (!dashboard) {
    return (
      <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
        <div className="text-center py-20">
          <div className="font-mono text-xs text-muteddark mb-2">No course data found</div>
          <p className="font-serif text-lg text-[#c9c6bd]/60">
            Run the seed endpoint to populate the database.
          </p>
        </div>
      </div>
    );
  }

  const percentage = dashboard.totalLessons > 0
    ? Math.round((dashboard.completedLessons / dashboard.totalLessons) * 100)
    : 0;

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

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <ContinueReadingCard
            slug={dashboard.currentLessonSlug}
            title={dashboard.currentLessonTitle}
            chapter={dashboard.currentLessonChapter}
          />
        </div>
        <CompletionStatsCard
          totalLessons={dashboard.totalLessons}
          completedLessons={dashboard.completedLessons}
          percentage={percentage}
          totalReadingTime={dashboard.totalReadingTime}
          lastSessionDate={dashboard.lastSessionDate}
          streak={dashboard.streak}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <RecentLessons activities={dashboard.recentActivity} />
        <BookmarksWidget bookmarks={bookmarks} />
      </div>

      <CourseProgressList lessons={dashboard.lessons} />
    </div>
  );
}
