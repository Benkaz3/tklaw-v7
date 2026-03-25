import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries, getEntry } from '@/lib/contentful';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
      {/* Dark Hero Banner */}
      <section className="bg-navy-900 grain section-padding">
        <div className="section-narrow text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-4">
            INSIGHTS
          </p>
          <h1 className="font-display text-display-lg text-white">
            {categoryName}
          </h1>
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Blog Grid */}
      <section className="bg-warm-50 section-padding">
        <div className="section-wide">
          {posts.items.length === 0 ? (
            <p className="text-muted text-center font-body">
              {dict.global.labels.post_not_found}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.items.map((post: any) => {
                const fields = post.fields;
                const postSlug = fields.slug as string;
                const title = fields.title as string;
                const date = new Date(post.sys.createdAt).toLocaleDateString(
                  lang === 'vi' ? 'vi-VN' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' },
                );

                return (
                  <Link
                    key={post.sys.id}
                    href={getPath(lang, 'blogPost', postSlug)}
                    className="group"
                  >
                    {/* Gold top bar */}
                    <div className="h-1 bg-gold/0 group-hover:bg-gold transition-colors" />

                    {/* Content */}
                    <div className="py-6">
                      <time className="text-xs text-muted font-body uppercase tracking-wide">
                        {date}
                      </time>
                      <h2 className="font-display text-xl text-navy-900 mt-3 group-hover:text-gold transition-colors leading-snug">
                        {title}
                      </h2>
                      <span className="mt-4 inline-flex items-center text-sm text-gold font-body font-medium">
                        {dict.global.labels.read_more} &rarr;
                      </span>
                    </div>

                    {/* Bottom border */}
                    <div className="border-b border-navy-900/10 pb-8" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
