import { getAdminUsers } from "@/lib/actions/admin";
import { GrantAccessForm } from "./form";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Admin / Users
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-8">
        Manage users.
      </h1>

      <div className="space-y-3">
        {users.length === 0 && (
          <div className="bg-panel border border-panelborder rounded-md p-10 text-center">
            <p className="font-mono text-sm text-muteddark">
              No users yet.
            </p>
          </div>
        )}
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-panel border border-panelborder rounded-md p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-sm text-parchment">
                  {user.name || "Unnamed"}
                </div>
                <div className="font-mono text-xs text-muteddark mt-1">
                  ID: {user.id.slice(0, 12)}...
                </div>
                <div className="font-mono text-xs text-muteddark mt-1">
                  Registered:{" "}
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                {user.purchases && user.purchases.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {user.purchases.map((p: { course_id: string; status: string }, i: number) => (
                      <div
                        key={i}
                        className="font-mono text-[11px] text-diffadd"
                      >
                        ✓ {p.course_id} — {p.status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <GrantAccessForm userId={user.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
