"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FLOW } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Sources -> the layer -> what comes out. Ordered by the connectors, not numbered. */
const STEP_ICONS: IconName[] = ["file", "graph", "sparkle"];

export function FlowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) return;

    setShown(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid gap-y-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-x-6"
    >
      {FLOW.map((step, i) => (
        <div key={step.title} className="contents">
          <div
            className={cn(
              "transition-[opacity,transform] duration-[320ms] ease-[var(--ease-out)]",
              shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
            style={{ transitionDelay: `${i * 180}ms` }}
          >
            <div className="flex items-center gap-3">
              <Icon
                name={STEP_ICONS[i]}
                className="h-[18px] w-[18px] text-[var(--limestone)]"
              />
              <span
                className={cn(
                  "h-px flex-1 origin-left bg-[var(--line)] transition-transform duration-700 ease-[var(--ease-out)] md:hidden",
                  shown ? "scale-x-100" : "scale-x-0",
                )}
                style={{ transitionDelay: `${i * 180 + 120}ms` }}
              />
            </div>
            <h3 className="mt-3 text-[17px] font-medium tracking-tight text-[var(--ink)]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-[var(--body)]">
              {step.body}
            </p>
          </div>

          {i < FLOW.length - 1 && (
            <div
              aria-hidden
              className="relative hidden h-px w-14 self-start bg-[var(--line)] md:mt-[0.6rem] md:block"
            >
              <span
                data-shown={shown}
                className="flow-line absolute inset-0 bg-[var(--line-strong)]"
                style={{ ["--flow-delay" as string]: `${i * 180 + 200}ms` }}
              />
              {shown && (
                <span
                  className="flow-dot absolute top-1/2 left-0 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-[var(--limestone)]"
                  style={{
                    ["--flow-span" as string]: "3.5rem",
                    ["--flow-delay" as string]: `${i * 700 + 900}ms`,
                  }}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
