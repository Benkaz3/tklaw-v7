import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntry } from '@/lib/contentful';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PageHero from '@/components/page-hero';
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

      <PageHero>
        <h1 className="text-3xl sm:text-4xl font-bold">{name}</h1>
        {title && <p className="text-lg mt-2 opacity-90">{title}</p>}
      </PageHero>

      <Breadcrumb items={breadcrumbItems} />

      <article className="max-w-4xl mx-auto px-4 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {photoUrl && (
            <div className="shrink-0">
              <Image
                src={photoUrl.startsWith('//') ? `https:${photoUrl}` : photoUrl}
                alt={name}
                width={240}
                height={320}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold mb-1">{name}</h2>
            {title && <p className="text-gray-600 mb-4">{title}</p>}

            {introduction && (
              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{labels.introduction}</h3>
                {introduction.split('\n').map((p: string, i: number) => (
                  <p key={i} className="text-gray-700 mb-2 leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            )}
          </div>
        </div>

        {areasOfPractice && areasOfPractice.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">{labels.areas_of_practice}</h3>
            <ul className="list-disc ml-6 space-y-1">
              {areasOfPractice.map((area: string, i: number) => (
                <li key={i} className="text-gray-700">
                  {area}
                </li>
              ))}
            </ul>
          </section>
        )}

        {educationLines.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">{labels.education}</h3>
            <ul className="list-disc ml-6 space-y-1">
              {educationLines.map((line: string, i: number) => (
                <li key={i} className="text-gray-700">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        )}

        {workExperience && workExperience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">{labels.work_experience}</h3>
            <ul className="list-disc ml-6 space-y-1">
              {workExperience.map((item: string, i: number) => (
                <li key={i} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {professionalAssociations && professionalAssociations.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              {labels.professional_associations}
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              {professionalAssociations.map((assoc: string, i: number) => (
                <li key={i} className="text-gray-700">
                  {assoc}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
