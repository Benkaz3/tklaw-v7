import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';

interface ContactSectionProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ContactSection({ lang, dict }: ContactSectionProps) {
  const labels = dict.global.labels;
  const global = dict.global;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        {labels.contact_us_label}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <h3 className="text-lg font-semibold mb-2">
            {labels.office_address_label}
          </h3>
          <p className="text-gray-600">{global.office_address}</p>
        </div>

        <div className="text-center p-6">
          <h3 className="text-lg font-semibold mb-2">{labels.phone_label}</h3>
          <a
            href={`tel:${global.phone}`}
            className="text-primary hover:underline"
          >
            {global.phone}
          </a>
        </div>

        <div className="text-center p-6">
          <h3 className="text-lg font-semibold mb-2">{labels.email_label}</h3>
          <a
            href={`mailto:${global.email}`}
            className="text-primary hover:underline"
          >
            {global.email}
          </a>
        </div>
      </div>
    </section>
  );
}
