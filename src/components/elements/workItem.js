import React, { useRef, useEffect, useState } from 'react';

import ReactPlayerYoutube from 'react-player/youtube';
import ReactPlayerVimeo from 'react-player/vimeo';
import Img from 'gatsby-image';
import Loader from '../elements/loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";

import { slugify, listify } from '../../utilities/helper-functions';

const WorkItem = props => {
  const itemHasVideo = props.item.link ? true : false;
  const itemHasCredits = props.item.directors || props.item.producers || props.item.writers || props.item.executiveProducers;
  const itemHasProductionInfo = props.item.production || props.item.network;

  const loader = useRef('');

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);

  let media;

  if (itemHasVideo) {
    if (props.item.link.includes('youtube')) {
      media = <ReactPlayerYoutube width="100%" height={windowWidth > 1800 ? '720px' : '360px'} url={props.item.link} controls={true} onReady={() => hideLoader()}></ReactPlayerYoutube>
    }
    
    if (props.item.link.includes('vimeo')) {
      media = <ReactPlayerVimeo width="100%" height={windowWidth > 1800 ? '720px' : '360px'} url={props.item.link} controls={true} onReady={() => hideLoader()}></ReactPlayerVimeo>
    }
  } else {
    media = <Img fluid={props.item.image.fluid}></Img>;
  }

  const hideLoader = () => {
    loader.current.style.opacity = 0;
    loader.current.style.zIndex = -1;
  }

  return (
    <div className="work-item">
      {itemHasVideo && (
        <div className="work-item__loader-overlay" ref={loader}>
          <Loader></Loader>
        </div>
      )}

      {media}

      <div className="work-item__content">
        <button className="work-item__close" onClick={props.closeModal}>
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </button>

        <div className="work-item__header">
          <h2 id={slugify(props.item.title)} className="work-item__title">
            {props.item.title}
          </h2>
          {props.item.status && (
            <span className="work-item__status">({props.item.status})</span>
          )}
        </div>

        {props.item.genre && (
          <p className="work-item__genre">{props.item.genre}</p>
        )}

        <div className="work-item__time-info">
          <div className="work-item__year">
            <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
            <p>{`${props.item.startingYear}${
              props.item.endingYear ? ` - ${props.item.endingYear}` : ""
            }`}</p>
          </div>

          {props.item.runningTime && (
            <>
              <div className="work-item__runtime">
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                <p>{props.item.runningTime}</p>
              </div>
            </>
          )}
        </div>

        {itemHasCredits && (
          <div className="work-item__credits">
            <div className="work-item__credits-header">
              <h3>Credits</h3>

              {props.item.imdbLink && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="work-item__imdb-link"
                  href={props.item.imdbLink}
                >
                  <FontAwesomeIcon icon={faImdb}></FontAwesomeIcon>
                </a>
              )}
            </div>

            {props.item.directors && (
              <div className="work-item__credit-category">
                <h4>
                  {props.item.directors.length > 1 ? "Directors" : "Director"}
                </h4>
                <p>{listify(props.item.directors)}</p>
              </div>
            )}

            {props.item.writers && (
              <div className="work-item__credit-category">
                <h4>{props.item.writers.length > 1 ? "Writers" : "Writer"}</h4>
                <p>{listify(props.item.writers)}</p>
              </div>
            )}

            {props.item.executiveProducers && (
              <div className="work-item__credit-category">
                <h4>
                  {props.item.executiveProducers.length > 1
                    ? "Executive Producers"
                    : "Executive Producer"}
                </h4>
                <p>{listify(props.item.executiveProducers)}</p>
              </div>
            )}

            {props.item.producers && (
              <div className="work-item__credit-category">
                <h4>
                  {props.item.producers.length > 1 ? "Producers" : "Producer"}
                </h4>
                <p>{listify(props.item.producers)}</p>
              </div>
            )}
          </div>
        )}

        {itemHasProductionInfo && (
          <div className="work-item__production-info">
            {props.item.production && (
              <div className="work-item__production-category">
                <h4>Production</h4>
                <p>{props.item.production}</p>
              </div>
            )}

            {props.item.network && (
              <div className="work-item__production-category">
                <h4>Network</h4>
                <p>{props.item.network}</p>
              </div>
            )}
          </div>
        )}

        {props.item.description && (
          <div className="work-item__description">
            <h3>Description</h3>
            
            <p className="work-item__description-content">
              {props.item.description.internal.content}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkItem;