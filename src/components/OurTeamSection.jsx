import useContentful from '../useContentful'
import LoadingDots from './LoadingDots'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getPath } from '../config/routes'

const OurTeamSection = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const { data, loading, error } = useContentful([
    {
      content_type: 'author',
      locale: language,
    },
  ])

  if (loading) return <LoadingDots />

  if (error) {
    return (
      <section className="py-10 bg-background">
        <div className="max-w-container-desktop mx-auto px-4 text-center">
          <h1 className="font-primary font-semibold leading-tight mb-2 text-text">
            {t('homepage.our_team_section.title')}
          </h1>
          <p className="text-text mb-6">
            {t('homepage.our_team_section.subtitle')}
          </p>
          <div className="text-text">
            {t('homepage.our_team_section.error_message')}
          </div>
        </div>
      </section>
    )
  }

  const authors = data?.author || []

  const gridClasses =
    authors.length === 1
      ? 'grid-cols-1 justify-items-center'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center'

  return (
    <section className="py-10 bg-background">
      <div className="max-w-container-desktop mx-auto px-4 text-center">
        <h1 className="font-primary font-semibold leading-tight mb-2 text-text">
          {t('homepage.our_team_section.title')}
        </h1>
        <p className="text-text mb-6">
          {t('homepage.our_team_section.subtitle')}
        </p>

        {authors.length === 0 ? (
          <div className="text-text">
            {t('homepage.our_team_section.no_authors')}
          </div>
        ) : (
          <div className={`grid gap-8 ${gridClasses}`}>
            {authors.map(({ sys, fields }) => {
              const { id } = sys
              const { name, title, profilePhoto, introduction, slug } = fields
              const photoUrl =
                profilePhoto?.fields?.file?.url || 'https://via.placeholder.com/150'

              return (
                <div
                  key={id}
                  className="flex flex-col items-center bg-card_background rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Avatar */}
                  <div className="w-24 h-24 aspect-square rounded-full overflow-hidden border mb-4">
                    <img
                      src={photoUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Title */}
                  <p className="font-semibold text-text text-lg">{name}</p>
                  <p className="text-text text-sm mb-4">{title}</p>

                  <hr className="border-gray-300 w-full mb-4" />

                  {/* Introduction */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {introduction}
                  </p>

                  {/* Profile Link */}
                  <Link
                    to={getPath(language, 'attorneyProfile', slug)}
                    className="underline-animation text-primary font-medium"
                  >
                    {t('homepage.our_team_section.link_text')}
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default OurTeamSection
