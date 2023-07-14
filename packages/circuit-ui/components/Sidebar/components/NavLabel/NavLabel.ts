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

/** @jsxImportSource @emotion/react */

import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../../../styles/styled.js';

export interface NavLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * If the Label is secondary and smaller margin
   */
  secondary?: boolean;
  /**
   * If the Label is visible (it can be hidden when secondary)
   */
  visible?: boolean;
}

const baseStyles = ({ theme }: StyleProps) => css`
  display: block;
  margin-left: ${theme.spacings.kilo};
`;

const secondaryStyles = ({ theme, secondary }: StyleProps & NavLabelProps) =>
  secondary &&
  css`
    margin-left: 0px;
    margin-top: -${theme.spacings.kilo};
    transition: margin-top ${theme.transitions.slow};
  `;

const secondaryVisibleStyles = ({
  secondary,
  visible,
}: StyleProps & NavLabelProps) =>
  secondary &&
  visible &&
  css`
    margin-top: 0px;
  `;

export const NavLabel = styled.span<NavLabelProps>(
  baseStyles,
  secondaryStyles,
  secondaryVisibleStyles,
);
