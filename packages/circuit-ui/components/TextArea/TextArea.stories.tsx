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

import { TextArea, type TextAreaProps } from './TextArea.js';
import { Stack } from '../../../../.storybook/components/index.js';

export default {
  title: 'Forms/TextArea',
  component: TextArea,
  tags: ['status:stable'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const baseArgs = {
  label: 'Describe your issue',
  placeholder: 'Be detailed and concise...',
};

export const Base = (args: TextAreaProps) => <TextArea {...args} />;

Base.args = baseArgs;

export const Validations = (args: TextAreaProps) => (
  <Stack>
    <TextArea
      {...args}
      validationHint="Please fill in this field."
      invalid={true}
    />
    <TextArea
      {...args}
      validationHint="We recommend that you fill in this field"
      hasWarning={true}
    />
  </Stack>
);

Validations.args = {
  ...baseArgs,
};

export const Readonly = (args: TextAreaProps) => <TextArea {...args} />;

Readonly.args = {
  ...baseArgs,
  placeholder: 'You can select and copy but not edit me',
  readOnly: true,
};

export const Disabled = (args: TextAreaProps) => <TextArea {...args} />;

Disabled.args = {
  ...baseArgs,
  value: 'You cannot edit the text because the textarea is disabled',
  disabled: true,
};

export const HiddenLabel = (args: TextAreaProps) => <TextArea {...args} />;

HiddenLabel.args = {
  ...baseArgs,
  placeholder: 'Describe your issue',
  hideLabel: true,
};

export const AutoExpand = (args: TextAreaProps) => <TextArea {...args} />;

AutoExpand.args = {
  ...baseArgs,
  placeholder:
    'Try writing a long text, textarea auto adapt its height to your text.',
  rows: 'auto',
};
