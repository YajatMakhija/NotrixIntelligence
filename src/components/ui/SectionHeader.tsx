import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-[720px]", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={cn(
          "display text-[32px] text-white md:text-[48px] lg:text-[56px]",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-[var(--fg-muted)] md:text-[18px]">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
