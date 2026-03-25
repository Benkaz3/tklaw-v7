import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import LoadingDots from '../components/LoadingDots'
import useContentful from '../useContentful'
import PageSeo from '../components/PageSeo'
import PageHero from '../components/PageHero'

const PracticeDetailsPage = () => {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const [retry, setRetry] = useState(0)

  const { data, loading, error } = useContentful(
    [
      {
        content_type: 'practice',
        'fields.slug': slug,
        locale: i18n.language,
      },
    ],
    retry
  )

  useEffect(() => {
    setRetry(0)
  }, [i18n.language, slug])

  const handleRetry = () => {
    setRetry(prev => prev + 1)
  }

  if (loading) {
    return (
      <div
        className="flex bg-background items-center justify-center h-screen text-center py-10"
        role="status"
        aria-live="polite"
      >
        <LoadingDots />
        <span className="sr-only">{t('loading')}</span>
      </div>
    )
  }

  if (error) {
    console.error('Contentful Fetch Error:', error)
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 px-4">
        <p className="text-red-500 mb-4">
          {t('errors.fetchFailed', { message: error.message })}
        </p>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {t('errors.retry')}
        </button>
      </div>
    )
  }

  const practice = data?.practice?.[0]
  if (!practice) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 px-4">
        <p className="text-red-500 mb-4">
          {t('errors.practiceNotFound')}
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {t('errors.goHome')}
        </Link>
      </div>
    )
  }

  const casesHandled = practice.fields.casesHandled
    ? practice.fields.casesHandled.split('\n')
    : []

  return (
    <section className="bg-background mt-16">
      <PageSeo pageKey="PracticeDetailsPage" />
      <PageHero ariaLabel={t('practice_details_page.hero_background')}>
        <h2 className="sr-only">
          {t('practice_details_page.hero_title')}
        </h2>
      </PageHero>

      <div className="max-w-container-desktop mx-auto px-4 mt-4">
        <h1 className="font-primary text-start font-semibold mb-6 text-text">
          {practice.fields.title}
        </h1>

        <div className="mt-6">
          <p className="text-start text-text mb-4 leading-relaxed">
            {practice.fields.introduction}
          </p>

          <h2 className="font-primary font-semibold text-text mb-2">
            {t('practice_details_page.cases_handled')}
          </h2>

          <ul className="list-disc list-inside mb-4 pl-5">
            {casesHandled.map((item, idx) => (
              <li key={idx} className="text-start text-text leading-relaxed">
                {item}
              </li>
            ))}
          </ul>

          <hr className="border-gray-300 mb-4 w-full" />
        </div>
      </div>
    </section>
  )
}

export default PracticeDetailsPage
