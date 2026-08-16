/**
 * Structure only. Article bodies stay unwritten until the product ships —
 * filling them in later is a data edit here plus a body per slug, not a rework
 * of the layout.
 */

export interface DocsLink {
  slug: string;
  label: string;
}

export interface DocsGroup {
  heading: string;
  links: DocsLink[];
}

export interface DocsSection {
  slug: string;
  label: string;
  title: string;
  description: string;
  groups: DocsGroup[];
}

export const DOCS_SECTIONS: DocsSection[] = [
  {
    slug: "getting-started",
    label: "Get started",
    title: "Get started",
    description: "What Company Brain is, and how to take the first step.",
    groups: [
      {
        heading: "Start here",
        links: [
          { slug: "introduction", label: "Introduction" },
          { slug: "quickstart", label: "Quickstart" },
          { slug: "company-brain", label: "Company Brain" },
        ],
      },
    ],
  },
  {
    slug: "concepts",
    label: "Concepts",
    title: "Concepts",
    description: "How Company Brain understands, retrieves, reasons and acts.",
    groups: [
      {
        heading: "The model",
        links: [
          { slug: "how-it-works", label: "How Company Brain works" },
          { slug: "knowledge", label: "Knowledge" },
          { slug: "retrieval", label: "Retrieval" },
          { slug: "reasoning", label: "Reasoning" },
          { slug: "agents", label: "Agents" },
          { slug: "permissions", label: "Permissions" },
        ],
      },
    ],
  },
  {
    slug: "integrations",
    label: "Integrations",
    title: "Integrations",
    description: "Connecting sources and keeping them in sync.",
    groups: [
      {
        heading: "Connectors",
        links: [
          { slug: "overview", label: "Overview" },
          { slug: "connectors", label: "Connectors" },
          { slug: "syncing", label: "Syncing" },
        ],
      },
    ],
  },
  {
    slug: "security",
    label: "Security",
    title: "Security",
    description: "Data handling, access control, and the controls your security team will ask about.",
    groups: [
      {
        heading: "Controls",
        links: [
          { slug: "overview", label: "Security overview" },
          { slug: "data-handling", label: "Data handling" },
          { slug: "permissions", label: "Permissions" },
        ],
      },
    ],
  },
  {
    slug: "api",
    label: "API",
    title: "API",
    description: "Programmatic access to Company Brain.",
    groups: [
      {
        heading: "Reference",
        links: [
          { slug: "overview", label: "API overview" },
          { slug: "authentication", label: "Authentication" },
          { slug: "reference", label: "Reference" },
        ],
      },
    ],
  },
];

export function getSection(slug: string) {
  return DOCS_SECTIONS.find((section) => section.slug === slug);
}

export function getArticle(sectionSlug: string, articleSlug: string) {
  const section = getSection(sectionSlug);
  if (!section) return undefined;
  for (const group of section.groups) {
    const link = group.links.find((l) => l.slug === articleSlug);
    if (link) return { section, group, link };
  }
  return undefined;
}

export function flattenSection(section: DocsSection): DocsLink[] {
  return section.groups.flatMap((group) => group.links);
}
