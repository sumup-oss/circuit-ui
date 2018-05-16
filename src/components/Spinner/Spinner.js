import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'react-emotion';
import { size as sizeMixin } from 'polished';
import { withProps } from 'recompose';

import { sizes } from '../../styles/constants';

import SpinnerSvg from './icons/spinner.svg';

const { KILO, MEGA, GIGA } = sizes;

const spin = keyframes`
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
`;

/**
 * Icon components
 */

const baseIconStyles = ({ theme }) => css`
  width: 100%;
  height: 100%;
  & > path {
    fill: ${theme.colors.white};
  }
`;

const darkIconStyles = ({ theme, dark }) =>
  dark &&
  css`
    & > path {
      fill: ${theme.colors.n900};
    }
  `;

const baseSpinStyles = css`
  label: spinner;
  animation: ${spin} 1s infinite linear;
`;

const SpinnerIcon = styled(SpinnerSvg)(
  baseIconStyles,
  darkIconStyles,
  baseSpinStyles
);

/**
 * Container component
 */

const baseContainerStyles = css`
  opacity: 0;
  position: relative;
  transition: opacity 200ms ease-in-out;
`;

const activeContainerStyles = ({ active }) =>
  active &&
  css`
    opacity: 1;
  `;

const sizeContainerStyles = ({ theme, size }) => {
  const sizeMap = {
    [KILO]: theme.spacings.mega,
    [MEGA]: theme.spacings.giga,
    [GIGA]: theme.spacings.tera
  };

  const sizeValue = sizeMap[size] || sizeMap.GIGA;

  return css`
    label: spinner--${size.toLowerCase()};
    ${sizeMixin(sizeValue)};
  `;
};

const SpinnerContainer = styled('div')(
  baseContainerStyles,
  sizeContainerStyles,
  activeContainerStyles
);

/**
 * A loading spinner with ARIA labels support.
 */
const Spinner = ({ dark, size, active }) => (
  <SpinnerContainer {...{ active, size }}>
    <SpinnerIcon dark={dark} />
  </SpinnerContainer>
);

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
  dark: PropTypes.bool,
  active: PropTypes.bool
};

Spinner.defaultProps = {
  size: Spinner.GIGA,
  dark: false,
  active: true
};

/**
 * @component
 */
export default withProps({
  role: 'alertdialog',
  'aria-busy': 'true',
  'aria-live': 'assertive'
})(Spinner);
