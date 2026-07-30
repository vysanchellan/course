import { ResetPasswordForm } from "./form";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-parchment border border-ink/10 rounded-md p-8">
          <h1 className="font-serif text-2xl font-medium mb-1">New password.</h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            Choose a new password for your account.
          </p>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
