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

import React, { MouseEvent, KeyboardEvent, Ref } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';
import isPropValid from '@emotion/is-prop-valid';

import styled from '../../styles/styled';
import { subHeadingKilo, focusOutline } from '../../styles/style-helpers';

type OnClick = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
type RefType = Ref<() => void | HTMLButtonElement | undefined>;

interface BadgeBaseProp {
		/**
		 * Callback for the click event.
		 */
		onClick: OnClick;
		/**
		 * Ensures text is centered and the badge looks like a circle.
		 */
		circle?: boolean;
		color: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
		/**
		 * The ref to the html button dom element
		 */
		ref: RefType;
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
};
const baseStyles = (theme: Theme) => css`
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

const colorStyles = (theme: Theme, color: string) => {
  const currentColor = COLOR_MAP[color];
  if (!currentColor) {
    return null;
  }
  return css`
    label: ${`badge--${color}`};
    background-color: ${theme.colors[currentColor.default]};
  `;
};

const circleStyles = ({ circle }) =>
  circle &&
  css`
    label: badge--circle;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
  `;

const clickableStyles = (theme: Theme, onClick: OnClick, color: string) => {
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

const StyledBadge = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'color'
})(baseStyles, colorStyles, circleStyles, clickableStyles);

/**
 * A badge for displaying update notifications etc.
 */
const Badge = React.forwardRef((props: BadgeBaseProp, ref: RefType) => (
  <StyledBadge {...props} ref={ref} />
));

Badge.displayName = 'Badge';

/**
 * @component
 */
export default Badge;
