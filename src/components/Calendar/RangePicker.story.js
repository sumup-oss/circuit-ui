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
import { storiesOf } from '@storybook/react';
import { withStateHandlers } from 'recompose';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import { RangePicker } from '.';

const enhance = withStateHandlers(
  { startDate: null, endDate: null, focusedInput: null },
  {
    onDatesChange: () => ({ startDate, endDate }) => ({ startDate, endDate }),
    onFocusChange: () => focusedInput => ({ focusedInput })
  }
);

const CalendarStoryPicker = enhance(
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

storiesOf(`${GROUPS.COMPONENTS}|Calendar`, module)
  .addParameters({ jest: ['Calendar'] })
  .add('RangePicker', () => <CalendarStoryPicker />);
