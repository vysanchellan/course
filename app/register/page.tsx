import { RegisterForm } from "./form";
import Link from "next/link";

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
          <h1 className="font-serif text-2xl font-medium mb-1">Create your account.</h1>
          <p className="font-mono text-xs text-muteddark mb-6">
            Get access to the full course.
          </p>
          <RegisterForm />
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
