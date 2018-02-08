import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: component;
`;

/**
 * Describe your component here.
 */
const Component = styled('element')(baseStyles);

Component.propTypes = {
  /**
   * A consice description of the example prop.
   */
  example: PropTypes.string
};

Component.defaultProps = {};

/**
 * @component
 */
export default Component;
