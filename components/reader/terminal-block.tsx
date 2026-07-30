import { cn } from "@/lib/utils";

interface TerminalBlockProps {
  lines: { prefix?: string; text: string; color?: string }[];
  title?: string;
  className?: string;
}

export function TerminalBlock({
  lines,
  title = "terminal",
  className,
}: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "not-prose my-8 bg-panel border border-panelborder rounded-md overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder">
        <span className="w-2.5 h-2.5 rounded-full bg-[#e05555]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#e0b955]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#59c46b]" />
        <span className="font-mono text-[11px] text-muteddark ml-3">
          {title}
        </span>
      </div>
      <div className="p-4 font-mono text-[13px] leading-[1.85] text-[#c9c6bd]">
        {lines.map((line, i) => (
          <div key={i} className={cn(line.color && `text-${line.color}`)}>
            {line.prefix && (
              <span className="text-gold">{line.prefix} </span>
            )}
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
