export const CONSOLE_SPACES = [
  {
    id: "rollout",
    title: "Company rollout",
    detail: "Illustrative space",
  },
  {
    id: "engineering",
    title: "Engineering",
    detail: "Repos, tickets, decisions",
  },
  {
    id: "support",
    title: "Support",
    detail: "Tickets and product notes",
  },
] as const;

export type ConsoleSpaceId = (typeof CONSOLE_SPACES)[number]["id"];

export const CONSOLE_SOURCES: Record<
  ConsoleSpaceId,
  {
    title: string;
    system: string;
    logo: string;
    updated: string;
    access: "Open" | "Restricted";
  }[]
> = {
  rollout: [
    {
      title: "Enterprise rollout plan",
      system: "Google Drive",
      logo: "/logos/google-drive.svg",
      updated: "Today",
      access: "Open",
    },
    {
      title: "#company-brain-pilot",
      system: "Slack",
      logo: "/logos/slack.svg",
      updated: "12 messages",
      access: "Open",
    },
    {
      title: "Launch readiness",
      system: "Notion",
      logo: "/logos/notion.svg",
      updated: "Yesterday",
      access: "Open",
    },
    {
      title: "Access review checklist",
      system: "Google Docs",
      logo: "/logos/google-docs.svg",
      updated: "This week",
      access: "Restricted",
    },
    {
      title: "Pilot kickoff notes",
      system: "Notion",
      logo: "/logos/notion.svg",
      updated: "This week",
      access: "Open",
    },
  ],
  engineering: [
    {
      title: "service-gateway / README",
      system: "GitHub",
      logo: "/logos/github.svg",
      updated: "Today",
      access: "Open",
    },
    {
      title: "INC-1842 post-incident notes",
      system: "Jira",
      logo: "/logos/jira.svg",
      updated: "Yesterday",
      access: "Open",
    },
    {
      title: "#incidents",
      system: "Slack",
      logo: "/logos/slack.svg",
      updated: "8 messages",
      access: "Open",
    },
    {
      title: "On-call runbook",
      system: "Notion",
      logo: "/logos/notion.svg",
      updated: "This week",
      access: "Restricted",
    },
  ],
  support: [
    {
      title: "Refund policy — current",
      system: "Notion",
      logo: "/logos/notion.svg",
      updated: "Today",
      access: "Open",
    },
    {
      title: "Ticket 4821 — billing hold",
      system: "Zendesk",
      logo: "/logos/zendesk.svg",
      updated: "Open ticket",
      access: "Open",
    },
    {
      title: "Product FAQ",
      system: "Google Drive",
      logo: "/logos/google-drive.svg",
      updated: "This week",
      access: "Open",
    },
    {
      title: "Billing exception notes",
      system: "Google Docs",
      logo: "/logos/google-docs.svg",
      updated: "This week",
      access: "Restricted",
    },
  ],
};

export const CONSOLE_AGENTS: Record<
  ConsoleSpaceId,
  { title: string; remit: string; gate: string }[]
> = {
  rollout: [
    {
      title: "Rollout brief",
      remit: "Assemble the current plan and the last discussion.",
      gate: "Stops before writing to a system of record",
    },
    {
      title: "Access check",
      remit: "List sources the asking user cannot open.",
      gate: "Read-only",
    },
  ],
  engineering: [
    {
      title: "Incident recap",
      remit: "Pull the ticket, the channel, and the last runbook used.",
      gate: "Stops for a person before paging",
    },
  ],
  support: [
    {
      title: "Case pack",
      remit: "Collect policy, the ticket, and the last internal note.",
      gate: "Stops before sending a customer reply",
    },
  ],
};

export const CONSOLE_ASKS: {
  prompt: string;
  spaces: ConsoleSpaceId[];
  answer: string;
  citations: string[];
}[] = [
  {
    prompt: "What changed in the enterprise rollout plan?",
    spaces: ["rollout"],
    answer:
      "The rollout now starts with Finance and Support before expanding company-wide. The change gives the team two permission models to validate and adds a formal review checkpoint after the first 30 days.",
    citations: [
      "Enterprise rollout plan",
      "#company-brain-pilot",
      "Launch readiness",
    ],
  },
  {
    prompt: "Which sources can I not open in this space?",
    spaces: ["rollout", "engineering", "support"],
    answer:
      "In this illustrative run, retrieval is scoped to the asking user's access. Sources the user could not open in Drive, Slack, or Notion are omitted from the answer and recorded in the activity log.",
    citations: ["Access review checklist"],
  },
  {
    prompt: "What did the last incident decide?",
    spaces: ["engineering"],
    answer:
      "The last write-up keeps the runbook that was actually used with the ticket. The channel thread is cited; folklore that never left one person's notes is not treated as a source.",
    citations: ["INC-1842 post-incident notes", "#incidents"],
  },
  {
    prompt: "What is the current refund policy?",
    spaces: ["support"],
    answer:
      "The current policy lives in Notion. The open billing-hold ticket is cited beside it so the answer is not only the document someone meant to update.",
    citations: ["Refund policy — current", "Ticket 4821 — billing hold"],
  },
];
