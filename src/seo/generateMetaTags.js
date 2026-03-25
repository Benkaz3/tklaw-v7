// src/seo/generateMetaTags.js

/**
 * Transforms SEO metadata into an array of meta tag objects for react-helmet-async.
 *
 * @param {object} seo - The SEO metadata object for a specific page.
 * @returns {Array<object>} - An array of meta tag definitions.
 */
const generateMetaTags = (seo) => {
    if (!seo) return [];
  
    const metaTags = [
      {
        name: 'description',
        content: seo.Description,
      },
      {
        name: 'keywords',
        content: seo.Keywords.join(', '),
      },
      
      {
        property: 'og:title',
        content: seo.ogTitle || seo.Title,
      },
      {
        property: 'og:description',
        content: seo.ogDescription || seo.Description,
      },
      {
        property: 'og:image',
        content: seo.ogImage,
      },
      {
        property: 'og:url',
        content: seo.ogUrl,
      },
      {
        property: 'og:type',
        content: seo.ogType || 'website',
      },
      
      {
        name: 'twitter:card',
        content: seo.twitterCard || 'summary_large_image',
      },
      {
        name: 'twitter:creator',
        content: seo.twitterCreator || '@TKLawVN',
      },
      {
        name: 'twitter:title',
        content: seo.twitterTitle || seo.Title,
      },
      {
        name: 'twitter:description',
        content: seo.twitterDescription || seo.Description,
      },
      {
        name: 'twitter:image',
        content: seo.twitterImage,
      },
    ];
  
    return metaTags;
  };
  
  export default generateMetaTags;