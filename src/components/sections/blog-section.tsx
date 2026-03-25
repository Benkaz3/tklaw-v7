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
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        {dict.homepage.blog_section.title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {entries.items.map((entry: any) => {
          const { title, slug, body } = entry.fields;
          const date = new Date(entry.sys.createdAt).toLocaleDateString(
            lang === 'vi' ? 'vi-VN' : 'en-US',
            { year: 'numeric', month: 'long', day: 'numeric' },
          );
          const excerpt = richTextToPlainText(body).slice(0, 300);

          return (
            <article
              key={entry.sys.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <time className="text-sm text-gray-500 mb-2 block">{date}</time>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600 mb-4">
                {excerpt}
                {excerpt.length >= 300 && '...'}
              </p>
              <Link
                href={getPath(lang, 'blogPost', slug)}
                className="text-primary font-medium hover:underline"
              >
                {dict.global.labels.read_more}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
