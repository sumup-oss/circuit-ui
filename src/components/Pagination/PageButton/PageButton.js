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

import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Button from '../../Button';
import { calculatePadding } from '../../../styles/style-helpers'; // eslint-disable-line max-len

const baseStyles = ({ theme }) => css`
  label: pagination__button;
  border-radius: 0;
  border-right: 0;
  font-weight: ${theme.fontWeight.regular};
  border-color: ${theme.colors.n300};

  &:focus {
    border-color: ${theme.colors.n300};
    border-width: ${theme.borderWidth.kilo};
    padding: ${calculatePadding({ theme, size: 'kilo' })()};
  }

  &:hover {
    box-shadow: 1px 0 0 ${theme.colors.n500};
    z-index: 1;
  }
  &:hover:focus {
    box-shadow: none;
  }
`;

const primaryStyles = ({ theme, primary }) =>
  primary &&
  css`
    font-weight: bold;
    pointer-events: none;
    &:hover {
      border-color: ${theme.colors.n300};
      box-shadow: none;
  `;

const disabledStyles = ({ theme, disabled }) =>
  disabled &&
  css`
    opacity: 1 !important;
    &:hover {
      border-color: ${theme.colors.n300};
    }
  `;

/**
 * Styled Component for the button page in pagination
 */
const PageButton = styled(Button)(baseStyles, primaryStyles, disabledStyles);

PageButton.defaultProps = {
  size: Button.KILO
};

/**
 * @component
 */
export default PageButton;
