import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: component;
`;

/**
 * Describe your component here.
 */
const CardExpiryDate = styled('element')(baseStyles);

CardExpiryDate.propTypes = {
  /**
   * A consice description of the example prop.
   */
  example: PropTypes.string
};

CardExpiryDate.defaultProps = {};

/**
 * @component
 */
export default CardExpiryDate;
