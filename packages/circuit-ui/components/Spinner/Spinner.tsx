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

import { HTMLProps } from 'react';
import { css, keyframes } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const baseStyles = ({ theme }: StyleProps) => css`
  label: spinner;
  display: block;
  width: ${theme.iconSizes.mega};
  height: ${theme.iconSizes.mega};
  border-radius: ${theme.borderRadius.circle};
  border: ${theme.borderWidth.mega} solid currentColor;
  border-top-color: transparent;
  animation: ${spin} 1s infinite linear;
  transform-origin: 50% 50%;
`;

/**
 * A spinning loading icon.
 */
export const Spinner = styled.span<HTMLProps<HTMLDivElement>>(baseStyles);
