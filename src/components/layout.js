import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Header from './sections/header';
import Footer from './sections/footer';
import Maintenance from './sections/maintenance';

import favicon from '../../static/favicon.png';
import sitePreviewImage from '../../static/site-preview.png';

const SiteContent = ({children, socialLinks}) => (
  <React.Fragment>
    <Header></Header>
    { children }
    <Footer socialLinks={socialLinks}></Footer>
  </React.Fragment>
);


export default function Layout({ children, socialLinks }) {
  const siteData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
     
            title
          }
        }
        allContentfulSiteUnderMaintenanceToggle {
          edges {
            node {
              siteIsUnderMaintenance
            }
          }
        }
      }
    `
  );

  const siteUnderMaintenance = siteData.allContentfulSiteUnderMaintenanceToggle.edges[0].node.siteIsUnderMaintenance;

  return (
    <div className="app-container">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link type="image/png" href={favicon} rel="icon" />
        <meta property="og:title" content="Shaun Rykiss - Editor" />
        <meta property="og:description" content="Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.shaunrykiss.com/" />
        <meta property="og:image" content={sitePreviewImage} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content={sitePreviewImage} />
        <meta name="twitter:site" content="Shaun Rykiss | Editor" />
        <meta name="twitter:creator" content="@ShaunRykiss" />

        <title>{siteData.site.siteMetadata.title}</title>
      </Helmet>

      {siteUnderMaintenance ? (
        <Maintenance />
      ) : (
        <SiteContent children={children} socialLinks={socialLinks} />
      )}
    </div>
  )
}