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

import { DatePicker, DatePickerProps } from './DatePicker.js';
import { DateRangePicker, DateRangePickerProps } from './DateRangePicker.js';
import type { DateChangeEvent, DateRangeChangeEvent } from './types.js';

export default {
  title: 'Experimental/DatePicker',
  component: DatePicker,
};

export const Date = (args: DatePickerProps) => <DatePicker {...args} />;

Date.args = {
  locale: 'de-DE',
  disabled: false,
  onChange: (event: DateChangeEvent) => console.log(event.target.value),
  disableDate: (date: Date) => date.getDay() === 0,
};

export const DateRange = (args: DateRangePickerProps) => (
  <DateRangePicker {...args} />
);

DateRange.args = {
  locale: 'de-DE',
  disabled: false,
  onChange: (event: DateRangeChangeEvent) => console.log(event.target.value),
  disableDate: (date: Date) => date.getDay() === 0,
};
