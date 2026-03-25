import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
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
      {/* Dark hero banner */}
      <section className="relative bg-navy-900 grain section-padding pb-16">
        <div className="section-wide text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-gold/80 font-body mb-3">
            GET IN TOUCH
          </p>
          <h1 className="font-display text-display-lg text-white">
            {dict.menu.contact}
          </h1>
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Contact details */}
      <section className="bg-warm-50 section-padding">
        <div className="section-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left column - address */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-2">
                {dict.global.labels.office_address_label}
              </p>
              <h2 className="font-display text-display-sm text-navy-900 mb-4">
                {dict.businessInfo.name}
              </h2>
              <div className="gold-line mb-8" />

              <address className="font-body text-navy-600 leading-relaxed not-italic text-lg">
                {dict.global.office_address}
              </address>

              {dict.businessInfo.mapLink && (
                <a
                  href={dict.businessInfo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-gold text-sm font-body hover:underline tracking-wide"
                >
                  {dict.global.labels.view_on_map_label || 'View on map'} &rarr;
                </a>
              )}
            </div>

            {/* Right column - phone, email, hours */}
            <div className="space-y-8">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted font-body mb-1">
                  {dict.global.labels.phone_label}
                </p>
                <a
                  href={`tel:${dict.global.phone.replace(/\s/g, '')}`}
                  className="font-display text-xl text-navy-900 hover:text-gold transition-colors"
                >
                  {dict.global.phone}
                </a>
              </div>

              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted font-body mb-1">
                  {dict.global.labels.email_label}
                </p>
                <a
                  href={`mailto:${dict.global.email}`}
                  className="font-display text-xl text-navy-900 hover:text-gold transition-colors"
                >
                  {dict.global.email}
                </a>
              </div>

              {dict.businessInfo.officeHours && (
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted font-body mb-1">
                    OFFICE HOURS
                  </p>
                  <p className="font-display text-xl text-navy-900">
                    {dict.businessInfo.officeHours}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-navy-900">
        <iframe
          src={dict.businessInfo.mapEmbedUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={dict.global.labels.map_iframe_title}
        />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
