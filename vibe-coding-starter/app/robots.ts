import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/config/site.settings';

export const dynamic = 'force-static';

// Served on www and docs alike.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/notrix/editor'],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
