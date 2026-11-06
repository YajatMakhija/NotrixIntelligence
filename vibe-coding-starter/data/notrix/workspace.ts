export const initialWorkspaceContext = [
  '[March 3 · Original proposal] Acme’s proposed annual subscription is $74,000.',
  '[March 8 · Sales discussion] We should increase the price to $84,000 if priority support is included.',
  '[March 10 · Approved agreement] Acme’s final annual price is $82,000, including priority support. Maya approved this agreement.',
].join('\n\n');

export type WorkspaceUpdate = {
  id: string;
  label: string;
  text: string;
};

export const workspaceUpdates: WorkspaceUpdate[] = [
  {
    id: 'new-agreement',
    label: 'A newer agreement',
    text: '[March 12 · Approved amendment] Maya approved a replacement annual price of $86,000, including priority support and onboarding. This supersedes the March 10 price.',
  },
  {
    id: 'pending-proposal',
    label: 'An unapproved suggestion',
    text: '[March 13 · Sales discussion] Leo suggested reducing the price to $79,000. This suggestion has not been approved.',
  },
  {
    id: 'payment-evidence',
    label: 'A payment update',
    text: '[March 14 · Finance record] Acme paid the $86,000 annual invoice in full.',
  },
  {
    id: 'conflicting-approval',
    label: 'Conflicting evidence',
    text: '[March 12 · Separate approval record] Maya approved an annual price of $85,000. This record does not explain its relationship to the other March 12 amendment.',
  },
];

export const suggestedQuestions = [
  'What is Acme’s final agreed price?',
  'Why are there different prices?',
  'Who approved the agreement?',
  'Has Acme paid?',
];

export type ContextCitation = {
  id: number;
  excerpt: string;
};

export type DemoAnswer = {
  answer: string;
  citations: ContextCitation[];
  state: 'supported' | 'missing' | 'conflict';
};

export type DemoActivity = {
  id: string;
  label: string;
  state: 'completed' | 'failed' | 'cancelled';
  toolName?: string;
  summary?: string;
};

export type DemoResponse = {
  answer: DemoAnswer;
  activity: DemoActivity[];
  revision: number;
};
