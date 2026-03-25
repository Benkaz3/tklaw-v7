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
    <section className="bg-warm-50 section-padding">
      <div className="section-wide">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-2">
              EXPERTISE
            </p>
            <h2 className="font-display text-display-md text-navy-900">
              {dict.homepage.practices_section.title}
            </h2>
            <div className="gold-line mt-4" />
          </div>
          <div className="hidden sm:block">
            <Link
              href={getPath(lang, 'practices')}
              className="text-sm font-body text-navy-600 hover:text-gold transition-colors"
            >
              {dict.homepage.practices_section.title} &rarr;
            </Link>
          </div>
        </div>

        {/* Practice list */}
        <div>
          {entries.items.map((entry: any, index: number) => {
            const { title, slug } = entry.fields;

            return (
              <Link
                key={entry.sys.id}
                href={getPath(lang, 'practiceDetail', slug)}
                className={`group flex justify-between items-center py-6 border-b border-navy-900/10 ${
                  index === 0 ? 'border-t' : ''
                }`}
              >
                <span className="font-display text-display-sm text-navy-800 group-hover:text-gold transition-colors">
                  {title}
                </span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-2 transition-transform text-gold opacity-0 group-hover:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
