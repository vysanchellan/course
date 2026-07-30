"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may fail
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-mono text-xs text-muteddark hover:text-parchment transition-colors px-3 py-1.5 border border-panelborder rounded-sm"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
