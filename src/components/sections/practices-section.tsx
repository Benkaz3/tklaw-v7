import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import Link from 'next/link';

interface PracticesSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default async function PracticesSection({ lang, dict }: PracticesSectionProps) {
  const entries = await getEntries('practice', {
    locale: lang,
    'fields.isPractice': true,
  });

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        {dict.homepage.practices_section.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {entries.items.map((entry: any) => {
          const { title, slug, homepageDescription } = entry.fields;

          return (
            <Link
              key={entry.sys.id}
              href={getPath(lang, 'practiceDetail', slug)}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              {homepageDescription && (
                <p className="text-sm text-gray-600">{homepageDescription}</p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
