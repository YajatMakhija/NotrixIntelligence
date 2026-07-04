export const SITE = {
  name: "Notrix Intelligence",
  tagline: "AI ecosystem for the enterprise",
  email: "hello@notrix.ai",
};

export const NAV_LINKS = [
  { href: "/platform", label: "Products" },
  { href: "/use-cases", label: "Solutions" },
  { href: "/about", label: "About Us" },
  { href: "/case-studies", label: "Case Studies" },
];

export const PILLARS = [
  {
    title: "Experts inside your team",
    description:
      "Notrix engineers work embedded with your teams — designing, deploying, and improving AI systems tied to the outcomes you define, not generic demos.",
  },
  {
    title: "Connected across your stack",
    description:
      "One governed knowledge layer across documents, CRM, tickets, and databases. Agents act inside the tools where your work already happens.",
  },
  {
    title: "Your data stays yours",
    description:
      "Permission-aware access, full audit trails, and no training on your data. What you build with Notrix compounds for you — not for anyone else.",
  },
];

export const FEATURES = [
  {
    title: "Permission-aware indexing",
    description:
      "Every document, ticket, and message indexed with role-based access. Agents only see what they're allowed to.",
  },
  {
    title: "Multi-source ingestion",
    description:
      "Connect docs, CRM, ERP, Slack, email, and databases. One unified knowledge layer from every system you run.",
  },
  {
    title: "No vendor lock-in",
    description:
      "Model-agnostic architecture. Swap LLMs, keep your data and workflows. Your ecosystem, your rules.",
  },
];

export const LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Ingest",
    description: "Connect data sources across your enterprise stack.",
  },
  {
    step: "02",
    title: "Index",
    description: "Build a permission-aware knowledge layer with semantic search.",
  },
  {
    step: "03",
    title: "Build",
    description: "Create agents, search experiences, and workflow automations.",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Ship to production with guardrails, testing, and audit trails.",
  },
  {
    step: "05",
    title: "Improve",
    description: "Continuously refine from usage data and performance insights.",
  },
];

export const PLATFORM_MODULES = [
  {
    id: "knowledge-layer",
    eyebrow: "Knowledge Layer",
    title: "Turn company data into intelligence",
    description:
      "Notrix ingests documents, tickets, CRM records, and conversations — then builds a unified, permission-aware knowledge graph your entire organization can query and act on.",
    exploreLabel: "Explore Knowledge Layer",
    theme: "light" as const,
    steps: [
      { title: "Connect", description: "Plug into 50+ enterprise data sources." },
      { title: "Chunk", description: "Intelligent segmentation with context preservation." },
      { title: "Enrich", description: "Entity extraction, tagging, and relationship mapping." },
      { title: "Govern", description: "RBAC, audit logs, and data residency controls." },
      { title: "Query", description: "Hybrid semantic + keyword retrieval with citations." },
    ],
  },
  {
    id: "agent-runtime",
    eyebrow: "Agent Runtime",
    title: "Agents that execute, not just answer",
    description:
      "Build autonomous agents grounded in your knowledge layer. Define policies in plain language, connect tools, and deploy agents that handle complex multi-step workflows.",
    exploreLabel: "Explore Agent Runtime",
    theme: "light" as const,
    steps: [
      { title: "Create the agent", description: "Ground agents in brand standards and compliance rules." },
      { title: "Define policies", description: "Set guardrails for automation, escalation, and sensitive cases." },
      { title: "Design the logic", description: "Map flows and connect tools across your enterprise stack." },
      { title: "Test and launch", description: "Simulate edge cases and validate before production." },
      { title: "Monitor and improve", description: "Track outcomes and refine policies from live data." },
    ],
  },
  {
    id: "enterprise-search",
    eyebrow: "Enterprise Search",
    title: "Find anything. Instantly.",
    description:
      "Semantic search across every document, ticket, wiki, and conversation. Every answer cited, every result permission-filtered.",
    exploreLabel: "Explore Enterprise Search",
    theme: "light" as const,
    steps: [
      { title: "Ask naturally", description: "Natural language queries across all connected sources." },
      { title: "Get cited answers", description: "Every response linked to source documents." },
      { title: "Filter by context", description: "Department, date, project, and access-level filters." },
    ],
  },
  {
    id: "workflow-engine",
    eyebrow: "Workflow Engine",
    title: "Automate what takes armies of people",
    description:
      "Multi-step agentic pipelines that trigger on events, branch on conditions, and execute across systems — with full audit trails.",
    exploreLabel: "Explore Workflow Engine",
    theme: "light" as const,
    steps: [
      { title: "Define triggers", description: "Events, schedules, or agent-initiated starts." },
      { title: "Branch logic", description: "Conditional paths with human-in-the-loop checkpoints." },
      { title: "Execute actions", description: "API calls, agent tasks, notifications, and approvals." },
    ],
  },
];

export const INTEGRATIONS = [
  "Salesforce",
  "SAP",
  "ServiceNow",
  "Slack",
  "SharePoint",
  "Workday",
  "Zendesk",
  "Snowflake",
];

export const USE_CASES = [
  {
    title: "Operations automation",
    metric: "85%",
    metricLabel: "of workflow steps targeted for automation",
    problem:
      "Manual handoffs between systems slow operations and introduce errors across refunds, onboarding, and approvals.",
    solution:
      "Notrix agents execute multi-system workflows end-to-end — logging into tools, updating records, and routing exceptions with full audit trails.",
  },
  {
    title: "Internal knowledge search",
    metric: "<1s",
    metricLabel: "target answer latency across all sources",
    problem:
      "Critical knowledge is scattered across wikis, Slack threads, tickets, and shared drives. Teams waste hours searching.",
    solution:
      "One semantic search layer across every source. Permission-aware, cited answers in sub-second response times.",
  },
  {
    title: "Customer support intelligence",
    metric: "90%",
    metricLabel: "target resolution rate without escalation",
    problem:
      "Support teams drown in volume. Agents lack context from past interactions and internal knowledge bases.",
    solution:
      "Grounded support agents with policy guardrails, tool access, and continuous improvement from conversation data.",
  },
  {
    title: "Sales & revenue ops",
    metric: "3x",
    metricLabel: "designed for faster deal preparation",
    problem:
      "Reps spend hours assembling context from CRM, emails, and internal docs before every call.",
    solution:
      "AI-powered deal intelligence that surfaces relevant history, generates briefs, and updates CRM automatically.",
  },
  {
    title: "Compliance & audit",
    metric: "100%",
    metricLabel: "agent action traceability",
    problem:
      "Regulated industries need every AI action logged, explainable, and reversible.",
    solution:
      "Full audit trails, policy enforcement, and human-in-the-loop gates for sensitive decisions.",
  },
  {
    title: "Implementation acceleration",
    metric: "Weeks",
    metricLabel: "not months",
    problem:
      "Enterprise AI rollouts take 6–12 months of manual integration, configuration, and tuning.",
    solution:
      "Standardized deployment workflows that compress implementation from quarters to weeks.",
  },
];

export const SECURITY_FEATURES = [
  "SOC 2-ready architecture",
  "Role-based access control",
  "Full audit trails",
  "Data residency options",
  "Model-agnostic deployment",
  "Human-in-the-loop gates",
];
