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

import type { WcDatepickerCustomEvent } from 'wc-datepicker';
import type { MonthChangedEventDetails } from 'wc-datepicker/dist/types/components/wc-datepicker/wc-datepicker';

export type MonthChangeEvent =
  WcDatepickerCustomEvent<MonthChangedEventDetails>;

export type DateChangeEvent = WcDatepickerCustomEvent<string>;
export type DateRangeChangeEvent = WcDatepickerCustomEvent<[string, string]>;

export interface DateProps {
  range?: false;
  value?: string;
  onChange?: (event: DateChangeEvent) => void;
}
export interface DateRangeProps {
  range?: true;
  value?: string[];
  onChange?: (event: DateRangeChangeEvent) => void;
}

export interface BaseCalendarProps {
  disabled?: boolean;
  disableDate?: (date: Date) => boolean;
  locale?: string;
}
