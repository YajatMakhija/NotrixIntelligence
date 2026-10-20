import type { Metadata } from 'next';

import { NotrixInformationPage } from '@/components/notrix/NotrixInformationPage';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Getting started with a Notrix workspace and pilot.',
};

const sections = [
  {
    title: '1. Create your workspace',
    paragraphs: [
      'Your Notrix workspace is created during pilot onboarding. The workspace owner confirms the company identity, deployment model, administrators, and approved users.',
    ],
  },
  {
    title: '2. Choose approved knowledge sources',
    paragraphs: [
      'Select the documents or repositories needed for the pilot use case. Notrix confirms which connectors are available before setup; planned integrations are not presented as generally available.',
    ],
  },
  {
    title: '3. Configure identity and access',
    paragraphs: [
      'Connect approved identities and define who may use the workspace. Source permissions and deployment policy determine the information available to each user.',
    ],
  },
  {
    title: '4. Ask in Slack',
    paragraphs: [
      'Use a direct question that names the customer, project, policy, or document you need. Notrix searches the approved workspace knowledge and returns a concise response.',
    ],
    bullets: [
      'Ask one clear question at a time.',
      'Include the relevant project or customer name.',
      'Open the attached source when the decision requires verification.',
    ],
  },
  {
    title: '5. Review sources and give feedback',
    paragraphs: [
      'Every operational answer should be checked against its supporting material. During a pilot, examples that are missing context help refine source coverage and workspace configuration.',
    ],
  },
  {
    title: 'Administration and support',
    paragraphs: [
      'Workspace administrators manage users, connected sources, and pilot scope. Contact Notrix for connector setup, access changes, deletion requests, or deployment-specific documentation.',
    ],
  },
];

export default function DocumentationPage() {
  return (
    <NotrixInformationPage
      eyebrow="Documentation"
      title="Start using Notrix."
      introduction="A practical guide to setting up a workspace, connecting approved knowledge, and getting sourced answers in Slack."
      sections={sections}
    />
  );
}
