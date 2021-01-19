import React, { useState } from "react";

import { Modal } from "react-responsive-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import ContactForm from '../elements/contactForm';
import SocialLinksList from '../elements/socialLinksList';

const Contact = (props) => {
  const [ formIsOpen, setFormIsOpen ] = useState(false);
  
  return (
    <section className="contact" id="contact">
      <div className="wrapper">
        <h2 className="section-heading">Contact</h2>

        <ul className="contact__info">
          <li className="contact__info-section">
            <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
            <p className="contact__info-point">Toronto, Canada</p>
          </li>
          <li className="contact__info-section">
            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            <a
              className="contact__info-point"
              href="mailto:shaunrykiss@gmail.com"
            >
              shaunrykiss&#64;gmail&#46;com
            </a>
          </li>
          <li className="contact__info-section">
            <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
            <a className="contact__info-point" href="tel:4164642916">
              416 464 2916
            </a>
          </li>
        </ul>

        <div className="contact__social">
          <SocialLinksList socialLinks={props.socialLinks} showLinks={true} color="dark"></SocialLinksList>
        </div>

        <div className="contact__form">
          <button
            className="contact__form-trigger"
            onClick={() => setFormIsOpen(true)}
          >
            <span>Contact Form</span>
            <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
          </button>
        </div>

        <div className="contact__logo" aria-hidden="true">
          <p>
            S<span>R</span>
          </p>
        </div>
      </div>

      <Modal 
        open={formIsOpen} 
        onClose={() => setFormIsOpen(false)} 
        center
        classNames={{ 
          overlay: 'contact-form__overlay',
          closeButton: 'contact-form__close',
          modal: 'contact-form__modal' 
        }}
      >
        <ContactForm></ContactForm>
      </Modal>
    </section>
  )
}

export default Contact;
