/** @jsx jsx */

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, jsx, keyframes } from '@emotion/core';
import { withProps } from 'recompose';

import SpinnerSvg from './icons/spinner.svg';

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
  & > path {
    animation: ${spin} 1s infinite linear;
    transform-origin: 50% 50%;
  }
`;

const SpinnerIcon = styled(SpinnerSvg)`
  ${baseIconStyles};
  ${darkIconStyles};
  ${baseSpinStyles};
`;

/**
 * Container component
 */

const baseContainerStyles = css`
  opacity: 0;
  max-width: fit-content;
  position: relative;
  transition: opacity 200ms ease-in-out;
`;

const activeContainerStyles = ({ active }) =>
  active &&
  css`
    opacity: 1;
  `;

const SpinnerContainer = styled('div')(
  baseContainerStyles,
  activeContainerStyles
);

/**
 * A loading spinner with ARIA labels support.
 */
const Spinner = ({ dark, active, ...props }) => (
  <SpinnerContainer {...{ active, ...props }}>
    <SpinnerIcon dark={dark ? 1 : 0} />
  </SpinnerContainer>
);

Spinner.propTypes = {
  /**
   * Renders a dark variant of the Spinner.
   */
  dark: PropTypes.bool,
  active: PropTypes.bool
};

Spinner.defaultProps = {
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
