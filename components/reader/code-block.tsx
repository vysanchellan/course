"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may fail in some contexts
    }
  }

  return (
    <div className={cn("not-prose my-6 group", className)}>
      <div className="bg-panel border border-panelborder rounded-md overflow-hidden">
        <div className="flex items-center justify-between gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e05555]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e0b955]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#59c46b]" />
            {language && (
              <span className="font-mono text-[11px] text-muteddark ml-3">
                {language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="font-mono text-[10px] text-muteddark hover:text-parchment transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Copy code"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-[13px] leading-relaxed text-[#c9c6bd] whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
