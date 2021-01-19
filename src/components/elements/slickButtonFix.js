import React from 'react';

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
  <span {...props}>{children}</span>
);

export default SlickButtonFix;