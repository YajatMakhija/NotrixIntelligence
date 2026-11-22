// docs.notrix.si/<slug>.md (rewritten here in next.config.js): the page as plain Markdown.
import { notrixDocPages } from '@/data/notrix/docs';
import { markdownResponse, notrixDocMarkdown, notrixDocUrl } from '@/data/notrix/docs-markdown';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return notrixDocPages.map((page) => ({ slug: page.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = notrixDocPages.find((candidate) => candidate.slug === slug);
  if (!page) return new Response('Not found', { status: 404 });
  return markdownResponse(notrixDocMarkdown(page), notrixDocUrl(page));
}
