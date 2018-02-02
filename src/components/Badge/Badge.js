import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import { subHeadingKilo } from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: badge;
  background-color: ${theme.colors.r500};
  border-radius: 100px;
  color: ${theme.colors.white};
  cursor: default;
  padding: 0 ${theme.spacings.byte};
  ${subHeadingKilo({ theme })};
  text-transform: uppercase;
  user-select: none;

  &:hover {
    background-color: ${theme.colors.r700};
  }

  &:active {
    background-color: ${theme.colors.r900};
  }
`;

const circularStyles = ({ circular }) =>
  circular &&
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    ${size(24)};
  `;

/**
 * A badge for displaying update notifications etc.
 */
const Badge = styled('div')(baseStyles, circularStyles);

Badge.propTypes = {
  /**
   * An ID rendered as data-selector attribute on the
   * component. Used for tracking and e2e testing.
   */
  selector: PropTypes.string,
  /**
   * Callback for the click event.
   */
  onClick: PropTypes.func,
  /**
   * Ensures text is centered and the badge looks like a circle.
   */
  circular: PropTypes.bool
};

Badge.defaultProps = {
  selector: null,
  onClick: () => {},
  circular: false
};

/**
 * @component
 */
export default Badge;
