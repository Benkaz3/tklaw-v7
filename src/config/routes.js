/**
 * Centralized route configuration.
 * Single source of truth for all URL paths in the application.
 */

export const ROUTES = {
  vi: {
    home: '/vi',
    practices: '/vi/linh-vuc-hanh-nghe',
    practiceDetail: '/vi/linh-vuc-hanh-nghe/:slug',
    contact: '/vi/lien-he',
    blog: '/vi/blog',
    blogPost: '/vi/blog/:slug',
    blogCategory: '/vi/blog/chu-de/:slug',
    attorneys: '/vi/luat-su',
    attorneyProfile: '/vi/luat-su/:slug',
    policies: '/vi/chinh-sach',
  },
  en: {
    home: '/en',
    practices: '/en/practices',
    practiceDetail: '/en/practices/:slug',
    contact: '/en/contact',
    blog: '/en/blog',
    blogPost: '/en/blog/:slug',
    blogCategory: '/en/blog/category/:slug',
    attorneys: '/en/attorneys',
    attorneyProfile: '/en/attorneys/:slug',
    policies: '/en/policies',
  },
};

/**
 * Build a localized path, replacing :slug if provided.
 * @param {string} lang - 'vi' or 'en'
 * @param {string} routeKey - key from ROUTES (e.g. 'practiceDetail')
 * @param {string} [slug] - optional slug to replace :slug
 */
export const getPath = (lang, routeKey, slug) => {
  const route = ROUTES[lang]?.[routeKey] || ROUTES.en[routeKey] || '/';
  return slug ? route.replace(':slug', slug) : route;
};
