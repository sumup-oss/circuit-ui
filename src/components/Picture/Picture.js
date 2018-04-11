import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash/fp';

/**
 * A custom picture component.
 */
const Picture = ({ sources, fallback, alt, ...rest }) => (
  <picture {...rest}>
    {map(s => <source key={s.srcSet} {...s} />, sources)}
    <img src={fallback} alt={alt} />
  </picture>
);

Picture.propTypes = {
  /**
   * An array of sources to be included in the
   * picture. `media` and `srcSet` properties
   * of each source match the respecitve HTML
   * attributes.
   */
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      media: PropTypes.string,
      srcSet: PropTypes.string.isRequired
    })
  ),
  /**
   * Alt text for the image.
   */
  alt: PropTypes.string.isRequired,
  /**
   * Fallback image URL.
   */
  fallback: PropTypes.string.isRequired
};

Picture.defaultProps = {
  sources: []
};

/**
 * @component
 */
export default Picture;
