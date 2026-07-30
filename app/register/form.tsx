"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

interface RegisterFormProps {
  tier: string;
}

async function signUpAction(
  _prev: { error?: string } | null,
  formData: FormData
) {
  return signUp(formData);
}

export function RegisterForm({ tier }: RegisterFormProps) {
  const [state, action, pending] = useActionState(signUpAction, null);

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
          {state.error}
        </div>
      )}
      <input type="hidden" name="tier" value={tier} />
      <div>
        <label htmlFor="name" className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
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
      <div>
        <label htmlFor="password" className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          placeholder="At least 6 characters"
        />
      </div>
      <Button variant="gold" size="lg" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create account →"}
      </Button>
    </form>
  );
}
