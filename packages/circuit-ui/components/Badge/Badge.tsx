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

import { Ref, HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import { typography } from '../../styles/style-mixins';
import { withDeprecation } from '../../util/logger';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Choose the style variant. Default: 'neutral'.
   */
  variant?:
    | 'neutral'
    | 'success'
    | 'warning'
    | 'danger'
    | 'promo'
    /**
     * @deprecated
     */
    | 'confirm'
    /**
     * @deprecated
     */
    | 'notify'
    /**
     * @deprecated
     */
    | 'alert';
  /**
   * Use the circular badge to indicate a count of items related to an element.
   */
  circle?: boolean;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLDivElement>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  border-radius: ${theme.borderRadius.pill};
  display: inline-block;
  padding: 2px ${theme.spacings.byte};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
  letter-spacing: 0.25px;
`;

const variantStyles = ({ variant = 'neutral' }: BadgeProps) => {
  switch (variant) {
    case 'success':
    case 'confirm': {
      return css`
        background-color: var(--cui-bg-success-strong);
        color: var(--cui-fg-on-strong);
      `;
    }
    case 'warning':
    case 'notify': {
      return css`
        background-color: var(--cui-bg-warning-strong);
        color: var(--cui-fg-on-strong);
      `;
    }
    case 'danger':
    case 'alert': {
      return css`
        background-color: var(--cui-bg-danger-strong);
        color: var(--cui-fg-on-strong);
      `;
    }
    case 'neutral': {
      return css`
        background-color: var(--cui-bg-highlight);
        color: var(--cui-fg-normal);
      `;
    }
    case 'promo': {
      return css`
        background-color: var(--cui-bg-promo-strong);
        color: var(--cui-fg-on-strong);
      `;
    }
    default: {
      return null;
    }
  }
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

/**
 * A badge communicates the status of an element or the count of items
 * related to an element.
 */
const StyledBadge = styled('div')<BadgeProps>(
  typography('two'),
  baseStyles,
  variantStyles,
  circleStyles,
);

StyledBadge.displayName = 'Badge';

export const Badge =
  process.env.NODE_ENV === 'production'
    ? StyledBadge
    : withDeprecation(StyledBadge, ({ variant }) => {
        const deprecatedMap: Record<string, string> = {
          confirm: 'success',
          notify: 'warning',
          alert: 'danger',
        };

        if (variant && deprecatedMap[variant]) {
          return `The "${variant}" variant has been deprecated. Use "${deprecatedMap[variant]}" instead.`;
        }

        return null;
      });
