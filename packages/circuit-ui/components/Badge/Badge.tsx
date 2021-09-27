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

import { Ref, forwardRef, HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Choose from 4 style variants. Default: 'neutral'.
   */
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'promo';
  /**
   * Use the circular badge to indicate a count of items related to an element.
   */
  circle?: boolean;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLDivElement>;
}

const COLOR_MAP = {
  success: {
    text: 'white',
    default: 'g700',
    hover: 'g900',
  },
  warning: {
    text: 'bodyColor',
    default: 'y300',
    hover: 'y500',
  },
  danger: {
    text: 'white',
    default: 'r500',
    hover: 'r700',
  },
  neutral: {
    text: 'bodyColor',
    default: 'n200',
    hover: 'n300',
  },
  promo: {
    text: 'white',
    default: 'v500',
    hover: 'v700',
  },
} as const;

const baseStyles = ({ theme }: StyleProps) => css`
  border-radius: ${theme.borderRadius.pill};
  color: ${theme.colors.white};
  display: inline-block;
  padding: 2px ${theme.spacings.byte};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
  letter-spacing: 0.25px;
`;

const variantStyles = ({
  theme,
  variant = 'neutral',
}: StyleProps & BadgeProps) => {
  const currentColor = COLOR_MAP[variant];
  if (!currentColor) {
    return null;
  }
  return css`
    background-color: ${theme.colors[currentColor.default]};
    color: ${theme.colors[currentColor.text]};
  `;
};

const isDynamicWidth = (children: BadgeProps['children']) => {
  if (typeof children === 'string') {
    return children.length > 2;
  }
  return false;
};

const circleStyles = ({ circle = false, children }: BadgeProps) =>
  circle &&
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 4px;
    height: 24px;
    width: ${isDynamicWidth(children) ? 'auto' : '24px'};
  `;

const StyledBadge = styled('div')<BadgeProps>(
  baseStyles,
  variantStyles,
  circleStyles,
);

/**
 * A badge communicates the status of an element or the count of items
 * related to an element.
 */
export const Badge = forwardRef((props: BadgeProps, ref: BadgeProps['ref']) => (
  <StyledBadge ref={ref} {...props} />
));

Badge.displayName = 'Badge';
