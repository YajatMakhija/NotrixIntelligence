'use client';

import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ArrowDownLeft,
  Check,
  ChevronDown,
  Clipboard,
  GripVertical,
  Plus,
  RotateCcw,
  Send,
  Square,
  Undo2,
  X,
} from 'lucide-react';

import {
  initialWorkspaceContext,
  suggestedQuestions,
  workspaceUpdates,
  type ContextCitation,
  type DemoActivity,
  type DemoResponse,
  type WorkspaceUpdate,
} from '@/data/notrix/workspace';

type ConversationItem = DemoResponse & {
  id: string;
  question: string;
  contextSnapshot: string;
};

type UndoState = {
  context: string;
  addedIds: string[];
};

const maxContextCharacters = 6000;
const maxQuestionCharacters = 500;

function CitationButtons({
  citations,
  onSelect,
}: {
  citations: ContextCitation[];
  onSelect: (citation: ContextCitation) => void;
}) {
  return citations.length ? (
    <span className="ml-1 inline-flex flex-wrap gap-1 align-middle">
      {citations.map((citation) => (
        <button
          key={citation.id}
          type="button"
          onClick={() => onSelect(citation)}
          className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full border border-secondary-300 bg-secondary-50 px-1.5 text-[11px] font-semibold text-secondary-800 transition-colors hover:border-secondary-500 hover:bg-secondary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
          aria-label={`Open evidence ${citation.id}`}
        >
          {citation.id}
        </button>
      ))}
    </span>
  ) : null;
}

function ActivityTimeline({
  activity,
  loading,
  open,
  onToggle,
}: {
  activity: DemoActivity[];
  loading: boolean;
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  return (
    <details
      open={open}
      onToggle={(event) => onToggle(event.currentTarget.open)}
      className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50"
    >
      <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 px-3 text-xs font-semibold text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500">
        <span>{loading ? 'Working on your answer' : 'View activity'}</span>
        <ChevronDown className="size-4 text-neutral-400" aria-hidden="true" />
      </summary>
      <div className="border-t border-neutral-200 px-3 py-3">
        <ol className="space-y-3">
          {loading ? (
            <li className="flex items-start gap-3 text-xs text-neutral-600">
              <span className="mt-1 size-2 animate-pulse rounded-full bg-secondary-500" />
              Reading the submitted context snapshot
            </li>
          ) : null}
          {activity.map((event) => (
            <li key={event.id} className="flex items-start gap-3 text-xs">
              <span
                className={`mt-1 size-2 shrink-0 rounded-full ${event.state === 'completed' ? 'bg-secondary-500' : event.state === 'cancelled' ? 'bg-neutral-400' : 'bg-red-500'}`}
              />
              <span className="min-w-0">
                <span className="font-medium text-neutral-800">
                  {event.label}
                </span>
                {event.toolName ? (
                  <code className="mt-1 block break-all text-[11px] text-secondary-800">
                    {event.toolName}
                  </code>
                ) : null}
                {event.summary ? (
                  <span className="mt-1 block text-neutral-500">
                    {event.summary}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}

export function NotrixContextPlayground() {
  const [context, setContext] = useState(initialWorkspaceContext);
  const [revision, setRevision] = useState(1);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const [draft, setDraft] = useState('');
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const [requestState, setRequestState] = useState<
    'idle' | 'loading' | 'error' | 'cancelled' | 'limit'
  >('idle');
  const [activity, setActivity] = useState<DemoActivity[]>([]);
  const [activityOpen, setActivityOpen] = useState(false);
  const [savedEvidence, setSavedEvidence] = useState<ContextCitation | null>(
    null,
  );
  const [announcement, setAnnouncement] = useState('');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const contextPanelRef = useRef<HTMLDivElement>(null);
  const answerPanelRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const latestAnswer = conversation.at(-1) ?? null;
  const contextChanged = context !== initialWorkspaceContext;
  const canSubmit =
    Boolean(context.trim() && draft.trim()) && requestState !== 'loading';

  const remainingUpdates = useMemo(
    () => workspaceUpdates.filter((update) => !addedIds.includes(update.id)),
    [addedIds],
  );

  function changeContext(nextContext: string) {
    setContext(nextContext);
    setRevision((current) => current + 1);
    setSavedEvidence(null);
  }

  function handleContextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    changeContext(event.target.value);
  }

  function insertUpdate(update: WorkspaceUpdate) {
    if (addedIds.includes(update.id)) {
      setAnnouncement(`${update.label} is already in the context.`);
      return;
    }

    const editor = editorRef.current;
    const cursor =
      editor && document.activeElement === editor
        ? editor.selectionStart
        : context.length;
    const before = context.slice(0, cursor);
    const after = context.slice(cursor);
    const leadingBreak = before && !before.endsWith('\n\n') ? '\n\n' : '';
    const trailingBreak = after && !after.startsWith('\n\n') ? '\n\n' : '';
    const insertion = `${leadingBreak}${update.text}${trailingBreak}`;
    const nextContext = `${before}${insertion}${after}`;
    if (nextContext.length > maxContextCharacters) {
      setAnnouncement(
        'This update does not fit. Shorten the context before adding it.',
      );
      return;
    }

    setUndoState({ context, addedIds });
    setAddedIds((current) => [...current, update.id]);
    changeContext(nextContext);
    setAnnouncement(`${update.label} added. Your next question will use it.`);

    window.setTimeout(() => {
      const start = nextContext.indexOf(update.text);
      editor?.focus();
      if (start >= 0)
        editor?.setSelectionRange(start, start + update.text.length);
    });
  }

  function handleDrop(event: DragEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    const update = workspaceUpdates.find(
      (item) => item.id === event.dataTransfer.getData('text/notrix-update'),
    );
    if (update) insertUpdate(update);
  }

  function undoInsertion() {
    if (!undoState) return;
    setContext(undoState.context);
    setAddedIds(undoState.addedIds);
    setRevision((current) => current + 1);
    setUndoState(null);
    setSavedEvidence(null);
    setAnnouncement('The last inserted update was removed.');
  }

  function resetExample() {
    controllerRef.current?.abort();
    setContext(initialWorkspaceContext);
    setRevision((current) => current + 1);
    setAddedIds([]);
    setUndoState(null);
    setDraft('');
    setConversation([]);
    setActivity([]);
    setRequestState('idle');
    setSavedEvidence(null);
    setAnnouncement('The original example has been restored.');
  }

  async function submitQuestion(question = draft) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || !context.trim() || requestState === 'loading') return;

    const submittedContext = context;
    const submittedRevision = revision;
    const controller = new AbortController();
    controllerRef.current = controller;
    setDraft(cleanQuestion);
    setRequestState('loading');
    setActivity([]);
    setActivityOpen(true);
    setSavedEvidence(null);

    try {
      const response = await fetch('/api/notrix-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: submittedContext,
          question: cleanQuestion,
          revision: submittedRevision,
        }),
        signal: controller.signal,
      });

      if (response.status === 429) {
        setRequestState('limit');
        setAnnouncement('This demo has reached its temporary request limit.');
        return;
      }
      if (!response.ok) {
        const failed = (await response.json().catch(() => null)) as {
          activity?: DemoActivity[];
        } | null;
        if (failed?.activity) setActivity(failed.activity);
        throw new Error('Answer request failed');
      }

      const result = (await response.json()) as DemoResponse;
      setConversation((current) => [
        ...current.slice(-4),
        {
          ...result,
          id: `${Date.now()}-${submittedRevision}`,
          question: cleanQuestion,
          contextSnapshot: submittedContext,
        },
      ]);
      setActivity(result.activity);
      setActivityOpen(false);
      setRequestState('idle');
      setDraft('');
      setAnnouncement(
        result.answer.state === 'conflict'
          ? 'Answer ready with an unresolved evidence conflict.'
          : result.answer.state === 'missing'
            ? 'Answer ready. The submitted context is missing evidence.'
            : 'Answer ready with verified context references.',
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setRequestState('error');
      setAnnouncement(
        'The answer request failed. Your question is still here.',
      );
    } finally {
      controllerRef.current = null;
    }
  }

  function stopRequest() {
    controllerRef.current?.abort();
    setRequestState('cancelled');
    setActivity([
      {
        id: 'cancelled',
        label: 'Request cancelled',
        state: 'cancelled',
      },
    ]);
    setActivityOpen(true);
    setAnnouncement('The answer request was cancelled.');
  }

  function openEvidence(item: ConversationItem, citation: ContextCitation) {
    setSavedEvidence(citation);
    contextPanelRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    window.setTimeout(() => {
      const start = context.indexOf(citation.excerpt);
      if (item.revision === revision && start >= 0) {
        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(
          start,
          start + citation.excerpt.length,
        );
      }
    });
  }

  async function copyAnswer() {
    if (!latestAnswer) return;
    try {
      await navigator.clipboard.writeText(latestAnswer.answer.answer);
      setAnnouncement('Answer copied.');
    } catch {
      setAnnouncement('The answer could not be copied.');
    }
  }

  function clearConversation() {
    controllerRef.current?.abort();
    setConversation([]);
    setActivity([]);
    setRequestState('idle');
    setSavedEvidence(null);
    setAnnouncement('Conversation cleared.');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitQuestion();
  }

  return (
    <section
      id="interactive-demo"
      className="px-5 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary-700">
            Try Notrix
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
            Change the context. Ask your question.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg">
            Explore the example, add new information, and see the evidence
            behind each answer.
          </p>
        </div>

        <div className="relative mt-12 sm:mt-14">
          <div
            className="absolute inset-x-24 top-10 h-72 rounded-full bg-gradient-to-r from-secondary-100/50 via-cyan-100/60 to-secondary-50/40 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-6 lg:grid-cols-2">
            <div
              ref={contextPanelRef}
              className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_70px_rgba(89,65,186,0.08)] lg:h-[42rem]"
            >
              <header className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-5 sm:px-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary-950">
                    Your company context
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Edit the example or write your own.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetExample}
                  className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full px-3 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  Reset example
                </button>
              </header>

              <div className="flex flex-1 flex-col overflow-y-auto p-5 sm:p-6">
                <label
                  htmlFor="company-context"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500"
                >
                  Editable context
                </label>
                <textarea
                  ref={editorRef}
                  id="company-context"
                  value={context}
                  maxLength={maxContextCharacters}
                  onChange={handleContextChange}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={handleDrop}
                  placeholder="Write or paste a short company scenario here…"
                  className="mt-3 min-h-64 w-full flex-1 resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm leading-7 text-primary-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-secondary-400 focus:bg-white focus:ring-4 focus:ring-secondary-100"
                />
                <div className="mt-2 flex items-start justify-between gap-4 text-xs text-neutral-500">
                  <p>
                    Add dates and distinguish suggestions from approved
                    decisions for clearer answers.
                  </p>
                  <span className="shrink-0 tabular-nums">
                    {context.length}/{maxContextCharacters}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-primary-950">
                      Add a new update
                    </h4>
                    <p className="mt-1 text-xs text-neutral-500">
                      Drag an update into the context, or select Add.
                    </p>
                  </div>
                  {undoState ? (
                    <button
                      type="button"
                      onClick={undoInsertion}
                      className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold text-secondary-800 hover:bg-secondary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
                    >
                      <Undo2 className="size-3.5" aria-hidden="true" /> Undo
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {workspaceUpdates.map((update) => {
                    const added = !remainingUpdates.includes(update);
                    return (
                      <article
                        key={update.id}
                        draggable={!added}
                        onDragStart={(event) => {
                          event.dataTransfer.setData(
                            'text/notrix-update',
                            update.id,
                          );
                          event.dataTransfer.effectAllowed = 'copy';
                        }}
                        className={`rounded-2xl border p-3 ${added ? 'border-secondary-200 bg-secondary-50/70' : 'border-neutral-200 bg-white'}`}
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical
                            className="mt-0.5 size-4 shrink-0 text-neutral-400"
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-primary-950">
                              {update.label}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                              {update.text}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={added}
                          onClick={() => insertUpdate(update)}
                          className="mt-3 inline-flex min-h-8 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-700 hover:border-secondary-300 hover:text-secondary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 disabled:cursor-default disabled:border-secondary-200 disabled:bg-secondary-50 disabled:text-secondary-700"
                        >
                          {added ? (
                            <Check className="size-3.5" aria-hidden="true" />
                          ) : (
                            <Plus className="size-3.5" aria-hidden="true" />
                          )}
                          {added ? 'Added' : 'Add'}
                        </button>
                      </article>
                    );
                  })}
                </div>

                {savedEvidence ? (
                  <div className="mt-4 rounded-2xl border border-secondary-300 bg-secondary-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-secondary-800">
                      Selected evidence · {savedEvidence.id}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-primary-950">
                      {savedEvidence.excerpt}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        answerPanelRef.current?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        })
                      }
                      className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-3 text-xs font-semibold text-secondary-800 ring-1 ring-secondary-200 lg:hidden"
                    >
                      <ArrowDownLeft className="size-3.5" aria-hidden="true" />
                      Return to answer
                    </button>
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span
                    className={`size-2 rounded-full ${contextChanged ? 'bg-secondary-500' : 'bg-neutral-300'}`}
                  />
                  <span className="font-medium text-neutral-700">
                    {contextChanged ? 'Context updated' : 'Original context'}
                  </span>
                  <span className="text-neutral-500">
                    Your next question will use this version.
                  </span>
                </div>
                {!context.trim() ? (
                  <p className="mt-3 rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-600">
                    Add some context to start asking questions.
                  </p>
                ) : null}
              </div>
            </div>

            <div
              ref={answerPanelRef}
              className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_70px_rgba(89,65,186,0.08)] lg:h-[42rem]"
            >
              <header className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-5 sm:px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-primary-950">
                      Ask Notrix
                    </h3>
                    <span className="rounded-full bg-secondary-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary-800 ring-1 ring-secondary-200">
                      Evidence demo
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">
                    Answers based on the context you provide.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearConversation}
                  disabled={!conversation.length && requestState === 'idle'}
                  className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full px-3 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 disabled:opacity-40"
                >
                  <X className="size-3.5" aria-hidden="true" /> Clear
                </button>
              </header>

              <div className="flex flex-1 flex-col overflow-y-auto p-5 sm:p-6">
                {!latestAnswer && requestState !== 'loading' ? (
                  <div className="my-auto py-6 text-center">
                    <div className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-primary-950 text-sm font-semibold text-white">
                      N
                    </div>
                    <h4 className="mt-5 text-xl font-semibold text-primary-950">
                      What would you like to know?
                    </h4>
                    <p className="mt-2 text-sm text-neutral-500">
                      Choose a question or ask your own.
                    </p>
                  </div>
                ) : null}

                {conversation.length > 1 ? (
                  <details className="mb-4 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                    <summary className="cursor-pointer font-semibold text-neutral-700">
                      {conversation.length - 1} earlier answer
                      {conversation.length > 2 ? 's' : ''}
                    </summary>
                    <ul className="mt-2 space-y-2">
                      {conversation.slice(0, -1).map((item) => (
                        <li key={item.id} className="truncate">
                          {item.question}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}

                {latestAnswer ? (
                  <div>
                    <div className="ml-auto max-w-lg rounded-2xl rounded-br-md bg-primary-950 px-4 py-3 text-sm font-medium leading-6 text-white">
                      {latestAnswer.question}
                    </div>
                    <article className="mt-4 rounded-2xl rounded-tl-md border border-secondary-200 bg-white p-5 shadow-[0_14px_36px_rgba(89,65,186,0.10)]">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p
                          className={`inline-flex items-center gap-2 text-xs font-semibold ${latestAnswer.answer.state === 'conflict' ? 'text-amber-700' : latestAnswer.answer.state === 'missing' ? 'text-neutral-600' : 'text-secondary-800'}`}
                        >
                          <Check className="size-3.5" aria-hidden="true" />
                          {latestAnswer.answer.state === 'conflict'
                            ? 'Unresolved evidence conflict'
                            : latestAnswer.answer.state === 'missing'
                              ? 'Missing evidence'
                              : 'Answer grounded in your context'}
                        </p>
                        {latestAnswer.revision !== revision ? (
                          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                            Previous context version
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-4 text-base font-medium leading-7 text-primary-950">
                        {latestAnswer.answer.answer}
                        <CitationButtons
                          citations={latestAnswer.answer.citations}
                          onSelect={(citation) =>
                            openEvidence(latestAnswer, citation)
                          }
                        />
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
                        <button
                          type="button"
                          onClick={() => void copyAnswer()}
                          className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
                        >
                          <Clipboard className="size-3.5" aria-hidden="true" />
                          Copy answer
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivityOpen((current) => !current)}
                          className="inline-flex min-h-9 items-center rounded-full px-3 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
                        >
                          View activity
                        </button>
                      </div>
                    </article>
                  </div>
                ) : null}

                {requestState === 'error' ? (
                  <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">
                    Something went wrong. Your text is still here—try again.
                  </p>
                ) : null}
                {requestState === 'cancelled' ? (
                  <p className="mt-4 rounded-xl bg-neutral-100 px-3 py-3 text-sm text-neutral-600">
                    The request was cancelled. Your question is still here.
                  </p>
                ) : null}
                {requestState === 'limit' ? (
                  <p className="mt-4 rounded-xl border border-secondary-200 bg-secondary-50 px-3 py-3 text-sm text-secondary-900">
                    You’ve reached this demo’s limit. Book a walkthrough to
                    explore more.
                  </p>
                ) : null}

                {requestState === 'loading' || activity.length ? (
                  <ActivityTimeline
                    activity={activity}
                    loading={requestState === 'loading'}
                    open={activityOpen}
                    onToggle={setActivityOpen}
                  />
                ) : null}

                <div className="mt-auto pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400">
                    Suggested questions
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => void submitQuestion(question)}
                        disabled={!context.trim() || requestState === 'loading'}
                        className="min-h-11 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-left text-xs font-medium leading-5 text-neutral-700 transition-colors hover:border-secondary-300 hover:bg-secondary-50 hover:text-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="border-t border-neutral-200 bg-neutral-50/70 p-4 sm:p-5"
              >
                <label htmlFor="notrix-question" className="sr-only">
                  Ask anything about the context
                </label>
                <div className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm focus-within:border-secondary-400 focus-within:ring-4 focus-within:ring-secondary-100">
                  <textarea
                    id="notrix-question"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    maxLength={maxQuestionCharacters}
                    rows={2}
                    placeholder="Ask anything about the context…"
                    className="min-h-12 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm leading-6 text-primary-950 outline-none placeholder:text-neutral-400 focus:ring-0"
                  />
                  {requestState === 'loading' ? (
                    <button
                      type="button"
                      onClick={stopRequest}
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-200 text-primary-950 hover:bg-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
                      aria-label="Stop generating"
                    >
                      <Square
                        className="size-4 fill-current"
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-950 text-white hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
                      aria-label="Send question"
                    >
                      <Send className="size-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-neutral-500">
                  <span>
                    This public demo uses fictional context. Do not enter
                    sensitive information.
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {draft.length}/{maxQuestionCharacters}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
    </section>
  );
}
