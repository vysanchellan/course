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
      <div className="relative">
        <div className="absolute -inset-3 bg-gradient-to-r from-gold/[0.06] to-goldsoft/[0.03] blur-2xl rounded-3xl pointer-events-none" />
        <div className="relative bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="font-mono text-[11px] text-muteddark uppercase tracking-wider mb-3">
            Continue Reading
          </div>
          <p className="font-serif text-sm text-[#c9c6bd]/60">
            All lessons completed. Great work!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-3 bg-gradient-to-r from-gold/[0.08] to-goldsoft/[0.04] blur-2xl rounded-3xl pointer-events-none" />
      <Link
        href={`/course/${slug}`}
        className="relative block bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all group"
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
          <span className="font-mono text-xs text-muteddark group-hover:text-gold transition-colors">
            Continue →
          </span>
        </div>
      </Link>
    </div>
  );
}
