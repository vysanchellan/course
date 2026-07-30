import { RegisterForm } from "./form";
import Link from "next/link";

interface RegisterPageProps {
  searchParams: Promise<{ tier?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { tier } = await searchParams;
  const validTier = tier === "premium" ? "premium" : "standard";

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
          <h1 className="font-serif text-2xl font-medium text-parchment mb-1">Create your account.</h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            {validTier === "premium" ? "Premium tier selected." : "Standard tier selected."}
          </p>
          <RegisterForm tier={validTier} />
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
