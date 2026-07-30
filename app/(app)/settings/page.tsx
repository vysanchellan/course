import { redirect } from "next/navigation";
import { getCurrentUser, getProfile } from "@/lib/actions/auth";
import { SettingsForm } from "./form";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const profile = await getProfile();

  return (
    <div className="px-6 md:px-12 py-10 max-w-2xl mx-auto">
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Settings
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-8">
        Preferences.
      </h1>

      <div className="space-y-6">
        <div className="bg-panel border border-panelborder rounded-md p-6">
          <h2 className="font-mono text-sm text-parchment mb-4">Profile</h2>
          <SettingsForm
            name={profile?.name || ""}
            email={user.email || ""}
          />
        </div>

        <div className="bg-panel border border-panelborder rounded-md p-6">
          <h2 className="font-mono text-sm text-parchment mb-4">Account</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="font-mono text-xs text-muteddark">Email</span>
              <span className="font-mono text-xs text-parchment">
                {user.email}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-mono text-xs text-muteddark">Member since</span>
              <span className="font-mono text-xs text-parchment">
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Recent"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
