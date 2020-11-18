/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Shaun Rykiss | Editor",
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `x4fkbccjl9ri`,
        accessToken: `2yh9oybjs66UpOgClcnce9ZLCCgQZiEeVR8d1egECNc`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`
  ],
}
