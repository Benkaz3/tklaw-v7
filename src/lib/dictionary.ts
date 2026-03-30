import type { Locale } from './i18n';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  vi: () => import('@/dictionaries/vi.json').then((m) => m.default),
};

// Use the English dictionary as the base type, with loose breadcrumb_labels
// to accommodate different keys between vi and en
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>> & {
  global: {
    labels: {
      breadcrumb_labels: Record<string, string>;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]() as Promise<Dictionary>;
}
