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
import withAriaSelected from '../../util/withAriaSelected';
import { shadowSingle } from '../../styles/style-helpers';

const baseStyles = ({ theme }) => css`
  label: selector;
  cursor: pointer;
  padding: ${theme.spacings.giga};
  border-radius: ${theme.borderRadius.giga};
  border: ${theme.borderWidth.kilo} solid ${theme.colors.n300};
  background-color: ${theme.colors.white};
  margin-bottom: ${theme.spacings.mega};
  fill: ${theme.colors.n400};
`;

const hoverStyles = ({ selected, theme }) =>
  !selected &&
  css`
    label: selector--hover;
    &:hover {
      border: ${theme.borderWidth.mega} solid ${theme.colors.n300};
      background-color: ${theme.colors.n100};
    }
  `;

const selectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: selector--selected;
    border: ${theme.borderWidth.mega} solid ${theme.colors.p500};
    background-color: ${theme.colors.b100};
    ${shadowSingle({ theme })};
  `;

const disabledStyles = ({ disabled, theme }) =>
  disabled &&
  css`
    label: selector--disabled;
    color: ${theme.colors.n500};
    cursor: default;
    pointer-events: none;
  `;

/**
 * A selector allows users to choose between several mutually-exlusive choices,
 * accompanied by descriptions, possibly with tabular data.
 */
const Selector = styled.div(
  baseStyles,
  hoverStyles,
  selectedStyles,
  disabledStyles
);

Selector.propTypes = {
  /**
   * Whether the selector is selected or not.
   */
  selected: PropTypes.bool,
  /**
   * Whether the selector is disabled or not.
   */
  disabled: PropTypes.bool
};

Selector.defaultProps = {
  selected: false,
  disabled: false
};

/**
 * @component
 */
export default withAriaSelected(Selector);
