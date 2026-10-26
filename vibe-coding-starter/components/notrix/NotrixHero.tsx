'use client';

import { useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  SiConfluence,
  SiConfluenceHex,
  SiGithub,
  SiGithubHex,
  SiGoogledocs,
  SiGoogledocsHex,
  SiGoogledrive,
  SiGoogledriveHex,
  SiJira,
  SiJiraHex,
  SiNotion,
  SiNotionHex,
} from '@icons-pack/react-simple-icons';

import { NotrixConversationStack } from '@/components/notrix/NotrixConversationStack';
import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { useNotrixPublishedLayout } from '@/components/notrix/useNotrixPublishedLayout';
import type { NotrixRect } from '@/data/notrix/editor-layout';

const integrations = {
  slack: {
    label: 'Slack',
    artwork: (
      <Image
        src="/static/images/integrations/slack.svg"
        alt=""
        width={32}
        height={32}
        className="size-7 object-contain"
      />
    ),
  },
  teams: {
    label: 'Microsoft Teams',
    artwork: (
      <Image
        src="/static/images/integrations/microsoft-teams.svg"
        alt=""
        width={32}
        height={32}
        className="size-7 object-contain"
      />
    ),
  },
  docs: {
    label: 'Google Docs',
    artwork: <SiGoogledocs color={SiGoogledocsHex} className="size-7" />,
  },
  jira: {
    label: 'Jira',
    artwork: <SiJira color={SiJiraHex} className="size-7" />,
  },
  drive: {
    label: 'Google Drive',
    artwork: <SiGoogledrive color={SiGoogledriveHex} className="size-7" />,
  },
  confluence: {
    label: 'Confluence',
    artwork: <SiConfluence color={SiConfluenceHex} className="size-7" />,
  },
  notion: {
    label: 'Notion',
    artwork: <SiNotion color={SiNotionHex} className="size-7" />,
  },
  github: {
    label: 'GitHub',
    artwork: <SiGithub color={SiGithubHex} className="size-7" />,
  },
} as const;

const orbitPairs = [
  {
    first: integrations.slack,
    second: integrations.teams,
    radius: 39,
    ellipseScale: 1.35,
    startAngle: 70,
    visibility: 'block',
    reverse: false,
    orbitAnimation: 'animate-notrix-orbit-one',
    counterAnimation: 'animate-notrix-counter-one',
  },
  {
    first: integrations.docs,
    second: integrations.jira,
    radius: 42,
    ellipseScale: 1.42,
    startAngle: 83,
    visibility: 'hidden sm:block',
    reverse: true,
    orbitAnimation: 'animate-notrix-orbit-one',
    counterAnimation: 'animate-notrix-counter-one',
  },
  {
    first: integrations.drive,
    second: integrations.confluence,
    radius: 45,
    ellipseScale: 1.49,
    startAngle: 97,
    visibility: 'hidden lg:block',
    reverse: false,
    orbitAnimation: 'animate-notrix-orbit-one',
    counterAnimation: 'animate-notrix-counter-one',
  },
  {
    first: integrations.notion,
    second: integrations.github,
    radius: 48,
    ellipseScale: 1.52,
    startAngle: 110,
    visibility: 'hidden lg:block',
    reverse: true,
    orbitAnimation: 'animate-notrix-orbit-one',
    counterAnimation: 'animate-notrix-counter-one',
  },
] as const;

function OrbitLogo({
  integration,
  position,
  counterAngle,
  counterAnimation,
  visibility,
  reverse,
  ellipseScale,
}: {
  integration: (typeof integrations)[keyof typeof integrations];
  position: 'top' | 'bottom';
  counterAngle: number;
  counterAnimation: string;
  visibility: string;
  reverse: boolean;
  ellipseScale: number;
}) {
  return (
    <span
      data-orbit-position={position}
      className={`notrix-orbit-logo absolute left-1/2 z-10 size-14 -translate-x-1/2 items-center justify-center ${visibility} ${position === 'top' ? 'top-0 -translate-y-1/2' : 'bottom-0 translate-y-1/2'}`}
    >
      <span
        className="flex size-full"
        style={{ transform: `rotate(${-counterAngle}deg)` }}
      >
        <span
          className={`flex size-full items-center justify-center motion-reduce:animate-none ${counterAnimation} ${reverse ? '[animation-direction:reverse]' : ''}`}
        >
          <span
            className="flex size-full items-center justify-center rounded-full border border-neutral-200/80 bg-white shadow-lg shadow-neutral-200/60"
            style={{ transform: `scaleX(${1 / ellipseScale})` }}
          >
            {integration.artwork}
            <span className="sr-only">{integration.label}</span>
          </span>
        </span>
      </span>
    </span>
  );
}

const TRAIL_SPAN = 48; // degrees of arc behind each logo

function orbitPoint(angle: number) {
  const radians = (angle * Math.PI) / 180;
  // Rounded so server and browser trig agree (avoids a hydration mismatch).
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return {
    x: round(50 + 50 * Math.cos(radians)),
    y: round(50 + 50 * Math.sin(radians)),
  };
}

// One gradient arc per logo, fading out behind it. Clockwise orbits trail on the
// counter-clockwise side; reversed orbits trail on the clockwise side.
function OrbitTrails({ reverse }: { reverse: boolean }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 size-full overflow-visible"
      aria-hidden="true"
    >
      {[-90, 90].map((headAngle) => {
        const head = orbitPoint(headAngle);
        const tail = orbitPoint(headAngle + (reverse ? TRAIL_SPAN : -TRAIL_SPAN));
        const gradientId = `${id}-trail-${headAngle}`;
        return (
          <g key={headAngle}>
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1={tail.x}
                y1={tail.y}
                x2={head.x}
                y2={head.y}
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3157e8" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <path
              d={`M ${tail.x} ${tail.y} A 50 50 0 0 ${reverse ? 0 : 1} ${head.x} ${head.y}`}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

function OrbitPair({ pair }: { pair: (typeof orbitPairs)[number] }) {
  return (
    <div
      data-orbit-radius={pair.radius}
      className={`absolute left-1/2 top-1/2 aspect-square ${pair.visibility}`}
      style={{
        width: `${pair.radius * 2}%`,
        transform: `translate(-50%, -50%) scaleX(${pair.ellipseScale})`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full border border-neutral-200/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ transform: `rotate(${pair.startAngle}deg)` }}
      >
        <div
          className={`absolute inset-0 motion-reduce:animate-none ${pair.orbitAnimation} ${pair.reverse ? '[animation-direction:reverse]' : ''}`}
        >
          <OrbitTrails reverse={pair.reverse} />
          <OrbitLogo
            integration={pair.first}
            position="top"
            counterAngle={pair.startAngle}
            counterAnimation={pair.counterAnimation}
            visibility="flex"
            reverse={pair.reverse}
            ellipseScale={pair.ellipseScale}
          />
          <OrbitLogo
            integration={pair.second}
            position="bottom"
            counterAngle={pair.startAngle}
            counterAnimation={pair.counterAnimation}
            visibility="flex"
            reverse={pair.reverse}
            ellipseScale={pair.ellipseScale}
          />
        </div>
      </div>
    </div>
  );
}

function IntegrationEcosystem({ rect }: { rect?: NotrixRect }) {
  return (
    <div
      // Full window width so the outer orbits aren't cut at the content edges.
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 overflow-hidden md:block"
      aria-hidden="true"
      style={{
        maskImage:
          'linear-gradient(to bottom, black calc(100% - 8rem), transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black calc(100% - 8rem), transparent 100%)',
      }}
    >
      <div
        data-orbit-system
        className="absolute aspect-square w-full max-w-5xl -translate-x-1/2 -translate-y-1/2"
        style={{
          left: '50%',
          top: '21rem',
          width: rect ? `${rect.width}%` : undefined,
        }}
      >
        {orbitPairs.map((pair) => (
          <OrbitPair key={pair.first.label} pair={pair} />
        ))}
      </div>
    </div>
  );
}

function frameStyle(rect: NotrixRect): React.CSSProperties {
  return {
    width: `${rect.width}%`,
    marginInline: 'auto',
  };
}

function layoutGap(previous: NotrixRect, current: NotrixRect, minimum = 0.75) {
  return `${Math.max(minimum, (current.y - previous.y - previous.height) * 0.4)}rem`;
}

export function NotrixHero() {
  const { document, viewport } = useNotrixPublishedLayout();

  const headline = (
    <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-neutral-950 sm:text-5xl">
      Your company&apos;s knowledge, connected.
      <span className="block">Your data stays with you.</span>
    </h1>
  );
  const description = (
    <p className="max-w-xl text-pretty text-base leading-6 text-neutral-600 sm:text-lg sm:leading-7">
      Ask questions in Slack. Get answers with sources from your company&apos;s
      knowledge, stored in your own cloud.
    </p>
  );
  const actions = (
    <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
      <NotrixDemoTrigger className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white shadow-lg shadow-neutral-300/50 transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
        Book a demo
        <ArrowRight className="size-4" aria-hidden="true" />
      </NotrixDemoTrigger>
      <Link
        href="#how-it-works"
        className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white/90 px-6 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        See how it works
      </Link>
    </div>
  );

  const layout = document?.layouts[viewport];
  const topPadding = layout
    ? `${Math.max(2.5, (layout.headline.y - layout.navigation.y - layout.navigation.height) * 0.36)}rem`
    : undefined;

  return (
    <section
      id="product"
      className={`relative px-5 pb-16 sm:px-6 sm:pb-20 ${layout ? '' : 'pt-20 sm:pt-24'}`}
      style={{ paddingTop: topPadding }}
    >
      <IntegrationEcosystem rect={layout?.orbits} />

      <div
        className="relative z-10 flex items-center justify-center text-center"
        style={layout ? frameStyle(layout.headline) : undefined}
      >
        {headline}
      </div>
      <div
        className="relative z-10 flex items-center justify-center text-center"
        style={
          layout
            ? {
                ...frameStyle(layout.description),
                marginTop: layoutGap(layout.headline, layout.description, 1.25),
              }
            : { marginTop: '1.25rem' }
        }
      >
        {description}
      </div>
      <div
        className="relative z-10 flex items-center justify-center"
        style={
          layout
            ? {
                ...frameStyle(layout.actions),
                marginTop: layoutGap(layout.description, layout.actions, 1.5),
              }
            : { marginTop: '1.5rem' }
        }
      >
        {actions}
      </div>
      <div
        className="relative z-10"
        style={
          layout
            ? {
                ...frameStyle(layout.conversations),
                marginTop: layoutGap(layout.actions, layout.conversations, 1.5),
              }
            : undefined
        }
      >
        <NotrixConversationStack
          flush={Boolean(layout)}
          settings={document?.cards[viewport]}
        />
      </div>
    </section>
  );
}
