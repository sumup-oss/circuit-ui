import React from 'react';
import PropTypes from 'prop-types';

const isFunction = val => typeof val === 'function';

const filterProps = (blacklist, props) => {
  const newProps = { ...props };
  blacklist.forEach(prop => {
    delete newProps[prop];
  });
  return newProps;
};

const HtmlElement = ({ element, children, blacklist, ...props }) => {
  const Element = isFunction(element) ? element(props) : element;
  return <Element {...filterProps(blacklist, props)}>{children}</Element>;
};

HtmlElement.propTypes = {
  /**
   * The HTML element that should be returned. If a function is passed,
   * the function needs to return a string for an HTML element (i.e., 'button').
   * The function is called with all component props except "element" and "children".
   * See the Button component for an example of how to use this.
   */
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  /**
   * A list of props that should not be forwarded as attributes to the HTML element.
   * Prevents React from complaining about invalid attribute values.
   */
  blacklist: PropTypes.array,
  /**
   * Child nodes to be rendered.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

HtmlElement.defaultProps = {
  blacklist: []
};

export default HtmlElement;
