import { SetPasswordForm } from "./form";
import Link from "next/link";

export default function SetPasswordPage() {
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
          <h1 className="font-serif text-2xl font-medium text-parchment mb-2">
            You&rsquo;re in.
          </h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            Your purchase is complete. Set a password to access your account.
          </p>
          <SetPasswordForm />
        </div>
      </div>
    </div>
  );
}
