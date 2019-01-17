import { createElement } from 'react';
import PropTypes from 'prop-types';

const isFunction = val => typeof val === 'function';

const filterProps = (blacklist, props) =>
  Object.keys(props).reduce((filteredProps, prop) => {
    if (blacklist[prop]) {
      return filteredProps;
    }
    // eslint-disable-next-line no-param-reassign
    filteredProps[prop] = props[prop];
    return filteredProps;
  }, {});

const HtmlElement = ({
  element,
  children,
  blacklist,
  deepRef,
  ...unfilteredProps
}) => {
  const type = isFunction(element) ? element(unfilteredProps) : element;
  const filteredProps = filterProps(blacklist, unfilteredProps);
  const ref = deepRef || undefined;
  return createElement(type, { ...filteredProps, ref }, children);
};

HtmlElement.propTypes = {
  /**
   * The HTML element that should be returned. If a function is passed,
   * the function needs to return a string for an HTML element (i.e., 'button').
   * The function is called with all component props except "element" and "children".
   * See the Button component for an example of how to use this.
   */
  element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  ]),
  /**
   * Same as the React ref. We need to use this because innerRef is already
   * used by styled.
   */
  deepRef: PropTypes.func
};

HtmlElement.defaultProps = {
  blacklist: {},
  children: null,
  element: 'div',
  deepRef: null
};

/**
 * @component
 */
export default HtmlElement;
