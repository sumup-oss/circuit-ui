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
import { css } from '@emotion/core';

const baseStyles = ({ theme }) => css`
  label: nav-label;
  margin-left: ${theme.spacings.kilo};
`;

const secondaryStyles = ({ theme, secondary }) =>
  secondary &&
  css`
    label: nav-label--secondary;
    margin-left: 0px;
    margin-top: -${theme.spacings.kilo};
    transition: margin-top ${theme.transitions.slow};
  `;

const secondaryVisibleStyles = ({ secondary, visible }) =>
  secondary &&
  visible &&
  css`
    label: nav-label--secondary--visible;
    margin-top: 0px;
  `;

const NavLabel = styled.div(
  baseStyles,
  secondaryStyles,
  secondaryVisibleStyles,
);

NavLabel.propTypes = {
  /**
   * If the Label is secondary and smaller margin
   */
  secondary: PropTypes.bool,
  /**
   * If the Label is visible (it can be hidden when secondary)
   */
  visible: PropTypes.bool,
};

/**
 * @component
 */
export default NavLabel;
