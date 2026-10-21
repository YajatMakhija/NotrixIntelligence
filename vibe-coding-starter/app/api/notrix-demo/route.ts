import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
  answerWorkspaceQuestion,
  readWorkspaceContext,
  validateCitations,
} from '@/lib/notrix/demo-answer';
import type { DemoActivity, DemoResponse } from '@/data/notrix/workspace';

export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  context: z.string().trim().min(1).max(6000),
  question: z.string().trim().min(1).max(500),
  revision: z.number().int().nonnegative(),
});

type RateBucket = { count: number; resetAt: number };
const rateLimitState = globalThis as typeof globalThis & {
  notrixDemoBuckets?: Map<string, RateBucket>;
};
// shortcut: per-instance load shedding is enough while this route has no paid model call; use a shared atomic limiter before adding one.
const buckets = (rateLimitState.notrixDemoBuckets ??= new Map());
const windowMs = 10 * 60 * 1000;
const requestLimit = 30;

function consumeAllowance(request: Request) {
  const key =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  const now = Date.now();
  if (buckets.size > 1000) {
    for (const [bucketKey, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(bucketKey);
    }
  }
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= requestLimit) return false;
  bucket.count += 1;
  return true;
}

export async function POST(request: Request) {
  if (!consumeAllowance(request)) {
    return NextResponse.json(
      { error: 'usage_limit' },
      { status: 429, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const parsed = requestSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_request' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const activity: DemoActivity[] = [
    {
      id: 'read-context',
      label: 'Reading your context',
      state: 'completed',
    },
  ];

  try {
    const paragraphs = readWorkspaceContext(parsed.data.context);
    activity.push({
      id: 'context-tool',
      label: 'Application context lookup',
      state: 'completed',
      toolName: 'read_workspace_context',
      summary: `${paragraphs.length} submitted passages classified locally`,
    });

    const answer = answerWorkspaceQuestion(parsed.data.question, paragraphs);
    activity.push({
      id: 'prepare-answer',
      label: 'Preparing answer',
      state: 'completed',
    });

    if (!validateCitations(answer, paragraphs)) {
      throw new Error('Citation validation failed');
    }
    activity.push({
      id: 'check-citations',
      label: 'Checking source references',
      state: 'completed',
      summary: `${answer.citations.length} verified reference${answer.citations.length === 1 ? '' : 's'}`,
    });

    const response: DemoResponse = {
      answer,
      activity,
      revision: parsed.data.revision,
    };
    return NextResponse.json(response, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    activity.push({
      id: 'request-failed',
      label: 'Answer request failed',
      state: 'failed',
    });
    return NextResponse.json(
      { error: 'answer_failed', activity },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
