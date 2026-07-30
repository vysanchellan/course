"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

async function forgotPasswordAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  return forgotPassword(formData);
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, null);

  if (state?.success) {
    return (
      <div className="text-center py-4">
        <div className="font-mono text-sm text-diffadd mb-2">✓ Check your email</div>
        <p className="font-mono text-xs text-muteddark">
          If an account exists with that email, you&rsquo;ll receive a reset link shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
          {state.error}
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <Button variant="primary" size="lg" className="w-full" disabled={pending}>
        {pending ? "Sending..." : "Send reset link →"}
      </Button>
    </form>
  );
}
