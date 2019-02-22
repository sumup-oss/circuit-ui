import React from 'react';
import PropTypes from 'prop-types';

/**
 * Basic Element that can be used as underlying component for composition.
 */
const Element = ({ as, deepRef, ...props }) =>
  React.createElement(as, { ...props, ref: deepRef || null });

Element.propTypes = {
  /**
   * Element that needs to be returned.
   * Must be either html element or react component.
   */
  as: PropTypes.string,
  /**
   * Ref to be passed to the underlying element.
   */
  deepRef: PropTypes.func
};

Element.defaultProps = {
  as: 'div'
};

/**
 * @component
 */
export default Element;
