import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import PageHero from '@/components/page-hero';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata('ContactPage', params.lang as Locale);
}

export default async function ContactPage({ params }: Props) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels?.home || 'Home', href: getPath(lang, 'home') },
    { label: dict.menu.contact },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: dict.businessInfo.name,
    telephone: dict.global.phone,
    email: dict.global.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dict.global.office_address,
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN',
    },
  };

  return (
    <>
      <PageHero>
        <h1 className="relative z-10 text-white font-bold text-center">
          {dict.menu.contact}
        </h1>
      </PageHero>
      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">{dict.global.labels.office_address_label}</h3>
            <p className="text-muted">{dict.global.office_address}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">{dict.global.labels.phone_label}</h3>
            <a href={`tel:${dict.global.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
              {dict.global.phone}
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">{dict.global.labels.email_label}</h3>
            <a href={`mailto:${dict.global.email}`} className="text-primary hover:underline">
              {dict.global.email}
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <iframe
            src={dict.businessInfo.mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={dict.global.labels.map_iframe_title}
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
