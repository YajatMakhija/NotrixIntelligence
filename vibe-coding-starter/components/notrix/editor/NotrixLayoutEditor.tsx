'use client';

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Grid3X3,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  Save,
  Smartphone,
  Tablet,
  Upload,
} from 'lucide-react';
import {
  SiGithub,
  SiGithubHex,
  SiGoogledrive,
  SiGoogledriveHex,
  SiJira,
  SiJiraHex,
  SiNotion,
  SiNotionHex,
  SiConfluence,
  SiConfluenceHex,
} from '@icons-pack/react-simple-icons';

import {
  isNotrixEditorDocument as isEditorDocument,
  notrixBlockOrder as blockOrder,
  notrixDefaultDocument as defaultDocument,
  notrixEditorStorageKey as storageKey,
  notrixLayoutPublishedEvent,
  notrixPublishedLayoutKey,
  type NotrixBlockId as BlockId,
  type NotrixCardSettings as CardSettings,
  type NotrixEditorDocument as EditorDocument,
  type NotrixRect as Rect,
  type NotrixViewport as Viewport,
} from '@/data/notrix/editor-layout';
import { notrixConversations } from '@/data/notrix/landing';

const blockLabels: Record<BlockId, string> = {
  orbits: 'Orbital system',
  navigation: 'Navigation',
  headline: 'Headline',
  description: 'Description',
  actions: 'Actions',
  conversations: 'Conversation cards',
};
const viewportClasses: Record<Viewport, string> = {
  desktop: 'aspect-[16/9] max-w-6xl',
  tablet: 'aspect-[3/4] max-w-xl',
  mobile: 'aspect-[9/16] max-w-sm',
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const round = (value: number) => Math.round(value * 10) / 10;

function EditableFrame({
  id,
  rect,
  canvasRef,
  selected,
  preview,
  snapToGrid,
  onSelect,
  onChange,
  children,
}: {
  id: BlockId;
  rect: Rect;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  selected: boolean;
  preview: boolean;
  snapToGrid: boolean;
  onSelect: (id: BlockId) => void;
  onChange: (id: BlockId, rect: Rect) => void;
  children: ReactNode;
}) {
  const interaction = useRef<{
    type: 'move' | 'resize';
    x: number;
    y: number;
    rect: Rect;
  } | null>(null);

  const begin = (
    event: ReactPointerEvent<HTMLElement>,
    type: 'move' | 'resize',
  ) => {
    if (preview) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    onSelect(id);
    interaction.current = {
      type,
      x: event.clientX,
      y: event.clientY,
      rect,
    };
  };

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    const active = interaction.current;
    const canvas = canvasRef.current?.getBoundingClientRect();
    if (!active || !canvas) return;

    const step = snapToGrid ? 1 : 0.1;
    const snap = (value: number) => Math.round(value / step) * step;
    const deltaX = ((event.clientX - active.x) / canvas.width) * 100;
    const deltaY = ((event.clientY - active.y) / canvas.height) * 100;
    const next = { ...active.rect };

    if (active.type === 'move') {
      next.x = clamp(snap(active.rect.x + deltaX), 0, 100 - next.width);
      next.y = clamp(snap(active.rect.y + deltaY), 0, 100 - next.height);
    } else {
      next.width = clamp(
        snap(active.rect.width + deltaX),
        8,
        100 - active.rect.x,
      );
      next.height = clamp(
        snap(active.rect.height + deltaY),
        5,
        100 - active.rect.y,
      );
    }

    onChange(id, {
      x: round(next.x),
      y: round(next.y),
      width: round(next.width),
      height: round(next.height),
    });
  };

  const finish = () => {
    interaction.current = null;
  };

  const keyboardMove = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      preview ||
      !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
    ) {
      return;
    }
    event.preventDefault();
    const amount = event.shiftKey ? 5 : 1;
    const next = { ...rect };
    if (event.key === 'ArrowLeft') next.x -= amount;
    if (event.key === 'ArrowRight') next.x += amount;
    if (event.key === 'ArrowUp') next.y -= amount;
    if (event.key === 'ArrowDown') next.y += amount;
    next.x = clamp(next.x, 0, 100 - next.width);
    next.y = clamp(next.y, 0, 100 - next.height);
    onChange(id, next);
  };

  return (
    <div
      role={preview ? undefined : 'button'}
      tabIndex={preview ? -1 : 0}
      aria-label={preview ? undefined : `Edit ${blockLabels[id]}`}
      className={`absolute touch-none outline-none ${id === 'orbits' ? 'z-0' : 'z-10'} ${preview ? '' : 'cursor-move'} ${selected && !preview ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`}
      style={{
        left: `${rect.x}%`,
        top: `${rect.y}%`,
        width: `${rect.width}%`,
        height: `${rect.height}%`,
      }}
      onPointerDown={(event) => begin(event, 'move')}
      onPointerMove={move}
      onPointerUp={finish}
      onPointerCancel={finish}
      onKeyDown={keyboardMove}
    >
      {!preview && (
        <span className="absolute -top-6 left-0 rounded-md bg-primary-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
          {blockLabels[id]}
        </span>
      )}
      <div className="size-full">{children}</div>
      {selected && !preview && (
        <button
          type="button"
          aria-label={`Resize ${blockLabels[id]}`}
          className="absolute -bottom-2 -right-2 size-5 cursor-se-resize rounded-full border-2 border-white bg-primary-600 shadow-md"
          onPointerDown={(event) => begin(event, 'resize')}
        />
      )}
    </div>
  );
}

function OrbitPreview({ active }: { active: boolean }) {
  const tracks = [
    {
      size: 90,
      orbit: 'animate-notrix-orbit-four',
      counter: 'animate-notrix-counter-four',
      badges: [
        <Image
          key="slack"
          src="/static/images/integrations/slack.svg"
          alt="Slack"
          width={24}
          height={24}
        />,
        <SiGithub key="github" color={SiGithubHex} className="size-5" />,
      ],
    },
    {
      size: 72,
      orbit: 'animate-notrix-orbit-three',
      counter: 'animate-notrix-counter-three',
      badges: [
        <SiGoogledrive
          key="drive"
          color={SiGoogledriveHex}
          className="size-5"
        />,
        <SiNotion key="notion" color={SiNotionHex} className="size-5" />,
      ],
    },
    {
      size: 54,
      orbit: 'animate-notrix-orbit-two',
      counter: 'animate-notrix-counter-two',
      badges: [
        <SiJira key="jira" color={SiJiraHex} className="size-5" />,
        <SiConfluence
          key="confluence"
          color={SiConfluenceHex}
          className="size-5"
        />,
      ],
    },
  ];

  return (
    <div className="relative size-full">
      {tracks.map(({ size, orbit, counter, badges }) => (
        <div
          key={size}
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200"
          style={{ width: `${size}%` }}
        >
          <div
            className={`absolute inset-0 ${orbit} motion-reduce:animate-none`}
            style={{ animationPlayState: active ? 'running' : 'paused' }}
          >
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`absolute left-1/2 ${index === 0 ? 'top-0 -translate-y-1/2' : 'bottom-0 translate-y-1/2'} -translate-x-1/2`}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md ${counter} motion-reduce:animate-none`}
                  style={{
                    animationPlayState: active ? 'running' : 'paused',
                  }}
                >
                  {badge}
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function NumberField({
  label,
  value,
  minimum,
  maximum,
  onChange,
}: {
  label: string;
  value: number;
  minimum: number;
  maximum: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1 text-xs font-medium text-neutral-600">
      {label}
      <input
        type="number"
        min={minimum}
        max={maximum}
        step="0.1"
        value={value}
        onChange={(event) => {
          const next = event.currentTarget.valueAsNumber;
          if (Number.isFinite(next)) onChange(clamp(next, minimum, maximum));
        }}
        className="h-9 rounded-lg border-neutral-200 bg-white px-2 text-sm text-neutral-950 focus:border-primary-500 focus:ring-primary-500"
      />
    </label>
  );
}

export function NotrixLayoutEditor() {
  const [document, setDocument] = useState<EditorDocument>(defaultDocument);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [selected, setSelected] = useState<BlockId>('headline');
  const [preview, setPreview] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [liveMotion, setLiveMotion] = useState(true);
  const [conversationIndex, setConversationIndex] = useState(0);
  const [status, setStatus] = useState('Saved locally');
  const canvasRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const hydrated = useRef(false);
  const layout = document.layouts[viewport];
  const cards = document.cards[viewport];
  const visibleConversations = Array.from(
    { length: 3 },
    (_, index) =>
      notrixConversations[
        (conversationIndex + index) % notrixConversations.length
      ],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (isEditorDocument(parsed)) setDocument(parsed);
      }
    } catch {
      setStatus('Browser storage unavailable');
    } finally {
      hydrated.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    setStatus('Saving…');
    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(document));
        setStatus('Saved locally');
      } catch {
        setStatus('Browser storage unavailable');
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [document]);

  useEffect(() => {
    if (!liveMotion) return;
    const timer = window.setInterval(
      () =>
        setConversationIndex(
          (current) => (current + 1) % notrixConversations.length,
        ),
      4500,
    );
    return () => window.clearInterval(timer);
  }, [liveMotion]);

  const updateBlock = (id: BlockId, rect: Rect) => {
    setDocument((current) => ({
      ...current,
      layouts: {
        ...current.layouts,
        [viewport]: { ...current.layouts[viewport], [id]: rect },
      },
    }));
  };

  const updateCards = (key: keyof CardSettings, value: number) => {
    setDocument((current) => ({
      ...current,
      cards: {
        ...current.cards,
        [viewport]: { ...current.cards[viewport], [key]: value },
      },
    }));
  };

  const exportLayout = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(document, null, 2)], {
        type: 'application/json',
      }),
    );
    const anchor = window.document.createElement('a');
    anchor.href = url;
    anchor.download = 'notrix-layout.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importLayout = async (file?: File) => {
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isEditorDocument(parsed)) throw new Error('Invalid layout');
      setDocument(parsed);
      setStatus('Layout imported');
    } catch {
      setStatus('That file is not a valid Notrix layout');
    }
  };

  const publishLayout = () => {
    window.localStorage.setItem(
      notrixPublishedLayoutKey,
      JSON.stringify(document),
    );
    window.dispatchEvent(new Event(notrixLayoutPublishedEvent));
    setStatus('Applied to /notrix');
  };

  const resetPublishedLayout = () => {
    window.localStorage.removeItem(notrixPublishedLayoutKey);
    window.dispatchEvent(new Event(notrixLayoutPublishedEvent));
    setStatus('/notrix reset to default');
  };

  const currentRect = layout[selected];

  return (
    <main className="min-h-screen w-full bg-neutral-100 text-neutral-950">
      <header className="sticky top-0 z-50 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/static/images/notrix-logo.png"
            alt=""
            width={40}
            height={40}
            className="size-9 rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-semibold">Notrix Layout Editor</p>
            <p className="text-xs text-neutral-500">{status}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex rounded-xl border border-neutral-200 bg-neutral-50 p-1">
            {(
              [
                ['desktop', Monitor],
                ['tablet', Tablet],
                ['mobile', Smartphone],
              ] as const
            ).map(([mode, Icon]) => (
              <button
                key={mode}
                type="button"
                aria-label={`${mode} canvas`}
                onClick={() => setViewport(mode)}
                className={`flex size-8 items-center justify-center rounded-lg ${viewport === mode ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'}`}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSnapToGrid((current) => !current)}
            className={`inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-semibold ${snapToGrid ? 'border-primary-200 bg-primary-50 text-primary-700' : 'border-neutral-200 bg-white text-neutral-600'}`}
          >
            <Grid3X3 className="size-4" /> Grid
          </button>
          <button
            type="button"
            onClick={() => setPreview((current) => !current)}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            {preview ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            type="button"
            aria-pressed={liveMotion}
            onClick={() => setLiveMotion((current) => !current)}
            className={`inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-semibold ${liveMotion ? 'border-primary-200 bg-primary-50 text-primary-700' : 'border-neutral-200 bg-white text-neutral-600'}`}
          >
            {liveMotion ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
            {liveMotion ? 'Motion on' : 'Motion off'}
          </button>
          <button
            type="button"
            onClick={() => {
              setDocument((current) => ({
                ...current,
                layouts: {
                  ...current.layouts,
                  [viewport]: defaultDocument.layouts[viewport],
                },
                cards: {
                  ...current.cards,
                  [viewport]: defaultDocument.cards[viewport],
                },
              }));
              setStatus(`${viewport} layout reset`);
            }}
            className="inline-flex size-9 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
            aria-label="Reset current canvas"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            type="button"
            onClick={publishLayout}
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-neutral-950 px-3 text-xs font-semibold text-white hover:bg-neutral-800"
          >
            <Save className="size-4" /> Apply to /notrix
          </button>
          <button
            type="button"
            onClick={resetPublishedLayout}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            <RotateCcw className="size-4" /> Reset live page
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => importLayout(event.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => importRef.current?.click()}
            className="inline-flex size-9 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
            aria-label="Import layout"
          >
            <Upload className="size-4" />
          </button>
          <button
            type="button"
            onClick={exportLayout}
            className="inline-flex h-9 items-center gap-2 rounded-xl bg-neutral-950 px-3 text-xs font-semibold text-white hover:bg-neutral-800"
          >
            <Download className="size-4" /> Export
          </button>
          <Link
            href="/notrix"
            target="_blank"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
            aria-label="Open Notrix page"
          >
            <ExternalLink className="size-4" />
          </Link>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section
          className="overflow-auto p-4 lg:p-8"
          aria-label="Editor canvas"
        >
          <div className="flex min-h-full items-start justify-center">
            <div
              ref={canvasRef}
              onPointerDown={() => !preview && setSelected('headline')}
              className={`relative w-full overflow-hidden border border-neutral-200 bg-white shadow-2xl shadow-neutral-300/50 ${viewportClasses[viewport]}`}
            >
              <EditableFrame
                id="orbits"
                rect={layout.orbits}
                canvasRef={canvasRef}
                selected={selected === 'orbits'}
                preview={preview}
                snapToGrid={snapToGrid}
                onSelect={setSelected}
                onChange={updateBlock}
              >
                <OrbitPreview active={liveMotion} />
              </EditableFrame>

              <EditableFrame
                id="navigation"
                rect={layout.navigation}
                canvasRef={canvasRef}
                selected={selected === 'navigation'}
                preview={preview}
                snapToGrid={snapToGrid}
                onSelect={setSelected}
                onChange={updateBlock}
              >
                <div className="flex size-full items-center justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white px-[3%] shadow-xl">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/static/images/notrix-logo.png"
                      alt=""
                      width={30}
                      height={30}
                      className="size-7 rounded-md object-cover"
                    />
                    <span className="text-xs font-semibold sm:text-sm">
                      Notrix
                    </span>
                  </div>
                  {viewport !== 'mobile' && (
                    <div className="flex items-center gap-5 text-xs text-neutral-600">
                      <span>Product</span>
                      <span>How it works</span>
                      <span>Security</span>
                    </div>
                  )}
                  <span className="rounded-full bg-neutral-950 px-3 py-2 text-[10px] font-semibold text-white sm:text-xs">
                    Book a demo
                  </span>
                </div>
              </EditableFrame>

              <EditableFrame
                id="headline"
                rect={layout.headline}
                canvasRef={canvasRef}
                selected={selected === 'headline'}
                preview={preview}
                snapToGrid={snapToGrid}
                onSelect={setSelected}
                onChange={updateBlock}
              >
                <div className="flex size-full items-center justify-center overflow-hidden text-center">
                  <h1
                    className={`text-balance font-semibold leading-tight tracking-tight ${viewport === 'desktop' ? 'text-4xl' : viewport === 'tablet' ? 'text-3xl' : 'text-2xl'}`}
                  >
                    Your company&apos;s knowledge, connected.
                    <span className="block">Your data stays with you.</span>
                  </h1>
                </div>
              </EditableFrame>

              <EditableFrame
                id="description"
                rect={layout.description}
                canvasRef={canvasRef}
                selected={selected === 'description'}
                preview={preview}
                snapToGrid={snapToGrid}
                onSelect={setSelected}
                onChange={updateBlock}
              >
                <div className="flex size-full items-center justify-center overflow-hidden text-center text-[clamp(0.65rem,1.3vw,1rem)] leading-relaxed text-neutral-600">
                  Ask questions in Slack. Get answers with sources from your
                  company&apos;s knowledge, stored in your own cloud.
                </div>
              </EditableFrame>

              <EditableFrame
                id="actions"
                rect={layout.actions}
                canvasRef={canvasRef}
                selected={selected === 'actions'}
                preview={preview}
                snapToGrid={snapToGrid}
                onSelect={setSelected}
                onChange={updateBlock}
              >
                <div className="flex size-full items-center justify-center gap-2 overflow-hidden">
                  <span className="whitespace-nowrap rounded-full bg-neutral-950 px-4 py-2 text-[10px] font-semibold text-white sm:text-xs">
                    Book a demo
                  </span>
                  <span className="whitespace-nowrap rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] font-semibold text-neutral-700 sm:text-xs">
                    See how it works
                  </span>
                </div>
              </EditableFrame>

              <EditableFrame
                id="conversations"
                rect={layout.conversations}
                canvasRef={canvasRef}
                selected={selected === 'conversations'}
                preview={preview}
                snapToGrid={snapToGrid}
                onSelect={setSelected}
                onChange={updateBlock}
              >
                <div className="relative flex size-full flex-col items-center overflow-visible bg-gradient-to-b from-primary-50/20 via-secondary-50/50 to-cyan-50/60 pt-1">
                  {visibleConversations.map((conversation, index) => (
                    <article
                      key={`${conversationIndex}-${conversation.sender}`}
                      className={`relative flex items-start gap-2 border border-neutral-200 bg-white px-3 py-2 text-left shadow-lg ${liveMotion ? 'animate-fade-in-down-faster motion-reduce:animate-none' : ''}`}
                      style={{
                        width: `${clamp(cards.width - index * 6, 55, 100)}%`,
                        minHeight: cards.height,
                        marginTop: index === 0 ? 0 : -cards.overlap,
                        borderRadius: cards.radius,
                        zIndex: 3 - index,
                      }}
                    >
                      <Image
                        src={conversation.avatar}
                        alt=""
                        width={28}
                        height={28}
                        className="size-7 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0 text-[9px] leading-snug sm:text-[11px]">
                        <p className="font-semibold text-neutral-900">
                          {conversation.sender}{' '}
                          <span className="font-normal text-neutral-400">
                            {conversation.channel}
                          </span>
                        </p>
                        <p className="line-clamp-2 text-neutral-600">
                          {conversation.before}
                          <strong>{conversation.emphasis}</strong>
                          {conversation.after}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </EditableFrame>
            </div>
          </div>
        </section>

        <aside className="border-t border-neutral-200 bg-white p-5 lg:border-l lg:border-t-0">
          <div className="sticky top-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Inspector
            </p>
            <h2 className="mt-2 text-lg font-semibold">
              {blockLabels[selected]}
            </h2>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              Drag the block, use its resize handle, or enter exact percentages.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {(
                [
                  ['X', 'x'],
                  ['Y', 'y'],
                  ['Width', 'width'],
                  ['Height', 'height'],
                ] as const
              ).map(([label, key]) => (
                <NumberField
                  key={key}
                  label={`${label} %`}
                  value={currentRect[key]}
                  minimum={key === 'width' || key === 'height' ? 5 : 0}
                  maximum={100}
                  onChange={(value) =>
                    updateBlock(selected, { ...currentRect, [key]: value })
                  }
                />
              ))}
            </div>

            {selected === 'conversations' && (
              <div className="mt-6 border-t border-neutral-200 pt-5">
                <h3 className="text-sm font-semibold">Card dimensions</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <NumberField
                    label="Width %"
                    value={cards.width}
                    minimum={55}
                    maximum={100}
                    onChange={(value) => updateCards('width', value)}
                  />
                  <NumberField
                    label="Height"
                    value={cards.height}
                    minimum={40}
                    maximum={120}
                    onChange={(value) => updateCards('height', value)}
                  />
                  <NumberField
                    label="Overlap"
                    value={cards.overlap}
                    minimum={0}
                    maximum={40}
                    onChange={(value) => updateCards('overlap', value)}
                  />
                  <NumberField
                    label="Radius"
                    value={cards.radius}
                    minimum={4}
                    maximum={32}
                    onChange={(value) => updateCards('radius', value)}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-neutral-200 pt-5">
              <h3 className="text-sm font-semibold">Layers</h3>
              <div className="mt-3 space-y-1">
                {blockOrder.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSelected(id);
                      setPreview(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs ${selected === id ? 'bg-primary-50 font-semibold text-primary-700' : 'text-neutral-600 hover:bg-neutral-50'}`}
                  >
                    {blockLabels[id]}
                    <span className="text-neutral-400">
                      {Math.round(layout[id].width)}×
                      {Math.round(layout[id].height)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
