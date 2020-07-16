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

import React, { useState } from 'react';

import RangePicker from './RangePicker';

export default {
  title: 'Forms/Calendar/RangePicker',
  component: RangePicker,
};

const RangePickerWithState = (props) => {
  const [{ startDate, endDate }, setRange] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <RangePicker
      {...props}
      startDate={startDate}
      endDate={endDate}
      onDatesChange={setRange}
      focusedInput={focusedInput}
      onFocusChange={setFocusedInput}
    />
  );
};

export const base = () => (
  <RangePickerWithState
    startDateId="your_unique_start_date_id"
    endDateId="your_unique_end_date_id"
    showClearDates
  />
);
