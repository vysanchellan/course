import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-parchment2 text-ink border border-ink/15",
  gold: "bg-ink text-gold border border-panelborder",
  success: "bg-diffadd/10 text-diffadd border border-diffadd/20",
  muted: "bg-transparent text-muteddark border border-ink/10",
} as const;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex font-mono text-xs font-medium rounded-sm px-3 py-1.5 border",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
