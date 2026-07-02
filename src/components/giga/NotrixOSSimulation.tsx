"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BRAND_APPS } from "@/components/giga/BrandLogos";

const LOOP_MS = 15000;
const SCENES = 5;
const SCENE_MS = LOOP_MS / SCENES;

const EASE = [0.4, 0, 0.2, 1] as const;
const BLUE = "#356DFF";

const OS_MODULES = [
  "Planner",
  "Reasoning",
  "Memory",
  "Workflow Engine",
  "Security",
  "Observability",
];

const WORKERS = [
  "Engineering",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Support",
  "Legal",
  "Research",
  "Infrastructure",
  "Marketing",
  "Analytics",
];

const FLOW_STEPS = [
  "Research",
  "Legal",
  "Marketing",
  "Finance",
  "Engineering",
  "Infrastructure",
];

const OUTPUTS = [
  "Research Complete",
  "Legal Approved",
  "Marketing Ready",
  "Infrastructure Deployed",
];

function orbitPos(i: number, total: number, cx: number, cy: number, r: number) {
  const a = (i / total) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function appPos(i: number) {
  return orbitPos(i, 6, 50, 50, 32);
}

/* ── Scene 1: Apps connect ── */
function SceneConnect() {
  return (
    <motion.div
      key="s1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        {BRAND_APPS.map((_, i) => {
          const start = appPos(i);
          const end = { x: 50, y: 50 };
          return (
            <g key={i}>
              <motion.line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#E8E8E8"
                strokeWidth="0.2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.2, ease: EASE }}
              />
              <motion.circle
                r="0.5"
                fill={BLUE}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  cx: [start.x, end.x],
                  cy: [start.y, end.y],
                }}
                transition={{
                  duration: 2,
                  delay: 1.2 + i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: EASE,
                }}
              />
            </g>
          );
        })}
      </svg>

      {BRAND_APPS.map((app, i) => {
        const start = appPos(i);
        return (
          <motion.div
            key={app.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            initial={{ left: `${start.x}%`, top: `${start.y}%`, opacity: 0 }}
            animate={{ left: "50%", top: "50%", opacity: 1 }}
            transition={{
              opacity: { duration: 0.8, ease: EASE },
              left: { delay: 1, duration: 2, ease: EASE },
              top: { delay: 1, duration: 2, ease: EASE },
            }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <app.Logo className="h-8 w-8 md:h-9 md:w-9" />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Scene 2: Knowledge Layer sphere ── */
function SceneKnowledge() {
  return (
    <motion.div
      key="s2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-36 w-36 items-center justify-center rounded-full border border-[#E8E8E8] bg-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl md:h-44 md:w-44"
      >
        <div className="absolute inset-3 overflow-hidden rounded-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#356DFF]/30"
              style={{ left: `${20 + (i * 9) % 60}%`, top: `${15 + (i * 11) % 55}%` }}
              animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: EASE }}
      >
        <p className="text-sm font-medium tracking-tight text-[#111111] md:text-base">
          Enterprise Knowledge Layer
        </p>
        <p className="mt-1.5 text-xs text-[#888888] md:text-sm">
          The living memory of your company
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── Scene 3: NotrixOS ── */
function SceneOS() {
  return (
    <motion.div
      key="s3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      <motion.div
        className="absolute bottom-[22%]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="h-14 w-14 rounded-full border border-[#E8E8E8] bg-[#F4F4F4]/80" />
      </motion.div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <motion.line
          x1={50}
          y1={62}
          x2={50}
          y2={42}
          stroke={BLUE}
          strokeWidth="0.15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, ease: EASE }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
        className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[#E8E8E8] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.08)] md:h-32 md:w-32"
      >
        <p className="text-xs font-medium tracking-tight text-[#111111] md:text-sm">
          NotrixOS
        </p>
        <p className="mt-0.5 px-3 text-center text-[9px] text-[#888888] md:text-[10px]">
          Enterprise AI Operating System
        </p>
      </motion.div>

      <div className="absolute bottom-[14%] flex gap-3 md:gap-4">
        {OS_MODULES.map((mod, i) => (
          <motion.span
            key={mod}
            className="text-[8px] text-[#AAAAAA] md:text-[9px]"
            initial={{ opacity: 0.2, color: "#CCCCCC" }}
            animate={{
              opacity: [0.25, 1, 0.25],
              color: ["#CCCCCC", "#356DFF", "#CCCCCC"],
            }}
            transition={{ duration: 2.4, delay: i * 0.35, repeat: Infinity, ease: EASE }}
          >
            {mod}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Scene 4: Workforce orbit ── */
function SceneWorkforce() {
  const workers = WORKERS;

  return (
    <motion.div
      key="s4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        {workers.map((_, i) => {
          const w = orbitPos(i, workers.length, 50, 42, 30);
          return (
            <g key={i}>
              <line x1={w.x} y1={w.y} x2={50} y2={42} stroke="#ECECEC" strokeWidth="0.15" />
              <line
                x1={w.x}
                y1={w.y}
                x2={50}
                y2={68}
                stroke="#ECECEC"
                strokeWidth="0.12"
                strokeDasharray="0.8 0.8"
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E8E8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:h-20 md:w-20">
          <span className="text-[10px] font-medium text-[#111111] md:text-xs">NotrixOS</span>
        </div>
      </div>

      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2">
        <div className="h-12 w-12 rounded-full border border-[#E8E8E8] bg-[#F4F4F4]/60" />
      </div>

      {workers.map((name, i) => {
        const { x, y } = orbitPos(i, workers.length, 50, 42, 30);
        return (
          <motion.div
            key={name}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.8, ease: EASE }}
          >
            <div className="mx-auto mb-1 h-2 w-2 rounded-full bg-[#111111]/80" />
            <p className="text-[8px] text-[#666666] md:text-[9px]">{name}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Scene 5: Execution ── */
function SceneExecution() {
  return (
    <motion.div
      key="s5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      <motion.p
        className="mb-6 text-xs text-[#888888] md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        &ldquo;Launch our product in Germany.&rdquo;
      </motion.p>

      <div className="flex flex-col items-center gap-1">
        {FLOW_STEPS.map((step, i) => (
          <motion.div key={step} className="flex flex-col items-center">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.25, duration: 0.8, ease: EASE }}
            >
              <motion.span
                className="text-[9px] text-[#111111] md:text-[10px]"
                animate={{ color: ["#111111", "#356DFF", "#111111"] }}
                transition={{ delay: 0.6 + i * 0.25, duration: 1.2, ease: EASE }}
              >
                {step}
              </motion.span>
              <motion.span
                className="text-[9px] text-[#22C55E]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1] }}
                transition={{ delay: 1 + i * 0.25, duration: 0.4 }}
              >
                ✓
              </motion.span>
            </motion.div>
            {i < FLOW_STEPS.length - 1 && (
              <motion.div
                className="my-0.5 h-3 w-px bg-[#356DFF]/40"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.55 + i * 0.25, duration: 0.6, ease: EASE }}
                style={{ originY: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 rounded-2xl border border-[#E8E8E8] bg-white px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: EASE }}
      >
        <p className="text-center text-xs font-medium text-[#111111] md:text-sm">
          Execution Complete
        </p>
        <div className="mt-2 space-y-0.5">
          {OUTPUTS.map((o, i) => (
            <motion.p
              key={o}
              className="text-center text-[9px] text-[#888888] md:text-[10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 + i * 0.12, duration: 0.6 }}
            >
              {o}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.p
        className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#AAAAAA] md:text-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1, ease: EASE }}
      >
        Company Intelligence Expanded
      </motion.p>
    </motion.div>
  );
}

const SCENE_LIST = [SceneConnect, SceneKnowledge, SceneOS, SceneWorkforce, SceneExecution];

export function NotrixOSSimulation() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % SCENES), SCENE_MS);
    return () => clearInterval(id);
  }, []);

  const Scene = SCENE_LIST[scene];

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_16px_64px_rgba(0,0,0,0.08)] md:aspect-video">
      <div className="absolute inset-0 pt-2">
        <AnimatePresence mode="wait">
          <Scene />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: SCENES }).map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-700 ${
              i === scene ? "w-4 bg-[#356DFF]" : "w-1 bg-[#E0E0E0]"
            }`}
          />
        ))}
      </div>

      <motion.div
        key={scene}
        className="absolute bottom-0 left-0 h-px bg-[#356DFF]/30"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: SCENE_MS / 1000, ease: "linear" }}
      />
    </div>
  );
}
