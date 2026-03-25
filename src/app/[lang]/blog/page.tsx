import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import { richTextToPlainText } from '@/lib/rich-text';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  return buildMetadata('BlogPage', lang);
}

export default async function BlogPage({ params }: Props) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const posts = await getEntries('blogPage', {
    locale: lang,
    order: '-sys.createdAt',
  });

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels.home, href: getPath(lang, 'home') },
    { label: dict.global.labels.breadcrumb_labels.blog },
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
            {dict.menu.blog}
          </h1>
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Blog Grid */}
      <section className="bg-warm-50 section-padding">
        <div className="section-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.items.map((post: any) => {
              const fields = post.fields;
              const slug = fields.slug as string;
              const title = fields.title as string;
              const body = fields.body;
              const plainText = richTextToPlainText(body);
              const excerpt =
                plainText.length > 300
                  ? plainText.slice(0, 300) + '...'
                  : plainText;
              const date = new Date(post.sys.createdAt).toLocaleDateString(
                lang === 'vi' ? 'vi-VN' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' },
              );
              const author = fields.author as any;
              const authorName = author?.fields?.name as string | undefined;
              const authorPhoto = author?.fields?.photo?.fields?.file?.url as
                | string
                | undefined;

              return (
                <Link
                  key={post.sys.id}
                  href={getPath(lang, 'blogPost', slug)}
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
                    <p className="text-sm text-navy-600/70 mt-3 leading-relaxed font-body line-clamp-4">
                      {excerpt}
                    </p>

                    {author && (
                      <div className="flex items-center gap-3 mt-4">
                        {authorPhoto && (
                          <Image
                            src={
                              authorPhoto.startsWith('//')
                                ? `https:${authorPhoto}`
                                : authorPhoto
                            }
                            alt={authorName ?? ''}
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                          />
                        )}
                        {authorName && (
                          <span className="text-xs text-navy-600 font-body">
                            {authorName}
                          </span>
                        )}
                      </div>
                    )}

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
        </div>
      </section>
    </>
  );
}
