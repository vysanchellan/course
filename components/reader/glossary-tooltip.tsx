"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlossaryItem {
  term: string;
  definition: string;
}

interface GlossaryTooltipProps {
  item: GlossaryItem;
  children: React.ReactNode;
  className?: string;
}

export function GlossaryTooltip({
  item,
  children,
  className,
}: GlossaryTooltipProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function show() {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function hide() {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  }

  return (
    <span
      className={cn(
        "relative inline-block border-b border-dotted border-gold/50 cursor-help",
        className
      )}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="button"
      aria-describedby="glossary-tooltip"
    >
      {children}
      {open && (
        <span
          id="glossary-tooltip"
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 z-50"
        >
          <span className="block bg-panel border border-panelborder rounded-md p-3 shadow-xl">
            <span className="font-mono text-[11px] text-gold uppercase tracking-wider block mb-1">
              {item.term}
            </span>
            <span className="font-mono text-xs text-[#c9c6bd] leading-relaxed block">
              {item.definition}
            </span>
          </span>
          <span className="block absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-panel border-r border-b border-panelborder rotate-45 -mt-1" />
        </span>
      )}
    </span>
  );
}
