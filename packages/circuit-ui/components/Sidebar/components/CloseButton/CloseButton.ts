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

import { css } from '@emotion/react';

import styled, { StyleProps } from '../../../../styles/styled';
import BaseButton, {
  CloseButtonProps as BaseButtonProps,
} from '../../../CloseButton';

export interface CloseButtonProps extends BaseButtonProps {
  /**
   * Determines whether the CloseButton is visible
   */
  visible?: boolean;
}

const baseStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  bottom: ${theme.spacings.mega};
  right: ${theme.spacings.mega};
  transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
  visibility: hidden;
  opacity: 0;
  z-index: ${theme.zIndex.navigation};
  ${theme.mq.giga} {
    visibility: hidden;
  }
`;

const visibleStyles = ({ visible }: CloseButtonProps) =>
  visible &&
  css`
    visibility: inherit;
    opacity: 1;
  `;

export const CloseButton = styled(BaseButton)<CloseButtonProps>(
  baseStyles,
  visibleStyles,
);
