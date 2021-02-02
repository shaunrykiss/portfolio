import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby";

import Img from "gatsby-image";
import Slider from "react-slick";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import SlickButtonFix from '../elements/slickButtonFix';

const Corporate = props => {
  const [ logos, setLogos ] = useState([]);

  useEffect(() => {
    const logos = props.data.allContentfulCorporateWorkItem.edges.map(logo => logo.node.logo);
    setLogos(logos);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const carouselSettings = {
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: (
      <SlickButtonFix>
        <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
      </SlickButtonFix>
    ),  
  };
  
  return (
    <section className="corporate" id="corporate">
      <div className="wrapper">

        <h2 className="section-heading">Corporate Clients</h2>

        <ul className="corporate__logos-container">
          <Slider {...carouselSettings}>
            {logos.map((logo, i) => (
              <li className="corporate__logo" key={i}>
                <div className="corporate__logo-wrapper">
                  <Img fluid={logo.fluid}></Img>
                </div>
              </li>
            ))}
          </Slider>
        </ul>

      </div>
    </section>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query CorporateItemsQuery {
        allContentfulCorporateWorkItem(
          sort: { fields: [updatedAt], order: DESC }
        ) {
          edges {
            node {
              logo {
                title
                fluid(quality: 100) {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Corporate data={data} />}
  />
)

