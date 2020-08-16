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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import SearchInput from '../SearchInput';
import CurrencyInput from '../CurrencyInput';

import docs from './Input.docs.mdx';
import { Input, InputProps } from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
  subcomponents: { SearchInput, CurrencyInput },
  parameters: {
    docs: { page: docs },
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

const inputStyles = css`
  max-width: 250px;
`;

const baseArgs = {
  label: 'First name',
  placeholder: 'Jane',
  validationHint: 'Maximum 100 characters',
};

export const Base = (args: InputProps) => <Input {...args} css={inputStyles} />;

Base.args = baseArgs;

export const Valid = (args: InputProps) => (
  <Input {...args} css={inputStyles} />
);

Valid.args = {
  label: 'Username',
  placeholder: 'jane123',
  validationHint: 'Yay! That username is available.',
  showValid: true,
};

export const Invalid = (args: InputProps) => (
  <Input {...args} css={inputStyles} />
);

Invalid.args = {
  ...baseArgs,
  validationHint: 'This field is required.',
  invalid: true,
};

export const Warning = (args: InputProps) => (
  <Input {...args} css={inputStyles} />
);

Warning.args = {
  ...baseArgs,
  validationHint: 'This does not look right.',
  hasWarning: true,
};

export const Readonly = (args: InputProps) => (
  <Input {...args} css={inputStyles} />
);

Readonly.args = {
  ...baseArgs,
  label: 'API token',
  value: 'a3b2c1',
  validationHint: 'Select and copy me',
  readOnly: true,
};

export const Disabled = (args: InputProps) => (
  <Input {...args} css={inputStyles} />
);

Disabled.args = {
  ...baseArgs,
  value: "You can't edit me",
  disabled: true,
};

export const RightAligned = (args: InputProps) => (
  <Input {...args} css={inputStyles} />
);

RightAligned.args = {
  ...baseArgs,
  textAlign: 'right',
};

export const Inline = (args: InputProps) => (
  <div>
    <Input {...args} label="First name" placeholder="Jane" />
    <Input {...args} label="Last name" placeholder="Doe" />
  </div>
);

Inline.args = {
  ...baseArgs,
  inline: true,
};

export const HiddenLabel = (args: InputProps) => (
  <Input {...args} css={inputStyles} />
);

HiddenLabel.args = {
  ...baseArgs,
  label: 'Email',
  placeholder: 'Email',
  type: 'email',
  validationHint: '',
  hideLabel: true,
};
