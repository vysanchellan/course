import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "panel" | "outline";
}

export function Card({
  className,
  variant = "default",
  ...props
}: CardProps) {
  const styles = {
    default: "bg-parchment border border-ink/10 rounded-md",
    panel: "bg-panel border border-panelborder rounded-md",
    outline: "bg-transparent border border-ink/15 rounded-md",
  };

  return <div className={cn(styles[variant], className)} {...props} />;
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pt-6 pb-2", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6 pt-2", className)} {...props} />;
}
