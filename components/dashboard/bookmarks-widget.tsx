import Link from "next/link";

interface BookmarkItem {
  id: string;
  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;
  chapter: number;
  excerpt: string | null;
  timestamp: string;
}

export function BookmarksWidget({
  bookmarks,
}: {
  bookmarks: BookmarkItem[];
}) {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-6">
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
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all">
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-4">
        Bookmarks
      </div>
      <div className="space-y-0">
        {bookmarks.slice(0, 3).map((bm) => (
          <Link
            key={bm.id}
            href={`/course/${bm.lessonSlug}`}
            className="block py-3 border-b border-white/10 last:border-0 hover:bg-white/[0.03] -mx-6 px-6 transition-colors"
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
              <span className="font-mono text-xs text-parchment truncate">
                {bm.lessonTitle}
              </span>
              <span className="font-mono text-[10px] text-muteddark shrink-0">
                Ch. {bm.chapter}
              </span>
            </div>
            {bm.excerpt && (
              <p className="font-serif text-xs text-[#c9c6bd]/60 leading-relaxed line-clamp-2 ml-6">
                &ldquo;{bm.excerpt}&rdquo;
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
