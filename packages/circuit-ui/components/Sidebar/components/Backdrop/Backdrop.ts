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

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tells if the Backdrop is visible
   */
  visible?: boolean;
}

const baseStyles = ({ theme }: StyleProps) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${theme.colors.n900};
  transition: opacity ${theme.transitions.default},
    visibility ${theme.transitions.default};
  visibility: hidden;
  opacity: 0;
  z-index: ${theme.zIndex.backdrop};
  ${theme.mq.giga} {
    visibility: hidden;
  }
`;

const visibleStyles = ({ visible }: BackdropProps) =>
  visible &&
  css`
    visibility: inherit;
    opacity: 0.56;
  `;

export const Backdrop = styled('div')<BackdropProps>(baseStyles, visibleStyles);
