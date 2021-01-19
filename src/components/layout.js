import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Header from './sections/header';
import Footer from './sections/footer';
import Maintenance from './sections/maintenance';

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
        <title>{siteData.site.siteMetadata.title}</title>
      </Helmet>

      {siteUnderMaintenance ?
        <Maintenance/>
        :
        <SiteContent children={children} socialLinks={socialLinks} />
      }
    </div>
  )
}