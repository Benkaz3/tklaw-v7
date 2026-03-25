import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { buildMetadata } from '@/lib/metadata';
import { getPath } from '@/lib/i18n';
import { getEntry } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richTextOptions } from '@/lib/rich-text';
import Breadcrumb from '@/components/breadcrumb';

type Props = { params: { lang: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildMetadata('PoliciesPage', params.lang as Locale);
}

export default async function PoliciesPage({ params }: Props) {
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const slug = lang === 'vi' ? 'chinh-sach' : 'policies';

  const entry = await getEntry('policiesPage', slug, lang);

  const breadcrumbItems = [
    { label: dict.global.labels.breadcrumb_labels?.home || 'Home', href: getPath(lang, 'home') },
    { label: dict.menu.policies },
  ];

  if (!entry) {
    return (
      <>
        <section className="relative bg-navy-900 grain section-padding pb-16">
          <div className="section-wide text-center">
            <h1 className="font-display text-display-lg text-white">
              {dict.menu.policies}
            </h1>
            <div className="gold-line-center mt-6" />
          </div>
        </section>
        <Breadcrumb items={breadcrumbItems} />
        <div className="bg-warm-50 section-padding text-center">
          <p className="text-muted font-body">Policy not found</p>
        </div>
      </>
    );
  }

  const { title, body } = entry.fields as any;
  const updated = entry.sys.updatedAt;

  return (
    <>
      {/* Dark hero banner */}
      <section className="relative bg-navy-900 grain section-padding pb-16">
        <div className="section-wide text-center">
          <h1 className="font-display text-display-lg text-white" itemProp="name">
            {title}
          </h1>
          {updated && (
            <p className="text-warm-300/60 mt-3 text-sm font-body">
              <time dateTime={new Date(updated).toISOString()}>
                {new Date(updated).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US')}
              </time>
            </p>
          )}
          <div className="gold-line-center mt-6" />
        </div>
      </section>

      <Breadcrumb items={breadcrumbItems} />

      {/* Article content */}
      <main className="bg-warm-50 section-padding" itemScope itemType="https://schema.org/WebPage">
        <article className="section-narrow">
          <div className="prose prose-lg max-w-none font-body text-navy-700 prose-headings:font-display prose-headings:text-navy-900 prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-900">
            {body ? documentToReactComponents(body, richTextOptions) : null}
          </div>
        </article>
      </main>
    </>
  );
}
