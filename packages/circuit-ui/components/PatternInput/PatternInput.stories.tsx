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

import { PatternInput, type PatternInputProps } from './PatternInput.js';

export default {
  title: 'Forms/PatternInput',
  component: PatternInput,
  tags: ['status:stable'],
};

export const Base = (args: PatternInputProps) => (
  <PatternInput {...args} style={{ maxWidth: '250px' }} />
);

Base.args = {
  label: 'Sort code',
  placeholder: '12-34-56',
  pattern: '##-##-##',
};

export const WithCustomMask = (args: PatternInputProps) => (
  <PatternInput {...args} style={{ maxWidth: '250px' }} />
);

WithCustomMask.args = {
  label: 'Sort code',
  placeholder: '12-34-56',
  pattern: '##-##-##',
  mask: '#',
};

export const PhoneNumber = (args: PatternInputProps) => (
  <PatternInput {...args} style={{ maxWidth: '250px' }} />
);

PhoneNumber.args = {
  label: 'Phone number',
  placeholder: '(123) 456-7890',
  pattern: '(###) ###-####',
  mask: '_',
};

export const DateInput = (args: PatternInputProps) => (
  <PatternInput {...args} style={{ maxWidth: '250px' }} />
);

DateInput.args = {
  label: 'Date',
  placeholder: 'DD/MM/YYYY',
  pattern: '##/##/####',
  mask: 'D',
};
