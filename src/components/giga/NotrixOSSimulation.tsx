"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { LOOP_SEC, SCENES, sceneWeight, smoothstep } from "./notrix-os/constants";

const NotrixOSCanvas = dynamic(
  () =>
    import("./notrix-os/NotrixOSCanvas").then((m) => m.NotrixOSCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#FAFAFA]">
        <div className="h-8 w-8 animate-pulse rounded-full bg-[#4F46E5]/20" />
      </div>
    ),
  },
);

const COMMAND = "Launch our product in Germany";

function OverlayUI({ t }: { t: number }) {
  const sceneIndex = useMemo(() => {
    if (t < SCENES.workforce.start) return 0;
    if (t < SCENES.orchestration.start) return 1;
    if (t < SCENES.tools.start) return 2;
    if (t < SCENES.memory.start) return 3;
    return 4;
  }, [t]);

  const orchestrateW = sceneWeight(
    t,
    SCENES.orchestration.start,
    SCENES.orchestration.end,
    1.5,
  );
  const memoryW = sceneWeight(t, SCENES.memory.start + 6, LOOP_SEC, 2);
  const commandChars = Math.floor(
    smoothstep(SCENES.orchestration.start + 0.5, SCENES.orchestration.start + 3, t) *
      COMMAND.length,
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Scene labels */}
      <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#374151]/40">
        {sceneIndex === 0 && "System Awakens"}
        {sceneIndex === 1 && "AI Workforce"}
        {sceneIndex === 2 && "Orchestration"}
        {sceneIndex === 3 && "Tool Invocation"}
        {sceneIndex === 4 && "Enterprise Memory"}
      </div>

      {/* Command window — Scene 3 */}
      <AnimatePresence>
        {orchestrateW > 0.15 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: orchestrateW, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-[18%] w-[min(90%,22rem)] -translate-x-1/2 rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-[0_8px_40px_rgba(79,70,229,0.12)] backdrop-blur-xl"
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#4F46E5]/60">
              NotrixOS Command
            </p>
            <p className="mt-2 font-mono text-sm text-[#1a1a1a]">
              {COMMAND.slice(0, commandChars)}
              <span className="animate-pulse text-[#00D4FF]">|</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Micro telemetry blur */}
      {orchestrateW > 0.4 && (
        <div className="absolute bottom-[22%] left-6 space-y-1 font-mono text-[8px] text-[#374151]/25 blur-[0.5px]">
          <p>embedding_dim=1536</p>
          <p>latency_ms=42</p>
          <p>workflow_id=wf_8k2m</p>
        </div>
      )}

      {/* End tagline — Scene 5 */}
      <AnimatePresence>
        {memoryW > 0.3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: memoryW, y: 0 }}
            className="absolute inset-x-0 bottom-[14%] text-center"
          >
            <p className="font-serif text-lg text-[#1a1a1a]/90 md:text-2xl">
              One Intelligence. Every Workflow. Infinite Scale.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTRIXOS label on core area early */}
      {t > 3.5 && t < SCENES.tools.end && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute left-1/2 top-[58%] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#4F46E5]/50"
        >
          NotrixOS
        </motion.p>
      )}

      {/* Progress dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-700 ${
              i === sceneIndex ? "w-4 bg-[#4F46E5]" : "w-1 bg-[#E0E0E0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function NotrixOSSimulation() {
  const [time, setTime] = useState(0);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E8E8E8]/80 bg-[#FAFAFA] shadow-[0_24px_80px_rgba(0,0,0,0.12)] md:aspect-video">
      <div className="absolute inset-0">
        <NotrixOSCanvas onTimeUpdate={setTime} />
      </div>
      <OverlayUI t={time % LOOP_SEC} />

      {/* Vignette for cinematic depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] shadow-[inset_0_0_80px_rgba(0,0,0,0.06)]"
      />
    </div>
  );
}
