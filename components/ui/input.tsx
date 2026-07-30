import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm",
            "font-mono text-sm text-ink placeholder:text-muteddark/50",
            "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold",
            "transition-colors",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
