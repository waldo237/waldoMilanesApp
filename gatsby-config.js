require("dotenv").config({
  path: `.env`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Waldo Milanes professional profile · a pragmatic software engineer",
        short_name: "Waldo Milanes",
        description: "I am an enthusiastic and skilled professional with substantial technical expertise in designing and developing web applications.",
        start_url: "/",
        lang: "en",
        background_color: "rgb(11,34,57)",
        theme_color: "rgb(240,242,245)",
        display: "standalone",
        icon: "src/images/icon.png", 
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
			options: {
				// This type will contain remote schema Query type
				typeName: `hwgraphql`,
				// This is field under which it's accessible
				fieldName: `HWGraphQL`,
				// Url to query from
				url: `http://localhost:3001/graphql`,
				refetchInterval: 6000,
			},
    },
    {
			resolve: 'gatsby-plugin-graphql-image',
			options: {
				schemaName: "hwgraphql",
				imageFieldName: "sourceUrl"
			}
		},
    `gatsby-plugin-offline`,
  ],
  
  siteMetadata: {
    title: "Waldo Milanes",
    titleTemplate: "%s · a pragmatic software engineer",
    description:
    "I am an enthusiastic and skilled professional with substantial technical expertise in designing and developing web applications.",
    url: "https://www.waldomilanes.com", // No trailing slash allowed!
    image: "/banner.png", // Path to your image you placed in the 'static' folder
    author: "waldo Milanes",
    twitterUsername: "@WaldoMilanes",
  }
}

