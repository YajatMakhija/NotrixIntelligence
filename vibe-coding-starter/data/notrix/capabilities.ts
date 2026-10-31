export const capabilities = [
  {
    id: 'find',
    facts: [
      ['Example sources', 'Google Drive and Slack'],
      ['Source coverage', 'Three dated company records'],
      ['Next step', 'Open a result to inspect its evidence'],
    ],
    label: 'Find information',
    title: 'Find the information without knowing where it lives.',
    description:
      'Search the knowledge your team has connected, across documents and conversations. Bring relevant material together while preserving access to the original sources.',
  },
  {
    id: 'history',
    facts: [
      ['Compare', 'Proposals, suggestions and approvals'],
      ['Check', 'The date and decision status'],
      ['Agreed outcome', '$82,000 with priority support'],
    ],
    label: 'Understand history',
    title: 'See how a decision reached its current state.',
    description:
      'Review the proposals, discussions, and approved records behind a decision. Understand what changed and distinguish a suggestion from a documented agreement.',
  },
  {
    id: 'evidence',
    facts: [
      ['Trace', 'The source, date and exact passage'],
      ['Review', 'Supporting context and limitations'],
      ['Keep in mind', 'An agreement is not proof of payment'],
    ],
    label: 'Verify evidence',
    title: 'Go from an answer to its supporting passage.',
    description:
      'Follow citations to the material behind an answer. Read the relevant passage in context and return to the original document when you need more detail.',
  },
] as const;

export const companyRecords = [
  {
    id: 'proposal',
    title: 'Acme — Original proposal',
    source: 'Google Drive',
    date: 'March 3',
    status: 'Proposal',
    heading: 'Proposed commercial terms',
    excerpt:
      'The proposed annual subscription fee is $74,000. Priority support is not included in this proposal.',
    detail:
      'This is an initial proposal for discussion. Final pricing and service scope remain subject to an approved agreement.',
    amount: '$74,000',
  },
  {
    id: 'discussion',
    title: 'Acme — Pricing discussion',
    source: 'Slack · #sales',
    date: 'March 8',
    status: 'Unapproved suggestion',
    heading: 'Priority support discussion',
    excerpt:
      'We should increase the price to $84,000 if priority support is included.',
    detail:
      'This message proposes a conditional change. It does not record approval or replace the original proposal.',
    amount: '$84,000',
  },
  {
    id: 'agreement',
    title: 'Acme — Approved agreement',
    source: 'Google Drive',
    date: 'March 10',
    status: 'Approved agreement',
    heading: 'Section 4 · Commercial terms',
    excerpt:
      'The annual subscription fee is $82,000, inclusive of priority support.',
    detail:
      'Maya approved this agreement on March 10. This example contains no invoice or payment record.',
    amount: '$82,000',
  },
] as const;
