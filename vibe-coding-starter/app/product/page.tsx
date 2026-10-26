import type { Metadata } from 'next';

import { NotrixInformationPage } from '@/components/notrix/NotrixInformationPage';

export const metadata: Metadata = {
  title: 'Product',
  description:
    'See how Notrix turns approved company knowledge into sourced answers in Slack.',
};

const sections = [
  {
    title: 'A company brain inside Slack',
    paragraphs: [
      'Notrix gives teams one place to ask questions about approved company knowledge without leaving Slack. It is designed for the operational questions that otherwise require searching across documents, messages, and shared drives.',
    ],
  },
  {
    title: 'Answers grounded in company sources',
    paragraphs: [
      'Each response is built from the sources connected for your workspace. Supporting references help users verify the answer and return to the original material when more context is needed.',
    ],
    bullets: [
      'Ask in natural language from Slack.',
      'Receive a concise answer with supporting sources.',
      'Keep the original document as the source of truth.',
    ],
  },
  {
    title: 'Customer-controlled deployment',
    paragraphs: [
      'Notrix is designed around customer-controlled cloud storage and deployment details agreed before a pilot. Connected knowledge is not used to train shared models.',
    ],
  },
  {
    title: 'Access follows your rules',
    paragraphs: [
      'Approved identities, source permissions, and workspace policy determine who can connect knowledge and receive answers. Administrators retain control over users, sources, retention, and removal.',
    ],
  },
  {
    title: 'Start with a focused pilot',
    paragraphs: [
      'A pilot begins with one team, one useful knowledge problem, and a defined set of approved sources. Supported integrations and deployment requirements are confirmed before setup.',
    ],
  },
];

export default function ProductPage() {
  return (
    <NotrixInformationPage
      eyebrow="Product"
      title="Company knowledge that works where your team works."
      introduction="Ask a question in Slack, receive a clear answer, and inspect the sources behind it—all within a customer-controlled deployment."
      sections={sections}
    />
  );
}
