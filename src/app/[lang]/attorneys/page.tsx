import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/page-hero';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  return buildMetadata('OurTeamPage', lang);
}

export default async function AttorneysPage({ params }: Props) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const attorneys = await getEntries('author', { locale: lang });

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels.home, href: getPath(lang, 'home') },
    { label: dict.global.labels.breadcrumb_labels.attorneys },
  ];

  return (
    <>
      <PageHero>
        <h1 className="text-3xl sm:text-4xl font-bold">
          {dict.homepage.our_team_section.title}
        </h1>
      </PageHero>

      <Breadcrumb items={breadcrumbItems} />

      <section className="max-w-6xl mx-auto px-4 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {attorneys.items.map((attorney: any) => {
            const fields = attorney.fields;
            const slug = fields.slug as string;
            const name = fields.name as string;
            const title = fields.title as string | undefined;
            const photo = fields.photo?.fields?.file?.url as string | undefined;

            return (
              <Link
                key={attorney.sys.id}
                href={getPath(lang, 'attorneyProfile', slug)}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {photo && (
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={
                        photo.startsWith('//') ? `https:${photo}` : photo
                      }
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {name}
                  </h2>
                  {title && (
                    <p className="text-sm text-gray-600 mt-1">{title}</p>
                  )}
                  <p className="text-primary text-sm mt-2 font-medium">
                    {dict.homepage.our_team_section.link_text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
