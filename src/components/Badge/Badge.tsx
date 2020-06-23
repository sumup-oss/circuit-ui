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

import React, {
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  Ref,
  HTMLProps
} from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { subHeadingKilo, focusOutline } from '../../styles/style-helpers';

type OnClick = (
  event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
) => void;
type RefType = Ref<HTMLDivElement>;

export interface BadgeProps extends HTMLProps<HTMLDivElement> {
  /**
   * Callback for the click event.
   */
  onClick?: OnClick;
  /**
   * Ensures text is centered and the badge looks like a circle.
   */
  circle?: boolean;
  color?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  /**
   * The ref to the html div DOM element
   */
  ref?: RefType;
  as?: string;
}

const COLOR_MAP = {
  success: {
    default: 'g500',
    hover: 'g700',
    active: 'g900'
  },
  warning: {
    default: 'y500',
    hover: 'y700',
    active: 'y900'
  },
  danger: {
    default: 'r500',
    hover: 'r700',
    active: 'r900'
  },
  primary: {
    default: 'b500',
    hover: 'b700',
    active: 'b900'
  },
  neutral: {
    default: 'n500',
    hover: 'n700',
    active: 'n900'
  }
} as const;
const baseStyles = ({ theme }: StyleProps) => css`
  label: badge;
  border-radius: ${theme.borderRadius.pill};
  color: ${theme.colors.white};
  display: inline-block;
  padding: 0 ${theme.spacings.byte};
  ${subHeadingKilo({ theme })};
  font-weight: ${theme.fontWeight.bold};
  text-transform: uppercase;
  user-select: none;
  text-align: center;
`;

const colorStyles = ({ theme, color = 'neutral' }: StyleProps & BadgeProps) => {
  const currentColor = COLOR_MAP[color];
  if (!currentColor) {
    return null;
  }
  return css`
    label: ${`badge--${color}`};
    background-color: ${theme.colors[currentColor.default]};
  `;
};

const circleStyles = ({ circle }: BadgeProps) =>
  circle &&
  css`
    label: badge--circle;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
  `;

const clickableStyles = ({
  theme,
  onClick,
  color = 'neutral'
}: StyleProps & BadgeProps) => {
  const currentColor = COLOR_MAP[color];
  if (!onClick || !currentColor) {
    return null;
  }
  return css`
    label: badge--clickable;
    border: 0;
    outline: 0;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors[currentColor.hover]};
    }

    &:active {
      background-color: ${theme.colors[currentColor.active]};
    }

    &:focus {
      ${focusOutline({ theme })};
    }
  `;
};

/**
 * A badge for displaying update notifications etc.
 */
const StyledBadge = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
})<BadgeProps>(baseStyles, colorStyles, circleStyles, clickableStyles);

/* eslint-disable react/display-name */
const Badge = forwardRef((props: BadgeProps, ref: BadgeProps['ref']) => (
  <StyledBadge as={props.onClick ? 'button' : 'div'} ref={ref} {...props} />
));

/**
 * @component
 */
export default Badge;
