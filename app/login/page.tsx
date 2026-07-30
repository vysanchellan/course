import { Suspense } from "react";
import { LoginForm } from "./form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-dusk flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-mono text-sm">
            <span className="text-gold">~</span>
            <span className="text-parchment">/course</span>
          </Link>
        </div>
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-8">
          <h1 className="font-serif text-2xl font-medium text-parchment mb-1">Welcome back.</h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            Sign in to continue reading.
          </p>
          <Suspense fallback={<div className="font-mono text-xs text-muteddark">Loading...</div>}>
            <LoginForm />
          </Suspense>
          <div className="mt-6 space-y-2 text-center">
            <p className="font-mono text-xs text-muteddark">
              <Link href="/auth/forgot-password" className="text-gold hover:underline">
                Forgot password?
              </Link>
            </p>
            <p className="font-mono text-xs text-muteddark">
              Don&rsquo;t have an account?{" "}
              <Link href="/register" className="text-gold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
