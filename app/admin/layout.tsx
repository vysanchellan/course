import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/actions/admin";
import { getCurrentUser } from "@/lib/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const admin = await isAdmin();
  if (!admin) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-dusk">
      <div className="bg-panel border-b border-panelborder">
        <nav className="flex items-center gap-6 px-6 h-12 max-w-5xl mx-auto">
          <Link
            href="/admin"
            className="font-mono text-xs text-gold font-medium"
          >
            Admin
          </Link>
          <Link
            href="/admin/lessons"
            className="font-mono text-xs text-muteddark hover:text-parchment transition-colors"
          >
            Lessons
          </Link>
          <Link
            href="/admin/users"
            className="font-mono text-xs text-muteddark hover:text-parchment transition-colors"
          >
            Users
          </Link>
          <Link
            href="/admin/purchases"
            className="font-mono text-xs text-muteddark hover:text-parchment transition-colors"
          >
            Purchases
          </Link>
          <Link
            href="/dashboard"
            className="font-mono text-xs text-muteddark hover:text-parchment transition-colors ml-auto"
          >
            ← Dashboard
          </Link>
        </nav>
      </div>
      <div className="max-w-5xl mx-auto p-6">{children}</div>
    </div>
  );
}
