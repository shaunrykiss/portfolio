import React from "react";

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

export default SlickButtonFix;