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

import React from 'react';
import { withStateHandlers } from 'recompose';
import { RangePicker, SingleDayPicker } from '../../../src/components/Calendar';

const enhanceRangePicker = withStateHandlers(
  { startDate: null, endDate: null, focusedInput: null },
  {
    onDatesChange: () => ({ startDate, endDate }) => ({ startDate, endDate }),
    onFocusChange: () => focusedInput => ({ focusedInput })
  }
);

export const EnhancedRangePicker = enhanceRangePicker(
  ({ startDate, endDate, focusedInput, onDatesChange, onFocusChange }) => (
    <RangePicker
      startDate={startDate}
      startDateId="your_unique_start_date_id"
      endDate={endDate}
      endDateId="your_unique_end_date_id"
      onDatesChange={onDatesChange}
      focusedInput={focusedInput}
      onFocusChange={onFocusChange}
      showClearDates
    />
  )
);

const enhanceSingleDayPicker = withStateHandlers(
  { date: null, focused: null },
  {
    onDateChange: () => date => ({ date }),
    onFocusChange: () => ({ focused }) => ({ focused })
  }
);

export const EnhancedSingleDayPicker = enhanceSingleDayPicker(
  ({ date, onDateChange, focused, onFocusChange }) => (
    <SingleDayPicker
      date={date}
      onDateChange={onDateChange}
      focused={focused}
      onFocusChange={onFocusChange}
    />
  )
);
