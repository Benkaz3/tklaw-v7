import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useContentful from '../useContentful'
import LoadingDots from '../components/LoadingDots'
import Breadcrumb from '../components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import useSeo from '../seo/useSeo'
import generateMetaTags from '../seo/generateMetaTags'

const CategoryPage = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const seo = useSeo('BlogCategoryPage')
  const metaTags = generateMetaTags(seo)

  const { slug } = useParams()
  const {
    data: categoryDataResult,
    loading: categoryLoading,
    error: categoryError,
  } = useContentful([
    {
      content_type: 'category',
      'fields.slug': slug,
      locale: language,
    },
  ])
  const category = categoryDataResult?.category?.[0] || null
  const {
    data: blogPostsData,
    loading: blogLoading,
    error: blogError,
  } = useContentful(
    category
      ? [
          {
            content_type: 'blogPage',
            'fields.categories.sys.id[in]': category.sys.id,
            locale: language,
          },
        ]
      : []
  )
  const blogPosts = blogPostsData?.blogPage || []
  const loading = categoryLoading || blogLoading
  const error = categoryError || blogError

  if (loading)
    return (
      <div className='flex bg-background items-center justify-center min-h-[50vh] text-center py-10'>
        <LoadingDots />
      </div>
    )
  if (error)
    return (
      <div className='text-red-500 text-center py-10 mt-32'>
        {t('global.errors.load_error', { message: error.message })}
      </div>
    )
  if (!category)
    return (
      <div className='text-center py-10 mt-32'>
        {t('global.errors.not_found', { defaultValue: 'No category found' })}
      </div>
    )

  return (
    <div className='container mx-auto mt-32'>
      <Helmet>
        <title>{seo.Title}</title>
        <link rel="canonical" href={seo.ogUrl} />
        {metaTags.map((tag, index) =>
          tag.name ? (
            <meta key={index} name={tag.name} content={tag.content} />
          ) : (
            <meta key={index} property={tag.property} content={tag.content} />
          )
        )}
      </Helmet>
      <Breadcrumb />
      <h1 className='font-bold mb-8'>{category.fields.name}</h1>
      <div className='space-y-8'>
        {blogPosts.length > 0 ? (
          blogPosts.map(({ sys, fields }) => (
            <div key={sys.id} className='p-6 border-b border-gray-300'>
              <h2 className='font-semibold mb-2'>{fields.title}</h2>
              <p>
                {fields.body?.content?.[0]?.content?.[0]?.value || t('global.errors.no_content', { defaultValue: 'No content available' })}
              </p>
              <Link
                to={`/${language}/blog/${fields.slug}`}
                className='text-primary hover:underline font-semibold'
              >
                {t('global.labels.read_more')}
              </Link>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>
            {t('global.errors.no_posts', { defaultValue: 'No blog posts found for this category.' })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage