import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { parallaxStyle } from "../../utilities/helper-functions";

import { Parallax } from "react-scroll-parallax";
import { Controller, Scene } from "react-scrollmagic";

const About = props => (
  <Controller>
    <Scene
          offset="-350"
          triggerHook="onCenter"
          classToggle="section--fade-in"
          triggerElement=".about"
          reverse="true"
        >
    <section className="about" id="about">
      <div className="wrapper">
        <Parallax
          className="parallax"
          x={[30, -50]}
          styleOuter={parallaxStyle}
        >
          <div className="parallax-heading"></div>
        </Parallax>

        
          <div className="section-content">
            <div className="about__header">
              <h2 className="section-heading">Shaun Rykiss</h2>
              <h3 className="section-subheading">Editor</h3>
            </div>

            <div className="about__content">
              <div className="about__bio">
                <p>
                  {
                    props.data.allContentfulBio.edges[0].node.bioText.internal
                      .content
                  }
                </p>
              </div>

              <div className="about__headshot">
                <Img
                  fluid={
                    props.data.allContentfulBio.edges[0].node.bioImage.fluid
                  }
                ></Img>
              </div>
            </div>
          </div>
      </div>
    </section>
    </Scene>
  </Controller>
);

export default () => (
  <StaticQuery
    query={graphql`
      query BioQuery {
        allContentfulBio {
          edges {
            node {
              bioImage {
                fluid(quality: 45, maxWidth: 300) {
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
    render={data => <About data={data} />}
  />
)