import { ReactNode, useId } from 'react';

// Site-wide look: a sculpted blue-purple ribbon behind frosted glass panels.

export const notrixFocusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2';

export const notrixCtaClass = `inline-flex h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white shadow-lg shadow-neutral-300/50 transition-colors hover:bg-neutral-800 ${notrixFocusRing}`;

export const notrixSecondaryCtaClass = `inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white/90 px-6 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition-colors hover:bg-neutral-50 ${notrixFocusRing}`;

export const notrixEyebrowClass =
  'text-xs font-semibold uppercase tracking-[0.12em] text-secondary-700';

// Decorative SVG ribbon: layered strokes along one curve plus a grain overlay.
export function NotrixRibbon({ className }: { className: string }) {
  const id = useId().replace(/:/g, '');
  const curve = `${id}-curve`;
  const back = `${id}-back`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1517 646"
      preserveAspectRatio="xMidYMax slice"
      // Fade the bottom edge so the ribbon melts into the next section instead of being cut off.
      className={`[mask-image:linear-gradient(to_bottom,black_78%,transparent)] ${className}`}
    >
      <defs>
        <path
          id={curve}
          d="M300 800 C460 640 610 500 820 440 C1050 375 1190 330 1310 250 C1410 185 1490 150 1660 110"
        />
        <path id={back} d="M420 800 C590 660 720 570 900 530 C1120 480 1300 385 1660 290" />
        <linearGradient id={`${id}-body`} gradientUnits="userSpaceOnUse" x1="200" y1="700" x2="1550" y2="120">
          <stop offset="0" stopColor="#93C5FD" />
          <stop offset="0.3" stopColor="#3b82f6" />
          <stop offset="0.65" stopColor="#2563EB" />
          <stop offset="1" stopColor="#3157e8" />
        </linearGradient>
        <linearGradient id={`${id}-recess`} gradientUnits="userSpaceOnUse" x1="250" y1="760" x2="1600" y2="300">
          <stop offset="0" stopColor="#1D4ED8" />
          <stop offset="0.5" stopColor="#172554" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} gradientUnits="userSpaceOnUse" x1="200" y1="700" x2="1550" y2="120">
          <stop offset="0" stopColor="#DBEAFE" />
          <stop offset="0.5" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#BFDBFE" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.55" />
          </feComponentTransfer>
        </filter>
        <mask id={`${id}-mask`}>
          <use href={`#${back}`} fill="none" stroke="#fff" strokeWidth="112" />
          <use href={`#${curve}`} fill="none" stroke="#fff" strokeWidth="172" />
        </mask>
      </defs>

      <g fill="none" strokeLinecap="round">
        <use href={`#${curve}`} stroke="#1E3A8A" strokeOpacity="0.28" strokeWidth="170" filter={`url(#${id}-soft)`} transform="translate(0 34)" />
        <use href={`#${back}`} stroke={`url(#${id}-recess)`} strokeWidth="110" />
        <use href={`#${back}`} stroke="#DBEAFE" strokeOpacity="0.45" strokeWidth="1.5" transform="translate(0 -52)" />
        <use href={`#${curve}`} stroke={`url(#${id}-recess)`} strokeWidth="172" transform="translate(0 8)" />
        <use href={`#${curve}`} stroke={`url(#${id}-body)`} strokeWidth="150" />
        <use href={`#${curve}`} stroke={`url(#${id}-shine)`} strokeOpacity="0.7" strokeWidth="56" transform="translate(0 -30)" />
        <use href={`#${curve}`} stroke="#DBEAFE" strokeOpacity="0.8" strokeWidth="2" transform="translate(0 -72)" />
        <use href={`#${curve}`} stroke="#BBB9B7" strokeOpacity="0.85" strokeWidth="1.5" transform="translate(0 -76)" />
        <use href={`#${curve}`} stroke="#DBEAFE" strokeOpacity="0.45" strokeWidth="1.5" transform="translate(0 -6)" />
        <use href={`#${curve}`} stroke="#DBEAFE" strokeOpacity="0.35" strokeWidth="1.5" transform="translate(0 30)" />
        <use href={`#${curve}`} stroke="#BBB9B7" strokeOpacity="0.6" strokeWidth="1.5" transform="translate(0 70)" />
      </g>
      <rect
        width="1517"
        height="646"
        filter={`url(#${id}-grain)`}
        mask={`url(#${id}-mask)`}
        style={{ mixBlendMode: 'multiply' }}
      />
    </svg>
  );
}

// Translucent grey frame around a frosted inner panel.
export const notrixGlassOuterClass = 'rounded-[9px] bg-neutral-500/[0.18] backdrop-blur-md dark:bg-neutral-500/[0.08]';
export const notrixGlassInnerClass =
  'rounded-[12px] border border-white/80 bg-gradient-to-b from-white/75 via-white/30 to-white/5 shadow-[inset_0_1px_0_rgb(var(--white)/0.75)] backdrop-blur-lg';

// Soft blue-purple wash so glass panels have colour behind them. Each glow fades out before the
// section's top and bottom edges, so stacked sections never meet in a visible line.
export const notrixWashClass =
  'bg-[radial-gradient(55%_40%_at_95%_40%,theme(colors.secondary.100),transparent),radial-gradient(45%_35%_at_5%_60%,rgb(var(--wash-blue)),transparent)]';

// Small frosted card for grids sitting on a wash.
export const notrixGlassCardClass =
  'rounded-2xl border border-white/80 bg-white/60 shadow-[0_8px_24px_-12px_rgba(23,37,84,0.18),inset_0_1px_0_rgb(var(--white)/0.8)] backdrop-blur-md';

export function NotrixGlassFrame({
  children,
  className = '',
  innerClassName = '',
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={`relative p-3 sm:p-4 ${notrixGlassOuterClass} ${className}`}>
      <div className={`relative h-full ${notrixGlassInnerClass} ${innerClassName}`}>{children}</div>
    </div>
  );
}
