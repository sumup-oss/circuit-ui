import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  label: card__header;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.giga};
`;

/**
 * Header used in the Card component. Used for styling and alignment
 * purposes only.
 */
const CardHeader = styled('header', { label: 'CardHeader' })(baseStyles);

CardHeader.propTypes = {
  /**
   * Heading and/or CloseButton for closing.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

/**
 * @component
 */
export default CardHeader;
