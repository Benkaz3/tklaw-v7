import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useContentful from '../useContentful'
import LoadingDots from '../components/LoadingDots'
import Breadcrumb from '../components/Breadcrumb'
import heroBg from '../assets/practices_hero_bg.webp'
import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';
import generateMetaTags from '../seo/generateMetaTags';
import convertRichTextToString from '../utils/richText';

const BlogPage = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const seo = useSeo('BlogPage');
  const metaTags = generateMetaTags(seo);

  const { data, loading, error } = useContentful([
    {
      content_type: 'blogPage',
      order: '-sys.createdAt',
      locale: language,
    },
  ])

  if (loading)
    return (
      <div className='flex bg-background items-center justify-center h-screen text-center py-10'>
        <LoadingDots />
      </div>
    )
  if (error)
    return (
      <div className='text-red-500 text-center py-10'>
        Error: {error.message}
      </div>
    )

  const blogPosts = data?.blogPage || []
  if (blogPosts.length === 0)
    return (
      <div className='container mx-auto mt-32 text-center py-10'>
        No blog posts available.
      </div>
    )

  return (
    <div>
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
      <section
        className='relative h-80 bg-cover w-full bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className='absolute inset-0 bg-black opacity-50' />
      </section>
      <Breadcrumb />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6'>
        {blogPosts.map((post) => {
          if (!post?.fields) return null
          const { sys, fields } = post
          const bodyText = convertRichTextToString(fields.body)
          const previewText = bodyText.length > 300 ? `${bodyText.substring(0, 300)}...` : bodyText
          return (
            <div key={sys?.id} className='p-6 bg-section_background border rounded-md'>
              <Link to={`/${language}/blog/${fields.slug || ''}`} className='flex items-center text-buttonBg hover:underline mt-4'>
                <h2 className='font-semibold mb-2'>{fields.title || 'Untitled'}</h2>
              </Link>
              {fields.author && fields.author.length > 0 && (
                <div className='flex items-center text-gray-500 mb-4 space-x-2'>
                  {fields.author.map((author, index) => {
                    if (!author?.fields) return null
                    const { sys: authorSys, fields: authorFields } = author
                    return (
                      <span key={authorSys?.id || index} className='flex items-center space-x-2'>
                        {authorFields.profilePhoto?.fields?.file?.url && (
                          <img
                            src={authorFields.profilePhoto.fields.file.url}
                            alt={authorFields.name || 'Author'}
                            className='w-6 h-6 rounded-full object-cover bg-buttonBg'
                          />
                        )}
                        <Link
                          to={`/${language === 'vi' ? 'vi/luat-su/' : 'en/attorneys/'}${authorFields.slug || ''}`}
                          className='text-buttonBg font-bold uppercase hover:underline'
                        >
                          {authorFields.name || 'Unknown'}
                        </Link>
                        {index < fields.author.length - 1 && ', '}
                      </span>
                    )
                  })}
                  <span>
                    {sys?.createdAt ? new Date(sys.createdAt).toLocaleDateString() : 'Unknown Date'}
                  </span>
                </div>
              )}
              <p className='mb-4'>{previewText}</p>
              <Link to={`/${language}/blog/${fields.slug || ''}`} className='flex items-center text-buttonBg hover:underline mt-4'>
                <span className='mr-1 font-bold'>{t('global.labels.read_more')}</span>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogPage