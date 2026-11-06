import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "quiet" | "solid-paper" | "outline-paper" | "gold";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-[var(--cta)] text-[var(--cta-ink)] hover:bg-[#2a2826]",
  outline:
    "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]",
  quiet: "text-[var(--body)] hover:text-[var(--ink)]",
  "solid-paper": "bg-[var(--cta)] text-[var(--cta-ink)] hover:bg-[#2a2826]",
  "outline-paper":
    "border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]",
  gold: "bg-[var(--gold)] text-[var(--ink)] hover:bg-[#b8a36c]",
};

const BASE =
  "press inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium tracking-tight transition-[background-color,border-color,color,transform] duration-200 ease-out";

export function Button({
  variant = "solid",
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  children: React.ReactNode;
}) {
  return (
    <Link className={cn(BASE, VARIANTS[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function SubmitButton({
  variant = "solid",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button type="submit" className={cn(BASE, VARIANTS[variant], className)} {...props}>
      {children}
    </button>
  );
}
