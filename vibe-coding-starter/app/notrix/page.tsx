import type { Metadata } from 'next';

import { NotrixLandingPage } from '@/components/notrix/NotrixLandingPage';

export const metadata: Metadata = {
  title: 'Notrix | Your company knowledge, connected',
  description:
    'Ask questions in Slack and get sourced answers from company knowledge stored in your own cloud.',
};

export default function NotrixPage() {
  return <NotrixLandingPage />;
}
