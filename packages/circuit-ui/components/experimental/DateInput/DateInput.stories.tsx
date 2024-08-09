/**
 * Copyright 2024, SumUp Ltd.
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

import { useState } from 'react';

import { DateInput, type DateInputProps } from './DateInput.js';

export default {
  title: 'Forms/Input/Experimental/DateInput',
  component: DateInput,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

const baseArgs = {
  label: 'Date of birth',
  validationHint: 'Use the YYYY-MM-DD format',
  prevMonthButtonLabel: 'Previous month',
  nextMonthButtonLabel: 'Previous month',
  openCalendarButtonLabel: 'Change date',
  closeCalendarButtonLabel: 'Close',
  applyDateButtonLabel: 'Apply',
  clearDateButtonLabel: 'Clear',
};

export const Base = (args: DateInputProps) => {
  const [value, setValue] = useState(args.value || '');
  return <DateInput {...args} value={value} onChange={setValue} />;
};

Base.args = baseArgs;
