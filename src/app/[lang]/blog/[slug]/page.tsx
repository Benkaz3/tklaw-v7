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
      {/* Dark Hero Banner */}
      <section className="bg-navy-900 grain section-padding">
        <div className="section-narrow text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-4">
            INSIGHTS
          </p>
          <h1 className="font-display text-display-lg text-white">
            {title}
          </h1>
          <div className="gold-line-center mt-6 mb-4" />
          <time className="text-sm text-warm-300 font-body">{date}</time>
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Article Body */}
      <article className="bg-warm-50 section-padding">
        <div className="section-narrow">
          <div className="prose prose-lg max-w-none font-body text-navy-600 prose-headings:font-display prose-headings:text-navy-900 prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-900 prose-blockquote:border-gold prose-blockquote:text-navy-700">
            {body && documentToReactComponents(body, richTextOptions)}
          </div>

          {/* Author Section */}
          {author && author.fields && (
            <section className="mt-16 pt-10">
              <div className="gold-line mb-10" />
              <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-6">
                {dict.global.blog.about_the_author}
              </p>
              <div className="flex items-start gap-5">
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
                      className="font-display text-xl text-navy-900 hover:text-gold transition-colors"
                    >
                      {authorName}
                    </Link>
                  ) : (
                    <p className="font-display text-xl text-navy-900">
                      {authorName}
                    </p>
                  )}
                  {authorTitle && (
                    <p className="text-sm text-navy-600/70 font-body mt-1">
                      {authorTitle}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
