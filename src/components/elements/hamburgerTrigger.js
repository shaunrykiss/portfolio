import React from 'react';

const HamburgerTrigger = props => {
  return (
    <button
      className={`hamburger-trigger${props.navStatus}`}
      onClick={props.toggleNav}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

export default HamburgerTrigger;