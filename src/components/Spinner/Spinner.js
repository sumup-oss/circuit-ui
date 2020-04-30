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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

const spin = keyframes`
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
`;

const baseStyles = ({ theme }) => css`
  label: spinner;
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};
  border-radius: ${theme.borderRadius.circle};
  border: ${theme.borderWidth.mega} solid ${theme.colors.white};
  border-top-color: transparent;
  animation: ${spin} 1s infinite linear;
  transform-origin: 50% 50%;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
`;

const activeStyles = ({ active }) =>
  active &&
  css`
    opacity: 1;
  `;

const darkStyles = ({ theme, dark }) =>
  dark &&
  css`
    label: spinner--dark;
    border-color: ${theme.colors.n900};
    border-top-color: transparent;
  `;

/**
 * A loading spinner with ARIA labels support.
 */
const Spinner = styled.div`
  ${baseStyles};
  ${activeStyles};
  ${darkStyles};
`;

Spinner.propTypes = {
  /**
   * Renders a dark variant of the Spinner.
   */
  dark: PropTypes.bool,
  active: PropTypes.bool
};

Spinner.defaultProps = {
  dark: false,
  active: true,

  /**
   * Accessibilty attributes.
   */
  /**
   * Indicates that element has been dynamically updated.
   */
  role: 'alert',
  /**
   * Tells screen reader to wait until loading is complete.
   */
  'aria-busy': 'true',
  /**
   * Indicates that updates to the region have the highest priority.
   */
  'aria-live': 'assertive'
};

/**
 * @component
 */
export default Spinner;
