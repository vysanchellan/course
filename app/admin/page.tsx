import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Admin Panel
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-8">
        Course administration.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/lessons"
          className="bg-panel border border-panelborder rounded-md p-6 hover:border-gold/40 transition-colors"
        >
          <h2 className="font-mono text-sm text-parchment mb-2">Lessons</h2>
          <p className="font-mono text-xs text-muteddark">
            Edit lesson titles, descriptions, reading times.
          </p>
        </Link>
        <Link
          href="/admin/users"
          className="bg-panel border border-panelborder rounded-md p-6 hover:border-gold/40 transition-colors"
        >
          <h2 className="font-mono text-sm text-parchment mb-2">Users</h2>
          <p className="font-mono text-xs text-muteddark">
            View users and grant course access.
          </p>
        </Link>
        <Link
          href="/admin/purchases"
          className="bg-panel border border-panelborder rounded-md p-6 hover:border-gold/40 transition-colors"
        >
          <h2 className="font-mono text-sm text-parchment mb-2">Purchases</h2>
          <p className="font-mono text-xs text-muteddark">
            View all purchase records.
          </p>
        </Link>
      </div>
    </div>
  );
}
