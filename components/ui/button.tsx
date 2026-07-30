"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-ink text-parchment hover:bg-ink/85 border border-transparent",
  secondary:
    "bg-transparent text-ink border border-ink/20 hover:bg-ink/5",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 border border-transparent",
  gold:
    "bg-gold text-ink font-bold hover:bg-goldsoft border border-transparent",
  outline:
    "bg-transparent text-parchment border border-panelborder hover:bg-panel",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-sm",
  xl: "px-8 py-4 text-base",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-mono font-medium rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, type ButtonProps };
