import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function LogoGrid({
  items,
  tone = "dark",
}: {
  items: { id: string; label: string; src: string }[];
  tone?: "dark" | "paper";
}) {
  const paper = tone === "paper";
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]",
        paper
          ? "border-[var(--paper-line)] bg-[var(--paper-line)]"
          : "border-[var(--line)] bg-[var(--line)]",
      )}
    >
      {items.map((item, i) => (
        <Reveal
          key={item.id}
          delay={i * 40}
          className={cn(
            "flex items-center gap-3 px-5 py-5",
            paper ? "bg-[var(--paper)]" : "bg-[var(--canvas)]",
          )}
        >
          <Image
            src={item.src}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span
            className={cn(
              "text-[13.5px]",
              paper ? "text-[var(--paper-mute)]" : "text-[var(--body)]",
            )}
          >
            {item.label}
          </span>
        </Reveal>
      ))}
    </div>
  );
}
