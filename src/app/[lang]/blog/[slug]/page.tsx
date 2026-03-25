import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntry } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richTextOptions } from '@/lib/rich-text';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHero from '@/components/page-hero';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const post = await getEntry('blogPage', slug, lang);

  if (!post) {
    return buildMetadata('BlogPage', lang);
  }

  const title = post.fields.title as string;
  return buildMetadata('BlogPage', lang, { title });
}

export default async function BlogPostPage({ params }: Props) {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const dict = await getDictionary(lang);
  const post = await getEntry('blogPage', slug, lang);

  if (!post) {
    notFound();
  }

  const fields = post.fields;
  const title = fields.title as string;
  const body = fields.body as any;
  const author = fields.author as any;
  const authorName = author?.fields?.name as string | undefined;
  const authorTitle = author?.fields?.title as string | undefined;
  const authorSlug = author?.fields?.slug as string | undefined;
  const authorPhoto = author?.fields?.photo?.fields?.file?.url as string | undefined;

  const date = new Date(post.sys.createdAt).toLocaleDateString(
    lang === 'vi' ? 'vi-VN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels.home, href: getPath(lang, 'home') },
    { label: dict.global.labels.breadcrumb_labels.blog, href: getPath(lang, 'blog') },
    { label: title },
  ];

  return (
    <>
      <PageHero>
        <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
      </PageHero>

      <Breadcrumb items={breadcrumbItems} />

      <article className="max-w-4xl mx-auto px-4 lg:px-12 py-12">
        <p className="text-sm text-gray-500 mb-8">{date}</p>

        <div className="prose prose-lg max-w-none">
          {body && documentToReactComponents(body, richTextOptions)}
        </div>

        {author && author.fields && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">
              {dict.global.blog.about_the_author}
            </h2>
            <div className="flex items-start gap-4">
              {authorPhoto && (
                <Image
                  src={
                    authorPhoto.startsWith('//')
                      ? `https:${authorPhoto}`
                      : authorPhoto
                  }
                  alt={authorName ?? ''}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              )}
              <div>
                {authorSlug ? (
                  <Link
                    href={getPath(lang, 'attorneyProfile', authorSlug)}
                    className="text-primary font-semibold hover:underline"
                  >
                    {authorName}
                  </Link>
                ) : (
                  <p className="font-semibold">{authorName}</p>
                )}
                {authorTitle && (
                  <p className="text-sm text-gray-600">{authorTitle}</p>
                )}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
