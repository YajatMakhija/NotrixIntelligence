import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function LogoGrid({
  items,
}: {
  items: { id: string; label: string; src: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {items.map((item, i) => (
        <Reveal
          key={item.id}
          delay={i * 40}
          className="flex items-center gap-3 bg-black px-5 py-5"
        >
          <Image
            src={item.src}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="text-[13.5px] text-[var(--fg-muted)]">{item.label}</span>
        </Reveal>
      ))}
    </div>
  );
}
