"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    password?: string;
    confirm?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // PKCE codes are single-use — this ref guarantees the exchange runs at
  // most once per mount, even if the effect is double-invoked (StrictMode).
  const exchangedRef = useRef(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    async function init() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        // PKCE recovery flow: the single-use code in ?code= is the source of
        // truth. No onAuthStateChange/PASSWORD_RECOVERY listener — that event
        // only fires for the implicit #access_token flow and never here.
        if (exchangedRef.current) return;
        exchangedRef.current = true;

        const { data, error } =
          await supabase.auth.exchangeCodeForSession(code);

        if (error || !data.session) {
          setChecking(false);
          setInvalid(true);
          return;
        }

        // Drop the code from the URL so a refresh can't attempt a doomed
        // second exchange against the same single-use code.
        window.history.replaceState({}, "", window.location.pathname);
        setChecking(false);
        setShowForm(true);
        return;
      }

      // No code — allow a previously-validated recovery session (e.g. the
      // user refreshed after the exchange already ran), else treat as invalid.
      const { data: { session } } = await supabase.auth.getSession();
      setChecking(false);
      if (session) {
        setShowForm(true);
      } else {
        setInvalid(true);
      }
    }

    init();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const errors: { password?: string; confirm?: string } = {};
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (confirm !== password) {
      errors.confirm = "Passwords do not match.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    const supabase = createBrowserSupabaseClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login?reset=true"), 2000);
  }

  if (checking) {
    return (
      <div className="text-center py-8">
        <div className="font-mono text-sm text-muteddark animate-pulse">
          Validating your reset link...
        </div>
      </div>
    );
  }

  if (invalid) {
    return (
      <div className="text-center py-4">
        <div className="font-mono text-sm text-[#b3503a] mb-2">
          This reset link is invalid or has expired.
        </div>
        <p className="font-mono text-xs text-muteddark mb-6">
          Request a new one to continue.
        </p>
        <Link
          href="/auth/forgot-password"
          className="inline-flex w-full items-center justify-center gap-2 font-mono font-bold rounded-sm bg-gold text-ink px-6 py-3.5 text-sm hover:bg-goldsoft transition-colors"
        >
          Request new link →
        </Link>
        <a
          href="/login"
          className="block font-mono text-xs text-gold hover:underline mt-4"
        >
          Back to sign in
        </a>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="font-mono text-sm text-diffadd mb-2">
          ✓ Password updated
        </div>
        <p className="font-mono text-xs text-muteddark">
          Redirecting to sign in...
        </p>
      </div>
    );
  }

  if (!showForm) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="password"
          className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5"
        >
          New password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full px-3.5 py-2.5 pr-10 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muteddark hover:text-parchment transition-colors"
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="font-mono text-xs text-[#b3503a] mt-1">
            {fieldErrors.password}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="confirm"
          className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            id="confirm"
            name="confirm"
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full px-3.5 py-2.5 pr-10 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            placeholder="Re-enter your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muteddark hover:text-parchment transition-colors"
          >
            {showConfirm ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {fieldErrors.confirm && (
          <p className="font-mono text-xs text-[#b3503a] mt-1">
            {fieldErrors.confirm}
          </p>
        )}
      </div>
      <Button variant="gold" size="lg" className="w-full" disabled={loading}>
        {loading ? "Resetting..." : "Reset password →"}
      </Button>
    </form>
  );
}
