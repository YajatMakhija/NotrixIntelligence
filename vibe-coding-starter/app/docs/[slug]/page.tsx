import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { NotrixDocsPage } from '@/components/notrix/NotrixDocsPage';
import { notrixDocPages } from '@/data/notrix/docs';
import { notrixDocMarkdownUrl } from '@/data/notrix/docs-markdown';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notrixDocPages.slice(1).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = notrixDocPages.find((candidate) => candidate.slug === slug);
  if (!page) return {};
  return {
    title: `${page.title} · Docs`,
    description: page.intro,
    alternates: { types: { 'text/markdown': notrixDocMarkdownUrl(page) } },
  };
}

export default async function DocumentationArticlePage({ params }: Props) {
  const { slug } = await params;
  // The first page is the docs home (docs.notrix.si/).
  if (slug === notrixDocPages[0].slug) redirect('/');
  if (!notrixDocPages.some((page) => page.slug === slug)) notFound();
  return <NotrixDocsPage slug={slug} />;
}
