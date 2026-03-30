import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import Link from 'next/link';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  return buildMetadata('PracticesAndSectors', lang);
}

export default async function PracticesPage({ params }: Props) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const practices = await getEntries('practice', { locale: lang });

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels.home, href: getPath(lang, 'home') },
    { label: dict.menu.practices },
  ];

  return (
    <>
      {/* Dark hero banner */}
      <section className="relative bg-navy-900 grain overflow-hidden">
        <div className="section-wide py-24 sm:py-32 flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-4">
            PRACTICE AREAS
          </p>
          <h1 className="font-display text-display-lg text-white">
            {dict.menu.practices}
          </h1>
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Practice cards */}
      <section className="bg-warm-50 section-padding">
        <div className="section-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-0">
            {practices.items.map((practice: any, index: number) => {
              const fields = practice.fields;
              const slug = fields.slug as string;
              const title = fields.title as string;
              const introduction = (fields.introduction as string) ?? '';
              const excerpt =
                introduction.length > 200
                  ? introduction.slice(0, 200) + '...'
                  : introduction;

              return (
                <Link
                  key={practice.sys.id}
                  href={getPath(lang, 'practiceDetail', slug)}
                  className="group block py-8 border-b border-navy-900/10"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="font-display text-display-sm text-navy-800 group-hover:text-gold transition-colors mb-3">
                        {title}
                      </h2>
                      <p className="text-navy-600/70 font-body leading-relaxed">
                        {excerpt}
                      </p>
                    </div>
                    <svg
                      className="mt-1 w-5 h-5 shrink-0 text-gold opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
