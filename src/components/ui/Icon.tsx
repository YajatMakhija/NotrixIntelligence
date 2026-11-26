import { cn } from "@/lib/utils";

/**
 * One authored set at a single stroke weight. Unicode glyphs and emoji are not
 * an icon system, and mixing libraries shows up as inconsistent stroke.
 */
const PATHS = {
  check: "M4 12.5l5 5L20 6.5",
  close: "M6 6l12 12M18 6L6 18",
  minus: "M5 12h14",
  arrowRight: "M4 12h15M13 6l6 6-6 6",
  arrowUp: "M12 20V5M6 11l6-6 6 6",
  search: "M16 16l5 5M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  sparkle:
    "M11 3l1.7 4.8L17.5 9.5l-4.8 1.7L11 16l-1.7-4.8L4.5 9.5l4.8-1.7z" +
    "M18 15l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6z",
  activity: "M3 12h4l2.5-7 4 14L16 12h5",
  layers: "M12 3l9 4.8-9 4.8-9-4.8zM3 12.8L12 17.6l9-4.8M3 17.2L12 22l9-4.8",
  graph:
    "M12 3.5a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2zM6 15.3a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2z" +
    "M18 15.3a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2zM10.6 8.4L7.4 15.4M13.4 8.4l3.2 7M8.6 17.9h6.8",
  bolt: "M13.5 3L6 13.5h4.5L9.5 21 17 10.5h-4.5z",
  shield: "M12 3l7.5 2.6v5.5c0 4.5-3 8.2-7.5 9.9-4.5-1.7-7.5-5.4-7.5-9.9V5.6z",
  lock: "M5.5 11h13v9.5h-13zM8.5 11V7.5a3.5 3.5 0 017 0V11",
  list: "M8.5 6h11.5M8.5 12h11.5M8.5 18h11.5M4 6h.01M4 12h.01M4 18h.01",
  clock: "M12 7.5V12l3.5 2M20.5 12a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z",
  server: "M3.5 4.5h17v6h-17zM3.5 13.5h17v6h-17zM7 7.5h.01M7 16.5h.01",
  plug: "M9 3v4.5M15 3v4.5M6 7.5h12V11a6 6 0 01-12 0zM12 17v4",
  users:
    "M9 11.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zM2.5 20.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" +
    "M16.5 5.1a3.5 3.5 0 010 6.3M18 14.5c2.1.9 3.5 3 3.5 5.3",
  route: "M6 4.5v9a4 4 0 004 4h8M15 14l3 3.5-3 3.5M4 4.5h4",
  file: "M6 3h7l5 5v13H6zM13 3v5h5M9 13h6M9 17h4",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4 shrink-0", className)}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
