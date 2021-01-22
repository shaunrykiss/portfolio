import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { Controller, Scene } from "react-scrollmagic"

import { StaticQuery, graphql } from 'gatsby';

import CarouselVideo from '../elements/carouselVideo';
import SlickButtonFix from '../elements/slickButtonFix';

const Portfolio = props => {
  const carouselSettings = {
    adaptiveHeight: true,
    arrows: true,
    cssEase: "ease-in-out",
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    swipe: false,
    touchMove: false,
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
    afterChange: function (index) {
      let siblings = document.querySelectorAll(".slick-slide")
      let current = document.querySelector(".slick-current")

      for (let i = 0; i < siblings.length; i++) {
        siblings[i].style.zIndex = 0
      }
      current.style.zIndex = 10

      siblings.forEach((sibling, i) => {
        if (i < carouselVideos.length) {
          const video = sibling.querySelector('video');
          
          video.pause();
          video.currentTime = 0;
        }
      });

      updateCurrentSlide(index);
    },
  }

  const [carouselVideos, setCarouselVideos] = useState([]);

  const [portfolioTriggered, setPortfolioTriggered] = useState(false);

  const [currentSlide, updateCurrentSlide] = useState(0);

  const triggerButton = useRef('');
  const slider = useRef('');

  useEffect(() => {
    const videos = props.data.allContentfulHomepageCarouselVideo.edges.map(
      video => ({
        videoUrl: video.node.video.file.url,
        title: video.node.title,
        description: video.node.description,
      })
    )

    setCarouselVideos(videos)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const triggerPortfolio = () => {
    setPortfolioTriggered(true)
    triggerButton.current.style.opacity = 0
    setTimeout(() => {
      triggerButton.current.style.display = "none"
    }, 400);
  }

  const handleVideoEnd = (restarting) => {
    slider.current.slickNext();

    if (restarting) {
      setPortfolioTriggered(false);
      triggerButton.current.style.display = 'flex';
      setTimeout(() => {
        triggerButton.current.style.opacity = 1;
      }, 400);
    }
  }

  return (
    <Controller>
      <Scene
        offset="40"
        triggerHook="onLeave"
        classToggle="portfolio--inactive"
        triggerElement=".portfolio"
        reverse="true"
      >
        <section
          className={`portfolio${portfolioTriggered ? " portfolio-active" : ""}`}
          id="portfolio"
        >
          <div className="wrapper">
            <div className="portfolio__carousel">
              <Slider {...carouselSettings} ref={slider}>
                {carouselVideos.map((video, i) => (
                  <CarouselVideo
                    key={i}
                    firstSlide={i === 0}
                    lastSlide={i === carouselVideos.length - 1}
                    isCurrent={i === currentSlide}
                    video={video}
                    portfolioTriggered={portfolioTriggered}
                    handleVideoEnd={handleVideoEnd}
                  />
                ))}
              </Slider>
    
              <button
                className="portfolio__trigger-button"
                onClick={triggerPortfolio}
                ref={triggerButton}
              >
                <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                <span>View Portfolio</span>
              </button>
            </div>
    
            <div className="portfolio__title">
              <h1>Shaun Rykiss</h1>
              <h2>Editor</h2>
            </div>
          </div>
        </section>
      </Scene>
    </Controller>
  )
};

export default () => (
  <StaticQuery
    query={graphql`
      query CarouselVideosQuery {
        allContentfulHomepageCarouselVideo {
          edges {
            node {
              video {
                file {
                  url
                }
              }
              title
              description
            }
          }
        }
      }
    `}
    render={data => <Portfolio data={data} />}
  />
)

