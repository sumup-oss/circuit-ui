/**
 * Copyright 2023, SumUp Ltd.
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

import { FC } from 'react';
import { Alert, Confirm, IconProps, Info, Notify } from '@sumup/icons';

export type NotificationVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
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

export const NOTIFICATION_ICONS: Record<
  NotificationVariant,
  FC<IconProps<'16' | '24'>>
> = {
  info: Info,
  success: Confirm,
  confirm: Confirm,
  warning: Notify,
  notify: Notify,
  danger: Alert,
  alert: Alert,
};

export const NOTIFICATION_COLORS: Record<
  NotificationVariant,
  { border: string; fg: string }
> = {
  info: {
    border: '--cui-border-accent',
    fg: '--cui-fg-accent',
  },
  success: {
    border: '--cui-border-success',
    fg: '--cui-fg-success',
  },
  confirm: {
    border: '--cui-border-success',
    fg: '--cui-fg-success',
  },
  warning: {
    border: '--cui-border-warning',
    fg: '--cui-fg-warning',
  },
  notify: {
    border: '--cui-border-warning',
    fg: '--cui-fg-warning',
  },
  danger: {
    border: '--cui-border-danger',
    fg: '--cui-fg-danger',
  },
  alert: {
    border: '--cui-border-danger',
    fg: '--cui-fg-danger',
  },
};

export const DEPRECATED_VARIANTS: Record<string, string> = {
  confirm: 'success',
  notify: 'warning',
  alert: 'danger',
};
