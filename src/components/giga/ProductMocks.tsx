function MockFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function LightMockFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
      <div className="flex items-center gap-2 border-b border-black/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        </div>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-black/40">
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
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Knowledge graph
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Policies", "Products", "Customers", "Tickets", "Contracts", "Teams"].map(
              (node) => (
                <div
                  key={node}
                  className="rounded border border-white/10 bg-white/5 px-2 py-2 text-center text-xs text-white/70"
                >
                  {node}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="rounded-lg bg-white/5 px-3 py-2 text-xs text-white/60">
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
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-white/50">Agent name</p>
          <p className="mt-1 text-sm text-white/90">Operations Copilot</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-white/50">Policy</p>
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            Auto-approve refunds under $500. Escalate compliance cases to human review.
          </p>
        </div>
        <div className="flex gap-2">
          {["CRM", "ERP", "Email"].map((tool) => (
            <span
              key={tool}
              className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300/80"
            >
              {tool} connected
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-3 py-2">
          <span className="text-xs text-emerald-300/80">Ready to deploy</span>
          <span className="font-mono text-[10px] text-emerald-300/60">v1.2.0</span>
        </div>
      </div>
    </MockFrame>
  );
}

export function EnterpriseSearchMock() {
  return (
    <MockFrame title="Enterprise Search">
      <div className="space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
          What is our refund policy for enterprise accounts?
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="text-xs leading-relaxed text-white/75">
            Enterprise accounts are eligible for full refunds within 30 days of purchase,
            subject to contract terms in Section 4.2...
          </p>
          <div className="mt-3 space-y-1">
            {["Enterprise_Policy_2024.pdf", "Support_KB_1842", "Slack #legal"].map(
              (cite) => (
                <p key={cite} className="font-mono text-[10px] text-white/40">
                  ↳ {cite}
                </p>
              ),
            )}
          </div>
        </div>
        <p className="font-mono text-[10px] text-white/40">847ms · 3 sources cited</p>
      </div>
    </MockFrame>
  );
}

export function WorkflowEngineMock() {
  return (
    <LightMockFrame title="Workflow Engine">
      <div className="space-y-2">
        {[
          { step: "Trigger", label: "New support ticket · Priority: High" },
          { step: "Agent", label: "Classify intent & gather context" },
          { step: "Branch", label: "Refund eligible? → Auto-process" },
          { step: "Action", label: "Update CRM · Notify customer" },
        ].map((item, i) => (
          <div key={item.step} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black/15 text-[10px] font-medium">
                {i + 1}
              </div>
              {i < 3 && <div className="mt-1 h-4 w-px bg-black/10" />}
            </div>
            <div className="flex-1 rounded-lg border border-black/10 bg-[#fafaf8] px-3 py-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-black/40">
                {item.step}
              </p>
              <p className="mt-0.5 text-xs text-black/75">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </LightMockFrame>
  );
}
