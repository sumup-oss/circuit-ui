import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { size as sizeMixin, transparentize } from 'polished';
import { withProps } from 'recompose';

import { sizes } from '../../styles/constants';

const { KILO, MEGA, GIGA } = sizes;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const sizeStyles = ({ theme, size }) => {
  const sizeMap = {
    [KILO]: theme.spacings.kilo,
    [MEGA]: theme.spacings.mega,
    [GIGA]: theme.spacings.giga
  };

  const sizeValue = sizeMap[size] || sizeMap.GIGA;

  return css`
    label: spinner--${size.toLowerCase()};
    ${sizeMixin(sizeValue)};
    border-radius: ${sizeValue};
  `;
};

const darkStyles = ({ theme, dark }) =>
  dark &&
  css`
    border: 2px solid ${theme.colors.n900};
    border-top: 2px solid ${transparentize(0.7, theme.colors.n900)};
  `;

const baseStyles = ({ theme }) => css`
  label: spinner;
  animation: ${spin} 1s infinite linear;
  border-radius: ${theme.spacings.giga};
  border: 2px solid ${theme.colors.white};
  border-top: 2px solid ${transparentize(0.7, theme.colors.white)};
  transform: translateZ(0);
`;

/**
 * A loading spinner with ARIA labels support.
 */
const Spinner = styled('div')(baseStyles, sizeStyles, darkStyles);

Spinner.KILO = KILO;
Spinner.MEGA = MEGA;
Spinner.GIGA = GIGA;

Spinner.propTypes = {
  /**
   * Size of the Spinner. Usually passed down from parent
   * like a Button.
   */
  size: PropTypes.oneOf([Spinner.KILO, Spinner.MEGA, Spinner.GIGA]),
  /**
   * Renders a dark variant of the Spinner.
   */
  dark: PropTypes.bool
};

Spinner.defaultProps = {
  size: Spinner.GIGA,
  dark: false
};

/**
 * @component
 */
export default withProps({
  role: 'alertdialog',
  'aria-busy': 'true',
  'aria-live': 'assertive'
})(Spinner);
