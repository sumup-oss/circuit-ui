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

import {
  Alert,
  Confirm,
  Info,
  Notify,
  Sparkles,
  type IconComponentType,
} from '@sumup-oss/icons';

import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';

import classes from './Callout.module.css';

export type CalloutVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'promo';

const CALLOUT_ICONS: Record<CalloutVariant, IconComponentType<'24'>> = {
  info: Info,
  success: Confirm,
  warning: Notify,
  danger: Alert,
  promo: Sparkles,
};

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The callout's variant.
   * @default 'info'
   */
  variant?: CalloutVariant;
  /**
   * The callout's body content.
   */
  body: ReactNode;
  /**
   * The icon displayed next to the body.
   */
  icon?: IconComponentType<'24'>;
  /**
   * A text replacement for the icon in the context of the callout, if its body
   * copy isn't self-explanatory. Defaults to an empty string.
   */
  iconLabel?: string;
}

/**
 * The `Callout` component renders static inline guidance or emphasis within
 * the content flow.
 */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    { variant = 'info', body, icon, iconLabel = '', className, ...props },
    ref,
  ) => {
    const Icon = icon || CALLOUT_ICONS[variant];

    return (
      <div
        ref={ref}
        className={clsx(classes.base, classes[variant], className)}
        {...props}
      >
        <div className={classes.icon}>
          <Icon aria-hidden="true" size="24" />
        </div>
        <span className={utilClasses.hideVisually}>{iconLabel}</span>
        <div className={classes.content}>{body}</div>
      </div>
    );
  },
);

Callout.displayName = 'Callout';
