import type { MetadataRoute } from 'next';
import { getEntries } from '@/lib/contentful';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tklaw.vn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: '/vi', priority: 1.0 },
    { path: '/en', priority: 1.0 },
    { path: '/vi/practices', priority: 0.8 },
    { path: '/en/practices', priority: 0.8 },
    { path: '/vi/attorneys', priority: 0.8 },
    { path: '/en/attorneys', priority: 0.8 },
    { path: '/vi/blog', priority: 0.7 },
    { path: '/en/blog', priority: 0.7 },
    { path: '/vi/contact', priority: 0.7 },
    { path: '/en/contact', priority: 0.7 },
    { path: '/vi/policies', priority: 0.3 },
    { path: '/en/policies', priority: 0.3 },
  ];

  const staticEntries = staticPages.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }));

  // Dynamic pages from Contentful
  let dynamicEntries: MetadataRoute.Sitemap = [];
  try {
    const [practices, blogPosts, authors] = await Promise.all([
      getEntries('practice', { locale: 'vi' }),
      getEntries('blogPage', { locale: 'vi' }),
      getEntries('author', { locale: 'vi' }),
    ]);

    const practiceUrls = practices.items.flatMap((item: any) => {
      const slug = item.fields.slug;
      return [
        { url: `${BASE_URL}/vi/practices/${slug}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: 'monthly' as const, priority: 0.6 },
        { url: `${BASE_URL}/en/practices/${slug}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: 'monthly' as const, priority: 0.6 },
      ];
    });

    const blogUrls = blogPosts.items.flatMap((item: any) => {
      const slug = item.fields.slug;
      return [
        { url: `${BASE_URL}/vi/blog/${slug}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${BASE_URL}/en/blog/${slug}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: 'monthly' as const, priority: 0.5 },
      ];
    });

    const authorUrls = authors.items.flatMap((item: any) => {
      const slug = item.fields.slug;
      return [
        { url: `${BASE_URL}/vi/attorneys/${slug}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${BASE_URL}/en/attorneys/${slug}`, lastModified: new Date(item.sys.updatedAt), changeFrequency: 'monthly' as const, priority: 0.5 },
      ];
    });

    dynamicEntries = [...practiceUrls, ...blogUrls, ...authorUrls];
  } catch {
    // If Contentful fails, return static pages only
  }

  return [...staticEntries, ...dynamicEntries];
}
