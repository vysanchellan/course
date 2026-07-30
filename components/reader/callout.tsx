import { cn } from "@/lib/utils";

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: "note" | "tip" | "insight" | "warning" | "rule";
  className?: string;
}

const dotColors: Record<string, string> = {
  note: "bg-[#e05555]",
  tip: "bg-[#59c46b]",
  insight: "bg-[#e0b955]",
  warning: "bg-[#e05555]",
  rule: "bg-[#e0b955]",
};

const prefixIcons: Record<string, string> = {
  note: "#",
  tip: "⟐",
  insight: "$",
  warning: "!",
  rule: "⤷",
};

export function Callout({
  title,
  children,
  variant = "note",
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "not-prose my-8 bg-panel border border-panelborder rounded-md overflow-hidden",
        className
      )}
    >
      {(title || variant) && (
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel">
          <span
            className={cn("w-2.5 h-2.5 rounded-full", dotColors[variant])}
          />
          <span
            className={cn("w-2.5 h-2.5 rounded-full", dotColors[variant])}
          />
          <span
            className={cn("w-2.5 h-2.5 rounded-full", dotColors[variant])}
          />
          {title && (
            <span className="font-mono text-[11px] text-muteddark ml-3">
              {title}
            </span>
          )}
        </div>
      )}
      <div className="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]">
        {variant && (
          <span className="text-gold mr-2">{prefixIcons[variant]}</span>
        )}
        {children}
      </div>
    </div>
  );
}
