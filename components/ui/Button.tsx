import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "whatsapp"
  | "ghost"
  | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-label uppercase tracking-[0.14em] transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variantMap: Record<ButtonVariant, string> = {
  // Primary action — highest emphasis (emerald, solid; dark-safe fg)
  primary:
    "bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed shadow-sm",
  // Secondary action — neutral outline (medium emphasis)
  secondary:
    "border border-line-strong text-ink hover:bg-surface hover:border-muted active:bg-[var(--color-pressed-surface)]",
  // Premium accent — antique gold, use sparingly (ink text for AA contrast)
  accent: "bg-accent text-ink hover:bg-accent-hover active:brightness-95",
  whatsapp: "bg-[#25D366] text-white hover:brightness-105 active:brightness-95",
  ghost: "text-ink hover:bg-surface active:bg-[var(--color-pressed-surface)]",
  // Emerald outline — medium emphasis
  outline:
    "border border-primary/40 text-primary hover:bg-primary hover:text-primary-fg active:bg-primary-pressed",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.65rem]",
  md: "h-11 px-6 text-[0.72rem]",
  lg: "h-14 px-8 text-[0.8rem]",
};

export function buttonClasses(opts?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}): string {
  const { variant = "primary", size = "md", fullWidth, className } = opts ?? {};
  return cn(
    base,
    variantMap[variant],
    sizeMap[size],
    fullWidth && "w-full",
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, fullWidth, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonClasses({ variant, size, fullWidth, className })}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
