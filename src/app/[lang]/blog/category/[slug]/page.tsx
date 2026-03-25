import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries, getEntry } from '@/lib/contentful';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/page-hero';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const category = await getEntry('blogCategory', slug, lang);

  if (!category) {
    return buildMetadata('BlogPage', lang);
  }

  const title = category.fields.title as string;
  return buildMetadata('BlogPage', lang, { title });
}

export default async function BlogCategoryPage({ params }: Props) {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const dict = await getDictionary(lang);
  const category = await getEntry('blogCategory', slug, lang);

  if (!category) {
    notFound();
  }

  const categoryName = category.fields.title as string;

  const posts = await getEntries('blogPage', {
    locale: lang,
    'fields.category.sys.id': category.sys.id,
    order: '-sys.createdAt',
  });

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels.home, href: getPath(lang, 'home') },
    { label: dict.global.labels.breadcrumb_labels.blog, href: getPath(lang, 'blog') },
    { label: categoryName },
  ];

  return (
    <>
      <PageHero>
        <h1 className="text-3xl sm:text-4xl font-bold">{categoryName}</h1>
      </PageHero>

      <Breadcrumb items={breadcrumbItems} />

      <section className="max-w-6xl mx-auto px-4 lg:px-12 py-12">
        {posts.items.length === 0 ? (
          <p className="text-gray-500 text-center">
            {dict.global.labels.post_not_found}
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {posts.items.map((post: any) => {
              const fields = post.fields;
              const postSlug = fields.slug as string;
              const title = fields.title as string;
              const date = new Date(post.sys.createdAt).toLocaleDateString(
                lang === 'vi' ? 'vi-VN' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' },
              );

              return (
                <div
                  key={post.sys.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-gray-500 mb-2">{date}</p>
                  <h2 className="text-lg font-semibold mb-3">{title}</h2>
                  <Link
                    href={getPath(lang, 'blogPost', postSlug)}
                    className="text-primary font-medium hover:underline text-sm"
                  >
                    {dict.global.labels.read_more}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
