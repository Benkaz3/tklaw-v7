import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LoadingDots from '../components/LoadingDots'
import useContentful from '../useContentful'
import heroBg from '../assets/practices_hero_bg.webp'
import Breadcrumb from '../components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import useSeo from '../seo/useSeo'

const PracticesAndSectorsPage = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const pagePath =
    language === 'vi'
      ? '/vi/linh-vuc-hanh-nghe/:slug'
      : '/en/practices/:slug'

  const { data, loading, error } = useContentful([
    {
      content_type: 'practice',
      order: 'fields.title',
      locale: language,
    },
  ])

  const seo = useSeo('Practices')
  const [expandedRow, setExpandedRow] = useState(null)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen py-10">
        <LoadingDots />
      </div>
    )
  }
  if (error)
    return (
      <div className='text-red-500 text-center py-10 mt-32'>
        {t('global.errors.load_error', { defaultValue: 'Error loading content', message: error.message })}
      </div>
    )

  // only practices
  const practices = data?.practice?.filter((item) => item.fields.isPractice) || []

  const toggleRow = (id) =>
    setExpandedRow((prev) => (prev === id ? null : id))
  

  return (
    <section>
      <Helmet>
        <title>{seo.Title}</title>
        <meta name="description" content={seo.Description} />
        <meta name="keywords" content={seo.Keywords.join(', ')} />
      </Helmet>

      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </section>

      <Breadcrumb />

      <div className="max-w-container-desktop mx-auto px-4 mt-8">
        {t('homepage.practices_and_sectors_title') && (
          <h1 className="text-center font-semibold mb-6">
          {t('homepage.practices_and_sectors_title')}
          </h1>
        )}

        <div className="divide-y border border-gray-300">
          {practices.map((item) => {
            const isExpanded = expandedRow === item.sys.id
            return (
              <div key={item.sys.id}>
                <button
                  type="button"
                  className={`flex w-full justify-between items-center p-4 cursor-pointer ${
                    isExpanded ? 'bg-gray-100' : 'bg-white'
                  }`}
                  onClick={() => toggleRow(item.sys.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`practice-${item.sys.id}`}
                >
                  <p className="font-semibold">{item.fields.title}</p>
                  <span className="font-semibold" aria-hidden="true">{isExpanded ? '–' : '+'}</span>
                </button>

                {isExpanded && (
                  <div id={`practice-${item.sys.id}`} className="p-4 bg-gray-50">
                    <p className="mb-2">{item.fields.introduction}</p>
                    <Link to={pagePath.replace(':slug', item.fields.slug)}>
                      <button className="font-semibold text-primary hover:text-secondary">
                        {t('homepage.link_text')}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PracticesAndSectorsPage
