import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { NotrixDocsPage } from '@/components/notrix/NotrixDocsPage';
import { notrixDocPages } from '@/data/notrix/docs';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notrixDocPages.slice(1).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = notrixDocPages.find((candidate) => candidate.slug === slug);
  return page ? { title: `${page.title} · Docs`, description: page.intro } : {};
}

export default async function DocumentationArticlePage({ params }: Props) {
  const { slug } = await params;
  // The first page lives at /docs itself.
  if (slug === notrixDocPages[0].slug) redirect('/docs');
  if (!notrixDocPages.some((page) => page.slug === slug)) notFound();
  return <NotrixDocsPage slug={slug} />;
}
