import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import { richTextToPlainText } from '@/lib/rich-text';
import Link from 'next/link';

interface BlogSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default async function BlogSection({ lang, dict }: BlogSectionProps) {
  const entries = await getEntries('blogPage', {
    locale: lang,
    order: '-sys.createdAt',
    limit: 3,
  });

  return (
    <section className="bg-warm-50 section-padding">
      <div className="section-wide">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-2">
              INSIGHTS
            </p>
            <h2 className="font-display text-display-md text-navy-900">
              {dict.homepage.blog_section.title}
            </h2>
            <div className="gold-line mt-4" />
          </div>
          <div className="hidden sm:block">
            <Link
              href={getPath(lang, 'blog')}
              className="text-sm font-body text-navy-600 hover:text-gold transition-colors"
            >
              {dict.global.labels.blog_label} &rarr;
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {entries.items.map((entry: any) => {
            const { title, slug, body } = entry.fields;
            const date = new Date(entry.sys.createdAt).toLocaleDateString(
              lang === 'vi' ? 'vi-VN' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' },
            );
            const plainText = richTextToPlainText(body);
            const excerpt = plainText.slice(0, 200);

            return (
              <Link
                key={entry.sys.id}
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
                  <h3 className="font-display text-xl text-navy-900 mt-3 group-hover:text-gold transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm text-navy-600/70 mt-3 leading-relaxed font-body line-clamp-3">
                    {excerpt}
                    {plainText.length > 200 && '...'}
                  </p>
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
  );
}
