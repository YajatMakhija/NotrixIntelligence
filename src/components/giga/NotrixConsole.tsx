"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Overview", active: false },
  { label: "Knowledge", active: false },
  { label: "Agents", active: true },
  { label: "Workflows", active: false },
  { label: "Search", active: false },
  { label: "Audit log", active: false },
];

const AGENT_RUNS = [
  {
    name: "Invoice reconciliation",
    dept: "Finance",
    status: "Running",
    detail: "Matching 34 invoices against PO records",
    baseSeconds: 134,
  },
  {
    name: "Ticket triage",
    dept: "Support",
    status: "Running",
    detail: "Classifying and routing 12 new tickets",
    baseSeconds: 48,
  },
  {
    name: "Contract clause review",
    dept: "Legal",
    status: "Awaiting review",
    detail: "3 flagged clauses queued for counsel approval",
    baseSeconds: 662,
  },
  {
    name: "Weekly pipeline brief",
    dept: "Sales",
    status: "Completed",
    detail: "Brief delivered to 8 account executives",
    baseSeconds: 0,
  },
];

const SOURCES = [
  { name: "SharePoint", count: "48,120 docs" },
  { name: "Salesforce", count: "12,835 records" },
  { name: "Zendesk", count: "31,400 tickets" },
  { name: "Slack", count: "6 workspaces" },
  { name: "Snowflake", count: "214 tables" },
];

const WORKFLOW_LABELS = [
  "Trigger: new invoice received",
  "Extract fields and validate totals",
  "Match against purchase orders",
  "Route exceptions to approver",
  "Post to ERP and close",
];

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function StatusPill({ status }: { status: string }) {
  const styles =
    status === "Running"
      ? "bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/25"
      : status === "Completed"
        ? "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]"
        : "bg-[#d97706]/10 text-[#d97706] border-[#d97706]/25";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${styles}`}
    >
      {status === "Running" && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16a34a]" />
      )}
      {status}
    </span>
  );
}

export function NotrixConsole() {
  const [tick, setTick] = useState(0);
  const [activeStep, setActiveStep] = useState(2);
  const [revealedRows, setRevealedRows] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((s) => (s + 1) % WORKFLOW_LABELS.length);
    }, 3500);
    return () => clearInterval(stepTimer);
  }, []);

  useEffect(() => {
    if (revealedRows >= AGENT_RUNS.length) return;
    const revealTimer = setTimeout(() => {
      setRevealedRows((r) => r + 1);
    }, 400);
    return () => clearTimeout(revealTimer);
  }, [revealedRows]);

  const workflowSteps = useMemo(
    () =>
      WORKFLOW_LABELS.map((label, i) => ({
        label,
        state:
          i < activeStep ? "done" : i === activeStep ? "active" : "pending",
      })),
    [activeStep],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] text-left shadow-[0_12px_48px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#fde047]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
            NotrixOS Console
          </span>
        </div>
        <span className="hidden rounded-md border border-[var(--border)] px-2 py-1 font-mono text-[10px] text-[var(--text-secondary)] sm:block">
          acme-corp.notrix.ai
        </span>
      </div>

      <div className="grid md:grid-cols-[168px_1fr]">
        <aside className="hidden border-r border-[var(--border)] bg-[var(--surface)] px-3 py-4 md:block">
          <nav className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <p
                key={item.label}
                className={`rounded-md px-3 py-1.5 text-xs ${
                  item.active
                    ? "bg-[var(--brand-primary)]/10 font-medium text-[var(--brand-primary)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {item.label}
              </p>
            ))}
          </nav>
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <p className="px-3 font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)]">
              Connected sources
            </p>
            <div className="mt-2 space-y-1.5 px-3">
              {SOURCES.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--text-primary)]">{source.name}</span>
                  <span className="font-mono text-[9px] text-[var(--text-secondary)]">
                    {source.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="p-4 md:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Agent activity
              </h3>
              <p className="mt-0.5 text-[11px] text-[var(--text-secondary)]">
                4 agents active · 128 runs today · 0 policy violations
              </p>
            </div>
            <span className="rounded-md border border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--text-secondary)]">
              Last 24 hours
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-[var(--border)]">
            {AGENT_RUNS.map((run, i) => (
              <motion.div
                key={run.name}
                initial={{ opacity: 0, y: 8 }}
                animate={
                  i < revealedRows ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-center justify-between gap-3 px-3.5 py-2.5 ${
                  i > 0 ? "border-t border-[var(--border)]" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-medium text-[var(--text-primary)]">
                      {run.name}
                    </p>
                    <span className="hidden rounded border border-[var(--border)] px-1.5 py-px font-mono text-[9px] text-[var(--text-secondary)] sm:block">
                      {run.dept}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-[var(--text-secondary)]">
                    {run.detail}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusPill status={run.status} />
                  <span className="hidden w-16 text-right font-mono text-[10px] text-[var(--text-secondary)] sm:block">
                    {run.status === "Completed"
                      ? "Done 09:12"
                      : formatElapsed(run.baseSeconds + tick)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]/50 p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[var(--text-primary)]">
                Invoice reconciliation — run #4,182
              </p>
              <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                wf_inv_recon · step {activeStep + 1} of {WORKFLOW_LABELS.length}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {workflowSteps.map((step) => (
                <div key={step.label} className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      step.state === "done"
                        ? "bg-[var(--brand-secondary)]"
                        : step.state === "active"
                          ? "animate-pulse bg-[#16a34a]"
                          : "border border-[var(--border)] bg-transparent"
                    }`}
                  />
                  <p
                    className={`text-[11px] ${
                      step.state === "pending"
                        ? "text-[var(--text-secondary)]/60"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
