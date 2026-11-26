"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function ProductMockup() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-in", "true");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-in", "true");
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="product-frame">
      <div className="overflow-hidden rounded-xl border border-[var(--paper-line)] bg-[var(--paper)]">
        <Image
          src="/company-brain-product.png"
          alt="Company Brain answering a deployment question in Slack, shown on a laptop in a working environment."
          width={1024}
          height={708}
          sizes="(min-width: 1180px) 1180px, 100vw"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-4 max-w-[560px] text-[13.5px] leading-relaxed text-[var(--paper-mute)]">
        Company Brain in Slack — the same governed layer that sits in the rest
        of the workflow, citing back to source.
      </figcaption>
    </figure>
  );
}
