'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { siteConfig } from '@/data/config/site.settings';

// One appearance choice for notrix.si and app.notrix.si: a light or dark choice lives in the
// "notrix-theme" cookie on the whole notrix.si domain; no cookie means follow the device.
const COOKIE = 'notrix-theme';

function SharedThemeCookie() {
  const { theme, setTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  // First: take the shared choice (it may have been made in the Notrix dashboard).
  useEffect(() => {
    const saved = document.cookie.match(/(?:^|; )notrix-theme=(light|dark)(?:;|$)/)?.[1];
    setTheme(saved ?? 'system');
    setLoaded(true);
  }, [setTheme]);

  // Then: a choice made here (the header toggle) is shared back.
  useEffect(() => {
    if (!loaded || !theme) return;
    const host = window.location.hostname;
    const domain = host === 'notrix.si' || host.endsWith('.notrix.si') ? '; domain=notrix.si' : '';
    const secure = window.location.protocol === 'https:' ? '; secure' : '';
    document.cookie = theme === 'light' || theme === 'dark'
      ? `${COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax${domain}${secure}`
      : `${COOKIE}=; path=/; max-age=0; samesite=lax${domain}${secure}`;
  }, [loaded, theme]);

  return null;
}

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteConfig.theme}
      enableSystem
    >
      <SharedThemeCookie />
      {children}
    </ThemeProvider>
  );
}
