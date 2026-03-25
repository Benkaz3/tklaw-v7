import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useContentful from '../useContentful';
import LoadingDots from '../components/LoadingDots';
import PageSeo from '../components/PageSeo';
import PageHero from '../components/PageHero';
import { getPath } from '../config/routes';
import imgPlaceholder from '../assets/img_placeholder.svg';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import richTextOptions from '../config/richTextOptions';

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const { slug } = useParams();
  const { data, loading, error } = useContentful([
    { content_type: 'blogPage', 'fields.slug': slug, locale: language },
  ]);

  if (loading) return <LoadingDots />;

  if (error) {
    return (
      <main className='py-10 text-center'>
        <p className='text-red-500'>Error: {error.message}</p>
      </main>
    );
  }

  const entry = data?.blogPage?.[0];
  const post = entry?.fields;

  if (!post) {
    return (
      <main className='py-10 text-center'>
        <p>{t('global.labels.post_not_found')}</p>
      </main>
    );
  }

  const { title, body, author } = post;
  const date = entry.sys.createdAt;
  const authors = Array.isArray(author) ? author.filter((a) => a?.fields) : [];

  return (
    <>
      <PageSeo pageKey="BlogPost" />

      <main className='px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-10'>
        <PageHero ariaLabel={t('practice_details_page.hero_background')} />

        <article>
          <header className='text-center sm:text-left my-8'>
            <h1 className='font-semibold mb-2'>{title}</h1>
            {date && (
              <time
                dateTime={new Date(date).toISOString()}
                className='text-gray-500 text-sm'
              >
                {new Date(date).toLocaleDateString()}
              </time>
            )}
          </header>

          <section className='prose'>
            {body ? (
              documentToReactComponents(body, richTextOptions)
            ) : (
              <p>Content unavailable.</p>
            )}
          </section>

          {authors.length === 1 &&
            (() => {
              const { fields } = authors[0];
              const {
                name,
                title: authorTitle,
                introduction,
                slug: authorSlug,
                profilePhoto,
              } = fields;
              const photoUrl =
                profilePhoto?.fields?.file?.url || imgPlaceholder;

              return (
                <aside className='flex flex-col sm:flex-row items-center bg-card_background rounded-lg shadow p-6'>
                  <figure className='w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 sm:mb-0'>
                    <img
                      src={photoUrl}
                      alt={name}
                      className='w-full h-full object-cover'
                    />
                  </figure>
                  <div className='sm:ml-6 text-center sm:text-left'>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-gray-600 italic mb-4'>{authorTitle}</p>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      {introduction}
                    </p>
                    <Link
                      to={getPath(language, 'attorneyProfile', authorSlug)}
                      className='underline-animation text-primary font-medium'
                    >
                      {t('practice_details_page.view_profile')}
                    </Link>
                  </div>
                </aside>
              );
            })()}
        </article>
      </main>
    </>
  );
};

export default BlogPost;
