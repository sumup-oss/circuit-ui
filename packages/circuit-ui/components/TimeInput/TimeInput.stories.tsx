/**
 * Copyright 2026, SumUp Ltd.
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

import { TimeInput, type TimeInputProps } from './TimeInput.js';

export default {
  title: 'Forms/TimeInput',
  component: TimeInput,
  tags: ['status:experimental'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

const baseArgs = {
  label: 'Time of event',
  locale: 'en-US',
};

export const Base = (args: TimeInputProps) => {
  const [value, setValue] = useState(args.defaultValue || args.value || '');
  return (
    <TimeInput
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

Base.args = baseArgs;

export const Validations = (args: TimeInputProps) => (
  <Stack vertical>
    <Stack>
      <TimeInput
        {...args}
        validationHint="Please enter a time"
        required
        invalid
      />
      <TimeInput
        {...args}
        defaultValue="03:28"
        validationHint="That's a bit early"
        hasWarning
      />
      <TimeInput
        {...args}
        defaultValue="21:40"
        validationHint="Please choose a time within our opening hours"
        showValid
      />
    </Stack>
    <Stack>
      <TimeInput
        {...args}
        min="12:00"
        max="18:00"
        validationHint="Enter a time in the afternoon"
      />
      <TimeInput
        {...args}
        min="09:45"
        max="10:00"
        step={1}
        validationHint="Enter a time with seconds"
      />
    </Stack>
  </Stack>
);

Validations.args = baseArgs;

export const Optional = (args: TimeInputProps) => <TimeInput {...args} />;

Optional.args = {
  ...baseArgs,
  optionalLabel: 'optional',
  defaultValue: '20:28',
};

export const Readonly = (args: TimeInputProps) => <TimeInput {...args} />;

Readonly.args = {
  ...baseArgs,
  label: 'Appointment date',
  defaultValue: '08:28',
  readOnly: true,
};

export const Disabled = (args: TimeInputProps) => <TimeInput {...args} />;

Disabled.args = {
  ...baseArgs,
  defaultValue: '08:28',
  disabled: true,
};

export const Locales = (args: TimeInputProps) => (
  <Stack>
    <TimeInput {...args} locale="de-DE" label="Veranstaltungszeit" />
    <TimeInput {...args} locale="es-CL" label="Hora del evento" />
    <TimeInput {...args} locale="pt-BR" label="Horário do evento" />
  </Stack>
);

Locales.args = baseArgs;
