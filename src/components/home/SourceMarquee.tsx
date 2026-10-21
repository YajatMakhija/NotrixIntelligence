import Image from "next/image";
import { INTEGRATIONS } from "@/lib/site";

/**
 * The track is rendered twice so the -50% keyframe lands on a seam that
 * matches the start. Hover pauses it so names stay readable.
 */
export function SourceMarquee() {
  const track = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <div className="marquee marquee-mask overflow-hidden" aria-hidden>
      <div className="marquee-track items-center">
        {track.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="group flex shrink-0 items-center gap-2.5 px-7"
          >
            <Image
              src={item.src}
              alt=""
              width={40}
              height={40}
              className="h-[18px] w-[18px] object-contain opacity-45 grayscale transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
            <span className="text-[13px] tracking-tight whitespace-nowrap text-[var(--paper-mute)] transition-colors duration-300 group-hover:text-[var(--paper-ink)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
