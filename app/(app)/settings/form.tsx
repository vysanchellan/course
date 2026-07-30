"use client";

import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/auth";
import { signOut } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

async function updateProfileAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  return updateProfile(formData);
}

export function SettingsForm({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [state, action, pending] = useActionState(updateProfileAction, null);

  return (
    <>
      <form action={action} className="space-y-4 mb-6 pb-6 border-b border-panelborder">
        {state?.error && (
          <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
            {state.error}
          </div>
        )}
        {state?.success && (
          <div className="font-mono text-xs text-diffadd bg-diffadd/10 border border-diffadd/20 rounded-sm px-3 py-2">
            ✓ Profile updated
          </div>
        )}
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs font-medium text-muteddark uppercase tracking-wider mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={name}
            className="w-full px-3.5 py-2.5 bg-transparent border border-panelborder rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs font-medium text-muteddark uppercase tracking-wider mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-3.5 py-2.5 bg-transparent border border-panelborder rounded-sm font-mono text-sm text-muteddark cursor-not-allowed"
          />
        </div>
        <Button variant="outline" size="sm" disabled={pending}>
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </form>

      <form action={signOut}>
        <Button variant="ghost" size="sm" className="text-muteddark hover:text-[#b3503a]">
          Sign out
        </Button>
      </form>
    </>
  );
}
