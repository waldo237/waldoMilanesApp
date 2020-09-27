require("dotenv").config({
  path: `.env`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-offline`
  ],
}


module.exports = {
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