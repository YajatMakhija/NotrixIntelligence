import { cn } from "@/lib/utils";

export function StatusMark({ status }: { status: string }) {
  const tone =
    status === "In progress"
      ? "text-[var(--caution)]"
      : status === "Available"
        ? "text-[var(--success)]"
        : "text-[var(--faint)]";

  return <p className={cn("status", tone)}>{status}</p>;
}
