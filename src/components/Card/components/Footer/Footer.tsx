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

import { FC } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../../../styles/styled';

type Align = 'left' | 'right';

export interface CardFooterProps {
  /**
   * Direction to align the content. Either left/right
   */
  align?: Align;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: card__footer;
  display: block;
  width: 100%;
  margin-top: ${theme.spacings.giga};

  ${theme.mq.kilo} {
    align-items: center;
    display: flex;
    margin-top: ${theme.spacings.mega};
  }
`;

const alignmentStyles = ({
  theme,
  align = 'right',
}: StyleProps & CardFooterProps) =>
  align === 'right' &&
  css`
    label: card__footer--right;
    ${theme.mq.kilo} {
      justify-content: flex-end;
    }
  `;

/**
 * Footer used in the Card component. Used for styling and aligment
 * purposes only.
 */

export const CardFooter: FC<CardFooterProps> = styled('footer')<
  CardFooterProps
>(baseStyles, alignmentStyles);
