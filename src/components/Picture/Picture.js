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
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      media: PropTypes.string,
      srcSet: PropTypes.string.isRequired
    })
  ),
  alt: PropTypes.string.isRequired,
  fallback: PropTypes.string.isRequired
};

Picture.defaultProps = {
  sources: []
};

/**
 * @component
 */
export default Picture;
