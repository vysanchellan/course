"use client";

import { useActionState } from "react";
import { setAdminProgress } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";

export function SimulateProgressButtons() {
  const [state, action, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const state = formData.get("state") as string;
      return setAdminProgress(state as "none" | "partial" | "complete");
    },
    null
  );

  return (
    <form action={action} className="flex items-center gap-3 flex-wrap">
      <input type="hidden" name="state" id="sim-state" />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() => {
          const input = document.getElementById("sim-state") as HTMLInputElement;
          input.value = "none";
        }}
      >
        0% — no progress
      </Button>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() => {
          const input = document.getElementById("sim-state") as HTMLInputElement;
          input.value = "partial";
        }}
      >
        50% — partial progress
      </Button>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() => {
          const input = document.getElementById("sim-state") as HTMLInputElement;
          input.value = "complete";
        }}
      >
        100% — all complete
      </Button>
      {state && (state as any)?.success && (
        <span className="font-mono text-xs text-diffadd">✓ Updated</span>
      )}
      {(state as any)?.error && (
        <span className="font-mono text-xs text-[#b3503a]">
          {(state as any).error}
        </span>
      )}
    </form>
  );
}
