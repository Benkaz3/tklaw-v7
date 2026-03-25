import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import { richTextToPlainText } from '@/lib/rich-text';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/page-hero';
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
      <PageHero>
        <h1 className="text-3xl sm:text-4xl font-bold">{dict.menu.blog}</h1>
      </PageHero>

      <Breadcrumb items={breadcrumbItems} />

      <section className="max-w-6xl mx-auto px-4 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <div
                key={post.sys.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{date}</p>
                  <h2 className="text-lg font-semibold mb-3">{title}</h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {excerpt}
                  </p>

                  {author && (
                    <div className="flex items-center gap-3 mb-4">
                      {authorPhoto && (
                        <Image
                          src={
                            authorPhoto.startsWith('//')
                              ? `https:${authorPhoto}`
                              : authorPhoto
                          }
                          alt={authorName ?? ''}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      )}
                      {authorName && (
                        <span className="text-sm text-gray-700">{authorName}</span>
                      )}
                    </div>
                  )}

                  <Link
                    href={getPath(lang, 'blogPost', slug)}
                    className="text-primary font-medium hover:underline text-sm"
                  >
                    {dict.global.labels.read_more}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
