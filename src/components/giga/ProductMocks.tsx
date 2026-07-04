function MockFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#fca5a5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fde047]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
        </div>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function KnowledgeLayerMock() {
  const sources = ["SharePoint", "Salesforce", "Slack", "SAP", "Snowflake"];
  return (
    <MockFrame title="Knowledge Layer">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
            Knowledge graph
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Policies", "Products", "Customers", "Tickets", "Contracts", "Teams"].map(
              (node) => (
                <div
                  key={node}
                  className="rounded border border-[var(--border)] bg-[var(--bg)] px-2 py-2 text-center text-xs text-[var(--text-secondary)]"
                >
                  {node}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="rounded-lg bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text-secondary)]">
          2.4M chunks indexed · RBAC enforced · Last sync 2m ago
        </div>
      </div>
    </MockFrame>
  );
}

export function AgentRuntimeMock() {
  return (
    <MockFrame title="Agent Builder">
      <div className="space-y-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
          <p className="text-xs text-[var(--text-secondary)]">Agent name</p>
          <p className="mt-1 text-sm text-[var(--text-primary)]">Operations Copilot</p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
          <p className="text-xs text-[var(--text-secondary)]">Policy</p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
            Auto-approve refunds under $500. Escalate compliance cases to human review.
          </p>
        </div>
        <div className="flex gap-2">
          {["CRM", "ERP", "Email"].map((tool) => (
            <span
              key={tool}
              className="rounded border border-[#22C55E]/30 bg-[#22C55E]/10 px-2 py-1 text-xs text-[#22C55E]"
            >
              {tool} connected
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#22C55E]/10 px-3 py-2">
          <span className="text-xs text-[#22C55E]">Ready to deploy</span>
          <span className="font-mono text-[10px] text-[#22C55E]/70">v1.2.0</span>
        </div>
      </div>
    </MockFrame>
  );
}

export function EnterpriseSearchMock() {
  return (
    <MockFrame title="Enterprise Search">
      <div className="space-y-3">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)]">
          What is our refund policy for enterprise accounts?
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
            Enterprise accounts are eligible for full refunds within 30 days of purchase,
            subject to contract terms in Section 4.2...
          </p>
          <div className="mt-3 space-y-1">
            {["Enterprise_Policy_2024.pdf", "Support_KB_1842", "Slack #legal"].map(
              (cite) => (
                <p key={cite} className="font-mono text-[10px] text-[var(--text-secondary)]">
                  ↳ {cite}
                </p>
              ),
            )}
          </div>
        </div>
        <p className="font-mono text-[10px] text-[var(--text-secondary)]">847ms · 3 sources cited</p>
      </div>
    </MockFrame>
  );
}

export function WorkflowEngineMock() {
  return (
    <MockFrame title="Workflow Engine">
      <div className="space-y-2">
        {[
          { step: "Trigger", label: "New support ticket · Priority: High" },
          { step: "Agent", label: "Classify intent & gather context" },
          { step: "Branch", label: "Refund eligible? → Auto-process" },
          { step: "Action", label: "Update CRM · Notify customer" },
        ].map((item, i) => (
          <div key={item.step} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] text-[10px] font-medium text-[#00C2FF]">
                {i + 1}
              </div>
              {i < 3 && <div className="mt-1 h-4 w-px bg-[var(--border)]" />}
            </div>
            <div className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                {item.step}
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-primary)]/80">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}
