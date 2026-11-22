// Plain Markdown versions of the docs for AI crawlers (llms-full.txt and docs.notrix.si/<slug>.md).
import { notrixDocHref, type NotrixDocPage } from '@/data/notrix/docs';

export const NOTRIX_DOCS_URL = 'https://docs.notrix.si';

export const notrixDocUrl = (page: NotrixDocPage) =>
  `${NOTRIX_DOCS_URL}${notrixDocHref(page)}`.replace(/\/$/, '');

export const notrixDocMarkdownUrl = (page: NotrixDocPage) => `${NOTRIX_DOCS_URL}/${page.slug}.md`;

export function notrixDocMarkdown(page: NotrixDocPage) {
  const lines = [`# ${page.title}`, '', page.intro, '', `Source: ${notrixDocUrl(page)}`];
  for (const section of page.sections) {
    lines.push('', `## ${section.title}`, '');
    section.paragraphs?.forEach((paragraph) => lines.push(paragraph, ''));
    section.steps?.forEach((step, index) => lines.push(`${index + 1}. ${step}`));
    section.bullets?.forEach((bullet) => lines.push(`- ${bullet}`));
    if (section.note) lines.push('', `> Note: ${section.note}`);
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

export const markdownResponse = (body: string, canonical?: string) =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      ...(canonical ? { Link: `<${canonical}>; rel="canonical"` } : {}),
    },
  });
