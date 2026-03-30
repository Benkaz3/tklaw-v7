import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntries } from '@/lib/contentful';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  return buildMetadata('OurTeamPage', lang);
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
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
      {/* Dark hero banner */}
      <section className="relative bg-navy-900 grain section-padding pb-16">
        <div className="section-wide text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-gold/80 font-body mb-3">
            OUR PEOPLE
          </p>
          <h1 className="font-display text-display-lg text-white">
            {dict.homepage.our_team_section.title}
          </h1>
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Attorney grid */}
      <section className="bg-warm-50 section-padding">
        <div className="section-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="group relative overflow-hidden rounded-lg bg-navy-800 border border-transparent hover:border-gold/20 transition-all card-hover"
                >
                  {/* Photo area */}
                  <div className="relative h-72 bg-gradient-to-br from-navy-700 to-navy-600">
                    {photo ? (
                      <Image
                        src={photo.startsWith('//') ? `https:${photo}` : photo}
                        alt={name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-6xl text-gold/10">
                          {getInitial(name)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info bar */}
                  <div className="p-6">
                    <h2 className="font-display text-xl text-white group-hover:text-gold transition-colors">
                      {name}
                    </h2>
                    {title && (
                      <p className="text-warm-300/60 text-sm mt-1 font-body">{title}</p>
                    )}
                    <span className="mt-3 inline-block text-gold text-sm font-body tracking-wide">
                      {dict.homepage.our_team_section.link_text} &rarr;
                    </span>
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
