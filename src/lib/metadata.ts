import type { Metadata } from 'next';
import type { Locale } from './i18n';
import seoContent from './seo-content.json';

type SeoKey = keyof typeof seoContent;

export function getSeoData(pageKey: string, lang: Locale) {
  const suffix = lang === 'vi' ? 'Vi' : 'En';
  const key = `${pageKey}${suffix}` as SeoKey;
  return seoContent[key] ?? null;
}

export function buildMetadata(
  pageKey: string,
  lang: Locale,
  overrides?: { title?: string; description?: string; image?: string },
): Metadata {
  const seo = getSeoData(pageKey, lang);
  if (!seo) return {};

  const title = overrides?.title ?? seo.Title;
  const description = overrides?.description ?? seo.Description;
  const image = overrides?.image ?? seo.ogImage;

  return {
    title,
    description,
    keywords: seo.Keywords,
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: seo.ogUrl,
      type: (seo.ogType as 'website' | 'article') ?? 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      creator: seo.twitterCreator,
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || description,
      ...(seo.twitterImage ? { images: [seo.twitterImage] } : {}),
    },
    alternates: {
      canonical: seo.ogUrl,
    },
  };
}
