import { NotrixDocsShell } from '@/components/notrix/NotrixDocsPage';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <NotrixDocsShell>{children}</NotrixDocsShell>;
}
