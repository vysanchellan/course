"use client";

import { useActionState } from "react";
import { resetPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

async function resetPasswordAction(
  _prev: { error?: string } | null,
  formData: FormData
) {
  return resetPassword(formData);
}

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPasswordAction, null);

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
          {state.error}
        </div>
      )}
      <div>
        <label
          htmlFor="password"
          className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5"
        >
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          placeholder="At least 6 characters"
        />
      </div>
      <Button variant="primary" size="lg" className="w-full" disabled={pending}>
        {pending ? "Resetting..." : "Reset password →"}
      </Button>
    </form>
  );
}
