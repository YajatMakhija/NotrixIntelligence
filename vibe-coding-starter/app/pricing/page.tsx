import type { Metadata } from 'next';

import { NotrixPricingPage } from '@/components/notrix/NotrixPricingPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Notrix is $200 a month per workspace. It runs in your own AWS account, so AWS usage is billed to you directly by AWS.',
};

export default function PricingPage() {
  return <NotrixPricingPage />;
}
