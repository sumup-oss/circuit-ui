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

import {
  Alert,
  Confirm,
  Info,
  Notify,
  type IconComponentType,
} from '@sumup-oss/icons';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'danger';

export const NOTIFICATION_ICONS: Record<
  NotificationVariant,
  IconComponentType<'16' | '24'>
> = {
  info: Info,
  success: Confirm,
  warning: Notify,
  danger: Alert,
};

export const TRANSITION_DURATION = 200;

export const DEFAULT_HEIGHT = 'auto';
