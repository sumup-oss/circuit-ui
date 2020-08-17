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

import { TextArea, TextAreaProps } from './TextArea';
import docs from './TextArea.docs.mdx';

export default {
  title: 'Forms/TextArea',
  component: TextArea,
  parameters: {
    docs: { page: docs },
  },
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

export const Invalid = (args: TextAreaProps) => <TextArea {...args} />;

Invalid.args = {
  ...baseArgs,
  validationHint: 'Please fill in this field.',
  invalid: true,
};

export const Warning = (args: TextAreaProps) => <TextArea {...args} />;

Warning.args = {
  ...baseArgs,
  validationHint: 'We recommend that you fill in this field.',
  hasWarning: true,
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
