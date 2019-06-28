/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { withProps } from 'recompose';

import { ReactComponent as SpinnerSvg } from './icons/spinner.svg';

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
