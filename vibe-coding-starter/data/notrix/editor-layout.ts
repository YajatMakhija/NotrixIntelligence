export type NotrixViewport = 'desktop' | 'tablet' | 'mobile';
export type NotrixBlockId =
  | 'orbits'
  | 'navigation'
  | 'headline'
  | 'description'
  | 'actions'
  | 'conversations';
export type NotrixRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type NotrixLayout = Record<NotrixBlockId, NotrixRect>;
export type NotrixCardSettings = {
  width: number;
  height: number;
  overlap: number;
  radius: number;
};
export type NotrixEditorDocument = {
  layouts: Record<NotrixViewport, NotrixLayout>;
  cards: Record<NotrixViewport, NotrixCardSettings>;
};

export const notrixEditorStorageKey = 'notrix-layout-editor-v2';
export const notrixPublishedLayoutKey = 'notrix-published-layout-v1';
export const notrixLayoutPublishedEvent = 'notrix-layout-published';

export const notrixBlockOrder: NotrixBlockId[] = [
  'orbits',
  'navigation',
  'headline',
  'description',
  'actions',
  'conversations',
];

export const notrixDefaultDocument: NotrixEditorDocument = {
  layouts: {
    desktop: {
      orbits: { x: 4, y: 7, width: 92, height: 88 },
      navigation: { x: 8, y: 3, width: 84, height: 9 },
      headline: { x: 14, y: 22, width: 72, height: 18 },
      description: { x: 29, y: 41, width: 42, height: 8 },
      actions: { x: 37, y: 50, width: 26, height: 8 },
      conversations: { x: 26, y: 62, width: 48, height: 30 },
    },
    tablet: {
      orbits: { x: 2, y: 8, width: 96, height: 82 },
      navigation: { x: 4, y: 2, width: 92, height: 7 },
      headline: { x: 10, y: 15, width: 80, height: 17 },
      description: { x: 17, y: 34, width: 66, height: 10 },
      actions: { x: 27, y: 46, width: 46, height: 8 },
      conversations: { x: 10, y: 58, width: 80, height: 28 },
    },
    mobile: {
      orbits: { x: 0, y: 9, width: 100, height: 78 },
      navigation: { x: 4, y: 2, width: 92, height: 7 },
      headline: { x: 8, y: 13, width: 84, height: 20 },
      description: { x: 9, y: 35, width: 82, height: 11 },
      actions: { x: 8, y: 48, width: 84, height: 12 },
      conversations: { x: 5, y: 63, width: 90, height: 30 },
    },
  },
  cards: {
    desktop: { width: 100, height: 58, overlap: 8, radius: 16 },
    tablet: { width: 100, height: 62, overlap: 10, radius: 16 },
    mobile: { width: 100, height: 78, overlap: 14, radius: 18 },
  },
};

export function isNotrixEditorDocument(
  value: unknown,
): value is NotrixEditorDocument {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as NotrixEditorDocument;

  return (['desktop', 'tablet', 'mobile'] as NotrixViewport[]).every(
    (viewport) => {
      const layout = candidate.layouts?.[viewport];
      const cards = candidate.cards?.[viewport];
      return (
        layout &&
        cards &&
        notrixBlockOrder.every((id) =>
          ['x', 'y', 'width', 'height'].every((key) =>
            Number.isFinite(layout[id]?.[key as keyof NotrixRect]),
          ),
        ) &&
        ['width', 'height', 'overlap', 'radius'].every((key) =>
          Number.isFinite(cards[key as keyof NotrixCardSettings]),
        )
      );
    },
  );
}
