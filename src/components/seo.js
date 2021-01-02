import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet-async"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query)

  const {
    title: defaultTitle,
    titleTemplate,
    description: defaultDescription,
    siteUrl,
    image: defaultImage,
    author,
    twitterUsername,
    url,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    author,  
    canonical: pathname ? `${url}${pathname}` : null

  }

  return (
    <Helmet
      title={seo.title}
      titleTemplate={titleTemplate}
      link={
        seo.canonical
          ? [
              {
                rel: "canonical",
                href: seo.canonical,
              },
            ]
          : []
      }
      meta={[
        { name: `description`, content: description, },
        { property: `og:title`, content: title, },
        { property: `og:description`, content: description, },
        { property: `og:type`, content: `website`, },
        { property: `og:image`, content: image, },
        { name: `twitter:title`, content: title },
        { property: `twitter:creator`, content: twitterUsername }
        

      ].concat(
        image
          ? [
            {
              property: "og:image",
              content: image,
            },
            {
              property: "og:image:width",
              content: image.width,
            },
            {
              property: "og:image:height",
              content: image.height,
            },
            {
              name: "twitter:card",
              content: "summary_large_image",
            },
          ]
          : [
            {
              name: "twitter:card",
              content: "summary",
            },
          ])}
    >
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.author && <meta property="og:author" content={seo.author} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        author
        description
        image
        title
        titleTemplate
        twitterUsername
        url
      }
    }
  }
`