import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = () => css`
  label: image;
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
`;

/**
 * The Image component. Responsive by default.
 */
const Image = styled('img')`
  ${baseStyles};
`;

Image.propTypes = {
  /**
   * Specifies the source URL of an image
   */
  src: PropTypes.string.isRequired,
  /**
   * Provides alternative information if a user cannot view the image,
   * e.g. because of slow connection, an error in the src attribute, or if the
   * user uses a screen reader.
   */
  alt: PropTypes.string.isRequired
};

/**
 * @component
 */
export default Image;
