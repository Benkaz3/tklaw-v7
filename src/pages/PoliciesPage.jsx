import { useTranslation } from 'react-i18next';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import Breadcrumb from '../components/Breadcrumb';
import PageSeo from '../components/PageSeo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import richTextOptions from '../config/richTextOptions';

const CONTENT_TYPE_ID = 'policiesPage';

const PoliciesPage = () => {
  const { t, i18n } = useTranslation();

  const locale = i18n.language === 'vi' ? 'vi' : 'en';
  const slug = locale === 'vi' ? 'chinh-sach' : 'policies';

  const { data, loading, error } = useContentful([
    {
      content_type: CONTENT_TYPE_ID,
      'fields.slug': slug,
      locale,
    },
  ]);

  if (loading) return <LoadingDots />;

  if (error) {
    return (
      <main className='px-4 sm:px-6 lg:px-8 py-10 text-center'>
        <p className='text-red-500'>
          {(t('global.error_message') || 'Error') + ': '}
          {error.message}
        </p>
      </main>
    );
  }

  const entry = data?.[CONTENT_TYPE_ID]?.[0] || data?.items?.[0] || null;
  if (!entry?.fields) {
    return (
      <main className='px-4 sm:px-6 lg:px-8 py-10 text-center'>
        <p className='text-gray-700'>
          {t('global.policy_not_found') || 'Policy not found'}
        </p>
      </main>
    );
  }

  const { title, body } = entry.fields;
  const updated = entry.sys?.updatedAt;

  return (
    <main className='px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto'>
      <PageSeo pageKey="PolicyPage" />

      <Breadcrumb attorneyName={title} />

      <article
        className='bg-white border border-gray-200 rounded-lg shadow'
        itemScope
        itemType='https://schema.org/WebPage'
      >
        <header className='px-6 pt-8 pb-2'>
          <h1
            className='font-bold text-3xl sm:text-4xl leading-snug'
            itemProp='name'
          >
            {title}
          </h1>

          {updated && (
            <div className='text-gray-500 text-sm mt-2'>
              <time dateTime={new Date(updated).toISOString()}>
                {new Date(updated).toLocaleDateString()}
              </time>
            </div>
          )}
        </header>

        <div className='px-6 pb-8 prose max-w-none'>
          {body ? documentToReactComponents(body, richTextOptions) : null}
        </div>
      </article>
    </main>
  );
};

export default PoliciesPage;
