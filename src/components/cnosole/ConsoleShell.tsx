"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { signOut } from "@/app/login/actions";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { WorkspaceProfile } from "@/lib/session";
import {
  CONSOLE_AGENTS,
  CONSOLE_ASKS,
  CONSOLE_SOURCES,
  CONSOLE_SPACES,
  type ConsoleSpaceId,
} from "@/lib/console-demo";

type ChatTurn = {
  role: "user" | "assistant";
  text: string;
  citations?: string[];
};

type CenterView = "overview" | "data" | "customers" | "agents";

const WORKSPACE_NAV = [
  ["overview", "Overview", "grid"],
  ["data", "Data ingestion", "plug"],
  ["customers", "Customers", "users"],
  ["agents", "Agents", "bolt"],
] as const;

export function ConsoleShell({ workspace }: { workspace: WorkspaceProfile }) {
  const [spaceId, setSpaceId] = useState<ConsoleSpaceId>("rollout");
  const [view, setView] = useState<CenterView>("overview");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [desktopNavOpen, setDesktopNavOpen] = useState(true);
  const [askOpen, setAskOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [thread, setThread] = useState<ChatTurn[]>([]);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [connectedSystems, setConnectedSystems] = useState<string[]>([]);
  const [customers, setCustomers] = useState<{ name: string; domain: string; owner: string }[]>([]);
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [signingOut, startSignOut] = useTransition();

  const searchRef = useRef<HTMLInputElement>(null);
  const askRef = useRef<HTMLTextAreaElement>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef(0);

  const space =
    CONSOLE_SPACES.find((item) => item.id === spaceId) ?? CONSOLE_SPACES[0];
  const sources = CONSOLE_SOURCES[spaceId];
  const agents = CONSOLE_AGENTS[spaceId];
  const prompts = CONSOLE_ASKS.filter((item) => item.spaces.includes(spaceId));
  const restricted = sources.filter((item) => item.access === "Restricted");
  const openCount = sources.filter((item) => item.access === "Open").length;
  const workspaceDomain = `notrix.${workspace.slug}.com`;
  const viewTitle = view === "overview" ? space.title : view === "data" ? "Data ingestion" : view === "customers" ? "Customers" : "Agents";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(`notrix:${workspace.slug}:console`);
        if (saved) {
          const parsed = JSON.parse(saved) as { connectedSystems?: string[]; customers?: { name: string; domain: string; owner: string }[] };
          if (Array.isArray(parsed.connectedSystems)) setConnectedSystems(parsed.connectedSystems);
          if (Array.isArray(parsed.customers)) setCustomers(parsed.customers);
        }
      } catch {
        // Local preview persistence is optional.
      }
      setStorageLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [workspace.slug]);

  useEffect(() => {
    if (!storageLoaded) return;
    window.localStorage.setItem(`notrix:${workspace.slug}:console`, JSON.stringify({ connectedSystems, customers }));
  }, [connectedSystems, customers, storageLoaded, workspace.slug]);

  function toggleSystem(system: string) {
    setConnectedSystems((current) => current.includes(system) ? current.filter((item) => item !== system) : [...current, system]);
  }

  function addCustomer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("customerName") ?? "").trim();
    const domain = String(data.get("customerDomain") ?? "").trim();
    const owner = String(data.get("customerOwner") ?? "").trim();
    if (!name || !domain || !owner) return;
    setCustomers((current) => [...current, { name, domain, owner }]);
    event.currentTarget.reset();
    setAddingCustomer(false);
  }

  const visibleSources = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return sources;
    return sources.filter(
      (item) =>
        item.title.toLowerCase().includes(needle) ||
        item.system.toLowerCase().includes(needle),
    );
  }, [query, sources]);

  const visibleAgents = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return agents;
    return agents.filter(
      (item) =>
        item.title.toLowerCase().includes(needle) ||
        item.remit.toLowerCase().includes(needle),
    );
  }, [agents, query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [thread, pending]);

  function selectSpace(id: ConsoleSpaceId) {
    requestRef.current += 1;
    setSpaceId(id);
    setThread([]);
    setDraft("");
    setQuery("");
    setPending(false);
    setActiveSource(null);
    setView("overview");
    setNavOpen(false);
    setAskOpen(false);
  }

  function openAsk(focus = true) {
    setAskOpen(true);
    if (focus) {
      window.setTimeout(() => askRef.current?.focus(), 20);
    }
  }

  function startNewQuestion() {
    requestRef.current += 1;
    setThread([]);
    setDraft("");
    setPending(false);
    setNavOpen(false);
    openAsk();
  }

  async function ask(text: string) {
    const prompt = text.trim();
    if (!prompt || pending) return;

    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setPending(true);
    setDraft("");
    setThread((current) => [...current, { role: "user", text: prompt }]);
    openAsk(false);

    try {
      const response = await fetch("/api/company-brain/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: prompt, spaceId }),
      });
      const result = (await response.json()) as {
        answer?: string;
        citations?: { title: string }[];
        error?: { message?: string };
      };
      if (requestRef.current !== requestId) return;
      setThread((current) => [
        ...current,
        {
          role: "assistant",
          text:
            result.answer ??
            result.error?.message ??
            "Company Brain could not answer this question.",
          citations: result.citations?.map((citation) => citation.title),
        },
      ]);
    } catch {
      if (requestRef.current !== requestId) return;
      setThread((current) => [
        ...current,
        {
          role: "assistant",
          text: "Company Brain is temporarily unavailable. Check the local backend and try again.",
        },
      ]);
    } finally {
      if (requestRef.current === requestId) setPending(false);
    }
  }

  function useSource(title: string, access: "Open" | "Restricted") {
    setActiveSource(title);
    openAsk();
    setDraft(
      access === "Restricted"
        ? "Which sources can I not open in this space?"
        : `What does ${title} say that I can use?`,
    );
  }

  const followUps = prompts.filter(
    (item) =>
      !thread.some((turn) => turn.role === "user" && turn.text === item.prompt),
  );

  return (
    <div className="notrix-console flex h-svh flex-col overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--paper-line)] bg-[#f0f2ec] px-4 py-2 text-[12px] text-[var(--body)]">
        <p><span className="font-medium text-[var(--ink)]">{workspace.companyName}</span> · Interactive preview — connections are simulated on this device</p>
        <button
          type="button"
          disabled={signingOut}
          onClick={() => startSignOut(() => signOut())}
          className="font-medium text-[var(--ink)] underline-offset-2 hover:underline disabled:opacity-50"
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Spaces rail — Harvey topology */}
        <aside
          className={cn(
            "z-20 flex w-[260px] shrink-0 flex-col border-r border-[var(--paper-line)] bg-[#f0f2ec]",
            "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-[min(100%,300px)]",
            navOpen ? "max-lg:flex" : "max-lg:hidden",
            desktopNavOpen ? "lg:flex" : "lg:hidden",
          )}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <div><p className="wordmark text-[24px] leading-none">notrix</p><p className="mt-1 max-w-[170px] truncate text-[11px] text-[var(--faint)]">{workspace.companyName}</p></div>
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setNavOpen(false)}
              aria-label="Close navigation"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          <label className="mx-4 flex items-center gap-2 rounded-[4px] border border-[var(--paper-line)] bg-[var(--paper)] px-2.5 py-2">
            <Icon name="search" className="h-3.5 w-3.5 text-[var(--body)]" />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search this space"
              placeholder="Search this space"
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--faint)]"
            />
            <kbd className="hidden rounded-[3px] border border-[var(--paper-line)] px-1 text-[10px] text-[var(--faint)] sm:inline">
              ⌘K
            </kbd>
          </label>

          <button
            type="button"
            onClick={startNewQuestion}
            className="press mx-4 mt-3 rounded-[4px] bg-[var(--ink)] px-3 py-2.5 text-left text-[13px] font-medium text-[var(--paper)]"
          >
            New question
          </button>

          <p className="mt-7 px-5 text-[11px] font-medium tracking-[0.1em] text-[var(--faint)] uppercase">Workspace</p>
          <div className="mt-2 space-y-0.5 px-2">
            {WORKSPACE_NAV.map(([id, label, icon]) => (
              <button key={id} type="button" onClick={() => { setView(id); setNavOpen(false); }} className={cn("flex w-full items-center gap-2.5 rounded-[4px] px-3 py-2 text-left text-[13px] transition-colors", view === id ? "bg-white text-[var(--ink)]" : "text-[var(--body)] hover:bg-white/60 hover:text-[var(--ink)]")}>
                <Icon name={icon} className="h-3.5 w-3.5" />{label}
              </button>
            ))}
          </div>

          <p className="mt-6 px-5 text-[11px] font-medium tracking-[0.1em] text-[var(--faint)] uppercase">
            Spaces
          </p>
          <div className="mt-2 flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
            {CONSOLE_SPACES.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.id === spaceId ? "page" : undefined}
                onClick={() => selectSpace(item.id)}
                className={cn(
                  "flex w-full flex-col items-start rounded-[4px] px-3 py-2.5 text-left transition-colors duration-150",
                  item.id === spaceId
                    ? "bg-white text-[var(--ink)] shadow-[0_1px_0_rgba(15,14,13,0.04)]"
                    : "text-[var(--body)] hover:bg-[var(--paper)]/80 hover:text-[var(--ink)]",
                )}
              >
                <span className="text-[13.5px] font-medium">{item.title}</span>
                <span className="mt-0.5 text-[11.5px] text-[var(--faint)]">
                  {item.detail}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-[var(--paper-line)] px-5 py-4">
            <p className="truncate text-[12px] font-medium">{workspace.companyName}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--faint)]">
              Permissions travel with the source
            </p>
            <button
              type="button"
              disabled={signingOut}
              onClick={() => startSignOut(() => signOut())}
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-[var(--body)] hover:text-[var(--ink)] disabled:opacity-50"
            >
              {signingOut ? "Signing out…" : "Sign out"}
              <Icon name="arrowRight" className="h-3 w-3" />
            </button>
          </div>
        </aside>

        {navOpen && (
          <button
            type="button"
            className="fixed inset-0 z-10 bg-[var(--ink)]/20 lg:hidden"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          />
        )}

        {/* Space desk */}
        <main className="flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex items-center justify-between gap-3 border-b border-[var(--paper-line)] px-4 py-3.5 md:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="ni-menu-toggle grid h-9 w-9 shrink-0 place-items-center rounded-[4px] border border-[var(--paper-line)] hover:bg-[var(--paper)]"
                onClick={() => {
                  if (window.matchMedia("(min-width: 1024px)").matches) setDesktopNavOpen((open) => !open);
                  else setNavOpen(true);
                }}
                aria-label="Toggle navigation menu"
              >
                <Icon name="list" className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-[17px] font-medium tracking-tight">
                  {viewTitle}
                </h1>
                <p className="text-[12px] text-[var(--body)]">{space.detail}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center rounded-[4px] border border-[var(--paper-line)] p-0.5 text-[12px] sm:flex">
                {(
                  [
                    ["overview", "Overview"],
                    ["data", "Data"],
                    ["customers", "Customers"],
                    ["agents", "Agents"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    className={cn(
                      "rounded-[3px] px-2.5 py-1.5 transition-colors duration-150",
                      view === id
                        ? "bg-[var(--blue-wash)] text-[var(--blue)]"
                        : "text-[var(--body)] hover:text-[var(--ink)]",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openAsk()}
                className="press rounded-[4px] bg-[var(--ink)] px-3 py-1.5 text-[13px] font-medium text-[var(--paper)] xl:hidden"
              >
                Ask
              </button>
            </div>
          </header>

          <div className="flex gap-1 border-b border-[var(--paper-line)] px-4 py-2 sm:hidden">
            {(
              [
                ["overview", "Overview"],
                ["data", "Data"],
                ["customers", "Customers"],
                ["agents", "Agents"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={cn(
                  "rounded-[4px] px-2.5 py-1.5 text-[12px]",
                  view === id
                    ? "bg-[var(--blue-wash)] text-[var(--blue)]"
                    : "text-[var(--body)]",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-7 md:py-8">
            {view === "overview" && (
              <div className="mx-auto max-w-[820px]">
                <section className="ni-setup-panel" aria-labelledby="setup-title">
                  <div className="ni-setup-heading">
                    <div>
                      <h2 id="setup-title">Set up {workspace.companyName}</h2>
                      <p>Account and workspace details are saved in this preview. The steps below need live services before they can run.</p>
                    </div>
                    <span className="ni-preview-badge">Preview</span>
                  </div>
                  <ol className="ni-setup-list">
                    <li><span className="ni-setup-index is-done"><Icon name="check" /></span><div><strong>Account</strong><p>Preview sign-in complete</p></div><span className="ni-setup-state is-done">Done</span></li>
                    <li><span className="ni-setup-index is-done"><Icon name="check" /></span><div><strong>Workspace</strong><p>{workspace.companyName} · {workspaceDomain}</p></div><span className="ni-setup-state is-done">Done</span></li>
                    <li><span className="ni-setup-index">3</span><div><strong>Cloudflare deployment</strong><p>Not connected to a customer account</p></div><span className="ni-setup-state">Not connected</span></li>
                    <li><span className="ni-setup-index">4</span><div><strong>Slack and knowledge sources</strong><p>Connect after the deployment is ready</p></div><span className="ni-setup-state">Waiting</span></li>
                  </ol>
                  <button type="button" className="ni-setup-action" onClick={() => setView("data")}>Explore connection preview <Icon name="arrowRight" /></button>
                </section>

                <div className="mt-9 flex flex-wrap items-end justify-between gap-3">
                  <div><h2 className="ni-console-greeting !mb-1">Explore Company Brain</h2><p className="text-[14px] text-[var(--body)]">Sample content below shows how the workspace will feel once sources are connected.</p></div>
                  <span className="ni-preview-badge">Illustrative content</span>
                </div>

                <button type="button" className="ni-console-prompt" onClick={() => openAsk()}><span>What would you like to understand?</span><Icon name="arrowRight"/></button>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Stat
                    label="Sources"
                    value={String(sources.length)}
                    detail={`${openCount} open to you`}
                  />
                  <Stat
                    label="Restricted"
                    value={String(restricted.length)}
                    detail="Omitted from answers"
                  />
                  <Stat
                    label="Agents"
                    value={String(agents.length)}
                    detail="With approval gates"
                  />
                </div>

                <section className="mt-10">
                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="text-[13px] font-medium">Sources in this space</h2>
                    <button
                      type="button"
                      onClick={() => setView("data")}
                      className="text-[12px] text-[var(--body)] hover:text-[var(--ink)]"
                    >
                      View all
                    </button>
                  </div>
                  <SourceTable
                    items={sources.slice(0, 4)}
                    activeSource={activeSource}
                    onSelect={useSource}
                  />
                </section>

                <section className="mt-10">
                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="text-[13px] font-medium">Agents</h2>
                    <button
                      type="button"
                      onClick={() => setView("agents")}
                      className="text-[12px] text-[var(--body)] hover:text-[var(--ink)]"
                    >
                      View all
                    </button>
                  </div>
                  <AgentList items={agents} />
                </section>
              </div>
            )}

            {view === "data" && (
              <div className="mx-auto max-w-[920px]">
                <div className="mb-7"><h2 className="text-[26px] font-medium tracking-tight">Connection preview</h2><p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-[var(--body)]">These controls simulate the connected state locally. They do not authorize or sync any company account yet.</p></div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {["Google Drive", "Slack", "Notion", "HubSpot"].map((system) => {
                    const connected = connectedSystems.includes(system);
                    return <button key={system} type="button" onClick={() => toggleSystem(system)} aria-pressed={connected} className="rounded-[6px] border border-[var(--paper-line)] bg-white p-4 text-left transition hover:border-[var(--line-strong)]"><span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[var(--blue-wash)] text-[var(--blue)]"><Icon name="plug" /></span><strong className="mt-5 block text-[14px] font-medium">{system}</strong><span className={`mt-1 block text-[13px] ${connected ? "text-[var(--success)]" : "text-[var(--body)]"}`}>{connected ? "Simulated connected" : "Preview connection"}</span></button>;
                  })}
                </div>

                {workspace.companyType && <section className="mt-8 rounded-[6px] border border-[var(--paper-line)] bg-[#fafaf8] p-4"><div className="mb-4 flex items-center justify-between"><h2 className="text-[13px] font-medium">Company profile</h2><span className="text-[11px] text-[var(--success)]">Onboarding complete</span></div><dl className="grid gap-4 text-[12px] sm:grid-cols-3"><div><dt className="text-[var(--faint)]">Structure</dt><dd className="mt-1 text-[var(--ink)]">{workspace.companyType}</dd></div><div><dt className="text-[var(--faint)]">Team</dt><dd className="mt-1 text-[var(--ink)]">{workspace.employees} employees</dd></div><div><dt className="text-[var(--faint)]">Region</dt><dd className="mt-1 text-[var(--ink)]">{workspace.country}</dd></div><div><dt className="text-[var(--faint)]">Admin role</dt><dd className="mt-1 text-[var(--ink)]">{workspace.role}</dd></div><div className="sm:col-span-2"><dt className="text-[var(--faint)]">First use case</dt><dd className="mt-1 text-[var(--ink)]">{workspace.primaryGoal}</dd></div></dl></section>}
                <div className="mb-4 mt-10 flex items-baseline justify-between gap-4">
                  <h2 className="text-[15px] font-medium">Indexed sources</h2>
                  <p className="text-[12px] text-[var(--faint)]">{visibleSources.length} in this space</p>
                </div>
                <SourceTable
                  items={visibleSources}
                  activeSource={activeSource}
                  onSelect={useSource}
                  empty
                />
              </div>
            )}

            {view === "customers" && (
              <div className="mx-auto max-w-[920px]">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-[12px] font-medium text-[var(--blue)]">Customer intelligence</p><h2 className="mt-1 text-[26px] font-medium tracking-tight">Customers</h2><p className="mt-2 text-[13px] text-[var(--body)]">Organize account context, conversations, and delivery knowledge.</p></div><button type="button" onClick={() => setAddingCustomer(true)} className="press rounded-[4px] bg-[var(--ink)] px-4 py-2.5 text-[13px] font-medium text-white">Add customer</button></div>
                {addingCustomer && <form onSubmit={addCustomer} className="mt-7 grid gap-3 rounded-[6px] border border-[var(--paper-line)] bg-[#fafaf8] p-4 sm:grid-cols-[1fr_1fr_1fr_auto]"><input required name="customerName" aria-label="Customer name" placeholder="Customer name" className="auth-field" /><input required name="customerDomain" aria-label="Customer domain" placeholder="company.com" className="auth-field" /><input required name="customerOwner" aria-label="Account owner" placeholder="Account owner" className="auth-field" /><div className="flex gap-2"><button type="submit" className="rounded-[4px] bg-[var(--ink)] px-4 text-[12px] font-medium text-white">Save</button><button type="button" onClick={() => setAddingCustomer(false)} className="px-2 text-[12px] text-[var(--body)]">Cancel</button></div></form>}
                <div className="mt-7 overflow-hidden rounded-[6px] border border-[var(--paper-line)]">
                  <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-[var(--paper-line)] bg-[#fafaf8] px-4 py-3 text-[11px] font-medium uppercase tracking-[.08em] text-[var(--faint)]"><span>Customer</span><span>Domain</span><span>Owner</span></div>
                  {customers.length === 0 ? <div className="grid place-items-center px-6 py-16 text-center"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--blue-wash)] text-[var(--blue)]"><Icon name="users" /></span><p className="mt-4 text-[14px] font-medium">No customers added yet</p><p className="mt-1 max-w-[38ch] text-[12.5px] text-[var(--body)]">Add your first account to create a shared customer knowledge space.</p></div> : customers.map((customer) => <div key={`${customer.name}-${customer.domain}`} className="grid grid-cols-[1fr_1fr_1fr] border-b border-[var(--paper-line)] px-4 py-3 text-[13px] last:border-0"><strong className="font-medium">{customer.name}</strong><span className="text-[var(--body)]">{customer.domain}</span><span className="text-[var(--body)]">{customer.owner}</span></div>)}
                </div>
              </div>
            )}

            {view === "agents" && (
              <div className="mx-auto max-w-[820px]">
                <h2 className="text-[15px] font-medium">Agents</h2>
                <p className="mt-2 max-w-[48ch] text-[13px] text-[var(--body)]">
                  Each agent runs against the same governed index and stops at
                  the checkpoint you define.
                </p>
                <div className="mt-6">
                  <AgentList items={visibleAgents} empty />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Ask Company Brain */}
        <aside
          className={cn(
            "flex w-[400px] shrink-0 flex-col border-l border-[var(--paper-line)] bg-[#fcfcfb]",
            "max-xl:fixed max-xl:inset-y-0 max-xl:right-0 max-xl:z-30 max-xl:w-[min(100%,420px)]",
            askOpen ? "max-xl:flex" : "max-xl:hidden",
            "xl:flex",
          )}
        >
          <div className="flex items-center justify-between border-b border-[var(--paper-line)] px-5 py-4">
            <div>
              <p className="text-[14px] font-medium">Ask Company Brain</p>
              <p className="mt-0.5 text-[12px] text-[var(--body)]">
                Answers cite sources you can open
              </p>
            </div>
            <div className="flex items-center gap-3">
              {thread.length > 0 && (
                <button
                  type="button"
                  onClick={startNewQuestion}
                  className="text-[12px] text-[var(--body)] hover:text-[var(--ink)]"
                >
                  New
                </button>
              )}
              <button
                type="button"
                className="xl:hidden"
                onClick={() => setAskOpen(false)}
                aria-label="Close ask"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {thread.length === 0 && (
              <div>
                <p className="text-[13px] leading-relaxed text-[var(--body)]">
                  Suggested questions for {space.title.toLowerCase()}.
                </p>
                <ul className="mt-4 space-y-2">
                  {prompts.map((item) => (
                    <li key={item.prompt}>
                      <button
                        type="button"
                        onClick={() => ask(item.prompt)}
                        className="w-full rounded-[4px] border border-[var(--paper-line)] bg-white px-3.5 py-3 text-left text-[13px] leading-snug transition-colors duration-150 hover:border-[var(--blue)]/25 hover:bg-[var(--blue-wash)]"
                      >
                        {item.prompt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {thread.map((turn, index) => (
              <article
                key={`${turn.role}-${index}`}
                className={cn(
                  "rounded-[4px] px-3.5 py-3 text-[13px] leading-relaxed",
                  turn.role === "user"
                    ? "bg-[var(--paper)]"
                    : "border border-[var(--paper-line)] bg-white",
                )}
              >
                {turn.role === "assistant" && (
                  <p className="mb-2 text-[11px] font-medium tracking-[0.06em] text-[var(--faint)] uppercase">
                    Company Brain
                  </p>
                )}
                <p aria-live="polite">{turn.text}</p>
                {turn.citations && turn.citations.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {turn.citations.map((citation, citationIndex) => (
                      <li
                        key={citation}
                        className="rounded-[4px] bg-[var(--blue-wash)] px-2 py-1 text-[11px] text-[var(--blue)]"
                      >
                        {citationIndex + 1} · {citation}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            {pending && (
              <p className="text-[12px] text-[var(--body)]">Reading sources…</p>
            )}

            {thread.length > 0 && !pending && followUps.length > 0 && (
              <ul className="space-y-2">
                {followUps.map((item) => (
                  <li key={item.prompt}>
                    <button
                      type="button"
                      onClick={() => ask(item.prompt)}
                      className="w-full rounded-[4px] border border-[var(--paper-line)] bg-white px-3 py-2 text-left text-[12px] leading-snug text-[var(--body)] transition-colors duration-150 hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                    >
                      {item.prompt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div ref={threadEndRef} />
          </div>

          <form
            className="border-t border-[var(--paper-line)] bg-white p-4"
            onSubmit={(event) => {
              event.preventDefault();
              ask(draft);
            }}
          >
            <label htmlFor="console-ask" className="sr-only">
              Ask Company Brain
            </label>
            <div className="flex items-end gap-2 rounded-[4px] border border-[var(--paper-line)] bg-[var(--paper)] px-2.5 py-2">
              <textarea
                id="console-ask"
                ref={askRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    ask(draft);
                  }
                }}
                rows={2}
                placeholder="Ask across this space"
                className="min-h-[48px] flex-1 resize-none bg-transparent text-[13px] outline-none placeholder:text-[var(--faint)]"
              />
              <button
                type="submit"
                disabled={pending || !draft.trim()}
                className="press grid h-8 w-8 shrink-0 place-items-center rounded-[4px] bg-[var(--ink)] text-[var(--paper)] disabled:opacity-40"
                aria-label="Send"
              >
                <Icon name="arrowUp" className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-[var(--faint)]">
              Enter to send. Shift+Enter for a new line.
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[4px] border border-[var(--paper-line)] bg-[var(--paper)] px-4 py-3.5">
      <p className="text-[11px] font-medium tracking-[0.06em] text-[var(--faint)] uppercase">
        {label}
      </p>
      <p className="mt-2 tabular text-[22px] font-medium tracking-tight">
        {value}
      </p>
      <p className="mt-1 text-[12px] text-[var(--body)]">{detail}</p>
    </div>
  );
}

function SourceTable({
  items,
  activeSource,
  onSelect,
  empty,
}: {
  items: {
    title: string;
    system: string;
    logo: string;
    updated: string;
    access: "Open" | "Restricted";
  }[];
  activeSource: string | null;
  onSelect: (title: string, access: "Open" | "Restricted") => void;
  empty?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-[4px] border border-[var(--paper-line)]">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--paper-line)] bg-[var(--paper)] text-[11px] tracking-[0.06em] text-[var(--faint)] uppercase">
            <th className="px-4 py-2.5 font-medium">Name</th>
            <th className="px-4 py-2.5 font-medium">System</th>
            <th className="px-4 py-2.5 font-medium">Updated</th>
            <th className="px-4 py-2.5 font-medium">Access</th>
          </tr>
        </thead>
        <tbody>
          {empty && items.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-[13px] text-[var(--body)]">
                No sources match. Try a connector name or a document title.
              </td>
            </tr>
          )}
          {items.map((item) => (
            <tr
              key={item.title}
              className={cn(
                "border-t border-[var(--paper-line)] transition-colors duration-150",
                activeSource === item.title
                  ? "bg-[var(--blue-wash)]"
                  : "hover:bg-[var(--paper)]",
              )}
            >
              <td className="px-4 py-3">
                <button type="button" onClick={() => onSelect(item.title, item.access)} className="flex items-center gap-2.5 text-left hover:underline">
                  <Image
                    src={item.logo}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                  />
                  <span className="text-[14px]">{item.title}</span>
                </button>
              </td>
              <td className="px-4 py-3 text-[13px] text-[var(--body)]">
                {item.system}
              </td>
              <td className="px-4 py-3 text-[12px] text-[var(--faint)]">
                {item.updated}
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-[12px]",
                    item.access === "Open"
                      ? "text-[var(--success)]"
                      : "text-[var(--caution)]",
                  )}
                >
                  <Icon
                    name={item.access === "Open" ? "check" : "lock"}
                    className="h-3 w-3"
                  />
                  {item.access}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AgentList({
  items,
  empty,
}: {
  items: { title: string; remit: string; gate: string }[];
  empty?: boolean;
}) {
  if (empty && items.length === 0) {
    return (
      <p className="border-y border-[var(--paper-line)] py-5 text-[13px] text-[var(--body)]">
        No agents match this search.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[var(--paper-line)] border-y border-[var(--paper-line)]">
      {items.map((item) => (
        <li key={item.title} className="py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[14px] font-medium">{item.title}</p>
            <p className="text-[12px] text-[var(--success)]">{item.gate}</p>
          </div>
          <p className="mt-1.5 max-w-[52ch] text-[13px] leading-relaxed text-[var(--body)]">
            {item.remit}
          </p>
        </li>
      ))}
    </ul>
  );
}
