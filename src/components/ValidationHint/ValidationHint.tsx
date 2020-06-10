/**
 * Copyright 2020, SumUp Ltd.
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
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { textKilo } from '../../styles/style-helpers';

export interface ValidationHintProps extends HTMLProps<HTMLSpanElement> {
  /**
   * A concise description of the example prop.
   */
  invalid?: boolean;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: validation-hint;
  ${textKilo({ theme })};
  display: block;
  margin-top: ${theme.spacings.bit};
  color: ${theme.colors.n700};
  transition: color ${theme.transitions.default};
`;

const invalidStyles = ({ theme, invalid }: StyleProps & ValidationHintProps) =>
  invalid &&
  css`
    label: validation-hint--invalid;
    color: ${theme.colors.danger};
  `;

/**
 * Describe ValidationHint here.
 */
export const ValidationHint = styled('span')<ValidationHintProps>(
  baseStyles,
  invalidStyles
);
