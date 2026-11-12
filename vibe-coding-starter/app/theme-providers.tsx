'use client';

import { useEffect } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { siteConfig } from '@/data/config/site.settings';

// One appearance choice for notrix.si and app.notrix.si: a light or dark choice lives in the
// "notrix-theme" cookie on the whole notrix.si domain; no cookie means follow the device.
// Reading it happens before first paint (the script in app/layout.tsx); this only writes a change back.
const COOKIE = 'notrix-theme';

function SharedThemeCookie() {
  const { theme } = useTheme();

  useEffect(() => {
    if (!theme) return;
    const host = window.location.hostname;
    const domain = host === 'notrix.si' || host.endsWith('.notrix.si') ? '; domain=notrix.si' : '';
    const secure = window.location.protocol === 'https:' ? '; secure' : '';
    document.cookie = theme === 'light' || theme === 'dark'
      ? `${COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax${domain}${secure}`
      : `${COOKIE}=; path=/; max-age=0; samesite=lax${domain}${secure}`;
  }, [theme]);

  return null;
}

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteConfig.theme}
      enableSystem
      disableTransitionOnChange
    >
      <SharedThemeCookie />
      {children}
    </ThemeProvider>
  );
}
