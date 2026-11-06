import type { Metadata } from 'next';

import { NotrixLandingPage } from '@/components/notrix/NotrixLandingPage';

export const metadata: Metadata = {
  title: 'Notrix | Shared memory infrastructure for AI agents and humans',
  description:
    'One memory for your team and your AI agents, built from your company’s documents and conversations, with a source behind every fact. Runs in your own AWS account.',
};

export default function NotrixPage() {
  return <NotrixLandingPage />;
}
