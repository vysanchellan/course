import Link from "next/link";
import { bookmarks } from "@/lib/data";

export function BookmarksWidget() {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-parchment border border-ink/10 rounded-md p-6">
        <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-3">
          Bookmarks
        </div>
        <p className="font-mono text-xs text-muteddark">
          No bookmarks yet. While reading, click the bookmark icon to save
          important sections.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-parchment border border-ink/10 rounded-md p-6">
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-4">
        Bookmarks
      </div>
      <div className="space-y-0">
        {bookmarks.map((bm) => (
          <Link
            key={bm.id}
            href={`/course/${bm.lessonId}`}
            className="block py-3 border-b border-ink/5 last:border-0 hover:bg-ink/[0.02] -mx-6 px-6 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                className="text-gold shrink-0"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              <span className="font-mono text-xs text-ink truncate">
                {bm.lessonTitle}
              </span>
              <span className="font-mono text-[10px] text-muteddark shrink-0">
                Ch. {bm.chapter}
              </span>
            </div>
            <p className="font-serif text-xs text-ink/60 leading-relaxed line-clamp-2 ml-6">
              &ldquo;{bm.excerpt}&rdquo;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
