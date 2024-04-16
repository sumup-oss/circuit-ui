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

import { ChangeEvent, useState } from 'react';

import type { InputElement } from '../Input/Input.js';

import { DatePicker, type DatePickerProps } from './DatePicker.js';

export default {
  title: 'Forms/DatePicker',
  component: DatePicker,
};

export const Base = (args: DatePickerProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<InputElement>) => {
    setValue(event.target.value);
  };

  return <DatePicker {...args} value={value} onChange={handleChange} />;
};

Base.args = {
  label: 'Invoice due date',
  placeholder: 'yyyy-mm-dd',
};
