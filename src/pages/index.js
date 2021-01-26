import React from "react";
import { graphql } from 'gatsby';
import { ParallaxProvider } from "react-scroll-parallax"
import Layout from '../components/layout';

import Portfolio from '../components/sections/portfolio';
import About from '../components/sections/about';
import Works from '../components/sections/works';
import Corporate from '../components/sections/corporate';
import Resume from '../components/sections/resume';
import Contact from '../components/sections/contact';

export default ({ data }) => {  
  document.addEventListener("touchstart", function () {}, false);
  
  const socialLinks = Object.values(
    data.allContentfulSocialMediaLinkLinkListJsonNode.edges[0].node
  );
  
  return (
    <div id="home">
      <Layout
        socialLinks={socialLinks}
      >
        <ParallaxProvider>
          <Portfolio></Portfolio>
          <About></About>
          <Works></Works>
          <Corporate></Corporate>
          <Resume></Resume>
          <Contact socialLinks={socialLinks}></Contact>
        </ParallaxProvider>
      </Layout>
    </div>
  )
};

export const query = graphql`
  query SocialLinksQuery {
    allContentfulSocialMediaLinkLinkListJsonNode {
      edges {
        node {
          imdb {
            name
            show
            url
          }
          instagram {
            show
            name
            url
          }
          twitter {
            name
            show
            url
          }
          linkedin {
            name
            show
            url
          }
          vimeo {
            name
            show
            url
          }
        }
      }
    }
  }
`


