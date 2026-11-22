// https://llmstxt.org: a short Markdown map of the site for AI assistants.
import { notrixDocGroups } from '@/data/notrix/docs';
import { NOTRIX_DOCS_URL, markdownResponse, notrixDocMarkdownUrl } from '@/data/notrix/docs-markdown';

export const dynamic = 'force-static';

const SITE = 'https://www.notrix.si';

export function GET() {
  const docs = notrixDocGroups.flatMap((group) => [
    '',
    `## Docs: ${group.title}`,
    '',
    ...group.pages.map((page) => `- [${page.title}](${notrixDocMarkdownUrl(page)}): ${page.intro}`),
  ]);

  return markdownResponse(
    [
      '# Notrix Intelligence',
      '',
      '> Notrix is a company brain: one shared memory for a team and its AI agents, built from the company’s documents and Slack conversations, with a source behind every answer. It installs inside the customer’s own AWS account, so files, the search index, memory and AI calls never leave that account. $200 a month per workspace; AWS usage is billed by AWS directly.',
      '',
      'Notrix connects the sources a team chooses, answers questions in Slack and on the web with citations, says so when it cannot find evidence instead of guessing, and remembers decisions and commitments that people approve. AI agents can use the same memory.',
      '',
      '## Product',
      '',
      `- [Product](${SITE}/product): what Notrix does for a team.`,
      `- [How it works](${SITE}/how-it-works): one question followed from connected sources to a cited answer.`,
      `- [Pricing](${SITE}/pricing): $200 a month per workspace, billed by invoice.`,
      `- [Security](${SITE}/security): deployment model, data storage, identity and permissions.`,
      `- [Full docs as one file](${SITE}/llms-full.txt)`,
      ...docs,
      '',
      '## Contact',
      '',
      `- Email: yajat@notrix.si`,
      `- Docs: ${NOTRIX_DOCS_URL}`,
      '',
    ].join('\n'),
  );
}
