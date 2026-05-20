/**
 * Copyright 2026, SumUp Ltd.
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

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import type { IconComponentType } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';

import classes from './Status.module.css';

export type StatusVariant = 'pill' | 'line' | 'badge' | 'dot';
export type StatusColor =
  | 'confirm'
  | 'neutral'
  | 'notify'
  | 'alert'
  | 'promo'
  | 'special';

export interface StatusProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Choose the style variant.
   * @default 'pill'
   */
  variant?: StatusVariant;
  /**
   * The semantic color of the status.
   * @default 'neutral'
   */
  color?: StatusColor;
  /**
   * Label text to be shown. Omit for dot.
   */
  children?: ReactNode;
  /**
   * Leading icon for the line variant.
   */
  icon?: IconComponentType;
}

const isDynamicWidth = (children: StatusProps['children']) => {
  if (typeof children === 'string') {
    return children.length > 2;
  }
  return false;
};

/**
 * The status component communicates the condition of an entity
 * by conveying semantic meaning or indicating new, important information.
 */
export const Status = forwardRef<HTMLSpanElement, StatusProps>(
  (
    {
      variant = 'pill',
      color = 'neutral',
      icon: Icon,
      className,
      style = {},
      children,
      ...props
    },
    ref,
  ) => {
    const width =
      variant === 'badge' && isDynamicWidth(children) ? 'auto' : undefined;

    return (
      <span
        {...props}
        ref={ref}
        className={clsx(
          classes.base,
          classes[variant],
          variant !== 'line' && classes[color],
          variant === 'badge' && classes.circle,
          className,
        )}
        style={width ? { ...style, '--status-width': width } : style}
      >
        {variant === 'line' && Icon && (
          <Icon
            aria-hidden="true"
            className={clsx(classes.icon, classes[color])}
          />
        )}
        {variant !== 'dot' && children}
      </span>
    );
  },
);

Status.displayName = 'Status';
