import type { Metadata } from 'next';

import { NotrixHowItWorksPage } from '@/components/notrix/NotrixHowItWorksPage';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Follow one question through Notrix: connect sources, get a cited answer, and correct what Notrix learns, all inside your AWS account.',
};

export default function HowItWorksPage() {
  return <NotrixHowItWorksPage />;
}
