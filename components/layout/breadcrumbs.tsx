import Link from "next/link";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2", className)}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="font-mono text-[12px] text-muteddark hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-mono text-[12px] text-ink">{item.label}</span>
          )}
          {i < items.length - 1 && (
            <span className="text-muteddark/40 text-[12px]">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}
