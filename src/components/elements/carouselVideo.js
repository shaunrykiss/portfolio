import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeUp, faVolumeMute, faExpand } from "@fortawesome/free-solid-svg-icons";

import { slugify } from '../../utilities/helper-functions';

const CarouselVideo = props => {
  // const video = useRef("");

  const [video, setVideo] = useState("")
  const [videoIsPlaying, toggleVideoIsPlaying] = useState(false)
  const [videoIsMuted, toggleVideoIsMuted] = useState(true)
  const [autoplayProp, setAutoplayProp] = useState({})

  useEffect(() => {
    if (props.portfolioTriggered && props.isCurrent) {
      setAutoplayProp({
        autoPlay: "autoPlay",
      })
    } else {
      setAutoplayProp({})
    }

    if (video && !props.isCurrent) {
      pauseVideo()
      // video.current.currentTime = 0;
      video.currentTime = 0
    }

    if (
      props.portfolioTriggered &&
      ((props.firstSlide && props.isCurrent) || props.isCurrent)
    ) {
      playVideo()
      unmuteVideo()
    }
  }, [props.portfolioTriggered, props.isCurrent]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    const currentVideo = document.getElementById(slugify(props.video.title))
    setVideo(currentVideo)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const playVideo = () => {
    // video.current.play();
    console.log("playVideo called")

    if (video) {
      video.play();
      toggleVideoIsPlaying(true);
      console.log(props.video.title, "playing")
    }
  }

  const pauseVideo = () => {
    // video.current.pause();
    console.log("pauseVideo called")

    if (video) {
      video.pause()
      toggleVideoIsPlaying(false)
      console.log(props.video.title, "paused")
    }
  }

  const unmuteVideo = () => {
    // video.current.muted = false;
    if (video) {
      video.muted = false
      toggleVideoIsMuted(false)
    }
  }

  const togglePlayStatus = () => {    
    if (video) {
      if (!videoIsPlaying) {
        // video.current.play()
        video.play()
        console.log("toggle, playing")
      } else {
        // video.current.pause()
        video.pause()
        console.log("toggle, pausing")
      }

      toggleVideoIsPlaying(!videoIsPlaying)
    }
  }

  const toggleMuteStatus = () => {
    // video.current.muted = video.current.muted ? false : true;
    if (video) {
      video.muted = video.muted ? false : true

      video.muted ? console.log("unmuting") : console.log("muting")

      // video.current.muted ? console.log('unmuting') : console.log('muting');

      toggleVideoIsMuted(!videoIsMuted)
    }
  }

  const toggleFullScreenStatus = () => {
    // video.current.requestFullscreen();
    if (video) {
      video.requestFullscreen()
    }
  }

  const videoEnded = () => {
    props.handleVideoEnd(props.lastSlide)
  }

  return (
    <div className="carousel-video">
      <video
        {...autoplayProp}
        playsInline
        width="100%"
        muted
        onEnded={videoEnded}
        id={slugify(props.video.title)}
        src={props.video.videoUrl}
      >
        {/* <source src={props.video.videoUrl} type="video/mp4" /> */}
        <track kind="captions" />
      </video>

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

      <div
        className={`carousel-video__overlay${
          props.portfolioTriggered ? " active" : ""
        }`}
      ></div>
    </div>
  )
}

export default CarouselVideo;