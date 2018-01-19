import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const HtmlElement = ({ element: Element, children, ...props }) => (
  <Element {...props}>{children}</Element>
);
HtmlElement.propTypes = {
  /**
   * The HTML element that should be rendered.
   */
  element: PropTypes.string.isRequired,
  /**
   * Child nodes to be rendered.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default HtmlElement;
