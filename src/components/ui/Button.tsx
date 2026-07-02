import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "dark" | "light" | "ghost-dark" | "ghost-light";

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  dark: "bg-[#f5f5f0] text-[#0c0c0c] hover:bg-white",
  light: "bg-[#1a1a1a] text-[#fafaf8] hover:bg-black",
  "ghost-dark": "border border-[rgba(245,245,240,0.25)] text-[#f5f5f0] hover:bg-white/10",
  "ghost-light": "border border-[rgba(26,26,26,0.15)] text-[#1a1a1a] hover:bg-black/5",
};

export function Button({
  variant = "dark",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300",
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
  variant?: "dark" | "light";
}

export function SubmitButton({
  variant = "dark",
  className,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        "inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 sm:w-auto",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
