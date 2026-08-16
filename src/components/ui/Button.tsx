import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "quiet";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-white text-black hover:bg-[#e8e8e8]",
  outline:
    "border border-[var(--line-strong)] text-white hover:border-white/50 hover:bg-white/[0.04]",
  quiet: "text-[var(--fg-muted)] hover:text-white",
};

const BASE =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-[13.5px] font-medium tracking-tight transition-colors duration-200";

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
