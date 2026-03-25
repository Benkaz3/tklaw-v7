import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';

interface ContactSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ContactSection({ lang, dict }: ContactSectionProps) {
  const labels = dict.global.labels;
  const global = dict.global;
  const business = dict.businessInfo;

  return (
    <section className="bg-section-alt section-padding">
      <div className="section-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left column */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold font-body mb-2">
              GET IN TOUCH
            </p>
            <h2 className="font-display text-display-md text-navy-900">
              {labels.contact_us_label}
            </h2>
            <div className="gold-line mt-4 mb-8" />

            <address className="font-body text-navy-600 leading-relaxed not-italic">
              {global.office_address}
            </address>

            <a
              href={business.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-gold text-sm font-body hover:underline"
            >
              {labels.view_on_map_label} &rarr;
            </a>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Phone */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted font-body mb-1">
                {labels.phone_label}
              </p>
              <a
                href={`tel:${global.phone}`}
                className="font-display text-xl text-navy-900 hover:text-gold transition-colors"
              >
                {global.phone}
              </a>
            </div>

            {/* Email */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted font-body mb-1">
                {labels.email_label}
              </p>
              <a
                href={`mailto:${global.email}`}
                className="font-display text-xl text-navy-900 hover:text-gold transition-colors"
              >
                {global.email}
              </a>
            </div>

            {/* Office hours */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted font-body mb-1">
                OFFICE HOURS
              </p>
              <p className="font-display text-xl text-navy-900">
                {business.officeHours}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
