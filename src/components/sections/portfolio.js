import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Slider from 'react-slick';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlayCircle, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Loader from 'react-loader-spinner';

import { Controller, Scene } from 'react-scrollmagic';

import { StaticQuery, graphql } from 'gatsby';

import CarouselVideo from '../elements/carouselVideo';
import SlickButtonFix from '../elements/slickButtonFix';

const Portfolio = props => {
  const carouselSettings = {
    adaptiveHeight: false,
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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          adaptiveHeight: true,
        },
      },
    ],
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
    onInit: function () {
      let siblings = document.querySelectorAll(".slick-slide")

      siblings.forEach((sibling, i) => {
        if (i < carouselVideos.length) {
          const video = sibling.querySelector("video")

          video.pause()
          video.currentTime = 0
        }
      })
    },
    afterChange: function (index) {
      let siblings = document.querySelectorAll(".slick-slide")
      let current = document.querySelector(".slick-current")

      for (let i = 0; i < siblings.length; i++) {
        siblings[i].style.zIndex = 0
      }
      current.style.zIndex = 10

      updateCurrentSlide(index)
    },
  }

  const [carouselVideos, setCarouselVideos] = useState([]);

  const [portfolioTriggered, setPortfolioTriggered] = useState(false);

  const [portfolioMuted, setPortfolioMuted] = useState(true);

  const [currentSlide, updateCurrentSlide] = useState(0);

  const [portfolioHasRestarted, setPortfolioHasRestarted] = useState(false);

  const [loadedVideos, updateLoadedVideos] = useState([]);

  const [portfolioLoaded, setPortfolioLoaded] = useState(false);

  const triggerButton = useRef("");
  const slider = useRef("");

  useEffect(() => {
    const videos = props.data.allContentfulHomepageCarouselVideo.edges.map(
      video => ({
        videoUrl: video.node.video.file.url,
        title: video.node.title,
        description: video.node.description,
        poster: video.node.posterImage.file.url,
      })
    )

    setCarouselVideos(videos)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (carouselVideos.length) {
      const allVideosLoaded = carouselVideos.every(video => loadedVideos.includes(video.title));

      if (allVideosLoaded) {
        setPortfolioLoaded(true);
      }
    }
  }, [carouselVideos, loadedVideos]) // eslint-disable-line react-hooks/exhaustive-deps

  const triggerPortfolio = () => {
    setPortfolioTriggered(true)
    triggerButton.current.style.display = "none"

    if (portfolioHasRestarted) {
      setPortfolioMuted(portfolioMuted)
    } else {
      setPortfolioMuted(false)
    }
  }

  const handleVideoEnd = restarting => {
    slider.current.slickNext()

    if (restarting) {
      setPortfolioTriggered(false)
      setPortfolioHasRestarted(true)
      triggerButton.current.style.display = "flex"
      setTimeout(() => {
        triggerButton.current.style.opacity = 1
      }, 400)
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
          className={`portfolio${
            portfolioTriggered ? " portfolio-active" : ""
          }${portfolioLoaded ? " portfolio-loaded" : ""}`}
          id="portfolio"
        >
          <div className="wrapper">
            <div className="portfolio__carousel">
              <div
                className={`portfolio-loading-overlay${
                  portfolioLoaded ? " hide" : ""
                }`}
              >
                <Loader type="TailSpin" color="#1B83EA"></Loader>
              </div>

              <Slider {...carouselSettings} ref={slider}>
                {carouselVideos.map((video, i) => (
                  <CarouselVideo
                    key={i}
                    firstSlide={i === 0}
                    lastSlide={i === carouselVideos.length - 1}
                    isCurrent={i === currentSlide}
                    video={video}
                    portfolioTriggered={portfolioTriggered}
                    portfolioMuted={portfolioMuted}
                    setPortfolioMuted={setPortfolioMuted}
                    handleVideoEnd={handleVideoEnd}
                    updateLoadedVideos={updateLoadedVideos}
                    loadedVideos={loadedVideos}
                  />
                ))}
              </Slider>

              <button
                className="portfolio__trigger-button"
                onClick={triggerPortfolio}
                ref={triggerButton}
              >
                <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
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
        allContentfulHomepageCarouselVideo ( sort: { fields: [order, updatedAt], order: [ASC, DESC] }) {
          edges {
            node {
              video {
                file {
                  url
                }
              }
              title
              description
              posterImage {
                file {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Portfolio data={data} />}
  />
)

