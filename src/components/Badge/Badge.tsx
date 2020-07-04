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
import { focusOutline } from '../../styles/style-helpers';
import deprecate from '../../util/deprecate';

export interface BadgeProps extends HTMLProps<HTMLDivElement> {
  /**
   * The semantic color of the badge.
   */
  color?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
  /**
   * Use the circular badge to indicate a count of items related to an element.
   */
  circle?: boolean;
  /**
   * @deprecated
   * Callback for the click event.
   */
  onClick?: (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => void;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLDivElement>;
}

const COLOR_MAP = {
  success: {
    text: 'white',
    default: 'g700',
    hover: 'g900'
  },
  warning: {
    text: 'bodyColor',
    default: 'y300',
    hover: 'y500'
  },
  danger: {
    text: 'white',
    default: 'r500',
    hover: 'r700'
  },
  primary: {
    text: 'white',
    default: 'p500',
    hover: 'p700'
  },
  neutral: {
    text: 'bodyColor',
    default: 'n300',
    hover: 'n500'
  }
} as const;

const baseStyles = ({ theme }: StyleProps) => css`
  label: badge;
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

const colorStyles = ({ theme, color = 'neutral' }: StyleProps & BadgeProps) => {
  const currentColor = COLOR_MAP[color];
  if (!currentColor) {
    return null;
  }
  return css`
    label: ${`badge--${color}`};
    background-color: ${theme.colors[currentColor.default]};
    color: ${theme.colors[currentColor.text]};
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
    transition: background-color ${theme.transitions.default};

    &:hover,
    &:active {
      background-color: ${theme.colors[currentColor.hover]};
    }

    &:focus {
      ${focusOutline({ theme })};
    }
  `;
};

const StyledBadge = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
})<BadgeProps>(baseStyles, colorStyles, circleStyles, clickableStyles);

/**
 * A badge communicates the status of an element or the count of items
 * related to an element.
 */
export const Badge = forwardRef((props: BadgeProps, ref: BadgeProps['ref']) => {
  if (props.onClick) {
    deprecate(
      [
        'The `onClick` prop of the Badge component has been deprecated.',
        'Badges are not meant to be interactive and should only',
        'communicate the status of an element.',
        'Use the Tag component for interactive elements instead.'
      ].join(' ')
    );
  }

  const as = props.onClick ? 'button' : 'div';
  return <StyledBadge as={as} ref={ref} {...props} />;
});

Badge.displayName = 'Badge';
