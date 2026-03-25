import { Helmet } from 'react-helmet-async';
import useSeo from '../seo/useSeo';
import generateMetaTags from '../seo/generateMetaTags';

const PageSeo = ({ pageKey, title: titleOverride }) => {
  const seo = useSeo(pageKey);
  const metaTags = generateMetaTags(seo);
  const title = titleOverride || seo.Title;

  return (
    <Helmet>
      <title>{title}</title>
      {seo.ogUrl && <link rel="canonical" href={seo.ogUrl} />}
      {metaTags.map((tag, i) =>
        tag.name ? (
          <meta key={i} name={tag.name} content={tag.content} />
        ) : (
          <meta key={i} property={tag.property} content={tag.content} />
        )
      )}
    </Helmet>
  );
};

export default PageSeo;
