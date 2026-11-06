import type { Metadata } from 'next';

import { NotrixProductPage } from '@/components/notrix/NotrixProductPage';

export const metadata: Metadata = {
  title: 'Product',
  description:
    'See how Notrix turns approved company knowledge into sourced answers in Slack.',
};

export default function ProductPage() {
  return <NotrixProductPage />;
}
