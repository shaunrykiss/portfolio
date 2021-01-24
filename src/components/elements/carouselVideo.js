import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeUp, faVolumeMute, faExpand } from "@fortawesome/free-solid-svg-icons";

import { slugify } from '../../utilities/helper-functions';

const CarouselVideo = props => {
  const video = useRef("");

  const [videoIsTriggered, setVideoIsTriggered] = useState(false);
  const [videoIsPlaying, toggleVideoIsPlaying] = useState(false)
  const [videoIsMuted, toggleVideoIsMuted] = useState(false)
  const [screenIsSmall, setScreenIsSmall] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenIsSmall(window.innerWidth < 768);
    });
    
    if (!props.isCurrent) {
      pauseVideo();
      video.current.currentTime = 0;
      setVideoIsTriggered(false);
    }

    if (
      !screenIsSmall &&
      props.portfolioTriggered &&
      ((props.firstSlide && props.isCurrent) || props.isCurrent)
    ) {
      playVideo()
      unmuteVideo()
    }
  }, [props.portfolioTriggered, props.isCurrent]) // eslint-disable-line react-hooks/exhaustive-deps

  const playVideo = () => {
    video.current.play();
    toggleVideoIsPlaying(true);
    setVideoIsTriggered(true);
  }

  const triggerVideo = () => {
    playVideo();

    unmuteVideo();  
    
    setVideoIsTriggered(true);
  }

  const pauseVideo = () => {
    video.current.pause();
    toggleVideoIsPlaying(false)
  }

  const unmuteVideo = () => {
    video.current.muted = false;
    toggleVideoIsMuted(false)
  }

  const togglePlayStatus = () => {    
    if (!videoIsPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }

    // toggleVideoIsPlaying(!videoIsPlaying)
  }

  const toggleMuteStatus = () => {
    video.current.muted ? console.log('unmuting') : console.log('muting');
    video.current.muted = video.current.muted ? false : true;

    toggleVideoIsMuted(!videoIsMuted)
  }

  const toggleFullScreenStatus = () => {
    video.current.requestFullscreen();
  }

  const videoEnded = () => {
    props.handleVideoEnd(props.lastSlide)
  }

  return (
    <div className="carousel-video">
      <div className="carousel-video__container">
        <div
          className={`carousel-video__overlay${
            props.portfolioTriggered ? " active" : ""
          }${videoIsTriggered ? " active-small" : ""}`}
        ></div>

        <video
          playsInline
          width="100%"
          onEnded={videoEnded}
          id={slugify(props.video.title)}
          ref={video}
          poster={props.video.poster}
        >
          <source src={props.video.videoUrl} />
          <track kind="captions" />
        </video>

        {props.portfolioTriggered && 
          <button
            className={`carousel-video__play${videoIsTriggered ? " hide" : ""}`}
            onClick={triggerVideo}
          >
            <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
            <span className="sr-only">Play Video</span>
          </button>
        }
      </div>

      <div
        className={`carousel-video__overlay-content${
          props.portfolioTriggered ? " active" : ""
        }`}
      >
        <div className="carousel-video__controls">
          <button className="play-toggle" onClick={togglePlayStatus}>
            <FontAwesomeIcon
              icon={videoIsPlaying ? faPause : faPlay}
            ></FontAwesomeIcon>
            <span className="sr-only">
              {videoIsPlaying ? "Pause Video" : "Play Video"}
            </span>
          </button>

          <div className="carousel-video__toggles">
            <button className="mute-toggle" onClick={toggleMuteStatus}>
              <FontAwesomeIcon
                icon={videoIsMuted ? faVolumeUp : faVolumeMute}
              ></FontAwesomeIcon>
              <span className="sr-only">
                {videoIsMuted ? "Unmute Video" : "Mute Video"}
              </span>
            </button>

            <button
              className="fullscreen-toggle"
              onClick={toggleFullScreenStatus}
            >
              <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
              <span className="sr-only">Enter Full Screen View</span>
            </button>
          </div>
        </div>

        <div className="carousel-video__info">
          <p className="title">{props.video.title}</p>
          <p className="description">{props.video.description}</p>
        </div>
      </div>
    </div>
  )
}

export default CarouselVideo;