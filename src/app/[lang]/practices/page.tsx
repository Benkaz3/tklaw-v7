import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import Link from 'next/link';
import PageHero from '@/components/page-hero';
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
      <PageHero>
        <h1 className="text-3xl sm:text-4xl font-bold">{dict.menu.practices}</h1>
      </PageHero>

      <Breadcrumb items={breadcrumbItems} />

      <section className="max-w-6xl mx-auto px-4 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {practices.items.map((practice: any) => {
            const fields = practice.fields;
            const slug = fields.slug as string;
            const title = fields.title as string;
            const introduction = (fields.introduction as string) ?? '';
            const excerpt =
              introduction.length > 200
                ? introduction.slice(0, 200) + '...'
                : introduction;

            return (
              <div
                key={practice.sys.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-3">{title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{excerpt}</p>
                <Link
                  href={getPath(lang, 'practiceDetail', slug)}
                  className="text-primary font-medium hover:underline"
                >
                  {dict.homepage.link_text} &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
