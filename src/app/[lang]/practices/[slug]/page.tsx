import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntry } from '@/lib/contentful';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/page-hero';
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
      <PageHero>
        <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
      </PageHero>

      <Breadcrumb items={breadcrumbItems} />

      <article className="max-w-4xl mx-auto px-4 lg:px-12 py-12">
        {introduction && (
          <section className="mb-8">
            {introduction.split('\n').map((paragraph: string, i: number) => (
              <p key={i} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {casesLines.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {dict.practice_details_page.cases_handled}
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              {casesLines.map((line: string, i: number) => (
                <li key={i} className="text-gray-700">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        )}

        {specializedAttorney && specializedAttorney.fields && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {dict.practice_details_page.specialized_attorney}
            </h2>
            <Link
              href={getPath(lang, 'attorneyProfile', specializedAttorney.fields.slug as string)}
              className="text-primary font-medium hover:underline"
            >
              {specializedAttorney.fields.name as string}
            </Link>
          </section>
        )}
      </article>
    </>
  );
}
