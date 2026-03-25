export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'vi';

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

const SLUG_MAP: Record<string, Record<string, string>> = {
  en: {
    'linh-vuc-hanh-nghe': 'practices',
    'luat-su': 'attorneys',
    'lien-he': 'contact',
    'chinh-sach': 'policies',
    'chu-de': 'category',
  },
  vi: {
    practices: 'linh-vuc-hanh-nghe',
    attorneys: 'luat-su',
    contact: 'lien-he',
    policies: 'chinh-sach',
    category: 'chu-de',
  },
};

export function mapSlug(from: Locale, slug: string): string {
  return SLUG_MAP[from]?.[slug] ?? slug;
}

export type RouteKey =
  | 'home'
  | 'practices'
  | 'practiceDetail'
  | 'blog'
  | 'blogPost'
  | 'blogCategory'
  | 'attorneys'
  | 'attorneyProfile'
  | 'contact'
  | 'policies';

const ROUTES: Record<Locale, Record<RouteKey, string>> = {
  vi: {
    home: '/vi',
    practices: '/vi/practices',
    practiceDetail: '/vi/practices/[slug]',
    blog: '/vi/blog',
    blogPost: '/vi/blog/[slug]',
    blogCategory: '/vi/blog/category/[slug]',
    attorneys: '/vi/attorneys',
    attorneyProfile: '/vi/attorneys/[slug]',
    contact: '/vi/contact',
    policies: '/vi/policies',
  },
  en: {
    home: '/en',
    practices: '/en/practices',
    practiceDetail: '/en/practices/[slug]',
    blog: '/en/blog',
    blogPost: '/en/blog/[slug]',
    blogCategory: '/en/blog/category/[slug]',
    attorneys: '/en/attorneys',
    attorneyProfile: '/en/attorneys/[slug]',
    contact: '/en/contact',
    policies: '/en/policies',
  },
};

export function getPath(lang: Locale, route: RouteKey, slug?: string): string {
  const pattern = ROUTES[lang][route];
  return slug ? pattern.replace('[slug]', slug) : pattern;
}
