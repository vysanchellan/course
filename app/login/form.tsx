"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

async function signInAction(
  _prev: { error?: string } | null,
  formData: FormData
) {
  return signIn(formData);
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");
  const [state, action, pending] = useActionState(signInAction, null);

  return (
    <form action={action} className="space-y-4">
      {verified && (
        <div className="font-mono text-xs text-[#3FB97E] bg-[#3FB97E]/10 border border-[#3FB97E]/20 rounded-sm px-3 py-2">
          ✓ Account created. Sign in to continue.
        </div>
      )}
      {reset && (
        <div className="font-mono text-xs text-[#3FB97E] bg-[#3FB97E]/10 border border-[#3FB97E]/20 rounded-sm px-3 py-2">
          ✓ Password reset successfully. Sign in.
        </div>
      )}
      {state?.error && (
        <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
          {state.error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          placeholder="••••••••"
        />
      </div>
      <Button variant="primary" size="lg" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in →"}
      </Button>
    </form>
  );
}
