import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ContactForm = props => {
  const onCloseClick = (e) => {
    e.preventDefault();
    props.onClose();
  }
  
  return (
    <div className="contact-form">
      <form action="https://formspree.io/f/xleooqve" method="POST">
        <button className="close" onClick={onCloseClick}>
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          <span className="sr-only">Close</span>
        </button>
        
        <h3>Get in Touch</h3>

        <div className="name-email">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="name"
            name="name"
            placeholder="Name"
          />

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="email"
            name="_replyto"
            placeholder="Email"
          />
        </div>

        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          className="message"
          placeholder="Message"
        ></textarea>

        <button type="submit" className="send">
          Send
        </button>
      </form>
    </div>
  )
};

export default ContactForm;