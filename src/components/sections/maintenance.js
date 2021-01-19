import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Maintenance = () => (
  <div className="maintenance">
    <div className="wrapper">
      <div className="logo">S<span>R</span></div>
  
      <div class="maintenance__content">
        <div>
          <h1>Shaun Rykiss</h1>
          <h2>Editor</h2>
        </div>
  
        <p className="maintenance__message">Down for maintenance.<br></br>Stay tuned!</p>
  
        <ul className="maintenance__contact">
          <li>
            <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
            <p className="sr-only">Location</p>
            <p className="maintenance__contact-point">Toronto, Canada</p>
          </li>
  
          <li>
            <a href="mailto:shaunrykiss@gmail.com">
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              <p className="sr-only">Email</p>
            </a>
            <a className="maintenance__contact-point" href="mailto:shaunrykiss@gmail.com">shaunrykiss&#64;gmail&#46;com</a>
          </li>
  
          <li>
            <a href="tel:4164642916">
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
              <p className="sr-only">Phone</p>
            </a>
            <a className="maintenance__contact-point" href="tel:4164642916">416 464 2916</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Maintenance;