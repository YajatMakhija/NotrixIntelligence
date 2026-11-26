import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
  tone?: "dark" | "paper";
}) {
  const paper = tone === "paper";
  return (
    <Reveal className={cn("max-w-[720px]", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "display text-[32px] md:text-[48px] lg:text-[56px]",
          paper ? "text-[var(--paper-ink)]" : "text-[var(--ink)]",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-6 max-w-[560px] text-[16px] leading-relaxed md:text-[18px]",
            paper ? "text-[var(--paper-mute)]" : "text-[var(--body)]",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
