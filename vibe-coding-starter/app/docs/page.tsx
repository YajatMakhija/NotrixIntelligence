import type { Metadata } from 'next';

import { NotrixDocsPage } from '@/components/notrix/NotrixDocsPage';
import { notrixDocPages } from '@/data/notrix/docs';

export const metadata: Metadata = {
  title: 'Documentation',
  description: notrixDocPages[0].intro,
};

export default function DocumentationPage() {
  return <NotrixDocsPage slug={notrixDocPages[0].slug} />;
}
