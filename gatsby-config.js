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
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Montserrat:700,800,300,500",
            "Oswald:200,300,400,500",
            "Raleway:200,300,500,600",
          ],
        },
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
