import { NextResponse, type NextRequest } from 'next/server';

import { notrixDocPages } from '@/data/notrix/docs';

// The docs live on their own subdomain: docs.notrix.si/<slug> shows the page that app/docs renders, and
// www.notrix.si/docs no longer exists (it redirects there). Any other path on the docs host (the shared header
// and footer link to /pricing, /security...) goes back to the marketing site.
// Local preview: open docs.localhost:<port> (browsers resolve *.localhost to this machine).
const DOCS_URL = 'https://docs.notrix.si';
const SITE_URL = 'https://www.notrix.si';
const MARKETING_HOSTS = new Set(['notrix.si', 'www.notrix.si']);
const slugs = new Set(notrixDocPages.map((page) => page.slug));

// AI crawlers and assistants. Some bots pose as plain Chrome and won't match.
const AI_BOT =
  /GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|GoogleOther|Applebot-Extended|Amazonbot|meta-externalagent|Meta-ExternalFetcher|Bytespider|CCBot|DuckAssistBot|MistralAI-User|cohere-ai|YouBot|Diffbot|bingbot/i;

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const { pathname, search } = request.nextUrl;

  const userAgent = request.headers.get('user-agent') ?? '';
  const bot = userAgent.match(AI_BOT)?.[0];
  // ponytail: Vercel runtime logs only (search "ai_bot_visit"), which keep a short history. Add a log drain or
  // a DB insert when you want weeks of data.
  if (bot) console.log(JSON.stringify({ event: 'ai_bot_visit', bot, host, path: pathname, userAgent }));

  // Files (llms.txt, robots.txt, sitemap.xml, <slug>.md) are logged above, never redirected.
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  if (host === 'docs.notrix.si' || host.startsWith('docs.')) {
    if (pathname === '/') return NextResponse.rewrite(new URL('/docs', request.url));
    const slug = pathname.slice(1).replace(/\/$/, '');
    if (slugs.has(slug)) {
      // The first page is the docs home.
      if (slug === notrixDocPages[0].slug) return NextResponse.redirect(new URL('/', request.url), 308);
      return NextResponse.rewrite(new URL(`/docs/${slug}`, request.url));
    }
    // Old /docs links on this host: drop the prefix.
    if (pathname === '/docs' || pathname.startsWith('/docs/')) {
      return NextResponse.redirect(new URL(pathname.replace(/^\/docs\/?/, '/') + search, request.url), 308);
    }
    return NextResponse.redirect(`${SITE_URL}${pathname}${search}`, 308);
  }

  if (MARKETING_HOSTS.has(host) && (pathname === '/docs' || pathname.startsWith('/docs/'))) {
    return NextResponse.redirect(`${DOCS_URL}${pathname.replace(/^\/docs/, '') || '/'}${search}`, 308);
  }
  return NextResponse.next();
}

// Pages and text files (llms.txt, robots.txt, *.md), so AI bot visits to them get logged. Not Next's own
// files, the API or images.
export const config = { matcher: ['/((?!_next/|api/|static/).*)'] };
