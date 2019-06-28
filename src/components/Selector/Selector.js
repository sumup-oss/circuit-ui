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

const baseStyles = ({ theme }) => css`
  label: selector;
  cursor: pointer;
  padding: ${theme.spacings.mega};
  border-radius: ${theme.borderRadius.mega};
  border: 1px solid ${theme.colors.n300};
  background-color: 1px solid ${theme.colors.n100};
  margin-bottom: ${theme.spacings.mega};
`;

const selectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: selector--selected;
    border: ${theme.borderWidth.mega} solid ${theme.colors.p500};
    background-color: ${theme.colors.white};
  `;

const disabledStyles = ({ disabled, theme }) =>
  disabled &&
  css`
    label: selector--disabled;
    color: ${theme.colors.n500};
    cursor: default;
  `;

/**
 * A selector allows users to choose between several mutually-exlusive choices,
 * accompanied by descriptions, possibly with tabular data.
 */
const Selector = styled('div')(baseStyles, selectedStyles, disabledStyles);

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
