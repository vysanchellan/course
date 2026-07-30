import { getAdminLessons } from "@/lib/actions/admin";
import { LessonEditForm } from "./form";

export default async function AdminLessonsPage() {
  const lessons = await getAdminLessons();

  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Admin / Lessons
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-8">
        Manage lessons.
      </h1>

      <div className="space-y-3">
        {lessons.length === 0 && (
          <div className="bg-panel border border-panelborder rounded-md p-10 text-center">
            <p className="font-mono text-sm text-muteddark">
              No lessons found. Run the seed API to populate lessons.
            </p>
          </div>
        )}
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-panel border border-panelborder rounded-md p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] text-gold">
                Ch. {lesson.chapter}
              </span>
              <span className="font-mono text-[11px] text-muteddark">
                {lesson.slug}
              </span>
              <span className="font-mono text-[11px] text-muteddark">
                {lesson.estimated_minutes} min
              </span>
            </div>
            <LessonEditForm
              id={lesson.id}
              title={lesson.title}
              description={lesson.description || ""}
              readingTime={lesson.reading_time || ""}
              estimatedMinutes={lesson.estimated_minutes}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
