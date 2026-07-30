import Link from "next/link";
import { lessons, defaultProgress, courseState } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function ContinueReading() {
  const currentLesson = lessons.find(
    (l) => l.id === courseState.currentLessonId
  );
  const progress = currentLesson
    ? defaultProgress[currentLesson.id]
    : null;

  if (!currentLesson || !progress) return null;

  return (
    <Link
      href={`/course/${currentLesson.id}`}
      className="block bg-parchment border border-ink/10 rounded-md p-6 hover:border-gold/40 transition-colors group"
    >
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-3">
        Continue Reading
      </div>
      <div className="font-mono text-[11px] text-gold mb-1">
        Chapter {String(currentLesson.chapter).padStart(2, "0")}
      </div>
      <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-gold transition-colors">
        {currentLesson.title}
      </h3>
      <p className="font-serif text-sm text-ink/60 leading-relaxed mb-4 line-clamp-2">
        {currentLesson.description}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-ink/10 overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all"
            style={{ width: `${progress.progress}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-muteddark shrink-0">
          {progress.progress}%
        </span>
      </div>
    </Link>
  );
}
