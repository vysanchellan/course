import Link from "next/link";
import { lessons, defaultProgress, courseState } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function CourseOverviewPage() {
  const percentage = Math.round(
    (courseState.completedLessons / courseState.totalLessons) * 100
  );

  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto">
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Course
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-2">
        From Zero to Deployed
      </h1>
      <p className="font-serif text-base text-[#c9c6bd]/70 italic mb-6">
        Thirteen sections. No filler.
      </p>

      <div className="flex items-center gap-4 mb-10 p-4 bg-panel border border-panelborder rounded-md">
        <svg width="40" height="40" viewBox="0 0 36 36">
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
            strokeDasharray={`${percentage * 0.942} 94.2`}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div>
          <div className="font-mono text-sm text-parchment">
            {courseState.completedLessons} of {courseState.totalLessons} lessons
            complete
          </div>
          <div className="font-mono text-xs text-muteddark mt-0.5">
            {courseState.totalReadingTime} total reading time
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const prog = defaultProgress[lesson.id];
          const isCurrent = lesson.id === courseState.currentLessonId;

          return (
            <Link
              key={lesson.id}
              href={`/course/${lesson.id}`}
              className={`block p-5 rounded-md border transition-colors ${
                prog?.completed
                  ? "bg-panel/50 border-panelborder hover:border-gold/40"
                  : isCurrent
                    ? "bg-panel border-gold/60 hover:border-gold"
                    : "bg-panel/30 border-panelborder hover:border-muteddark/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-full border text-sm font-mono shrink-0 mt-0.5 ${
                    prog?.completed
                      ? "bg-diffadd/10 border-diffadd/30 text-diffadd"
                      : isCurrent
                        ? "border-gold text-gold"
                        : "border-panelborder text-muteddark"
                  }`}
                >
                  {prog?.completed ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    lesson.chapter
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-medium text-parchment">
                      {lesson.title}
                    </h3>
                    {prog?.completed && (
                      <Badge variant="success">Completed</Badge>
                    )}
                    {isCurrent && !prog?.completed && (
                      <Badge variant="gold">In Progress</Badge>
                    )}
                  </div>
                  <p className="font-serif text-sm text-[#c9c6bd]/60 leading-relaxed">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="font-mono text-[11px] text-muteddark">
                      {lesson.readingTime}
                    </span>
                    {prog && !prog.completed && prog.progress > 0 && (
                      <>
                        <span className="text-muteddark/30">·</span>
                        <span className="font-mono text-[11px] text-gold">
                          {prog.progress}% complete
                        </span>
                      </>
                    )}
                  </div>
                  {prog && !prog.completed && prog.progress > 0 && (
                    <div className="mt-3 h-1 rounded-full bg-panelborder overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${prog.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muteddark shrink-0 mt-2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
