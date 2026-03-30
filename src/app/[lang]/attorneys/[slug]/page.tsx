import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntry } from '@/lib/contentful';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string; slug?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const author = await getEntry('author', slug, lang);

  if (!author) {
    return buildMetadata('OurTeamPage', lang);
  }

  const name = author.fields.name as string;
  return buildMetadata('OurTeamPage', lang, { title: name });
}

export default async function AttorneyProfilePage({ params }: Props) {
  const lang = params.lang as Locale;
  const slug = params.slug ?? '';
  const dict = await getDictionary(lang);
  const author = await getEntry('author', slug, lang);

  if (!author) {
    notFound();
  }

  const fields = author.fields;
  const name = fields.name as string;
  const title = fields.title as string | undefined;
  const photo = fields.photo as any;
  const photoUrl = photo?.fields?.file?.url as string | undefined;
  const areasOfPractice = fields.areasOfPractice as string[] | undefined;
  const education = (fields.education as string) ?? '';
  const workExperience = fields.workExperience as string[] | undefined;
  const professionalAssociations = fields.professionalAssociations as string[] | undefined;
  const introduction = (fields.introduction as string) ?? '';

  const labels = dict.global.attorney_profile;

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels.home, href: getPath(lang, 'home') },
    { label: dict.global.labels.breadcrumb_labels.attorneys, href: getPath(lang, 'attorneys') },
    { label: name },
  ];

  const educationLines = education
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(title ? { jobTitle: title } : {}),
    ...(photoUrl
      ? { image: photoUrl.startsWith('//') ? `https:${photoUrl}` : photoUrl }
      : {}),
    worksFor: {
      '@type': 'Organization',
      name: dict.businessInfo.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Dark hero banner */}
      <section className="relative bg-navy-900 grain section-padding pb-16">
        <div className="section-wide text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-gold/80 font-body mb-3">
            OUR PEOPLE
          </p>
          <h1 className="font-display text-display-lg text-white">{name}</h1>
          {title && (
            <p className="text-warm-300/60 mt-3 text-lg font-body">{title}</p>
          )}
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Profile content */}
      <article className="bg-warm-50 section-padding">
        <div className="section-narrow">
          {/* Top section: photo + intro */}
          <div className="flex flex-col md:flex-row gap-10 mb-16">
            {photoUrl && (
              <div className="shrink-0">
                <div className="relative w-60 h-80 overflow-hidden rounded-lg border-2 border-navy-800/10">
                  <Image
                    src={photoUrl.startsWith('//') ? `https:${photoUrl}` : photoUrl}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div>
              <h2 className="font-display text-display-sm text-navy-900 mb-1">{name}</h2>
              {title && (
                <p className="text-navy-600 font-body mb-6">{title}</p>
              )}

              {introduction && (
                <div>
                  <h3 className="font-display text-xl text-navy-900 mb-3">{labels.introduction}</h3>
                  <div className="gold-line mb-4" />
                  {introduction.split('\n').map((p: string, i: number) => (
                    <p key={i} className="text-navy-600 font-body mb-3 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detail sections */}
          {areasOfPractice && areasOfPractice.length > 0 && (
            <section className="mb-12">
              <h3 className="font-display text-xl text-navy-900 mb-3">
                {labels.areas_of_practice}
              </h3>
              <div className="gold-line mb-6" />
              <ul className="space-y-2">
                {areasOfPractice.map((area: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-navy-600 font-body">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {educationLines.length > 0 && (
            <section className="mb-12">
              <h3 className="font-display text-xl text-navy-900 mb-3">
                {labels.education}
              </h3>
              <div className="gold-line mb-6" />
              <ul className="space-y-2">
                {educationLines.map((line: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-navy-600 font-body">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {workExperience && workExperience.length > 0 && (
            <section className="mb-12">
              <h3 className="font-display text-xl text-navy-900 mb-3">
                {labels.work_experience}
              </h3>
              <div className="gold-line mb-6" />
              <ul className="space-y-2">
                {workExperience.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-navy-600 font-body">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {professionalAssociations && professionalAssociations.length > 0 && (
            <section className="mb-12">
              <h3 className="font-display text-xl text-navy-900 mb-3">
                {labels.professional_associations}
              </h3>
              <div className="gold-line mb-6" />
              <ul className="space-y-2">
                {professionalAssociations.map((assoc: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-navy-600 font-body">
                    <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {assoc}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
