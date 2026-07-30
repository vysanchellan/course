import { ForgotPasswordForm } from "./form";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-dusk flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-8">
          <h1 className="font-serif text-2xl font-medium text-parchment mb-1">Reset password.</h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            We&rsquo;ll send you a reset link.
          </p>
          <ForgotPasswordForm />
          <p className="font-mono text-xs text-muteddark text-center mt-6">
            Remember your password?{" "}
            <a href="/login" className="text-gold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
