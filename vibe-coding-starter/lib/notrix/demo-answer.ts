import type { ContextCitation, DemoAnswer } from '../../data/notrix/workspace';

export type ContextParagraph = ContextCitation & {
  amount?: string;
  timestamp: number;
  kind: 'approval' | 'payment' | 'proposal' | 'suggestion' | 'other';
};

const moneyPattern = /\$\d{1,3}(?:,\d{3})+/;

function parseTimestamp(excerpt: string) {
  const date = excerpt.match(
    /\[(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:,\s*(\d{4}))?/i,
  );
  if (!date) return 0;
  return Date.parse(`${date[1]} ${date[2]}, ${date[3] ?? '2026'}`) || 0;
}

export function readWorkspaceContext(context: string): ContextParagraph[] {
  return context
    .split(/\n\s*\n|\n(?=\[)/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((excerpt, index) => {
      const lower = excerpt.toLowerCase();
      const amount = excerpt.match(moneyPattern)?.[0];
      let kind: ContextParagraph['kind'] = 'other';

      if (/\bpaid\b|payment record|invoice in full/.test(lower))
        kind = 'payment';
      else if (
        /\bunapproved\b|\b(?:not|never|isn['’]t|wasn['’]t|hasn['’]t|haven['’]t|hadn['’]t)\b(?:\s+\w+){0,3}\s+\b(?:approved|signed|executed)\b|\bdraft\b|\bpending\b|\bconditional\b|suggested|suggestion/.test(
          lower,
        )
      )
        kind = 'suggestion';
      else if (/\bapproved\b|\bexecuted\b|\bsigned\b/.test(lower))
        kind = 'approval';
      else if (/proposal|proposed/.test(lower)) kind = 'proposal';

      return {
        id: index + 1,
        excerpt,
        amount,
        timestamp: parseTimestamp(excerpt),
        kind,
      };
    });
}

function cite(paragraphs: ContextParagraph[]): ContextCitation[] {
  return paragraphs.map(({ id, excerpt }) => ({ id, excerpt }));
}

function resolveAgreement(paragraphs: ContextParagraph[]) {
  const approvals = paragraphs.filter(
    (paragraph) => paragraph.kind === 'approval' && paragraph.amount,
  );
  if (!approvals.length) {
    return { state: 'missing' as const, evidence: [] as ContextParagraph[] };
  }

  const sorted = [...approvals].sort(
    (left, right) => left.timestamp - right.timestamp,
  );
  const latestTimestamp = sorted.at(-1)?.timestamp ?? 0;
  const latest = sorted.filter(
    (paragraph) => paragraph.timestamp === latestTimestamp,
  );
  const latestAmounts = [
    ...new Set(latest.map((paragraph) => paragraph.amount)),
  ];

  if (latestAmounts.length > 1) {
    return { state: 'conflict' as const, evidence: latest };
  }

  const selected = latest[0];
  const previous = sorted
    .slice(0, -latest.length)
    .reverse()
    .find((paragraph) => paragraph.amount !== selected.amount);

  if (previous && !/supersedes|replacement/i.test(selected.excerpt)) {
    return {
      state: 'conflict' as const,
      evidence: [previous, selected],
    };
  }

  return {
    state: 'supported' as const,
    evidence: [selected],
    selected,
  };
}

function answerPrice(paragraphs: ContextParagraph[]): DemoAnswer {
  const decision = resolveAgreement(paragraphs);
  if (decision.state === 'missing') {
    return {
      answer:
        'The context does not contain an approved price. It only provides proposals or suggestions.',
      citations: cite(
        paragraphs.filter((paragraph) => paragraph.amount).slice(-3),
      ),
      state: 'missing',
    };
  }

  if (decision.state === 'conflict') {
    const amounts = [
      ...new Set(decision.evidence.map((paragraph) => paragraph.amount)),
    ];
    return {
      answer: `The approved evidence conflicts: it lists ${amounts.join(' and ')} without a clear supersession rule. The context does not resolve which approval governs, so Notrix cannot state one final price.`,
      citations: cite(decision.evidence),
      state: 'conflict',
    };
  }

  const selected = decision.selected;
  const pending = paragraphs.filter(
    (paragraph) => paragraph.kind === 'suggestion' && paragraph.amount,
  );
  const pendingNote = pending.length
    ? ` A separate ${pending.at(-1)?.amount} suggestion remains unapproved and does not replace it.`
    : '';

  return {
    answer: `Acme’s latest supported annual price is ${selected.amount}.${/priority support/i.test(selected.excerpt) ? ' It includes priority support.' : ''}${pendingNote}`,
    citations: cite([selected, ...pending.slice(-1)]),
    state: 'supported',
  };
}

function answerPriceHistory(paragraphs: ContextParagraph[]): DemoAnswer {
  const priced = paragraphs.filter((paragraph) => paragraph.amount);
  if (!priced.length) {
    return {
      answer: 'The context does not contain any pricing evidence.',
      citations: [],
      state: 'missing',
    };
  }

  const stages = priced.map((paragraph) => {
    const label =
      paragraph.kind === 'approval'
        ? 'approved'
        : paragraph.kind === 'suggestion'
          ? 'suggested but unapproved'
          : paragraph.kind;
    return `${paragraph.amount} (${label})`;
  });
  const priceAnswer = answerPrice(paragraphs);

  return {
    answer: `The figures represent different evidence states: ${stages.join(', ')}. ${priceAnswer.answer}`,
    citations: cite(priced),
    state: priceAnswer.state,
  };
}

function answerApprover(paragraphs: ContextParagraph[]): DemoAnswer {
  const approved = paragraphs.filter((paragraph) =>
    /\b[A-Z][a-z]+ approved\b/.test(paragraph.excerpt),
  );
  if (!approved.length) {
    return {
      answer: 'The context does not identify who approved the agreement.',
      citations: [],
      state: 'missing',
    };
  }

  const names = [
    ...new Set(
      approved.flatMap((paragraph) =>
        [...paragraph.excerpt.matchAll(/\b([A-Z][a-z]+) approved\b/g)].map(
          (match) => match[1],
        ),
      ),
    ),
  ];

  return {
    answer: `${names.join(' and ')} approved the agreement evidence in the context.`,
    citations: cite(approved),
    state: 'supported',
  };
}

function answerPayment(paragraphs: ContextParagraph[]): DemoAnswer {
  const payments = paragraphs.filter(
    (paragraph) => paragraph.kind === 'payment',
  );
  if (!payments.length) {
    return {
      answer:
        'The context contains no payment record, so it does not establish whether Acme has paid.',
      citations: [],
      state: 'missing',
    };
  }

  const payment = payments.at(-1)!;
  const agreement = resolveAgreement(paragraphs);
  if (
    agreement.state !== 'supported' ||
    (payment.amount && payment.amount !== agreement.selected.amount)
  ) {
    return {
      answer:
        'The context contains a payment record, but its amount does not align with one clearly governing approved agreement. Notrix cannot confirm that the agreed invoice was settled without resolving that conflict.',
      citations: cite([...agreement.evidence, payment]),
      state: 'conflict',
    };
  }

  return {
    answer:
      'Yes. The context records that Acme paid the annual invoice in full.',
    citations: cite(payments),
    state: 'supported',
  };
}

export function answerWorkspaceQuestion(
  question: string,
  paragraphs: ContextParagraph[],
): DemoAnswer {
  const normalized = question.toLowerCase();

  if (/paid|payment|invoice/.test(normalized)) return answerPayment(paragraphs);
  if (/who|approv/.test(normalized)) return answerApprover(paragraphs);
  if (/why|different|conflict|figures/.test(normalized))
    return answerPriceHistory(paragraphs);
  if (/price|cost|quote|annual|agreement/.test(normalized))
    return answerPrice(paragraphs);

  const terms = normalized
    .match(/[a-z0-9]+/g)
    ?.filter(
      (term) =>
        term.length > 3 &&
        !['what', 'when', 'where', 'which', 'about', 'does', 'have'].includes(
          term,
        ),
    );
  const relevant = paragraphs
    .map((paragraph) => ({
      paragraph,
      score:
        terms?.filter((term) => paragraph.excerpt.toLowerCase().includes(term))
          .length ?? 0,
    }))
    .filter((match) => match.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 2)
    .map((match) => match.paragraph);

  return relevant.length
    ? {
        answer: `The most relevant context says: “${relevant[0].excerpt}”`,
        citations: cite(relevant),
        state: 'supported',
      }
    : {
        answer:
          'The current context does not contain enough evidence to answer that question. Add the missing information and ask again.',
        citations: [],
        state: 'missing',
      };
}

export function validateCitations(
  answer: DemoAnswer,
  paragraphs: ContextParagraph[],
) {
  return answer.citations.every((citation) => {
    const source = paragraphs.find((paragraph) => paragraph.id === citation.id);
    return source?.excerpt === citation.excerpt;
  });
}
