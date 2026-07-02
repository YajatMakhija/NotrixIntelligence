export const LOOP_SEC = 35;

export const SCENES = {
  awaken: { start: 0, end: 5 },
  workforce: { start: 5, end: 10 },
  orchestration: { start: 10, end: 18 },
  tools: { start: 18, end: 26 },
  memory: { start: 26, end: 35 },
} as const;

export const COLORS = {
  bg: "#FAFAFA",
  cyan: "#00D4FF",
  indigo: "#4F46E5",
  violet: "#7C3AED",
  emerald: "#10B981",
  amber: "#F59E0B",
  graphite: "#374151",
  silver: "#C0C5CE",
} as const;

export const MODULES = [
  "Planner",
  "Memory",
  "Workflow",
  "Reasoning",
  "Security",
  "Observability",
] as const;

export const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Finance",
  "HR",
  "Research",
  "Legal",
  "Operations",
  "Support",
  "Infrastructure",
  "Sales",
] as const;

export type DeptIconType =
  | "code"
  | "chart"
  | "coin"
  | "person"
  | "neural"
  | "doc"
  | "gear"
  | "chat"
  | "server"
  | "funnel";

export const DEPT_META: Record<
  (typeof DEPARTMENTS)[number],
  { icon: DeptIconType; accent: string }
> = {
  Engineering: { icon: "code", accent: COLORS.cyan },
  Marketing: { icon: "chart", accent: COLORS.violet },
  Finance: { icon: "coin", accent: COLORS.emerald },
  HR: { icon: "person", accent: COLORS.amber },
  Research: { icon: "neural", accent: COLORS.indigo },
  Legal: { icon: "doc", accent: COLORS.graphite },
  Operations: { icon: "gear", accent: COLORS.cyan },
  Support: { icon: "chat", accent: COLORS.violet },
  Infrastructure: { icon: "server", accent: COLORS.indigo },
  Sales: { icon: "funnel", accent: COLORS.emerald },
};

export const TOOLS = [
  "GitHub",
  "Slack",
  "Salesforce",
  "Google Cloud",
  "HubSpot",
  "Stripe",
  "Microsoft",
  "OpenAI",
  "Notion",
] as const;

export const TOOL_POSITIONS: [number, number, number][] = TOOLS.map((_, i) => {
  const angle = (i / TOOLS.length) * Math.PI * 2 + 0.4;
  const r = 3.0 + (i % 3) * 0.35;
  const y = 0.2 + Math.sin(i * 1.7) * 0.7;
  return [Math.cos(angle) * r, y, Math.sin(angle) * r];
});

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function sceneWeight(
  t: number,
  start: number,
  end: number,
  fade = 1.2,
): number {
  const inW = smoothstep(start, start + fade, t);
  const outW = 1 - smoothstep(end - fade, end, t);
  return inW * outW;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function deptPosition(i: number, total: number, radius: number) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const yJitter = Math.sin(i * 2.17) * radius * 0.12;
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: yJitter + Math.cos(phi) * radius * 0.35,
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

export const DEPT_POSITIONS = DEPARTMENTS.map((_, i) =>
  deptPosition(i, DEPARTMENTS.length, 4.2),
);
