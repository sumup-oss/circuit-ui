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

import styled from '../../styles/styled.js';
import type { StyleProps } from '../../styles/styled.js';
import { typography, shadow } from '../../styles/style-mixins.js';

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-block;
  width: auto;
  max-width: 280px;
  min-width: 120px;
  background-color: var(--cui-bg-strong);
  color: var(--cui-fg-on-strong);
  border-radius: ${theme.borderRadius.bit};
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  position: absolute;
  z-index: ${theme.zIndex.tooltip};
  transition: opacity 0.3s;

  &::after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border: ${theme.spacings.byte} solid transparent;
  }
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
}: StyleProps & { position: Position }) => {
  const absolutePosition = positionMap[position];

  // The first absolute position rule is a fallback.
  return `
    ${absolutePosition}: 100%;
    ${absolutePosition}: calc(100% + ${theme.spacings.kilo});

    &::after {
      ${position}: 100%;
      border-${position}-color: var(--cui-bg-strong);
    }
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
}: StyleProps & TooltipProps) => {
  const isHorizontal = position === 'bottom' || position === 'top';

  if (isHorizontal && isVerticalAlignment(align)) {
    return `
      left: 50%;
      transform: translateX(-50%);

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    `;
  }

  if (!isHorizontal && isHorizontalAlignment(align)) {
    return `
      top: 50%;
      transform: translateY(-50%);

      &::after {
        top: 50%;
        transform: translateY(-50%);
      }
    `;
  }

  // align is not 'center' and therefore has the same possible values
  // as a Position.
  const absolutePosition = positionMap[align as Position];

  /* eslint-disable max-len */
  return `
    ${absolutePosition}: 50%;
    ${absolutePosition}: calc(50% - (${theme.spacings.mega} + ${theme.spacings.bit}));

    &::after {
      ${absolutePosition}: ${theme.spacings.kilo};
    }
  `;
  /* eslint-enable max-len */
};

const positionAndAlignStyles = ({
  theme,
  position = 'right',
  align = 'center',
}: StyleProps & TooltipProps) => css`
  ${getAlignmentStyles({ theme, position, align })};
  ${getPositionStyles({ theme, position })};
`;

export interface TooltipProps {
  position?: Position;
  align?: Alignment;
}

/**
 * @legacy
 */
export const Tooltip = styled.div<TooltipProps>(
  typography('two'),
  baseStyles,
  shadow,
  positionAndAlignStyles,
);
