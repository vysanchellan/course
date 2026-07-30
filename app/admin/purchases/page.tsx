import { getAdminPurchases } from "@/lib/actions/admin";

export default async function AdminPurchasesPage() {
  const purchases = await getAdminPurchases();

  return (
    <div>
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Admin / Purchases
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-8">
        Purchase records.
      </h1>

      {purchases.length === 0 ? (
        <div className="bg-panel border border-panelborder rounded-md p-10 text-center">
          <p className="font-mono text-sm text-muteddark">
            No purchases yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-panelborder">
                <th className="font-mono text-[11px] text-muteddark uppercase pb-3 pr-4">
                  User
                </th>
                <th className="font-mono text-[11px] text-muteddark uppercase pb-3 pr-4">
                  Course
                </th>
                <th className="font-mono text-[11px] text-muteddark uppercase pb-3 pr-4">
                  Status
                </th>
                <th className="font-mono text-[11px] text-muteddark uppercase pb-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="border-b border-panelborder/50">
                  <td className="font-mono text-xs text-parchment py-3 pr-4">
                    {p.userName}
                  </td>
                  <td className="font-mono text-xs text-parchment py-3 pr-4">
                    {p.courseTitle}
                  </td>
                  <td className="font-mono text-xs py-3 pr-4">
                    {p.status === "completed" ? (
                      <span className="text-diffadd">{p.status}</span>
                    ) : p.status === "pending" ? (
                      <span className="text-gold">{p.status}</span>
                    ) : (
                      <span className="text-muteddark">{p.status}</span>
                    )}
                  </td>
                  <td className="font-mono text-xs text-muteddark py-3">
                    {new Date(p.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
