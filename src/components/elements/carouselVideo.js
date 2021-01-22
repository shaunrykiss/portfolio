import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeUp, faVolumeMute, faExpand } from "@fortawesome/free-solid-svg-icons";

const CarouselVideo = props => {
  const video = useRef("");

  const [videoIsPlaying, toggleVideoIsPlaying] = useState(false);
  const [videoIsMuted, toggleVideoIsMuted] = useState(true);

  useEffect(() => {
    if (props.portfolioTriggered && ((props.firstSlide && props.isCurrent) || props.isCurrent)) {
      playVideo();
      unmuteVideo();
    }
  }, [props.portfolioTriggered, props.isCurrent]) // eslint-disable-line react-hooks/exhaustive-deps

  const playVideo = () => {
    video.current.play();
    toggleVideoIsPlaying(true);
  }

  const unmuteVideo = () => {
    video.current.muted = false;
    toggleVideoIsMuted(false);
  }
  
  const togglePlayStatus = () => {
    if (!videoIsPlaying) {
      video.current.play()
    } else {
      video.current.pause()
    }

    toggleVideoIsPlaying(!videoIsPlaying)
  }

  const toggleMuteStatus = () => {
    video.current.muted = !videoIsMuted

    toggleVideoIsMuted(!videoIsMuted)
  }

  const toggleFullScreenStatus = () => {
    video.current.requestFullscreen();
  }

  const videoEnded = () => {
    props.handleVideoEnd(props.lastSlide);
  }

  return (
    <div className="carousel-video">
      <video playsinline width="100%" ref={video} muted={videoIsMuted} onEnded={videoEnded}>
        <source src={props.video.videoUrl} type="video/mp4" />
        <track kind="captions" />
      </video>

      {props.portfolioTriggered && (
        <div className="carousel-video__controls">
          <button className="play-toggle" onClick={togglePlayStatus}>
            <FontAwesomeIcon
              icon={videoIsPlaying ? faPause : faPlay}
            ></FontAwesomeIcon>
            <span className="sr-only">
              {videoIsPlaying ? "Pause Video" : "Play Video"}
            </span>
          </button>

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

          <div className="carousel-video__info">
            <p className="title">{props.video.title}</p>
            <p className="description">{props.video.description}</p>
          </div>
        </div>
      )}

      <div
        className={`carousel-video__overlay${
          props.portfolioTriggered ? " active" : ""
        }`}
      ></div>
    </div>
  )
}

export default CarouselVideo;