import React, { useState, useEffect, useRef } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

import Logo from '../elements/logo';
import HamburgerTrigger from '../elements/hamburgerTrigger';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */


const Header = () => {
  const nav = useRef('');

  const [navIsOpen, toggleNavIsOpen] = useState(false);
  
  useEffect(() => {
    window.addEventListener('scroll', () => {      
      if (document.documentElement.scrollTop > 0) {
        nav.current.classList.add('active');
      } else {
        nav.current.classList.remove('active');
      }
    });
  }, []);

  return (
    <header className="header" ref={nav}>
      <nav className="header__nav wrapper">
        <AnchorLink href="#home" className="header__nav-link logo logo--small">
          <Logo></Logo>
        </AnchorLink>

        <div
          className={`header__overlay${navIsOpen ? " open" : ""}`}
          onClick={() => toggleNavIsOpen(false)}
        ></div>

        <ul className={`header__nav-list${navIsOpen ? " open" : ""}`}>
          <li
            className="header__nav-item"
            onClick={() => toggleNavIsOpen(false)}
          > 
            <AnchorLink href="#about" offset="64" className="header__nav-link">
              About
            </AnchorLink>
          </li>
          <li
            className="header__nav-item"
            onClick={() => toggleNavIsOpen(false)}
          >
            <AnchorLink href="#works" offset="64" className="header__nav-link">
              Works
            </AnchorLink>
          </li>
          <li className="header__nav-item logo-item">
            <AnchorLink href="#home" className="header__nav-link logo">
              <Logo></Logo>
            </AnchorLink>
          </li>
          <li
            className="header__nav-item"
            onClick={() => toggleNavIsOpen(false)}
          >
            <AnchorLink href="#resume" offset="64" className="header__nav-link">
              Resume
            </AnchorLink>
          </li>
          <li
            className="header__nav-item"
            onClick={() => toggleNavIsOpen(false)}
          >
            <AnchorLink
              href="#contact"
              offset="64"
              className="header__nav-link"
            >
              Contact
            </AnchorLink>
          </li>
        </ul>

        <HamburgerTrigger
          toggleNav={() => toggleNavIsOpen(!navIsOpen)}
          navStatus={navIsOpen ? " open" : ""}
        ></HamburgerTrigger>
      </nav>
    </header>
  )
}

export default Header;