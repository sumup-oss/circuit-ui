import React from 'react';
import PropTypes from 'prop-types';

const isFunction = val => typeof val === 'function';

const filterProps = (blacklist, props) =>
  Object.keys(props).reduce((filteredProps, prop) => {
    if (blacklist[prop]) {
      return filteredProps;
    }
    filteredProps[prop] = props[prop];
    return filteredProps;
  }, {});

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
   * A hash of props that should not be forwarded as attributes to the HTML element.
   * Prevents React from complaining about invalid attribute values.
   */
  blacklist: PropTypes.objectOf(PropTypes.bool),
  /**
   * Child nodes to be rendered.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

HtmlElement.defaultProps = {
  blacklist: {},
  children: null
};

export default HtmlElement;
