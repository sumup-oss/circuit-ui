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

import {
  PhoneNumberInput,
  type PhoneNumberInputProps,
} from './PhoneNumberInput.js';

export default {
  title: 'Forms/PhoneNumberInput',
  component: PhoneNumberInput,
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export const Base = (args: PhoneNumberInputProps) => (
  <PhoneNumberInput {...args} />
);

Base.args = {
  label: 'Phone number',
  countryCode: {
    label: 'Country code',
    defaultValue: '+1',
    options: [
      { country: 'US', code: '+1' },
      { country: 'DE', code: '+49' },
    ],
  },
  subscriberNumber: {
    label: 'Subscriber number',
  },
  validationHint: 'Maximum 15 digits',
};
