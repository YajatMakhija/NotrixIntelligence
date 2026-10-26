"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const NAV: { icon: IconName; label: string; active: boolean }[] = [
  { icon: "search", label: "Ask Company Brain", active: true },
  { icon: "grid", label: "Explore", active: false },
  { icon: "sparkle", label: "Agents", active: false },
  { icon: "activity", label: "Activity", active: false },
];

const QUESTION = "What changed in the enterprise rollout plan?";
const ANSWER =
  "The rollout now starts with Finance and Support before expanding company-wide. The change gives the team two permission models to validate and adds a formal review checkpoint after the first 30 days.";
const ANSWER_WORDS = ANSWER.split(" ");

const SOURCES = [
  {
    label: "Enterprise rollout plan",
    detail: "Google Drive · updated today",
    src: "/logos/google-drive.svg",
  },
  {
    label: "#company-brain-pilot",
    detail: "Slack · 12 messages",
    src: "/logos/slack.svg",
  },
  {
    label: "Launch readiness",
    detail: "Notion · updated yesterday",
    src: "/logos/notion.svg",
  },
];

const CYCLE_MS = 11_500;
const TYPE_START = 500;
const TYPE_END = 2_300;
const RETRIEVE_END = 4_300;
const ANSWER_END = 7_300;

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useDemoTime(reduced: boolean) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const started = performance.now();
    const timer = window.setInterval(() => {
      setElapsed((performance.now() - started) % CYCLE_MS);
    }, 34);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return reduced ? ANSWER_END + 500 : elapsed;
}

export function HeroWorkspace() {
  const reduced = useReducedMotion();
  const elapsed = useDemoTime(reduced);
  const typed = Math.max(
    0,
    Math.min(
      QUESTION.length,
      Math.floor(
        ((elapsed - TYPE_START) / (TYPE_END - TYPE_START)) * QUESTION.length,
      ),
    ),
  );
  const sourceCount =
    elapsed < TYPE_END
      ? 0
      : Math.min(
          SOURCES.length,
          Math.floor(
            ((elapsed - TYPE_END) / (RETRIEVE_END - TYPE_END)) *
              (SOURCES.length + 1),
          ),
        );
  const answerCount =
    elapsed < RETRIEVE_END
      ? 0
      : Math.min(
          ANSWER_WORDS.length,
          Math.floor(
            ((elapsed - RETRIEVE_END) / (ANSWER_END - RETRIEVE_END)) *
              ANSWER_WORDS.length,
          ),
        );
  const isTyping = elapsed >= TYPE_START && elapsed < TYPE_END;
  const isRetrieving = elapsed >= TYPE_END && elapsed < RETRIEVE_END;
  const isAnswering = elapsed >= RETRIEVE_END && elapsed < ANSWER_END;
  const complete = elapsed >= ANSWER_END;

  return (
    <div
      className="workspace-shell relative w-full"
      role="img"
      aria-label="Company Brain workspace answering a rollout question with permission-aware citations from Google Drive, Slack, and Notion."
    >
      <div className="overflow-hidden rounded-[8px] border border-[var(--paper-line)] bg-white shadow-[0_18px_50px_-28px_rgba(15,14,13,0.28)]">
        <div
          className="flex h-11 items-center justify-between border-b border-[var(--ui-line)] bg-[var(--ui-soft)] px-4"
          aria-hidden
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff746c]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f7c95c]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#58c985]" />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-[var(--ui-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            Secure workspace
          </div>
        </div>

        <div className="grid min-h-[470px] md:grid-cols-[155px_minmax(0,1fr)]">
          <aside
            className="hidden border-r border-[var(--ui-line)] bg-[var(--ui-soft)] p-3 md:flex md:flex-col"
            aria-hidden
          >
            <div className="flex h-11 items-center gap-2.5 px-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--navy)]">
                <Image
                  src="/notrix-monogram.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-4 w-4 object-contain"
                />
              </span>
              <div>
                <p className="text-[12px] font-semibold text-[var(--ui-ink)]">
                  Notrix
                </p>
                <p className="text-[9px] text-[var(--ui-muted)]">
                  Acme workspace
                </p>
              </div>
            </div>

            <nav className="mt-5 space-y-1">
              {NAV.map(({ icon, label, active }) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px]",
                    active
                      ? "bg-[var(--blue-soft)] font-medium text-[var(--blue)]"
                      : "text-[var(--ui-muted)]",
                  )}
                >
                  <Icon name={icon} className="h-3.5 w-3.5" />
                  {label}
                </div>
              ))}
            </nav>

            <div className="mt-6 px-2">
              <p className="text-[9px] font-semibold tracking-[0.12em] text-[var(--ui-faint)] uppercase">
                Recent
              </p>
              <div className="mt-3 space-y-3 text-[10px] leading-snug text-[var(--ui-muted)]">
                <p>Enterprise rollout plan</p>
                <p>Q3 customer feedback</p>
                <p>Incident response policy</p>
              </div>
            </div>

            <div className="mt-auto rounded-lg border border-[var(--ui-line)] bg-white p-2.5">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--blue-soft)] text-[9px] font-semibold text-[var(--blue)]">
                  YS
                </span>
                <div>
                  <p className="text-[9px] font-medium text-[var(--ui-ink)]">
                    Your workspace
                  </p>
                  <p className="text-[8px] text-[var(--ui-muted)]">
                    Enterprise
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <main className="min-w-0 bg-white px-5 py-5 sm:px-7 sm:py-7" aria-hidden>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[var(--blue-soft)] px-2 py-1 text-[9px] font-semibold text-[var(--blue)]">
                    COMPANY BRAIN
                  </span>
                  <span className="text-[9px] text-[var(--ui-muted)]">
                    Permission-aware
                  </span>
                </div>
                <h2 className="mt-3 text-[17px] font-semibold tracking-[-0.025em] text-[var(--ui-ink)] sm:text-[19px]">
                  Ask across your company
                </h2>
              </div>
              <button
                type="button"
                tabIndex={-1}
                className="rounded-lg border border-[var(--ui-line)] px-2.5 py-1.5 text-[9px] text-[var(--ui-muted)]"
              >
                New thread
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-[var(--blue)]/25 bg-[var(--blue-wash)] p-4 shadow-[0_0_0_3px_rgba(49,87,232,0.04)]">
              <p className="min-h-6 text-[13px] font-medium text-[var(--ui-ink)] sm:text-[14px]">
                {QUESTION.slice(0, typed)}
                {isTyping && (
                  <span className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-[var(--blue)]" />
                )}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--blue)]/10 pt-3">
                <span className="text-[9px] text-[var(--ui-muted)]">
                  Search company sources
                </span>
                <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--blue)] text-white">
                  <Icon name="arrowUp" className="h-3 w-3" />
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold text-[var(--ui-ink)]">
                  {isRetrieving
                    ? "Finding relevant context"
                    : answerCount > 0
                      ? "Company Brain"
                      : "Ready"}
                </p>
                {isRetrieving && (
                  <span className="text-[9px] text-[var(--blue)]">
                    Searching…
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {SOURCES.map((source, index) => (
                  <div
                    key={source.label}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-[opacity,transform,border-color,background-color] duration-500 ease-out",
                      sourceCount > index
                        ? "translate-y-0 border-[var(--blue)]/20 bg-[var(--blue-wash)] opacity-100"
                        : "translate-y-1 border-[var(--ui-line)] opacity-35",
                    )}
                  >
                    <Image
                      src={source.src}
                      alt=""
                      width={20}
                      height={20}
                      className="h-3.5 w-3.5 object-contain"
                    />
                    <span className="text-[9px] font-medium text-[var(--ui-ink)]">
                      {source.label}
                    </span>
                    {sourceCount > index && (
                      <Icon
                        name="check"
                        className="h-3 w-3 text-[var(--success)]"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 min-h-[155px] rounded-xl border border-[var(--ui-line)] bg-[var(--ui-soft)] p-4">
                {answerCount > 0 ? (
                  <>
                    <p className="text-[12px] leading-[1.65] text-[var(--ui-ink)] sm:text-[13px]">
                      {ANSWER_WORDS.slice(0, answerCount).join(" ")}
                      {isAnswering && (
                        <span className="caret ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-[var(--blue)]" />
                      )}
                    </p>
                    <div
                      className={cn(
                        "mt-5 flex flex-wrap gap-2 transition-opacity duration-500",
                        complete ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {SOURCES.map((source, index) => (
                        <span
                          key={source.label}
                          className="rounded-md border border-[var(--ui-line)] bg-white px-2 py-1 text-[8px] text-[var(--ui-muted)]"
                        >
                          {index + 1} · {source.label}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-3 pt-1">
                    {[92, 100, 74].map((width) => (
                      <span
                        key={width}
                        className="demo-shimmer block h-2 rounded-full bg-[var(--ui-line)]/70"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>

          <aside
            className="hidden border-l border-[var(--ui-line)] bg-[var(--ui-soft)] p-4"
            aria-hidden
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-[var(--ui-ink)]">
                Sources
              </p>
              <span className="tabular text-[9px] text-[var(--ui-muted)]">
                {sourceCount}/{SOURCES.length}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {SOURCES.map((source, index) => (
                <div
                  key={source.label}
                  className={cn(
                    "rounded-lg border bg-white p-3 transition-[opacity,border-color,box-shadow] duration-500 ease-out",
                    sourceCount > index
                      ? "border-[var(--blue)]/25 opacity-100 shadow-sm"
                      : "border-[var(--ui-line)] opacity-45",
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <Image
                      src={source.src}
                      alt=""
                      width={24}
                      height={24}
                      className="mt-0.5 h-4 w-4 object-contain"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[9px] font-medium text-[var(--ui-ink)]">
                        {source.label}
                      </p>
                      <p className="mt-1 text-[8px] text-[var(--ui-muted)]">
                        {source.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-[var(--ui-line)] bg-white p-3">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--success)]/10 text-[var(--success)]">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                <div>
                  <p className="text-[9px] font-medium text-[var(--ui-ink)]">
                    Access verified
                  </p>
                  <p className="mt-0.5 text-[8px] text-[var(--ui-muted)]">
                    Source permissions applied
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div
          className="flex items-center justify-between border-t border-[var(--ui-line)] bg-[var(--ui-soft)] px-4 py-2"
          aria-hidden
        >
          <span className="text-[8px] text-[var(--ui-muted)]">
            Every answer links back to its source
          </span>
          <div className="flex items-center gap-3 text-[8px] text-[var(--ui-muted)]">
            <span>Audit logged</span>
            <span className="h-1 w-1 rounded-full bg-[var(--ui-faint)]" />
            <span>Private by default</span>
          </div>
        </div>
      </div>
    </div>
  );
}
