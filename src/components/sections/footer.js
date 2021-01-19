import React, { useState } from 'react';

import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SocialLinksList from "../elements/socialLinksList"

const currentYear = new Date().getFullYear();

/* eslint-disable jsx-a11y/no-static-element-interactions */

const Footer = ({ socialLinks }) => {
  const [ showSocialLinks, toggleShowSocialLinks ] = useState(false);
  
  return (
    <footer className="footer">
      <div className="wrapper footer__container">
        <p className="footer__copyright">
          <span>©</span> Shaun Rykiss {currentYear}
        </p>

        <div
          className="footer__social"
          onMouseEnter={() => toggleShowSocialLinks(true)}
          onMouseLeave={() => toggleShowSocialLinks(false)}
        >
          <SocialLinksList
            socialLinks={socialLinks}
            showLinks={showSocialLinks}
            color="light"
          ></SocialLinksList>

          <button className="footer__social-trigger">
            <FontAwesomeIcon icon={faShareSquare}></FontAwesomeIcon>
            <span className="sr-only">{showSocialLinks ? 'Show Social Links' : 'Hide Social Links'}</span>
          </button>
        </div>
      </div>
    </footer>
  )
};

export default Footer;