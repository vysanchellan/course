import Link from "next/link";
import { bookmarks } from "@/lib/data";

export default function BookmarksPage() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Bookmarks
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-8">
        Saved passages.
      </h1>

      {bookmarks.length === 0 ? (
        <div className="bg-panel border border-panelborder rounded-md p-10 text-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muteddark mx-auto mb-4"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
          <p className="font-mono text-sm text-muteddark">
            No bookmarks yet. While reading a lesson, click the bookmark icon to
            save important sections.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bm) => (
            <Link
              key={bm.id}
              href={`/course/${bm.lessonId}`}
              className="block bg-panel border border-panelborder rounded-md p-5 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className="text-gold shrink-0"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                <span className="font-mono text-xs text-parchment">
                  {bm.lessonTitle}
                </span>
                <span className="font-mono text-[11px] text-muteddark">
                  Ch. {bm.chapter}
                </span>
              </div>
              <p className="font-serif text-sm text-[#c9c6bd]/80 leading-relaxed">
                &ldquo;{bm.excerpt}&rdquo;
              </p>
              <div className="font-mono text-[10px] text-muteddark mt-2">
                {new Date(bm.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
