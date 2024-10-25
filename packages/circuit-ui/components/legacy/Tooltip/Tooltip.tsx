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

import { css } from '@emotion/react';

import styled from '../../../styles/styled';
import type { StyleProps } from '../../../styles/styled';
import { typography } from '../../../styles/style-mixins';

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-block;
  width: max-content;
  max-width: 360px;
  background-color: var(--cui-bg-elevated);
  border-radius: ${theme.borderRadius.byte};
  border: ${theme.borderWidth.kilo} solid var(--cui-border-subtle);
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 8%);
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  position: absolute;
  z-index: ${theme.zIndex.tooltip};
  transition: opacity 0.3s;
`;

const positionMap: Record<Position, Position> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export type Position = 'top' | 'right' | 'bottom' | 'left';

const getPositionStyles = ({
  theme,
  position,
}: StyleProps & Required<TooltipProps>) => {
  const absolutePosition = positionMap[position];

  return `
    ${absolutePosition}: calc(100% + ${theme.spacings.bit});
  `;
};

type VerticalAlignment = 'top' | 'center' | 'bottom';

function isVerticalAlignment(value: unknown): value is VerticalAlignment {
  return value === 'top' || value === 'center' || value === 'bottom';
}

type HorizontalAlignment = 'left' | 'center' | 'right';

function isHorizontalAlignment(value: unknown): value is VerticalAlignment {
  return value === 'left' || value === 'center' || value === 'right';
}

export type Alignment = VerticalAlignment | HorizontalAlignment;

const getAlignmentStyles = ({
  theme,
  position,
  align,
}: StyleProps & Required<TooltipProps>) => {
  const isHorizontal = position === 'bottom' || position === 'top';

  if (isHorizontal && isVerticalAlignment(align)) {
    return `
      left: 50%;
      transform: translateX(-50%);
    `;
  }

  if (!isHorizontal && isHorizontalAlignment(align)) {
    return `
      top: 50%;
      transform: translateY(-50%);
    `;
  }

  // align is not 'center' and therefore has the same possible values
  // as a Position.
  const absolutePosition = positionMap[align as Position];

  /* eslint-disable max-len */
  return `
    ${absolutePosition}: 50%;
    ${absolutePosition}: calc(50% - (${theme.spacings.mega} + ${theme.spacings.bit}));
  `;
  /* eslint-enable max-len */
};

const positionAndAlignStyles = ({
  theme,
  position = 'right',
  align = 'center',
}: StyleProps & TooltipProps) => css`
  ${getAlignmentStyles({ theme, position, align })};
  ${getPositionStyles({ theme, position, align })};
`;

export interface TooltipProps {
  position?: Position;
  align?: Alignment;
}

/**
 * @deprecated
 *
 * Use the experimental [`Tooltip`](https://circuit.sumup.com/?path=/docs/components-tooltip--docs)
 * or [`Toggletip`](https://circuit.sumup.com/?path=/docs/components-toggletip--docs) components instead
 * ([migration guide](https://circuit.sumup.com/?path=/docs/components-tooltip-legacy--docs#migration)).
 */
export const Tooltip = styled.div<TooltipProps>(
  typography('two'),
  baseStyles,
  positionAndAlignStyles,
);
