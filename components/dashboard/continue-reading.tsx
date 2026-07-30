import Link from "next/link";

interface ContinueReadingCardProps {
  slug: string | null;
  title: string | null;
  chapter: number | null;
}

export function ContinueReadingCard({
  slug,
  title,
  chapter,
}: ContinueReadingCardProps) {
  if (!slug) {
    return (
      <div className="bg-panel border border-panelborder rounded-md p-6">
        <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-3">
          Continue Reading
        </div>
        <p className="font-serif text-sm text-[#c9c6bd]/60">
          All lessons completed. Great work!
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/course/${slug}`}
      className="block bg-panel border border-panelborder rounded-md p-6 hover:border-gold/40 transition-colors group"
    >
      <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-3">
        Continue Reading
      </div>
      {chapter !== null && (
        <div className="font-mono text-[11px] text-gold mb-1">
          Chapter {String(chapter).padStart(2, "0")}
        </div>
      )}
      <h3 className="font-serif text-xl font-medium text-parchment mb-2 group-hover:text-gold transition-colors">
        {title}
      </h3>
      <div className="flex items-center gap-2 mt-4">
        <span className="font-mono text-xs text-muteddark">Continue →</span>
      </div>
    </Link>
  );
}
