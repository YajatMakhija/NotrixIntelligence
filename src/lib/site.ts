export const SITE = {
  name: "Notrix",
  legal: "Notrix Intelligence",
  short: "Notrix",
  product: "Company Brain",
  tagline: "The intelligence layer for your company",
  email: "hello@notrix.ai",
  linkedin: "https://www.linkedin.com/company/notrix-intelligence",
};

export const NAV_PRODUCT = [
  { href: "/product/company-brain", label: "Company Brain" },
  { href: "/product/how-it-works", label: "How it works" },
  { href: "/product/integrations", label: "Integrations" },
];

export const NAV_SOLUTIONS = [
  { href: "/solutions/engineering", label: "Engineering" },
  { href: "/solutions/sales", label: "Sales" },
  { href: "/solutions/support", label: "Support" },
  { href: "/solutions/operations", label: "Operations" },
  { href: "/solutions/leadership", label: "Leadership" },
];

export const INTEGRATIONS = [
  { id: "slack", label: "Slack", src: "/logos/slack.svg", category: "Communication" },
  { id: "notion", label: "Notion", src: "/logos/notion.svg", category: "Knowledge" },
  { id: "drive", label: "Google Drive", src: "/logos/google-drive.svg", category: "Knowledge" },
  { id: "github", label: "GitHub", src: "/logos/github.svg", category: "Engineering" },
  { id: "salesforce", label: "Salesforce", src: "/logos/salesforce-icon.svg", category: "CRM" },
  { id: "jira", label: "Jira", src: "/logos/jira.svg", category: "Engineering" },
  { id: "teams", label: "Microsoft Teams", src: "/logos/teams.svg", category: "Communication" },
  { id: "snowflake", label: "Snowflake", src: "/logos/snowflake.svg", category: "Data" },
  { id: "aws", label: "AWS", src: "/logos/aws.svg", category: "Infrastructure" },
  { id: "gcp", label: "Google Cloud", src: "/logos/google-cloud.svg", category: "Infrastructure" },
  { id: "docs", label: "Google Docs", src: "/logos/google-docs.svg", category: "Knowledge" },
  { id: "sharepoint", label: "SharePoint", src: "/logos/sharepoint.svg", category: "Knowledge" },
  { id: "zendesk", label: "Zendesk", src: "/logos/zendesk.svg", category: "Support" },
  { id: "sap", label: "SAP", src: "/logos/sap.svg", category: "Operations" },
];

/** Sparse set for the hero — atmosphere, not the message. */
export const HERO_INTEGRATIONS = INTEGRATIONS.filter((item) =>
  ["slack", "notion", "salesforce", "github", "drive", "teams"].includes(item.id),
);

export const TRUST_INTEGRATIONS = INTEGRATIONS.filter((item) =>
  ["slack", "notion", "drive", "github", "jira", "salesforce", "teams", "snowflake"].includes(item.id),
);

export const INTEGRATION_GROUPS = [
  {
    heading: "Knowledge",
    items: INTEGRATIONS.filter((i) => ["notion", "drive", "docs", "sharepoint"].includes(i.id)),
  },
  {
    heading: "Communication",
    items: INTEGRATIONS.filter((i) => ["slack", "teams"].includes(i.id)),
  },
  {
    heading: "Engineering",
    items: INTEGRATIONS.filter((i) => ["github", "jira"].includes(i.id)),
  },
  {
    heading: "CRM & support",
    items: INTEGRATIONS.filter((i) => ["salesforce", "zendesk"].includes(i.id)),
  },
  {
    heading: "Data",
    items: INTEGRATIONS.filter((i) => ["snowflake"].includes(i.id)),
  },
  {
    heading: "Infrastructure",
    items: INTEGRATIONS.filter((i) => ["aws", "gcp", "sap"].includes(i.id)),
  },
];

export const CUSTOM_CONNECTORS = [
  { title: "REST API", body: "Ingest from internal services and proprietary systems." },
  { title: "Webhooks", body: "Keep the knowledge layer current as events happen." },
  { title: "MCP", body: "Expose Company Brain to tools that speak the Model Context Protocol." },
];

/** Three ways to use the same governed index — Ask, Search, Agents. */
export const PRODUCT_SURFACES = [
  {
    id: "ask",
    title: "Ask",
    href: "/product/company-brain",
    body: "Ask a question in plain language. Company Brain retrieves only what the asking user can see, and cites every source.",
  },
  {
    id: "search",
    title: "Search",
    href: "/product/how-it-works",
    body: "One search across wikis, drives, tickets and threads. Results stay filtered by the source system's permissions.",
  },
  {
    id: "agents",
    title: "Agents",
    href: "/product/company-brain",
    body: "Agents run against the same index, act across connected systems, and stop where a person must approve.",
  },
];

export const CAPABILITIES = [
  {
    index: "01",
    title: "Understand",
    body: "Build an evolving understanding of your organization — its knowledge, people, projects and processes.",
  },
  {
    index: "02",
    title: "Retrieve",
    body: "Find the information that matters across the systems your company already uses.",
  },
  {
    index: "03",
    title: "Reason",
    body: "Connect context across documents, conversations, systems and historical decisions.",
  },
  {
    index: "04",
    title: "Act",
    body: "Turn organizational knowledge into workflows, decisions and governed AI-powered actions.",
  },
];

export const PIPELINE = [
  {
    title: "Connect",
    body: "Connect the systems your organization already uses.",
  },
  {
    title: "Ingest",
    body: "Continuously bring relevant information into the intelligence layer.",
  },
  {
    title: "Understand",
    body: "Extract entities, facts, relationships and organizational context.",
  },
  {
    title: "Retrieve",
    body: "Find the information relevant to a specific question or task.",
  },
  {
    title: "Reason",
    body: "Combine context across multiple sources to answer complex questions.",
  },
  {
    title: "Act",
    body: "Trigger workflows and agents that turn knowledge into action.",
  },
];

export const USE_CASES = [
  {
    id: "engineering",
    title: "Engineering",
    href: "/solutions/engineering",
    body: "Understand systems, decisions and technical knowledge.",
    intro:
      "Architecture, incidents and the decisions around them live in repositories, tickets and threads — not in a wiki someone meant to update. Company Brain retrieves them together, with the permissions of the person asking.",
    points: [
      {
        title: "Decisions with the discussion",
        body: "Pull the RFC, the PR comments and the Slack thread that settled the trade-off — cited back to source.",
      },
      {
        title: "Incidents without folklore",
        body: "Prior outages, runbooks that were actually used, and the post-incident notes that never left the channel.",
      },
      {
        title: "Code in company context",
        body: "Ask across GitHub and Jira without asking engineers to maintain a second documentation stack.",
      },
    ],
  },
  {
    id: "sales",
    title: "Sales",
    href: "/solutions/sales",
    body: "Surface customer and deal context.",
    intro:
      "The useful context for a deal is rarely only in the CRM. Company Brain brings the opportunity, the threads around it, and the internal notes that usually live with one person.",
    points: [
      {
        title: "Before the call",
        body: "Account history, open issues and the last internal discussion — permission-filtered to the asking user.",
      },
      {
        title: "Deal context, not a second CRM",
        body: "Salesforce remains the system of record. Company Brain reads it and the conversations that never got logged.",
      },
      {
        title: "Handoffs that keep their history",
        body: "When a deal moves teams, the context moves with the record instead of sitting in someone's archive.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    href: "/solutions/support",
    body: "Find answers across product and internal knowledge.",
    intro:
      "The answer to a ticket is often in product docs, a prior case, and an engineering thread. Company Brain retrieves all three for the person on the queue — and will not surface another customer's case.",
    points: [
      {
        title: "Prior cases with product truth",
        body: "Search tickets, docs and internal notes in one question, cited so an agent can verify before they reply.",
      },
      {
        title: "Permissions stay with the source",
        body: "If an agent could not open it in Zendesk or the wiki, they will not see it here.",
      },
      {
        title: "Escalations with a trail",
        body: "When a case needs engineering, the retrieval and the actions taken are recorded.",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    href: "/solutions/operations",
    body: "Understand processes and workflows.",
    intro:
      "Process lives in policy docs, tickets and the way people actually work. Company Brain answers from that mix so operations is not guessing from last quarter's slide.",
    points: [
      {
        title: "Process as it is run",
        body: "Policies, SOPs and the exceptions captured in threads — retrieved together.",
      },
      {
        title: "Cross-team dependencies",
        body: "Who owns a step, which system it writes to, and what broke last time it ran.",
      },
      {
        title: "Workflows with checkpoints",
        body: "Agents can run a process you define and stop where a person must approve.",
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    href: "/solutions/leadership",
    body: "Ask questions across the organization.",
    intro:
      "Leadership questions cut across functions. Company Brain answers from company context with citations — not from a dashboard of figures we do not have.",
    points: [
      {
        title: "One question, several systems",
        body: "Ask across docs, CRM, tickets and engineering sources without waiting on a pack.",
      },
      {
        title: "Cited, not summarised into air",
        body: "Every answer points back to the document, record or thread it used.",
      },
      {
        title: "Inside the boundary",
        body: "The same permission and residency controls that apply to every other team.",
      },
    ],
  },
];

export const FLOW = [
  {
    title: "Sources",
    body: "Documents, conversations, records and tickets in the systems you already run.",
  },
  {
    title: "Company Brain",
    body: "One index with source permissions carried through. Retrieval, reasoning, governed action.",
  },
  {
    title: "Answer / agent",
    body: "A cited answer in the workflow, or an agent that stops at the checkpoints you set.",
  },
];

export const PRICING_NEEDS = [
  {
    title: "SSO",
    body: "The identity provider you will use in production, and who owns access reviews.",
  },
  {
    title: "Sources",
    body: "The systems a first workflow has to read — and which of them are systems of record.",
  },
  {
    title: "Success metric",
    body: "One number you will judge the pilot by, agreed before we connect anything.",
  },
];

export const PLATFORM = [
  {
    title: "Knowledge",
    body: "Your organization's information layer — documents, conversations, records and people.",
  },
  {
    title: "Retrieval",
    body: "Fast, permission-aware access to the context that is relevant to the asking user.",
  },
  {
    title: "Reasoning",
    body: "Connect information across sources and relationships, not just nearest-neighbor chunks.",
  },
  {
    title: "Agents",
    body: "Use company context to perform tasks and workflows, with checkpoints you define.",
  },
  {
    title: "Permissions",
    body: "Respect organizational access controls. If a user could not open it in the source, they will not see it here.",
  },
  {
    title: "Integrations",
    body: "Connect the systems your teams already run — without asking them to change how they work.",
  },
];

export const SECURITY_CONTROLS = [
  {
    title: "Data protection",
    body: "Encryption in transit and at rest. Inputs are never used to train models.",
  },
  {
    title: "Access control",
    body: "SSO, role-based access, and permission inheritance from the source system.",
  },
  {
    title: "Auditability",
    body: "Every retrieval and agent run is recorded — sources read, actions taken, approvals given.",
  },
  {
    title: "Data lifecycle",
    body: "Configurable retention, deletion, and regional processing where residency requires it.",
  },
  {
    title: "AI governance",
    body: "Model routing with zero-retention terms, human oversight on sensitive actions, and documented decision trails.",
  },
  {
    title: "Deployment",
    body: "Managed environment or yours. Keep Company Brain inside the boundary your security team requires.",
  },
];

export const DEPLOYMENT = [
  {
    title: "Cloud",
    body: "Secure managed infrastructure, operated by Notrix.",
  },
  {
    title: "Private cloud",
    body: "Dedicated deployment environments for tighter isolation.",
  },
  {
    title: "VPC",
    body: "Run Company Brain inside infrastructure you already control.",
  },
  {
    title: "Enterprise",
    body: "Tailored residency, model allow-lists and governance requirements.",
  },
];

export const PILLARS = [
  {
    index: "01",
    title: "One knowledge layer",
    body: "Company Brain indexes documents, tickets, records and conversations from every system you run — permissions carried through intact.",
  },
  {
    index: "02",
    title: "Agents that finish work",
    body: "Agents read from the knowledge layer, act across your systems, and stop at the checkpoints you define. Every step is recorded.",
  },
  {
    index: "03",
    title: "Inside your boundary",
    body: "Your data is never used to train models. Deploy in our environment or your own cloud, with residency and retention set to your requirements.",
  },
];

export const BRAIN_CAPABILITIES = [
  {
    id: "knowledge",
    label: "Knowledge layer",
    title: "Everything your company knows, in one index",
    body: "Connect the systems your teams already run. Company Brain segments, enriches and indexes their contents with source permissions preserved, then answers with citations back to the original document.",
    points: [
      "Connectors for document stores, CRM, ticketing and warehouses",
      "Permission inheritance at ingestion, not as a filter afterwards",
      "Hybrid semantic and keyword retrieval",
      "Citations to the source on every answer",
    ],
  },
  {
    id: "agents",
    label: "Agent runtime",
    title: "Work that completes without a person driving it",
    body: "Define an agent's remit in plain language, connect the tools it may use, and set the points where a human must approve. Agents run against the same governed index your teams search.",
    points: [
      "Policies and guardrails written in plain language",
      "Tool access scoped per agent",
      "Human approval gates on sensitive actions",
      "Simulation against real cases before production",
    ],
  },
  {
    id: "search",
    label: "Enterprise search",
    title: "One question, every system",
    body: "A single search across wikis, drives, tickets and threads. Results are filtered by the asking user's permissions and cited back to source.",
    points: [
      "Natural language across all connected sources",
      "Permission-filtered per user",
      "Filters by department, project, recency",
      "Retrieval designed for enterprise scale",
    ],
  },
  {
    id: "workflows",
    label: "Workflows",
    title: "Multi-system processes, end to end",
    body: "Chain agents and actions into processes that trigger on events, branch on conditions and write back to the systems of record — with an audit trail on every run.",
    points: [
      "Event, schedule or agent-initiated triggers",
      "Conditional branching with review checkpoints",
      "Writes back to CRM, ERP and ticketing",
      "Complete, exportable run history",
    ],
  },
];

export const PRICING = [
  {
    name: "Pilot",
    price: "Fixed fee",
    tagline: "One workflow, one department, one number to judge it by.",
    features: [
      "Six to eight weeks",
      "One source group connected",
      "One agent or search experience in production",
      "Success metric agreed before we start",
    ],
    cta: "Scope a pilot",
  },
  {
    name: "Enterprise",
    price: "Annual",
    tagline: "Company Brain across the company, rolled out department by department.",
    features: [
      "Unlimited connected sources",
      "Agents, search and workflows",
      "SSO, role-based access, audit export",
      "Named engineering team embedded with yours",
      "Quarterly outcome review",
    ],
    featured: true,
    cta: "Talk to us",
  },
  {
    name: "Regulated",
    price: "Custom",
    tagline: "For data that cannot leave infrastructure you control.",
    features: [
      "Deployment in your own cloud account",
      "Regional residency guarantees",
      "Models restricted to your approved list",
      "Security review and questionnaire support",
    ],
    cta: "Discuss requirements",
  },
];

export const SECURITY_PRINCIPLES = [
  {
    title: "Permissions are inherited, not applied",
    body: "Access rights are captured at ingestion and travel with the content. If a user cannot open a file in the source system, Company Brain will not surface it to them.",
  },
  {
    title: "Your data does not train models",
    body: "Inputs, outputs and uploaded documents are never used for training. We require zero-retention terms from every model provider we route to.",
  },
  {
    title: "Every action is recorded",
    body: "Each agent run is logged end to end — sources read, decisions taken, systems written to, approvals given. Exportable, and reversible where it matters.",
  },
  {
    title: "You choose where it runs",
    body: "Our environment or yours. Regional processing for residency requirements, and full deployment into your own cloud where that is the only acceptable answer.",
  },
];

/**
 * Status is explicit and deliberately conservative — Notrix is pre-certification.
 * Update each entry only when the corresponding report or certificate is issued.
 */
export const SECURITY_STANDARDS = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    status: "In progress",
    body: "Controls built against the Trust Services Criteria. Audit underway; documentation and questionnaire responses available under NDA.",
  },
  {
    id: "gdpr",
    name: "GDPR",
    status: "Compliant",
    body: "Data processing agreements, disclosed sub-processors, full data subject rights, and EU-region processing where required. A regulation, not a certification.",
  },
  {
    id: "eu-ai-act",
    name: "EU AI Act",
    status: "Readiness",
    body: "A regulation rather than a certification. We build for its obligations: documentation, traceability, human oversight and disclosure.",
  },
  {
    id: "iso-27001",
    name: "ISO/IEC 27001",
    status: "Aligned",
    body: "Security management practices mapped to Annex A controls. Certification is on the roadmap and will be published here when issued.",
  },
  {
    id: "iso-42001",
    name: "ISO/IEC 42001",
    status: "Aligned",
    body: "AI management system practices covering impact assessment, model lifecycle governance and monitoring of deployed systems.",
  },
  {
    id: "residency",
    name: "Data residency",
    status: "Available",
    body: "Regional processing, configurable retention and deletion, and deployment into infrastructure you own and operate.",
  },
];
