import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/config/site.settings';
import { notrixDocPages } from '@/data/notrix/docs';
import { notrixDocUrl } from '@/data/notrix/docs-markdown';

export const dynamic = 'force-static';

// One sitemap for both hosts: docs.notrix.si/robots.txt points here, which makes the docs URLs valid in it
// (sitemaps.org cross-host submission).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split('T')[0];
  const pages = ['', 'product', 'how-it-works', 'pricing', 'security', 'privacy', 'terms', 'cookies'].map(
    (route) => `${siteConfig.siteUrl}/${route}`.replace(/\/$/, ''),
  );
  return [...pages, ...notrixDocPages.map(notrixDocUrl)].map((url) => ({ url, lastModified }));
}
