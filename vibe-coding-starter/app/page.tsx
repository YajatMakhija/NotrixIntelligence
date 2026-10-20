import type { Metadata } from 'next';

import { NotrixLandingPage } from '@/components/notrix/NotrixLandingPage';

export const metadata: Metadata = {
  title: 'Notrix | Company knowledge, connected in Slack',
  description:
    'Ask questions in Slack and get sourced answers from company knowledge stored in your own cloud.',
};

export default function HomePage() {
  return <NotrixLandingPage />;
}
