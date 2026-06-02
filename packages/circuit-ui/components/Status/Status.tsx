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

import { forwardRef, type HTMLAttributes } from 'react';

import type { IconComponentType } from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import classes from './Status.module.css';

type StatusVariant = 'pill' | 'line' | 'badge' | 'dot';
export type StatusColor =
  | 'confirm'
  | 'neutral'
  | 'notify'
  | 'alert'
  | 'promo'
  | 'special';

export interface StatusProps extends HTMLAttributes<HTMLDivElement> {
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
  children?: string | number;
  /**
   * Leading icon for the line variant.
   */
  icon?: IconComponentType<'16'>;
}

const isDynamicWidth = (children: StatusProps['children']) =>
  String(children ?? '').length > 2;

/**
 * The status component communicates the condition of an entity
 * by conveying semantic meaning or indicating new, important information.
 */
export const Status = forwardRef<HTMLDivElement, StatusProps>(
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
      <div
        {...props}
        ref={ref}
        className={clsx(
          classes.base,
          classes[variant],
          classes[color],
          className,
        )}
        style={width ? { ...style, '--status-width': width } : style}
      >
        {variant === 'line' && Icon && (
          <Icon aria-hidden="true" size="16" className={classes.icon} />
        )}
        {variant === 'dot' ? (
          <span className={utilClasses.hideVisually}>{children}</span>
        ) : (
          children
        )}
      </div>
    );
  },
);

Status.displayName = 'Status';
