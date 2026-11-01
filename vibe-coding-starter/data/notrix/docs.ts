// Notrix documentation content. Facts come from the existing site copy and the companybrain
// phase-2 workflow guide; anything not built yet is not described here.

export type NotrixDocSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type NotrixDocPage = {
  slug: string;
  title: string;
  intro: string;
  sections: NotrixDocSection[];
};

export type NotrixDocGroup = {
  title: string;
  icon: 'start' | 'concepts' | 'using' | 'security' | 'admin';
  pages: NotrixDocPage[];
};

export const notrixDocGroups: NotrixDocGroup[] = [
  {
    title: 'Getting started',
    icon: 'start',
    pages: [
      {
        slug: 'introduction',
        title: 'Introduction',
        intro:
          'Notrix is a company brain for Slack. Your team asks questions in plain language and gets answers with the sources behind them, from knowledge stored in your own AWS account.',
        sections: [
          {
            title: 'What Notrix does',
            paragraphs: [
              'Company knowledge is spread across documents, threads and tools. Notrix connects the sources you approve, searches them when someone asks a question, and answers only from what it finds.',
              'Every answer cites the passages it used. If Notrix cannot find usable evidence, it says so instead of guessing.',
            ],
          },
          {
            title: 'Why Notrix',
            bullets: [
              'Answers where your team already works, in Slack.',
              'Citations on every answer, so anyone can check the source.',
              'Your knowledge stays in your own AWS account.',
              'Memory that a person approves, corrects and can remove.',
            ],
          },
          {
            title: 'How these docs are organised',
            paragraphs: [
              'Start with setting up your workspace, then read the core concepts to understand how answers, cloud deployment and memory work. The security pages cover permissions, storage and deletion in detail.',
            ],
          },
        ],
      },
      {
        slug: 'setup',
        title: 'Set up your workspace',
        intro:
          'A pilot starts with one team, one set of questions and a success measure agreed up front. Setup takes a few steps, most of them done once by an administrator.',
        sections: [
          {
            title: 'Request access',
            paragraphs: [
              'Request access and we set up a short call. Your workspace is created during pilot onboarding, where the workspace owner confirms the company identity, administrators and approved users.',
            ],
          },
          {
            title: 'Install in your AWS account',
            paragraphs: [
              'After the call we send an invite. Your administrator installs Notrix in your AWS account from the dashboard, using a CloudFormation stack, in the region you choose.',
            ],
          },
          {
            title: 'Connect Slack and choose sources',
            paragraphs: [
              'Connect Slack and select the channels and documents Notrix may read. Notrix confirms which connectors are available for your pilot before setup; planned integrations are not presented as generally available.',
            ],
          },
          {
            title: 'Configure identity and access',
            paragraphs: [
              'Connect approved identities and decide who may use the workspace. Source permissions and deployment policy then decide what each person can see in answers.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Core concepts',
    icon: 'concepts',
    pages: [
      {
        slug: 'how-notrix-answers',
        title: 'How Notrix answers',
        intro:
          'Every question follows the same path: check access, search, check the evidence, then answer with citations.',
        sections: [
          {
            title: 'Search',
            paragraphs: [
              'Notrix runs meaning-based search, exact text search and a lookup of approved memories, then blends the three ranked lists. One weak signal does not decide the answer on its own.',
            ],
          },
          {
            title: 'Check the evidence',
            paragraphs: [
              'If no usable evidence is found, Notrix records that it abstained and does not generate an answer. Before answering it rechecks that each source still exists, is not suspended and is still selected.',
            ],
          },
          {
            title: 'Answer and receipt',
            paragraphs: [
              'The answer is written by Amazon Bedrock from the permitted passages only, with numbered citations. A receipt records which evidence and model produced it, so the answer can be traced later even if a source changes.',
            ],
          },
        ],
      },
      {
        slug: 'bring-your-own-cloud',
        title: 'Bring your own cloud',
        intro:
          'Notrix installs a private knowledge application inside your AWS account. Your documents, search index, memory and AI calls stay there.',
        sections: [
          {
            title: 'What runs in your account',
            bullets: [
              'Encrypted S3 storage, using a KMS key in your account.',
              'A private PostgreSQL database for the search index and memory.',
              'Amazon Bedrock for embeddings and answers.',
              'The application and workers on ECS Fargate, behind API Gateway with a web application firewall.',
              'An SQS job queue with a dead-letter queue, so failed work is retried.',
              'The Slack bot token, in Secrets Manager.',
            ],
          },
          {
            title: 'What Notrix keeps',
            paragraphs: [
              'Notrix keeps only sign-in, your workspace record, setup steps and installation status.',
            ],
          },
          {
            title: 'What Notrix can see',
            bullets: [
              'The status of the one stack you installed, through a read-only role you create and can remove at any time.',
              'Every request into your installation carries a grant signed with AWS KMS that expires after 60 seconds.',
              'Slack events pass briefly through Notrix on their way to your account. They are not stored there.',
            ],
          },
        ],
      },
      {
        slug: 'memory',
        title: 'Memory: learn and forget',
        intro:
          'Notrix keeps memory as a claim with evidence and an owner, not as the source of truth. People decide what it remembers.',
        sections: [
          {
            title: 'Proposed memories',
            paragraphs: [
              'Amazon Bedrock proposes decisions, commitments and observations from your sources. Each proposal must quote the exact text it came from.',
            ],
          },
          {
            title: 'Review and approval',
            paragraphs: [
              'Proposals are not used in answers until an owner approves them. Approval means an accountable person approved that version; it is not a promise that the fact is still current.',
            ],
          },
          {
            title: 'Owner notes',
            paragraphs: [
              'An owner can add a short note, such as a decision made on a call. It is indexed and cited like any other source and can be saved as an owner-stated memory.',
            ],
          },
          {
            title: 'Revisions and history',
            paragraphs: [
              'Editing a memory creates a new revision with a reason. Withdrawing stops it being used. Superseding links the old memory to its replacement. The history stays visible.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Using Notrix',
    icon: 'using',
    pages: [
      {
        slug: 'asking-questions',
        title: 'Asking questions',
        intro:
          'Ask in Slack the way you would ask a colleague. Clear questions get better answers.',
        sections: [
          {
            title: 'Ask in Slack',
            paragraphs: [
              'Use a direct question that names the customer, project, policy or document you need. Notrix searches the approved knowledge and replies in the same conversation.',
            ],
          },
          {
            title: 'Write a good question',
            bullets: [
              'Ask one clear question at a time.',
              'Include the relevant project or customer name.',
              'Open the cited source when the decision needs verification.',
            ],
          },
          {
            title: 'Give feedback',
            paragraphs: [
              'Mark an answer helpful or wrong. During a pilot, examples with missing context help refine source coverage and workspace configuration.',
            ],
          },
        ],
      },
      {
        slug: 'correcting-knowledge',
        title: 'Correcting knowledge',
        intro:
          'When an answer is wrong, fix the cause. Feedback is a signal; it never silently rewrites a source.',
        sections: [
          {
            title: 'Open a correction',
            paragraphs: [
              'Marking an answer wrong opens a correction with the evidence behind it. From there you choose a real fix and mark the correction resolved.',
            ],
          },
          {
            title: 'Replace or withdraw',
            paragraphs: [
              'Upload a newer version of a document, or withdraw a memory. Knowledge that depended on the old version is flagged for review.',
            ],
          },
          {
            title: 'Suspend a source',
            paragraphs: [
              'Suspension stops a source being searched or downloaded right away, while keeping the data. It can be reversed.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Security and data',
    icon: 'security',
    pages: [
      {
        slug: 'permissions',
        title: 'Permissions',
        intro:
          'Answers respect each person’s access to the underlying sources.',
        sections: [
          {
            title: 'Permissions travel with content',
            paragraphs: [
              'Source permissions are captured during ingestion and stay attached to the content. Retrieval is scoped to the access of the person asking.',
            ],
          },
          {
            title: 'Audit and receipts',
            paragraphs: [
              'Retrievals and answers are recorded with receipts, so administrators can see what evidence was used and when.',
            ],
          },
        ],
      },
      {
        slug: 'deleting-data',
        title: 'Deleting data',
        intro:
          'You can delete a single source, disconnect Slack, or remove the whole installation from your AWS account.',
        sections: [
          {
            title: 'Delete a source',
            paragraphs: [
              'Deletion first blocks access, then removes stored files, passages and vectors, versions, related memory evidence and answer receipts in tracked steps. A second sweep catches uploads that arrive late.',
              'You can check the status of each step. Deletion is not instant: it runs in the background and failed steps are retried.',
            ],
          },
          {
            title: 'Disconnect Slack',
            paragraphs: [
              'Disconnecting Slack removes the indexed Slack data and the bot token from your account.',
            ],
          },
          {
            title: 'Remove everything',
            paragraphs: [
              'Because everything runs in your AWS account, you can delete the whole installation yourself.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Administration',
    icon: 'admin',
    pages: [
      {
        slug: 'support',
        title: 'Administration and support',
        intro:
          'Workspace administrators manage users, connected sources and pilot scope.',
        sections: [
          {
            title: 'What administrators do',
            bullets: [
              'Add and remove workspace users.',
              'Choose and change connected sources.',
              'Review proposed memories and open corrections.',
            ],
          },
          {
            title: 'Getting help',
            paragraphs: [
              'Contact Notrix for connector setup, access changes, deletion requests or deployment-specific documentation.',
            ],
          },
        ],
      },
    ],
  },
];

export const notrixDocPages = notrixDocGroups.flatMap((group) => group.pages);

export const notrixDocSectionId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const notrixDocHref = (page: NotrixDocPage) =>
  page.slug === notrixDocPages[0].slug ? '/docs' : `/docs/${page.slug}`;
