import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "accent" | "dark" | "light" | "ghost-dark" | "ghost-light";

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  accent:
    "btn-lift btn-lift-primary bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)]",
  light:
    "btn-lift btn-lift-primary bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)]",
  dark: "btn-lift border border-[var(--border)] bg-[var(--text-primary)] text-white hover:bg-[#27272a]",
  "ghost-dark":
    "btn-lift border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface)]",
  "ghost-light":
    "btn-lift border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface)]",
};

export function Button({
  variant = "accent",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "accent" | "dark" | "light";
}

export function SubmitButton({
  variant = "accent",
  className,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium sm:w-auto",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
