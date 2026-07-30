"use client";

import { useActionState } from "react";
import { updateLesson } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";

async function updateLessonAction(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  return updateLesson(formData);
}

interface LessonEditFormProps {
  id: string;
  title: string;
  description: string;
  readingTime: string;
  estimatedMinutes: number;
}

export function LessonEditForm({
  id,
  title,
  description,
  readingTime,
  estimatedMinutes,
}: LessonEditFormProps) {
  const [state, action, pending] = useActionState(updateLessonAction, null);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={id} />
      {state?.error && (
        <div className="font-mono text-xs text-[#b3503a] bg-[#b3503a]/10 border border-[#b3503a]/20 rounded-sm px-3 py-2">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="font-mono text-xs text-diffadd bg-diffadd/10 border border-diffadd/20 rounded-sm px-3 py-2">
          ✓ Saved
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[10px] text-muteddark uppercase mb-1">
            Title
          </label>
          <input
            name="title"
            type="text"
            defaultValue={title}
            className="w-full px-3 py-2 bg-transparent border border-panelborder rounded-sm font-mono text-xs text-parchment focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-muteddark uppercase mb-1">
            Description
          </label>
          <input
            name="description"
            type="text"
            defaultValue={description}
            className="w-full px-3 py-2 bg-transparent border border-panelborder rounded-sm font-mono text-xs text-parchment focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-muteddark uppercase mb-1">
            Reading Time
          </label>
          <input
            name="readingTime"
            type="text"
            defaultValue={readingTime}
            className="w-full px-3 py-2 bg-transparent border border-panelborder rounded-sm font-mono text-xs text-parchment focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-muteddark uppercase mb-1">
            Est. Minutes
          </label>
          <input
            name="estimatedMinutes"
            type="number"
            defaultValue={estimatedMinutes}
            className="w-full px-3 py-2 bg-transparent border border-panelborder rounded-sm font-mono text-xs text-parchment focus:outline-none focus:border-gold"
          />
        </div>
      </div>
      <Button variant="outline" size="sm" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
