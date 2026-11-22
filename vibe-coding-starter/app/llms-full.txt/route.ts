// Every docs page as Markdown in one file, for AI assistants.
import { notrixDocPages } from '@/data/notrix/docs';
import { markdownResponse, notrixDocMarkdown } from '@/data/notrix/docs-markdown';

export const dynamic = 'force-static';

export function GET() {
  return markdownResponse(notrixDocPages.map(notrixDocMarkdown).join('\n---\n\n'));
}
