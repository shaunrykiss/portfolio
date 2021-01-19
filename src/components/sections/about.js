import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { parallaxStyle } from "../../utilities/helper-functions";

import { Parallax } from "react-scroll-parallax"
import { Controller, Scene } from "react-scrollmagic"

const About = () => (
  <StaticQuery
    query={graphql`
      query BioQuery {
        allContentfulBio {
          edges {
            node {
              bioImage {
                fluid(quality: 100, maxWidth: 300) {
                  ...GatsbyContentfulFluid
                }
              }
              bioText {
                internal {
                  content
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <section className="about" id="about">
        <div className="wrapper">
          <Parallax className="parallax" x={[30, -50]} styleOuter={parallaxStyle}>
            <div className="parallax-heading"></div>
          </Parallax>

          <Controller>
            <Scene
              offset="-250"
              classToggle="section-content--fade-in"
              triggerElement=".about .section-content"
              reverse="true"
            >
              <div className="section-content">
                <h2 className="section-heading">Shaun Rykiss</h2>
                <h3 className="section-subheading">Editor</h3>
      
                <div className="about__content">
                  <div className="about__bio">
                    <p>
                      {data.allContentfulBio.edges[0].node.bioText.internal.content}
                    </p>
                  </div>
      
                  <div className="about__headshot">
                    <Img
                      fluid={data.allContentfulBio.edges[0].node.bioImage.fluid}
                    ></Img>
                  </div>
                </div>
              </div>
            </Scene>
          </Controller>
        </div>
      </section>
    )}
  />
)

export default About;