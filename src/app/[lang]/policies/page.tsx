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
      <div className="container mx-auto px-4 py-10 text-center">
        <Breadcrumb items={breadcrumbItems} />
        <p className="text-muted">Policy not found</p>
      </div>
    );
  }

  const { title, body } = entry.fields as any;
  const updated = entry.sys.updatedAt;

  return (
    <main className="container mx-auto px-4 max-w-3xl py-10">
      <Breadcrumb items={breadcrumbItems} />

      <article className="bg-white border border-gray-200 rounded-lg shadow" itemScope itemType="https://schema.org/WebPage">
        <header className="px-6 pt-8 pb-2">
          <h1 className="font-bold text-3xl sm:text-4xl leading-snug" itemProp="name">
            {title}
          </h1>
          {updated && (
            <div className="text-muted text-sm mt-2">
              <time dateTime={new Date(updated).toISOString()}>
                {new Date(updated).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US')}
              </time>
            </div>
          )}
        </header>
        <div className="px-6 pb-8 prose max-w-none">
          {body ? documentToReactComponents(body, richTextOptions) : null}
        </div>
      </article>
    </main>
  );
}
