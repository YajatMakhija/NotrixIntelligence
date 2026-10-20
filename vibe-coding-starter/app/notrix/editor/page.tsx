import type { Metadata } from 'next';

import { NotrixLayoutEditor } from '@/components/notrix/editor/NotrixLayoutEditor';

export const metadata: Metadata = {
  title: 'Layout Editor | Notrix Intelligence',
  description: 'Arrange and resize the Notrix landing page hero locally.',
};

export default function NotrixEditorPage() {
  return <NotrixLayoutEditor />;
}
