import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faVimeo,
  faInstagramSquare,
  faLinkedin,
  faTwitterSquare,
  faImdb,
} from "@fortawesome/free-brands-svg-icons"

const SocialLinksList = props => {
  const iconList = {
    vimeo: faVimeo,
    instagram: faInstagramSquare,
    linkedin: faLinkedin,
    twitter: faTwitterSquare,
    imdb: faImdb
  };
  
  return  (
    <ul className={`social-links-list${props.showLinks ? ' show' : ''}`}>
      {props.socialLinks.map((link, i) => (
        <li className="social-links-list__item" key={i}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={`social-links-list__link social-links-list__link--${props.color}`}
          >
            <FontAwesomeIcon icon={iconList[link.name.toLowerCase()]}></FontAwesomeIcon>
            <span className="sr-only">{link.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinksList;