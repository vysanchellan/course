import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          Error 404
        </div>
        <h1 className="font-serif text-4xl font-medium mb-4">
          Page not found
        </h1>
        <p className="font-serif text-lg text-ink/60 leading-relaxed mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ink text-parchment font-mono text-sm font-medium px-6 py-3.5 rounded-sm hover:bg-ink/85 transition-colors"
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}
