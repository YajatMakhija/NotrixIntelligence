'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';

const options = [
  { id: 'system', label: 'System', Icon: Monitor },
  { id: 'light', label: 'Light', Icon: Sun },
  { id: 'dark', label: 'Dark', Icon: Moon },
] as const;

// Footer theme switch. "System" follows the device; the choice is shared with app.notrix.si (theme-providers).
export function NotrixThemePicker() {
  const { theme, setTheme } = useTheme();
  // The saved choice is only known in the browser; show no selection until then (no hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div role="radiogroup" aria-label="Theme" className="inline-flex items-center gap-1 rounded-full border border-neutral-200 p-1 dark:border-neutral-800">
      {options.map(({ id, label, Icon }) => {
        const on = mounted && theme === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={label}
            title={label}
            onClick={() => setTheme(id)}
            className={`flex size-7 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 ${
              on
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
