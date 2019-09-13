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
import { size } from 'polished';
import { withProps } from 'recompose';

import { childrenPropType } from '../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  label: svg-button;
  padding: 0;
  margin: 0;
  display: inline-block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  fill: ${theme.colors.black};
  overflow: initial;

  &:focus,
  &:active {
    outline: none;
  }

  > svg {
    ${size('100%')};
  }
`;

/**
 * SvgButton component for forms.
 */
const SvgButton = styled('button')`
  ${baseStyles};
`;

SvgButton.propTypes = {
  children: childrenPropType
};

/**
 * @component
 */
export default withProps({ type: 'button' })(SvgButton);
