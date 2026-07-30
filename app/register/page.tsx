import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-mono text-sm">
            <span className="text-gold">~</span>/course
          </Link>
        </div>
        <div className="bg-parchment border border-ink/10 rounded-md p-8">
          <h1 className="font-serif text-2xl font-medium mb-1">
            Get access.
          </h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            Create an account to start learning.
          </p>

          {/* TODO: Connect to authentication in Phase 2 */}
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                placeholder="At least 8 characters"
              />
            </div>
            {/* TODO: Replace with actual registration + payment flow */}
            <Link href="/dashboard">
              <Button variant="gold" size="lg" className="w-full">
                Get access — $10
              </Button>
            </Link>
          </div>

          <p className="font-mono text-xs text-muteddark text-center mt-6">
            Already have access?{" "}
            <Link href="/login" className="text-gold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
