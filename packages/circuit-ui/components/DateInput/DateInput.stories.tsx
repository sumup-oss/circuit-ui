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

import { useState } from 'react';

import { Stack } from '../../../../.storybook/components/index.js';

import { DateInput, type DateInputProps } from './DateInput.js';
import { DateRangeInput, type DateRangeInputProps } from './DateRangeInput.js';

export default {
  title: 'Forms/DateInput',
  component: DateInput,
  tags: ['status:stable'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

// Fun fact: Circuit UI was created on August 28, 2017

const baseArgs = {
  label: 'Date of birth',
  autoComplete: 'bday',
  locale: 'en-US',
};

export const Base = (args: DateInputProps) => {
  const [value, setValue] = useState(args.defaultValue || args.value || '');
  return (
    <DateInput
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

Base.args = baseArgs;

export const Validations = (args: DateInputProps) => (
  <Stack vertical>
    <Stack>
      <DateInput
        {...args}
        validationHint="Please enter your birth date"
        required
        invalid
      />
      <DateInput
        {...args}
        defaultValue="1917-08-28"
        validationHint="That's mighty old"
        hasWarning
      />
      <DateInput
        {...args}
        defaultValue="2004-03-15"
        validationHint="You meet the age requirements"
        showValid
      />
    </Stack>
    <Stack>
      <DateInput
        {...args}
        min="2024-01-01"
        max="2024-12-31"
        validationHint="Enter a date in 2024"
      />
      <DateInput
        {...args}
        min="2024-08-01"
        max="2024-08-31"
        validationHint="Enter a date in August 2024"
      />
    </Stack>
  </Stack>
);

Validations.args = baseArgs;

export const Optional = (args: DateInputProps) => <DateInput {...args} />;

Optional.args = {
  ...baseArgs,
  optionalLabel: 'optional',
};

export const Readonly = (args: DateInputProps) => <DateInput {...args} />;

Readonly.args = {
  ...baseArgs,
  label: 'Appointment date',
  defaultValue: '2017-08-28',
  readOnly: true,
};

export const Disabled = (args: DateInputProps) => <DateInput {...args} />;

Disabled.args = {
  ...baseArgs,
  defaultValue: '2017-08-28',
  disabled: true,
};

export const Locales = (args: DateInputProps) => (
  <Stack>
    <DateInput {...args} locale="de-DE" label="Geburtsdatum" />
    <DateInput {...args} locale="es-CL" label="Fecha de nacimiento" />
    <DateInput {...args} locale="pt-BR" label="Data de nascimento" />
  </Stack>
);

Locales.args = baseArgs;

export const Range = (args: DateRangeInputProps) => (
  <DateRangeInput {...args} />
);

Range.args = {
  ...baseArgs,
  label: 'Trip dates',
};
