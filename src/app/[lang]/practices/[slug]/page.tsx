import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntry } from '@/lib/contentful';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const practice = await getEntry('practice', slug, lang);

  if (!practice) {
    return buildMetadata('PracticesAndSectors', lang);
  }

  const title = practice.fields.title as string;
  return buildMetadata('PracticesAndSectors', lang, { title });
}

export default async function PracticeDetailPage({ params }: Props) {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const dict = await getDictionary(lang);
  const practice = await getEntry('practice', slug, lang);

  if (!practice) {
    notFound();
  }

  const fields = practice.fields;
  const title = fields.title as string;
  const introduction = (fields.introduction as string) ?? '';
  const casesHandled = (fields.casesHandled as string) ?? '';
  const specializedAttorney = fields.specializedAttorney as any;

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels.home, href: getPath(lang, 'home') },
    { label: dict.menu.practices, href: getPath(lang, 'practices') },
    { label: title },
  ];

  const casesLines = casesHandled
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean);

  return (
    <>
      {/* Dark hero banner */}
      <section className="relative bg-navy-900 grain overflow-hidden">
        <div className="section-wide py-24 sm:py-32 flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-4">
            PRACTICE AREAS
          </p>
          <h1 className="font-display text-display-lg text-white">
            {title}
          </h1>
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Article body */}
      <article className="bg-warm-50 section-padding">
        <div className="section-narrow">
          {/* Introduction */}
          {introduction && (
            <section className="mb-14">
              {introduction.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="mb-5 font-body text-navy-600/70 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          )}

          {/* Cases handled */}
          {casesLines.length > 0 && (
            <section className="mb-14">
              <h2 className="font-display text-display-sm text-navy-800 mb-6">
                {dict.practice_details_page.cases_handled}
              </h2>
              <div className="gold-line mb-8" />
              <ul className="space-y-3">
                {casesLines.map((line: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 font-body text-navy-600/70 leading-relaxed">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Specialized attorney */}
          {specializedAttorney && specializedAttorney.fields && (
            <section className="mb-14">
              <h2 className="font-display text-display-sm text-navy-800 mb-6">
                {dict.practice_details_page.specialized_attorney}
              </h2>
              <div className="gold-line mb-8" />
              <Link
                href={getPath(lang, 'attorneyProfile', specializedAttorney.fields.slug as string)}
                className="font-body text-navy-800 font-medium hover:text-gold transition-colors"
              >
                {specializedAttorney.fields.name as string} &rarr;
              </Link>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
