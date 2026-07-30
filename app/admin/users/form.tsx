"use client";

import { useActionState } from "react";
import { grantAccess } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";

async function grantAccessAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  return grantAccess(formData);
}

interface GrantAccessFormProps {
  userId: string;
}

export function GrantAccessForm({ userId }: GrantAccessFormProps) {
  const [state, action, pending] = useActionState(grantAccessAction, null);

  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <input
        type="hidden"
        name="courseId"
        value="from-zero-to-deployed"
      />
      {state?.error && (
        <span className="font-mono text-[10px] text-[#b3503a]">
          {state.error}
        </span>
      )}
      {state?.success && (
        <span className="font-mono text-[10px] text-diffadd">✓ Granted</span>
      )}
      <Button variant="outline" size="sm" disabled={pending}>
        {pending ? "..." : "Grant access"}
      </Button>
    </form>
  );
}
