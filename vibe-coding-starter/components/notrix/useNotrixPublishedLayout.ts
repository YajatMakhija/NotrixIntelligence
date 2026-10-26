'use client';

import { useEffect, useState } from 'react';

import {
  isNotrixEditorDocument,
  notrixLayoutPublishedEvent,
  notrixPublishedLayoutKey,
  type NotrixEditorDocument,
  type NotrixViewport,
} from '@/data/notrix/editor-layout';

const currentViewport = (): NotrixViewport => {
  if (window.innerWidth < 640) return 'mobile';
  if (window.innerWidth < 1024) return 'tablet';
  return 'desktop';
};

export function useNotrixPublishedLayout() {
  const [document, setDocument] = useState<NotrixEditorDocument | null>(null);
  const [viewport, setViewport] = useState<NotrixViewport>('desktop');

  useEffect(() => {
    const sync = () => {
      setViewport(currentViewport());
      try {
        const saved = window.localStorage.getItem(notrixPublishedLayoutKey);
        const parsed: unknown = saved ? JSON.parse(saved) : null;
        setDocument(isNotrixEditorDocument(parsed) ? parsed : null);
      } catch {
        setDocument(null);
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === notrixPublishedLayoutKey) sync();
    };

    sync();
    window.addEventListener('resize', sync);
    window.addEventListener('storage', onStorage);
    window.addEventListener(notrixLayoutPublishedEvent, sync);
    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(notrixLayoutPublishedEvent, sync);
    };
  }, []);

  return { document, viewport };
}
