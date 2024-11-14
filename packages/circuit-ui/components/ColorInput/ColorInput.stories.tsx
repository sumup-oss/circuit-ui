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

import { Stack } from '../../../../.storybook/components/index.js';

import { ColorInput, type ColorInputProps } from './ColorInput.js';

export default {
  title: 'Forms/ColorInput',
  component: ColorInput,
  tags: ['status:stable'],
};

const baseArgs = {
  label: 'Color',
  placeholder: '#99ffbb',
  defaultValue: '#99ffbb',
};

export const Base = (args: ColorInputProps) => <ColorInput {...args} />;

Base.args = baseArgs;

export const Optional = (args: ColorInputProps) => <ColorInput {...args} />;

Optional.args = { ...baseArgs, optionalLabel: 'optional' };

export const Readonly = (args: ColorInputProps) => <ColorInput {...args} />;

Readonly.args = { ...baseArgs, readOnly: true };

export const Disabled = (args: ColorInputProps) => <ColorInput {...args} />;

Disabled.args = { ...baseArgs, disabled: true };

export const Validations = (args: ColorInputProps) => (
  <Stack>
    <ColorInput
      {...args}
      defaultValue="#0096FF"
      hasWarning
      validationHint="Blue is not a Teletubby color :( "
    />
    <ColorInput
      {...args}
      defaultValue="#fff"
      invalid
      validationHint="Value must be a 6 character hexadecimal color"
    />
    <ColorInput
      {...args}
      defaultValue="#4a288d"
      showValid
      validationHint="Tinky-Winky!"
    />
  </Stack>
);

Validations.args = baseArgs;
